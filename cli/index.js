#!/usr/bin/env node
/**
 * fgos-kit — safe installer
 * Principles:
 *  - Do not modify anything without explicit user consent
 *  - Never delete without showing a detailed plan
 *  - Always generate an audit log (success and failures)
 */

import { Command } from "commander";
import fs from "fs";
import path from "path";
import os from "os";
import https from "https";
import { execSync } from "child_process";
import readline from "readline";

const program = new Command();

const REPO = "fabioffigueiredo/finance-data-governance-os";
const DEFAULT_BRANCH = "main";

function nowStamp() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

function askYesNo(question) {
    return new Promise((resolve) => {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        rl.question(question, (ans) => {
            rl.close();
            resolve(/^y(es)?$/i.test(ans.trim()));
        });
    });
}

function download(url, outPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(outPath);
        https
            .get(url, (res) => {
                // follow redirects
                if (res.statusCode === 301 || res.statusCode === 302) {
                    file.close();
                    fs.rmSync(outPath, { force: true });
                    return download(res.headers.location, outPath).then(resolve, reject);
                }
                if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
                res.pipe(file);
                file.on("finish", () => file.close(resolve));
            })
            .on("error", (err) => {
                fs.rmSync(outPath, { force: true });
                reject(err);
            });
    });
}

function ensureDir(p) {
    fs.mkdirSync(p, { recursive: true });
}

function safeCopyDir(src, dst) {
    // Node >=16 has cpSync
    fs.cpSync(src, dst, { recursive: true });
}

function writeAuditLog(targetDir, logObj) {
    const logDir = path.join(targetDir, ".agent", "_audit");
    ensureDir(logDir);

    const mdPath = path.join(logDir, `install-log-${logObj.runId}.md`);
    const jsonPath = path.join(logDir, `install-log-${logObj.runId}.json`);

    const md = [
        `# Install Log (${logObj.runId})`,
        ``,
        `**Repo:** ${logObj.repo}`,
        `**Branch:** ${logObj.branch}`,
        `**Target:** ${logObj.target}`,
        `**Mode:** ${logObj.mode}`,
        `**Dry-run:** ${logObj.dryRun}`,
        ``,
        `## Plan`,
        ...logObj.plan.map((x) => `- ${x}`),
        ``,
        `## Executed`,
        ...logObj.executed.map((x) => `- ${x}`),
        ``,
        `## Errors`,
        ...(logObj.errors.length ? logObj.errors.map((x) => `- ${x}`) : [`- none`]),
        ``,
    ].join("\n");

    fs.writeFileSync(mdPath, md, "utf-8");
    fs.writeFileSync(jsonPath, JSON.stringify(logObj, null, 2), "utf-8");
}

program
    .name("fgos-kit")
    .description("Safe installer for Finance Data Governance OS (.agent kit)")
    .version("0.2.0");

program
    .command("init")
    .description("Initialize .agent/ with governance agents, skills, workflows and rules (safe-by-default)")
    .option("--path <dir>", "target directory", ".")
    .option("--branch <name>", "branch to download from", DEFAULT_BRANCH)
    .option("--yes", "skip interactive prompts (still creates backup before overwrite)", false)
    .option("--dry-run", "show plan and exit without changes", false)
    .option("--overwrite", "allow overwriting existing .agent content (creates backup first)", false)
    .action(async (opts) => {
        const target = path.resolve(opts.path);
        const agentDir = path.join(target, ".agent");

        const runId = nowStamp();
        const logObj = {
            runId,
            repo: REPO,
            branch: opts.branch,
            target,
            mode: "init",
            dryRun: !!opts.dryRun,
            plan: [],
            executed: [],
            errors: [],
        };

        try {
            // 1) Context check (non-destructive)
            if (!fs.existsSync(target)) {
                throw new Error(`Target path does not exist: ${target}`);
            }

            const agentExists = fs.existsSync(agentDir);
            logObj.plan.push(`Detect target: ${target}`);
            logObj.plan.push(`.agent exists: ${agentExists}`);

            // 2) Decide what would happen
            if (!agentExists) {
                logObj.plan.push(`Create .agent/ directory`);
            } else {
                logObj.plan.push(`Existing .agent/ found`);
                logObj.plan.push(`No deletion will happen unless --overwrite is provided and user confirms`);
            }

            logObj.plan.push(`Download kit from GitHub tarball`);
            logObj.plan.push(`Copy: agents/, skills/, workflows/ (if present), rules/ (if present) into .agent/`);

            // 3) Show plan + require consent
            console.log("\n=== PLAN (no changes yet) ===");
            for (const p of logObj.plan) console.log(" -", p);

            if (opts.dryRun) {
                console.log("\n✅ Dry-run complete. No files were changed.");
                return;
            }

            if (agentExists && !opts.overwrite) {
                console.log("\n⚠️  .agent/ already exists.");
                console.log("To proceed safely, re-run with: --overwrite");
                console.log("Nothing was changed.");
                return;
            }

            // If overwrite, ask confirmation (unless --yes)
            if (!opts.yes) {
                const ok = await askYesNo("\nProceed with installation? (y/N): ");
                if (!ok) {
                    console.log("Cancelled. No changes made.");
                    return;
                }
            }

            // 4) Download & extract (still not touching target until ready)
            const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fgos-"));
            const tarPath = path.join(tmp, "repo.tar.gz");
            const url = `https://codeload.github.com/${REPO}/tar.gz/refs/heads/${opts.branch}`;

            console.log("\n📦 Downloading kit...");
            await download(url, tarPath);

            console.log("📂 Extracting...");
            execSync(`tar -xzf "${tarPath}" -C "${tmp}"`);

            const extracted = fs.readdirSync(tmp).find((d) => d.startsWith("finance-data-governance-os-"));
            if (!extracted) throw new Error("Could not find extracted repository directory");
            const repoRoot = path.join(tmp, extracted);

            // 5) Backup if overwriting
            if (agentExists) {
                const backupDir = path.join(target, `.agent.bak-${runId}`);
                console.log(`🧷 Creating backup: ${backupDir}`);
                safeCopyDir(agentDir, backupDir);
                logObj.executed.push(`Backup created: ${backupDir}`);
            }

            // 6) Apply changes (scoped to .agent only)
            ensureDir(agentDir);

            const dirsToCopy = ["agents", "skills", "workflows", "rules"];
            for (const name of dirsToCopy) {
                const src = path.join(repoRoot, name);
                const dst = path.join(agentDir, name);

                if (fs.existsSync(src)) {
                    // if overwriting, remove target subdir (not whole .agent)
                    fs.rmSync(dst, { recursive: true, force: true });
                    safeCopyDir(src, dst);
                    console.log(`  ✓ ${name}/`);
                    logObj.executed.push(`Copied ${name}/ to .agent/${name}/`);
                }
            }

            // 7) Write audit logs
            writeAuditLog(target, logObj);

            console.log("\n✅ Installed safely.");
            console.log(`Audit log saved at: ${path.join(target, ".agent", "_audit")}`);

            // cleanup
            fs.rmSync(tmp, { recursive: true, force: true });
        } catch (err) {
            logObj.errors.push(String(err?.stack || err?.message || err));
            try {
                writeAuditLog(path.resolve(opts.path), logObj);
            } catch { }
            console.error("\n❌ Error:", err.message);
            process.exit(1);
        }
    });

program.parse(process.argv);

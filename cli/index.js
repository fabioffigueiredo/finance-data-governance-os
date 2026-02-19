#!/usr/bin/env node
/**
 * fgos-kit — safe installer with incremental update (smart merge)
 * Principles:
 *  - Do not modify existing files without explicit user consent (overwrite)
 *  - Add missing files/directories (incremental update)
 *  - Always generate an audit log
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
    if (!fs.existsSync(p)) {
        fs.mkdirSync(p, { recursive: true });
        return true; // created
    }
    return false; // existed
}

function safeCopyDir(src, dst) {
    fs.cpSync(src, dst, { recursive: true });
}

// Smart Merge: walks source tree and copies ONLY if dest doesn't exist
// Returns stats: { added: [], skipped: [] }
function smartMerge(src, dst, stats = { added: [], skipped: [] }, rootDst = dst) {
    const entries = fs.readdirSync(src, { withFileTypes: true });

    ensureDir(dst);

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const dstPath = path.join(dst, entry.name);
        const relPath = path.relative(rootDst, dstPath);

        if (entry.isDirectory()) {
            smartMerge(srcPath, dstPath, stats, rootDst);
        } else {
            if (fs.existsSync(dstPath)) {
                stats.skipped.push(relPath);
            } else {
                fs.copyFileSync(srcPath, dstPath);
                stats.added.push(relPath);
            }
        }
    }
    return stats;
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
    .version("0.3.0");

program
    .command("init")
    .description("Initialize or update .agent/ (safe incremental merge)")
    .option("--path <dir>", "target directory", ".")
    .option("--branch <name>", "branch to download from", DEFAULT_BRANCH)
    .option("--yes", "skip interactive prompts", false)
    .option("--dry-run", "show plan and exit without changes", false)
    .option("--overwrite", "force overwrite existing files (creates backup)", false)
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
            if (!fs.existsSync(target)) throw new Error(`Target path does not exist: ${target}`);

            const agentExists = fs.existsSync(agentDir);
            logObj.plan.push(`Detect target: ${target}`);
            logObj.plan.push(`.agent exists: ${agentExists}`);

            let mode = "CREATE";
            if (agentExists) {
                if (opts.overwrite) mode = "OVERWRITE";
                else mode = "MERGE";
            }

            logObj.plan.push(`Operation Mode: ${mode}`);
            if (mode === "OVERWRITE") logObj.plan.push(`Backup existing .agent -> Wipe -> Reinstall`);
            if (mode === "MERGE") logObj.plan.push(`Incremental update: Add missing files, SKIP existing files`);

            // Show plan
            console.log("\n=== PLAN ===");
            for (const p of logObj.plan) console.log(" -", p);

            if (opts.dryRun) {
                console.log("\n✅ Dry-run complete.");
                return;
            }

            // Confirmation
            if (!opts.yes) {
                const ok = await askYesNo(`\nProceed with ${mode}? (y/N): `);
                if (!ok) {
                    console.log("Cancelled.");
                    return;
                }
            }

            // Download
            const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fgos-"));
            const tarPath = path.join(tmp, "repo.tar.gz");
            const url = `https://codeload.github.com/${REPO}/tar.gz/refs/heads/${opts.branch}`;

            console.log("\n📦 Downloading kit...");
            await download(url, tarPath);
            execSync(`tar -xzf "${tarPath}" -C "${tmp}"`);
            const extracted = fs.readdirSync(tmp).find((d) => d.startsWith("finance-data-governance-os-"));
            const repoRoot = path.join(tmp, extracted);

            // Execution
            ensureDir(agentDir);

            if (mode === "OVERWRITE") {
                const backupDir = path.join(target, `.agent.bak-${runId}`);
                console.log(`🧷 Creating backup: ${backupDir}`);
                safeCopyDir(agentDir, backupDir);
                logObj.executed.push(`Backup created: ${backupDir}`);

                // Wipe subdirs to ensure clean slate, but keep .agent root (for audit logs)
                const dirsToClear = ["agents", "skills", "workflows", "rules"];
                for (const d of dirsToClear) fs.rmSync(path.join(agentDir, d), { recursive: true, force: true });
            }

            const dirsToCopy = ["agents", "skills", "workflows", "rules"];
            let totalAdded = 0;
            let totalSkipped = 0;

            for (const name of dirsToCopy) {
                const src = path.join(repoRoot, name);
                const dst = path.join(agentDir, name);

                if (fs.existsSync(src)) {
                    if (mode === "OVERWRITE") {
                        safeCopyDir(src, dst);
                        console.log(`  ✓ ${name}/ (overwritten)`);
                        logObj.executed.push(`Overwritten ${name}/`);
                    } else {
                        // MERGE logic
                        const stats = smartMerge(src, dst, undefined, agentDir);
                        console.log(`  ✓ ${name}/ (added: ${stats.added.length}, skipped: ${stats.skipped.length})`);
                        logObj.executed.push(`Merged ${name}/: ${stats.added.length} new, ${stats.skipped.length} skipped`);
                        totalAdded += stats.added.length;
                        totalSkipped += stats.skipped.length;
                    }
                }
            }

            if (mode === "MERGE") {
                console.log(`\nStats: ${totalAdded} files added, ${totalSkipped} files preserved.`);
            }

            writeAuditLog(target, logObj);
            console.log("\n✅ Done.");
            fs.rmSync(tmp, { recursive: true, force: true });

        } catch (err) {
            logObj.errors.push(String(err?.stack || err?.message));
            try { writeAuditLog(path.resolve(opts.path), logObj); } catch { }
            console.error("\n❌ Error:", err.message);
            process.exit(1);
        }
    });

program.parse(process.argv);

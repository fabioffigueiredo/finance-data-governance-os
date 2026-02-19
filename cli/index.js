#!/usr/bin/env node
/**
 * cli/index.js — CLI para instalar o Finance Data Governance OS em qualquer projeto
 *
 * Uso:
 *   npx @fabioforest/fgos-kit init
 *   npx @fabioforest/fgos-kit init --path ./meu-projeto
 *   npx @fabioforest/fgos-kit init --force
 *
 * O que faz:
 *   1. Baixa o tarball do repositório GitHub
 *   2. Extrai agents/, skills/, workflows/, rules/
 *   3. Copia para .agent/ no diretório alvo
 */
import { Command } from "commander";
import fs from "fs";
import path from "path";
import os from "os";
import https from "https";
import { execSync } from "child_process";

const program = new Command();

// Configurações do repositório
const REPO = "fabioffigueiredo/finance-data-governance-os";
const DEFAULT_BRANCH = "main";

/**
 * Faz download de um arquivo via HTTPS com suporte a redirects
 * @param {string} url - URL para download
 * @param {string} outPath - Caminho de destino do arquivo
 * @returns {Promise<void>}
 */
function download(url, outPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(outPath);
        https
            .get(url, (res) => {
                // Segue redirects (GitHub usa 302)
                if (res.statusCode === 302 || res.statusCode === 301) {
                    file.close();
                    fs.unlinkSync(outPath);
                    return download(res.headers.location, outPath).then(resolve, reject);
                }

                if (res.statusCode !== 200) {
                    reject(new Error(`HTTP ${res.statusCode}`));
                    return;
                }

                res.pipe(file);
                file.on("finish", () => file.close(resolve));
            })
            .on("error", (err) => {
                fs.unlinkSync(outPath);
                reject(err);
            });
    });
}

program
    .name("fgos-kit")
    .description("Install Finance Data Governance OS into .agent/")
    .version("0.1.0");

program
    .command("init")
    .description("Initialize .agent/ with governance agents, skills, workflows and rules")
    .option("--path <dir>", "target directory", ".")
    .option("--branch <name>", "branch to download from", DEFAULT_BRANCH)
    .option("--force", "overwrite existing .agent", false)
    .action(async (opts) => {
        const target = path.resolve(opts.path);
        const agentDir = path.join(target, ".agent");

        // Verifica se .agent/ já existe
        if (fs.existsSync(agentDir) && !opts.force) {
            console.log("⚠️  .agent/ already exists. Use --force to overwrite.");
            process.exit(0);
        }

        const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fgos-"));
        const tarPath = path.join(tmp, "repo.tar.gz");
        const url = `https://codeload.github.com/${REPO}/tar.gz/refs/heads/${opts.branch}`;

        try {
            console.log("📦 Downloading Finance Data Governance OS...");
            await download(url, tarPath);

            console.log("📂 Extracting...");
            execSync(`tar -xzf "${tarPath}" -C "${tmp}"`);

            // Encontra a pasta extraída (nome varia com branch)
            const extracted = fs
                .readdirSync(tmp)
                .find((d) => d.startsWith("finance-data-governance-os-"));

            if (!extracted) {
                throw new Error("Could not find extracted repository directory");
            }

            const repoRoot = path.join(tmp, extracted);

            // Limpa .agent/ existente e recria
            fs.rmSync(agentDir, { recursive: true, force: true });
            fs.mkdirSync(agentDir, { recursive: true });

            // Copia os diretórios de governança para .agent/
            const dirsToCopy = ["agents", "skills", "workflows", "rules"];
            for (const name of dirsToCopy) {
                const src = path.join(repoRoot, name);
                const dst = path.join(agentDir, name);
                if (fs.existsSync(src)) {
                    execSync(`cp -R "${src}" "${dst}"`);
                    console.log(`  ✓ ${name}/`);
                }
            }

            console.log("");
            console.log("✅ Done. .agent/ installed at:", agentDir);
        } catch (err) {
            console.error("❌ Error:", err.message);
            process.exit(1);
        } finally {
            // Limpa arquivos temporários
            fs.rmSync(tmp, { recursive: true, force: true });
        }
    });

program.parse(process.argv);

Esse repositório que tambem usa agentes, skills e workflows https://github.com/vudovn/antigravity-kit usa essa forma de instalar diretamente do repositório: Quick Install npx @vudovn/ag-kit init Or install globally: npm install -g @vudovn/ag-kit ag-kit init

- Fechado — e você fez certo em parar pra “limpar e padronizar” antes de empilhar mais coisa.

Como você não deu push, eu não consigo ver o seu estado local pelo GitHub. Então vou te dar um procedimento 100% determinístico pra:

voltar seu repo local exatamente pro que está no GitHub (limpo)

remover qualquer pasta/arquivo extra que você criou localmente

criar a estrutura correta (install global/local + instalador estilo npx ... init igual ao antigravity-kit)

1) Reset total do seu repo local (limpar “bagunça” sem dó)

Dentro do repo:

cd finance-data-governance-os

# salva URL do remoto e atualiza refs
git fetch origin

# volta seu working tree exatamente pro main remoto
git reset --hard origin/main

# remove arquivos/pastas não rastreados (criados localmente)
git clean -fd


✅ Depois disso, seu repo local fica idêntico ao GitHub.
Tudo que você criou e não commitou some (exatamente o que você quer agora).

2) Estrutura final que você precisa (padrão “kit instalável”)

A ideia é ter duas formas:

A) Shell scripts (simples e universal)

install/global/install.sh

install/global/update.sh

install/local/install.sh

INSTALL.md

B) CLI via npm (igual ao antigravity-kit)

npx @seu-pacote init

npm i -g @seu-pacote + seu-comando init

3) Crie a estrutura de instalação por shell (local + global)

Rode:

mkdir -p install/global install/local

INSTALL.md (raiz)

Crie o arquivo INSTALL.md com:

# Finance Data Governance OS — Install

Instala agents/skills/workflows/rules em IDEs (Cursor, VSCode, Antigravity, Codex…).

## Local (por projeto)
```bash
bash install/local/install.sh


Cria/atualiza .agent/ no projeto atual.

Global (máquina inteira)
bash install/global/install.sh


Instala em ~/.ai-governance/ (biblioteca global).

Update (global)
bash install/global/update.sh


### `install/local/install.sh`
```bash
cat > install/local/install.sh <<'SH'
#!/usr/bin/env bash
set -euo pipefail

DEST="${1:-.}"
cd "$DEST"

echo "Installing locally into: $(pwd)"

mkdir -p .agent
rm -rf .agent/agents .agent/skills .agent/workflows .agent/rules || true

# Copia a biblioteca open-source (raiz) para runtime da IDE
cp -r agents .agent/agents
cp -r skills .agent/skills

# opcionais (se existirem no repo)
[ -d workflows ] && cp -r workflows .agent/workflows || true
[ -d rules ] && cp -r rules .agent/rules || true

echo "Done. .agent/ ready."
SH
chmod +x install/local/install.sh

install/global/install.sh
cat > install/global/install.sh <<'SH'
#!/usr/bin/env bash
set -euo pipefail

BASE="${HOME}/.ai-governance"

echo "Installing globally into: ${BASE}"
mkdir -p "${BASE}"

rm -rf "${BASE}/agents" "${BASE}/skills" "${BASE}/workflows" "${BASE}/rules" || true
cp -r agents "${BASE}/agents"
cp -r skills "${BASE}/skills"
[ -d workflows ] && cp -r workflows "${BASE}/workflows" || true
[ -d rules ] && cp -r rules "${BASE}/rules" || true

echo "Done."
echo "Tip: use install/local/install.sh inside each project to create .agent/"
SH
chmod +x install/global/install.sh

install/global/update.sh
cat > install/global/update.sh <<'SH'
#!/usr/bin/env bash
set -euo pipefail

echo "Updating repo..."
git pull

echo "Re-installing global library..."
bash install/global/install.sh
SH
chmod +x install/global/update.sh


👉 Isso já resolve local/global sem npm.

4) Agora o “modo antigravity-kit”: npx ... init

O antigravity-kit faz isso com um CLI publicado no npm que baixa do GitHub e cria .agent/.
Pra você ter o mesmo UX, o caminho correto é:

✅ Criar um pacote npm CLI (dentro do repo ou em repo separado)

Eu recomendo repo separado (mais limpo), tipo:
finance-governance-os-cli

Mas dá pra fazer dentro também (monorepo). Pra ser rápido, dentro do repo:

Crie:

cli/package.json
cli/index.js

cli/package.json (exemplo)
{
  "name": "@fabioffigueiredo/fgos-kit",
  "version": "0.1.0",
  "description": "Installer CLI for Finance Data Governance OS (.agent kit)",
  "bin": {
    "fgos-kit": "index.js"
  },
  "type": "module",
  "dependencies": {
    "commander": "^12.1.0"
  }
}

cli/index.js (baixando tarball do GitHub e criando .agent/)
#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs";
import path from "path";
import os from "os";
import https from "https";
import { execSync } from "child_process";

const program = new Command();

const REPO = "fabioffigueiredo/finance-data-governance-os";
const DEFAULT_BRANCH = "main";

function download(url, outPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outPath);
    https.get(url, (res) => {
      if (res.statusCode !== 200) reject(new Error(`HTTP ${res.statusCode}`));
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", reject);
  });
}

program
  .name("fgos-kit")
  .description("Install Finance Data Governance OS into .agent/")
  .command("init")
  .option("--path <dir>", "target dir", ".")
  .option("--branch <name>", "branch", DEFAULT_BRANCH)
  .option("--force", "overwrite existing .agent", false)
  .action(async (opts) => {
    const target = path.resolve(opts.path);
    const agentDir = path.join(target, ".agent");

    if (fs.existsSync(agentDir) && !opts.force) {
      console.log(".agent already exists. Use --force to overwrite.");
      process.exit(0);
    }

    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fgos-"));
    const tarPath = path.join(tmp, "repo.tar.gz");
    const url = `https://codeload.github.com/${REPO}/tar.gz/refs/heads/${opts.branch}`;

    console.log("Downloading kit...");
    await download(url, tarPath);

    console.log("Extracting...");
    execSync(`tar -xzf "${tarPath}" -C "${tmp}"`);

    const extracted = fs.readdirSync(tmp).find((d) => d.startsWith("finance-data-governance-os-"));
    const repoRoot = path.join(tmp, extracted);

    fs.rmSync(agentDir, { recursive: true, force: true });
    fs.mkdirSync(agentDir, { recursive: true });

    // Copia agents/skills (+ workflows/rules se existirem)
    for (const name of ["agents","skills","workflows","rules"]) {
      const src = path.join(repoRoot, name);
      const dst = path.join(agentDir, name);
      if (fs.existsSync(src)) {
        execSync(`cp -R "${src}" "${dst}"`);
      }
    }

    console.log("Done. .agent installed.");
  });

program.parse(process.argv);

Publicar no npm (pra usar npx)

Criar conta npm

cd cli

npm publish --access public

Aí você terá:

npx @fabioffigueiredo/fgos-kit init
# ou
npm i -g @fabioffigueiredo/fgos-kit
fgos-kit init


Isso fica idêntico ao antigravity-kit em UX.

5) O que é “desnecessário” e deve ser removido

Depois do reset (passo 1), a regra é:

✅ manter:

agents/

skills/

docs/

templates/

.agent/ (se você quer runtime IDE dentro do repo)

install/ (shell installer)

cli/ (se for fazer npm)

❌ evitar:

duplicar install em scripts/ + install/

ter .ai-governance/ dentro do repo (isso deve existir só no home do usuário)

múltiplos INSTALLs (um só: INSTALL.md)

Próximo passo prático (sem pergunta extra)

Faça agora:

Execute o reset (passo 1)

Crie a pasta install/ e os 3 scripts + INSTALL.md (passo 3)

git add . && git commit -m "feat: installer (local/global)" && git push

Depois disso, você já tem instalação local/global.

Boa — voltei a analisar o que está no GitHub agora (não o seu local) e dá pra ver claramente o estado atual do repo.

✅ O que existe no repositório agora (e está OK)

Você já tem a estrutura de instalação publicada no GitHub:

INSTALL.md ✅

install/global/install.sh ✅

install/global/update.sh ✅

install/local/install.sh ✅

E também existe (pelo menos) este template Databricks no repo:

templates/databricks/cluster-policy.json ✅

Então: você já não está “sem push” — essa estrutura está sim no repositório remoto.

🧹 O que precisa apagar

Pelo que consigo ver remotamente, não há nada “errado” gritante para apagar (tipo .ai-governance/ dentro do repo ou uma pasta scripts/ duplicada).
Ou seja: não tem lixo evidente publicado.

O que geralmente vira lixo (e você deve evitar publicar) é:

.ai-governance/ dentro do repo (isso tem que ser só no ~/.ai-governance do usuário)

duplicar instalação em scripts/ e install/ ao mesmo tempo

ter mais de um guia (ex.: INSTALL.md, INSTALLATION.md, SETUP.md com o mesmo conteúdo)

Se você tiver criado essas coisas localmente, aí sim elas precisam ser removidas antes do próximo push.

Como checar localmente em 10 segundos:

git status
ls -la


Se aparecerem pastas como scripts/ ou .ai-governance/ ou arquivos extras, remove.

🔧 O que precisa mudar (melhorias necessárias)

A instalação está funcionando, mas ainda não está “nível antigravity-kit” em robustez. Eu mudaria 3 pontos:

1) install/local/install.sh deve:

limpar versões antigas antes de copiar

copiar também workflows/ e rules/ se existirem

aceitar --path (instalar em outro projeto)

Versão melhor (substitua o conteúdo atual):

#!/usr/bin/env bash
set -euo pipefail

TARGET="${1:-.}"
cd "$TARGET"

echo "Installing locally into: $(pwd)"

mkdir -p .agent .project

rm -rf .agent/agents .agent/skills .agent/workflows .agent/rules 2>/dev/null || true

cp -r agents .agent/agents
cp -r skills .agent/skills
[ -d workflows ] && cp -r workflows .agent/workflows || true
[ -d rules ] && cp -r rules .agent/rules || true

echo "Done. .agent/ ready."

2) install/global/install.sh deve copiar workflows/rules também (se existirem)

E idealmente limpar antes:

#!/usr/bin/env bash
set -euo pipefail

BASE="$HOME/.ai-governance"
mkdir -p "$BASE"

rm -rf "$BASE/agents" "$BASE/skills" "$BASE/workflows" "$BASE/rules" 2>/dev/null || true

cp -r agents "$BASE/agents"
cp -r skills "$BASE/skills"
[ -d workflows ] && cp -r workflows "$BASE/workflows" || true
[ -d rules ] && cp -r rules "$BASE/rules" || true

echo "Installed in $BASE"

3) install/global/update.sh deveria só chamar o install depois do git pull
#!/usr/bin/env bash
set -euo pipefail

git pull
bash install/global/install.sh

✅ Estrutura final “correta” (a que você precisa)

No GitHub, o que você deve manter como padrão é:

INSTALL.md
install/
  global/
    install.sh
    update.sh
  local/
    install.sh
agents/
skills/
workflows/   (opcional)
rules/       (opcional)


Isso é limpo, profissional e multi-IDE.

🎯 “npx ... init” igual ao antigravity-kit

Isso é outro nível: precisa de um CLI npm publicado.

O melhor padrão é criar um repo separado, tipo:

finance-data-governance-os-cli

E aí publicar:

npx @fabioffigueiredo/fgos-kit init

Se você quiser, eu te passo o pacote completo do CLI (package.json + index.js + publish checklist) — mas primeiro vamos deixar os scripts install/ perfeitos.

Próxima ação (pra ficar redondo)

Atualize os 3 scripts com as versões acima

chmod +x install/**/*.sh

git add . && git commit -m "fix: robust installer (local/global) + workflows/rules support" && git push

Depois disso, a instalação vai ficar realmente profissional.

Se você me mandar aqui o output de:

git status
ls -1
find . -maxdepth 2 -type d | sort
# Finance Data Governance OS — Installation

Framework instalável de governança de IA e dados para ambientes regulados.

Compatível com:
Cursor
VSCode
Antigravity
Codex
Claude Code
Windsurf

---

## Global install (máquina inteira)

git clone https://github.com/fabioffigueiredo/finance-data-governance-os.git
cd finance-data-governance-os
bash install/global/install.sh

Instala em:
~/.ai-governance/

---

## Local install (por projeto)

Dentro de qualquer projeto:

bash install/local/install.sh

Cria:
.agent/
.project/

---

## Update

bash install/global/update.sh

---

## Remove

rm -rf ~/.ai-governance

# Finance Data Governance OS - Installation Guide

Este guia cobre todos os métodos de instalação do Finance Data Governance OS (FGOS).

---

## 🚀 Método Recomendado: npm (Node.js)

A maneira mais rápida e fácil de adicionar governança a qualquer projeto.

### Instalação por Projeto (npx)
Use este comando na raiz do seu projeto para criar a pasta `.agent/` com os agentes e skills:

```bash
npx @fabioforest/fgos-kit init
```

**Opções de Segurança:**
*   `--dry-run`: Simula a instalação sem fazer alterações.
*   `--overwrite`: Permite atualizar uma instalação existente (cria backup automático).
*   `--yes`: Pula confirmações (útil para CI/CD).

Consulte [INSTALL_SAFETY.md](docs/INSTALL_SAFETY.md) para detalhes sobre auditoria e backups.

*   Isso não instala nada globalmente.
*   Funciona em qualquer diretório onde você tenha um projeto.

### Instalação Global (ferramenta de linha de comando)
Se você usa o FGOS frequentemente, pode instalar a ferramenta globalmente:

```bash
npm install -g @fabioforest/fgos-kit
```

Depois, use o comando `fgos-kit` em qualquer lugar:

```bash
fgos-kit init
```

---

## 💻 Método Shell Script (Linux/Mac)

Se você não tem Node.js ou prefere usar scripts shell.

### Instalação Global (~/.ai-governance)
Instala o FGOS no seu diretório home e configura o PATH.

```bash
# Clone o repositório (se ainda não tiver)
git clone https://github.com/fabioffigueiredo/finance-data-governance-os.git
cd finance-data-governance-os

# Execute o instalador
bash install/global/install.sh
```

**Para atualizar:**
```bash
bash install/global/update.sh
```

**Para desinstalar:**
```bash
bash install/global/uninstall.sh
```

### Instalação Local (no projeto atual)
Útil para desenvolvimento ou testes do próprio FGOS.

```bash
# Na raiz deste repositório:
bash install/local/install.sh
```
Isso instalará os agentes na pasta `.agent/` dentro do próprio repositório.

---

## 🛠️ Verificação

Após a instalação, você deve ver uma pasta `.agent/` na raiz do seu projeto com a seguinte estrutura:

```text
.agent/
├── agents/       # Agentes (Data Steward, Auditor, etc.)
├── skills/       # Habilidades (Databricks, Unity Catalog, etc.)
├── workflows/    # Fluxos de trabalho (Onboarding, Audit)
└── rules/        # Regras de compliance
```

Se estiver usando o Cursor ou VS Code, ele detectará automaticamente os agentes.

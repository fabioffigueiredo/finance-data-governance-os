# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

---

## [0.2.0] - 2026-02-18

### Adicionado
- `CHANGELOG.md` para rastreabilidade de mudanças
- `workflows/` — diretório para fluxos de governança reutilizáveis
- `rules/` — diretório para regras de compliance reutilizáveis
- `install/global/uninstall.sh` — script de desinstalação global
- `cli/` — preparação para CLI npm (`npx @fabioffigueiredo/fgos-kit init`)

### Alterado
- `install/local/install.sh` — reescrito com `set -euo pipefail`, cleanup, detecção de repo root, suporte a workflows/rules
- `install/global/install.sh` — reescrito com robustez, path padronizado `~/.ai-governance`
- `install/global/update.sh` — reescrito para chamar `install.sh` após `git pull`
- `README.md` — atualizado com estrutura correta e informações consolidadas
- `INSTALL.md` — atualizado com comandos corretos e seção de desinstalação

### Removido
- `scripts/` — duplicava `install/`, eliminada a redundância
- `README_GLOBAL.md` — redundante com `README.md`
- `docs/datacricks/` — typo corrigido, conteúdo movido para `docs/databricks/`
- `demo/` — conteúdo consolidado em `demos/`

---

## [0.1.0] - 2025-01-01

### Adicionado
- Estrutura inicial do repositório
- 10 agents em `agents/finance-governance-os/`
- 1 agent em `agents/databricks-governance/`
- 29 skills em `skills/finance-governance/`
- 5 skills em `skills/databricks/`
- Documentação base (`docs/`, `AGENTS.md`, `CLAUDE.md`, `.cursorrules`)
- Templates (`templates/databricks/`, `templates/evidence/`, etc.)
- Scripts de instalação (`install/local/`, `install/global/`)
- Demos e cenários (`demos/`)
- Site de documentação MkDocs (`docs_site/`)
- GitHub workflows (`.github/workflows/`)

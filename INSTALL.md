# Finance Data Governance OS — Installation

Framework instalável de governança de IA e dados para ambientes regulados.

Compatível com:
- Cursor
- VSCode
- Antigravity
- Codex
- Claude Code
- Windsurf

---

## Quick Install

### 1. Clone the repository

```bash
git clone https://github.com/fabioffigueiredo/finance-data-governance-os.git
cd finance-data-governance-os
```

### 2. Choose install mode

#### Local install (per project)

Cria `.agent/` no diretório atual com agents, skills, workflows e rules:

```bash
bash install/local/install.sh
```

Ou para instalar em outro projeto:

```bash
bash install/local/install.sh /caminho/para/meu-projeto
```

#### Global install (entire machine)

Instala em `~/.ai-governance/`:

```bash
bash install/global/install.sh
```

---

## Update

Atualiza o repositório e re-instala globalmente:

```bash
bash install/global/update.sh
```

---

## Uninstall

Remove a instalação global:

```bash
bash install/global/uninstall.sh
```

---

## Via npm CLI

Instale rapidamente em qualquer projeto:

```bash
npx @fabioforest/fgos-kit init
```

Ou instalar globalmente:

```bash
npm i -g @fabioforest/fgos-kit
fgos-kit init
```

---

## What gets installed

| Diretório | Conteúdo |
|-----------|----------|
| `.agent/agents/` | Agents de governança (10 core + Databricks) |
| `.agent/skills/` | Skills operacionais (29 finance + 5 Databricks) |
| `.agent/workflows/` | Fluxos de governança reutilizáveis |
| `.agent/rules/` | Regras de compliance |

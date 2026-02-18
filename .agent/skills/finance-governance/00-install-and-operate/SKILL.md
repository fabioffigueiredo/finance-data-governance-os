---
name: fg-00-install-and-operate
description: Instalar, operar e usar corretamente o kit de governança (skills + agents + evidências) em IDEs e fluxos de DS/ML/DE.
version: 1.0
---

# Objetivo
Padronizar instalação, uso e evidências (report + evidence.json). Este kit assume ambiente regulado.

# Checklist
- [ ] Ler README e adotar o fluxo recomendado (01→02→08→18→07→09→10→modelo→14/16→17).
- [ ] Configurar arquivos de instrução:
  - AGENTS.md (Codex), CLAUDE.md (Claude), .github/copilot-instructions.md (VS Code), .cursor/rules (Cursor).
- [ ] Definir local de artefatos: `artifacts/<task>/`.

# Evidências mínimas
- report.md (explica o que foi feito)
- evidence.json (request_id, dataset_hash, policy_id, approvals, timestamps)

# Constraints
- Nunca exportar dados brutos sensíveis.
- Preferir compute-to-data e métricas agregadas.


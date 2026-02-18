---
name: fg-22-evidence-pack
description: Gerar pacote de evidências padronizado (report.md + evidence.json) para auditoria/compliance em qualquer etapa do fluxo.
version: 2.0
---

# Objetivo
Criar e manter um pacote de evidências consistente para auditoria e rastreabilidade.

# Checklist
- [ ] Criar `artifacts/<task>/report.md` a partir de `templates/evidence/report.md`.
- [ ] Criar `artifacts/<task>/evidence.json` a partir de `templates/evidence/evidence.json`.
- [ ] Preencher campos mínimos: request_id, dataset_hash, policy_id, skills_applied, approvals.
- [ ] Garantir que logs e artefatos **não** contenham PII em claro.

# Output
- artifacts/<task>/report.md
- artifacts/<task>/evidence.json

# Constraints
- Proibido anexar amostras de linhas com PII em report/artefatos.


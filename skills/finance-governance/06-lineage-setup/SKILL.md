---
name: fg-06-lineage-setup
description: Registrar lineage: origem → transformações → uso → modelo → outputs (com request_id e hashes).
version: 1.0
---

# Objetivo
Lineage ponta a ponta para auditoria.

# Checklist
- [ ] Definir IDs: dataset_id, pipeline_id, model_id.
- [ ] Registrar transformações e parâmetros.
- [ ] Gerar grafo simplificado (mermaid) no report.
- [ ] Exportar evidence.json com hashes.

# Constraints
- Sem lineage: bloquear produção.


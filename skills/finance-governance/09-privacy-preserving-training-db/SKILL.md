---
name: fg-09-privacy-preserving-training-db
description: Treinar modelos com dados sensíveis em banco sem expor dados brutos (compute-to-data, views governadas, DP quando necessário).
version: 1.0
---

# Objetivo
Treinar/validar modelos sem exportar dataset bruto para fora do perímetro.

# Checklist (padrão)
- [ ] Compute-to-data: executar jobs no perímetro controlado (sem egress).
- [ ] Usar VIEW governada (Skill 18) com minimização/masking/tokenização.
- [ ] Proibir SELECT em tabelas core sem view aprovada.
- [ ] Split temporal para evitar leakage.
- [ ] Saída permitida: modelo + schema + métricas agregadas + evidências.

# Técnicas adicionais (quando risco alto)
- Differential Privacy (DP) com Opacus/TF-Privacy/OpenDP
- Dados sintéticos (com avaliação de risco/utilidade)

# Constraints
- Proibido exportar dados brutos sensíveis.
- Proibido treinar com PII direta sem justificativa e controles extras.


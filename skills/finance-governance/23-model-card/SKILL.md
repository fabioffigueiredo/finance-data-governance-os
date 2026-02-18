---
name: fg-23-model-card
description: Gerar Model Card (documento de governança do modelo) com finalidade, dados, métricas, riscos, limites, e requisitos para produção.
version: 2.0
---

# Objetivo
Gerar um Model Card antes de aprovação e produção (integra com Skill 14).

# Checklist
- [ ] Finalidade e escopo (use case, população alvo, decisões suportadas).
- [ ] Dados: fontes, período, governança (skills 01/02/18/07/06).
- [ ] Métricas: offline (AUC/KS etc.), estabilidade e validações.
- [ ] Riscos: leakage, bias, drift, privacidade (inclui DP se aplicável).
- [ ] Limites: onde não usar, hipóteses, comportamento esperado.
- [ ] Operação: frequência de re-treino, monitoramento, rollback.

# Output
- artifacts/<task>/model_card.md (template sugerido abaixo)

## Template (model_card.md)
- Summary
- Intended Use
- Data
- Training Procedure
- Metrics
- Risk Assessment
- Monitoring Plan
- Approvals

# Constraints
- Sem model card: bloquear promoção para produção.


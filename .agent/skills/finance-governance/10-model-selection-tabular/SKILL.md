---
name: fg-10-model-selection-tabular
description: Escolher modelo tabular (LogReg, Random Forest, XGBoost, LightGBM, DP) com critérios de interpretabilidade, performance e risco.
version: 1.0
---

# Objetivo
Selecionar modelo apropriado para problema tabular financeiro.

# Guia rápido
- Logistic Regression: baseline interpretável, auditoria-friendly.
- Random Forest: não-linear sem muito tuning; bom baseline.
- XGBoost/LightGBM: performance forte em tabular; exige cuidado com leakage e tuning.
- DP (Opacus/TF-Privacy): quando risco de memorization/inversão é relevante.

# Checklist
- [ ] Definir objetivo (fraude, crédito, churn etc.)
- [ ] Definir restrições (interpretabilidade, latency, privacidade)
- [ ] Escolher baseline (LogReg/RF) antes de boosting
- [ ] Registrar decisão no report


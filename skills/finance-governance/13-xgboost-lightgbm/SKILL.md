---
name: fg-13-xgboost-lightgbm
description: Treinar/validar boosting (XGBoost/LightGBM) com tuning responsável, controle de leakage, registro e produção.
version: 1.0
---

# Objetivo
Melhor performance em tabular (quando justificado).

# Checklist
- [ ] Baseline primeiro (LogReg/RF).
- [ ] Split temporal e validação por janelas.
- [ ] Controle de leakage.
- [ ] Tuning incremental (não 'grid infinito').
- [ ] Registrar dataset hash, schema, params, métricas.
- [ ] Aprovar e publicar (Skills 14/17).

# Constraints
- Sem tuning não rastreável.


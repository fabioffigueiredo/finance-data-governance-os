---
name: fg-11-logistic-regression
description: Treinar/validar/logar Regressão Logística (scikit-learn) com split temporal, calibração e evidências.
version: 1.0
---

# Objetivo
Baseline interpretável e robusto.

# Checklist
- [ ] Dados via view governada (Skill 18) e treino protegido (Skill 09).
- [ ] Pipeline: imputação + encoding + escala (se aplicável) + LogisticRegression.
- [ ] Validação: split temporal; métricas (AUC/KS/PR-AUC).
- [ ] Calibração se necessário.
- [ ] Registrar em MLflow (Skill 16) e aprovar (Skill 14).

# Constraints
- Evitar leakage (features do futuro).


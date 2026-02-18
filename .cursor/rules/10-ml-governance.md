# ML Governance Rules

- Use temporal splits for financial data; avoid leakage.
- Track dataset hash + feature schema + parameters + metrics.
- Register models and require approval before production.
- Prefer interpretable baselines first (LogReg, RF) then boost trees (XGB/LGBM) if justified.
- If privacy risk is high, use DP training patterns (Skill 09).

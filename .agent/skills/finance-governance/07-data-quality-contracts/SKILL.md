---
name: fg-07-data-quality-contracts
description: Criar contratos/testes de qualidade (Great Expectations ou equivalente) e gates para pipelines.
version: 1.0
---

# Objetivo
Evitar dados quebrados, outliers graves e schema drift.

# Checklist
- [ ] Definir expectativas: schema, ranges, null-rate, unicidade, integridade referencial.
- [ ] Rodar testes em amostras governadas (sem PII em claro).
- [ ] Bloquear pipeline se falhar.

# Ferramenta sugerida
- Great Expectations (testes de dados)

# Constraints
- Não coletar dumps de linhas sensíveis como evidência.


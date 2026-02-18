---
name: fg-01-data-classification
description: Classificar dados (público/interno/confidencial/regulado/sensível LGPD) e identificar PII e risco de reidentificação.
version: 1.0
---

# Objetivo
Classificar dataset e produzir um relatório de risco + campos sensíveis.

# Checklist
- [ ] Identificar PII (CPF, email, telefone, endereço, conta, transações, renda, biometria).
- [ ] Marcar dados sensíveis/financeiros regulados.
- [ ] Definir owner (responsável), finalidade e escopo.
- [ ] Definir retenção e minimização (colunas mínimas).
- [ ] Gerar artifacts/…/report.md + evidence.json

# Output
- Lista de campos + categoria + tratamento (remover, mascarar, tokenizar, agregar)

# Constraints
- Se não houver owner/finalidade: bloquear uso.


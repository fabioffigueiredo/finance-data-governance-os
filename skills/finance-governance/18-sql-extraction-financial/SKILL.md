---
name: fg-18-sql-extraction-financial
description: Extrair dados via SQL em bancos (Postgres/Oracle/SQL Server) usando views governadas, RLS/VPD e minimização por tipo de problema.
version: 1.0
---

# Objetivo
Criar views de treino e extrações seguras por tipo de problema (crédito, fraude, churn), evitando export de dados brutos.

# Checklist (sempre)
- [ ] Não consultar tabelas core diretamente para DS/ML: usar VIEW aprovada.
- [ ] Minimização: só features necessárias.
- [ ] Masking/tokenização para chaves de cliente/conta.
- [ ] Filtrar por janela temporal (evitar leakage).
- [ ] Auditoria de queries habilitada.

# Padrões por problema (conceitual)
- Crédito/default: snapshots por data de referência + label futuro (sem dados do futuro nas features).
- Fraude: transação + features de velocidade (janelas) + cuidado com atraso de rótulo.
- Churn: RFM e uso de produtos, com janelas bem definidas.

# Output
- View(s) governadas + report com justificativa e campos.

# Constraints
- Nunca exportar dataset bruto para fora do perímetro.


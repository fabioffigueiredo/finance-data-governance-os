---
name: fg-25-powerbi-reporting
description: Planejar e produzir relatórios/dashboards em Power BI com boas práticas de storytelling e governança (sem expor dados sensíveis).
version: 3.0
---

# Quando usar
- Diretores/gestores precisam de dashboards governados e interativos.

# Checklist
- [ ] Definir KPIs e perguntas por página.
- [ ] Modelagem: tabelas agregadas e medidas (evitar granularidade sensível).
- [ ] Segurança: RLS (Row-Level Security), grupos, publicação controlada.
- [ ] Visual: minimalismo, hierarquia e texto explicativo.
- [ ] Export: permitir apenas o necessário; controlar compartilhamento.

# Entregáveis
- artifacts/<task>/powerbi_spec.md (páginas, KPIs, filtros, RLS)
- artifacts/<task>/dataset_contract.md (camadas e tabelas)

# Constraints
- Não usar dataset com PII direta em relatórios para público amplo.


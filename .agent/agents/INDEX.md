# Agents Index

Agents são papéis operacionais que usam skills para executar governança.

## Core
- Governance Orchestrator: orquestra o fluxo end-to-end
- LGPD Compliance Agent: base legal, minimização, retenção
- BACEN Cyber Risk Agent: controles e evidência de segurança
- CVM Controls Agent: trilha e controles regulatórios
- Data Catalog & Lineage Agent: catálogo, glossário, lineage
- Data Quality Agent: contratos e validações
- Access Control & Audit Agent: RBAC/ABAC, logs e auditoria
- ML Governance Agent: seleção/treino/validação/go-live
- Privacy Engineer Agent: tokenização, DP quando aplicável
- Presentation Agent: storytelling e especificação BI (somente agregados)

## Interação (alto nível)
1) Orchestrator chama LGPD/BACEN/CVM
2) Data Catalog/Quality prepara “views governadas”
3) ML Governance treina com compute-to-data
4) Audit gera evidence packs e model cards
5) Presentation gera spec de dashboards/roteiro

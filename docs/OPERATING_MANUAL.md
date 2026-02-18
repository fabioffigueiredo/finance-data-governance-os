# Finance Data Governance OS — Operating Manual

## Princípio central
Em ambiente financeiro, **dados não viajam**.  
O compute vai até o dado. Saem apenas:
- métricas agregadas
- modelos/artefatos
- evidências auditáveis

## Fluxo padrão (end-to-end)
1) Classificação & escopo (Skill 01)
2) Base legal LGPD + minimização (Skill 02)
3) Acesso mínimo + auditoria (Skill 08)
4) Views governadas para treino (Skill 18)
5) Qualidade + lineage (Skills 07 e 06)
6) Treino protegido (Skill 09)
7) Seleção do modelo (Skill 10) → LogReg/RF (11/12)
8) Evidências + Model Card (Skills 22 e 23)
9) Gates de aprovação (Skill 14)
10) Produção + monitoramento (Skill 17)
11) Storytelling/BI seguro (Skills 24–28)

## Evidências obrigatórias
Para cada etapa crítica, gerar:
- `report.md`
- `evidence.json`
Sem PII, sem amostras linha-a-linha.

## Padrão de saída (safe outputs)
✅ permitido:
- métricas (AUC, KS, PR-AUC, drift)
- contagens agregadas
- gráficos agregados
- model card
- checklist assinado/aprovado

❌ proibido:
- exportar dataset bruto
- logs com PII
- prints com informação sensível

## Como usar no dia a dia (exemplo: crédito)
- gerar view governada com cutoff por data de referência
- treinar baseline (LogReg) + modelo não-linear (RF)
- comparar métricas e estabilidade
- gerar evidence pack + model card
- só então solicitar aprovação para produção

## Como apresentar (executivo vs técnico)
Executivo:
- 1 slide: contexto + risco + impacto
- 1 slide: métrica principal + comparativo baseline
- 1 slide: recomendação + riscos/limitações

Técnico:
- dados: lineage + qualidade
- ML: validação + drift + monitoramento
- auditoria: evidence pack

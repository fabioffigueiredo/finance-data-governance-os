# Fluxo recomendado (end-to-end)

Sequência padrão para projetos em banco:

1. **Classificação & escopo** — Skill 01  
2. **Base legal LGPD** — Skill 02  
3. **Acessos (RBAC/ABAC) + auditoria** — Skill 08  
4. **SQL governado: views de treino** — Skill 18  
5. **Qualidade + lineage** — Skills 07 e 06  
6. **Treino protegido** — Skill 09  
7. **Escolha do modelo** — Skill 10 → (11/12/13)  
8. **Evidências & Model Card** — Skills 22 e 23  
9. **Registro/aprovação** — Skill 14 + MLflow (Skill 16)  
10. **Produção** — Skill 17 (canary/rollback)  
11. **Apresentação (BI/storytelling)** — Skills 24–28

## Por que essa ordem?
Ela reduz risco de:
- uso sem base legal
- vazamento de dados
- leakage (features do futuro)
- falta de rastreabilidade (auditoria)

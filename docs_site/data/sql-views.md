# Views governadas para DS/ML

A regra: **DS/ML não lê tabela core**. Só lê **VIEW aprovada**.

## Padrão
- minimização (só features necessárias)
- masking/tokenização de chaves
- filtros de janela (ref_date + cutoff)
- auditoria de query habilitada

Veja `templates/sql/build_training_view_template.sql`.

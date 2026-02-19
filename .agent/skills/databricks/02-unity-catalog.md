# Unity Catalog Governance

## Objective
Garantir controle total sobre dados no lakehouse.

## Rules
- Cada domínio → 1 catalog
- Schema por projeto
- Tabelas sensíveis com masking
- Grants mínimos

## Example
GRANT SELECT ON TABLE risk.credit_features TO data_science_role;

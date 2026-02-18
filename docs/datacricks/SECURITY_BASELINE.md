# Databricks Security Baseline (Financial Environment)

## Identity
- SSO obrigatório
- MFA obrigatório
- Service principals para jobs

## Network
- Private endpoints
- Sem public access quando possível

## Data
- Unity Catalog obrigatório
- RBAC mínimo necessário
- Masking para dados sensíveis

## ML
- MLflow obrigatório
- Model registry governado
- Evidence pack obrigatório

## Proibições
- export dataset bruto
- credenciais em notebook
- acesso admin irrestrito

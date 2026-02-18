# Governed Databricks Workspace Setup

## Objective
Criar workspace Databricks seguro para ambiente financeiro.

## Checklist

### Identity
- SSO obrigatório
- MFA obrigatório
- Service principals para jobs
- Sem uso de usuários pessoais em produção

### Secrets
- Databricks Secrets ou Key Vault
- Nunca credenciais em notebooks

### Network
- Private endpoints
- Sem acesso público quando possível
- Logging habilitado

### Environments
- dev
- staging
- prod
nunca misturar

## Output
Checklist de conformidade preenchida

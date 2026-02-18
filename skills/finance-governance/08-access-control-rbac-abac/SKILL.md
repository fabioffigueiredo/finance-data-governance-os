---
name: fg-08-access-control-rbac-abac
description: Definir RBAC/ABAC e auditoria: perfis (viewer/operator/admin), deny-by-default, break-glass com expiração.
version: 1.0
---

# Objetivo
Garantir acesso mínimo necessário + trilha.

# Checklist
- [ ] Definir perfis: viewer / operator / admin.
- [ ] Deny-by-default para dados regulados.
- [ ] Break-glass: duração curta, justificativa, alertas, expiração.
- [ ] Auditoria: quem acessou o quê, quando, por quê.

# Constraints
- Sem MFA e sem logs: bloquear.


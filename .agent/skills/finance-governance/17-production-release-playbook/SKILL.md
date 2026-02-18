---
name: fg-17-production-release-playbook
description: Colocar modelo em produção em ambiente financeiro: gates, segurança, rollback, monitoramento e incident response.
version: 1.0
---

# Objetivo
Deploy seguro e auditável.

# Checklist
- [ ] Gate: aprovação (14) + observabilidade (16).
- [ ] Deploy: blue/green ou canary.
- [ ] Monitorar drift/performance e alertas.
- [ ] Rollback automático se degradação.

# Constraints
- Sem plano de rollback: bloquear deploy.


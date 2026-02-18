---
name: fg-03-bacen-cyber-controls
description: Aplicar controles de segurança e risco operacional/cibernético (ambientes segregados, logs, acesso mínimo, incident response).
version: 1.0
---

# Objetivo
Garantir controles de segurança e trilha de auditoria compatíveis com ambiente financeiro.

# Checklist
- [ ] Ambiente segregado (rede/contas) para DS/ML.
- [ ] Controle de acesso (RBAC/ABAC) e MFA.
- [ ] Logs/auditoria de queries e jobs.
- [ ] Gestão de terceiros (se houver) e regras de egress.
- [ ] Plano de incidentes (contato, severidade, evidências).

# Constraints
- Sem logs e sem controle de acesso forte: bloquear.


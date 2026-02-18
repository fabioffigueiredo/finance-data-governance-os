---
name: fg-28-web-portal-google-charts
description: Desenhar um portal web simples com gráficos (Google Charts) usando somente dados agregados e com controle de acesso.
version: 3.0
---

# Quando usar
- Portal interno/externo leve, com gráficos incorporados.

# Checklist
- [ ] Definir API de dados agregados (sem granularidade sensível).
- [ ] Cache e rate limit.
- [ ] Autorização e auditoria.
- [ ] Render com Google Charts e textos explicativos.

# Entregáveis
- artifacts/<task>/web_portal_spec.md (rotas, gráficos, datasets agregados)

# Constraints
- Nunca expor endpoints que retornem dados sensíveis linha-a-linha.


---
name: fg-04-cvm-controls-check
description: Aplicar controles internos para dados de mercado/investidores: integridade, versionamento, reprodutibilidade e evidências.
version: 1.0
---

# Objetivo
Evitar inconsistência, manipulação indevida e falta de reprodutibilidade.

# Checklist
- [ ] Versionar datasets e transformações (hash + lineage).
- [ ] Reprodutibilidade: parâmetros, seeds, splits, data cut-off.
- [ ] Integridade: validações e quality gates.
- [ ] Evidências: pacote executivo e técnico.

# Constraints
- Sem reprodutibilidade e trilha: bloquear produção.


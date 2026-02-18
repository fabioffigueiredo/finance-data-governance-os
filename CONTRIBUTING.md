# Contribuindo

Obrigado por contribuir com o **Finance Data Governance OS**.

## Regras fundamentais
- **Nunca** inclua dados reais, PII, credenciais, endpoints internos, prints ou logs sensíveis.
- Use exemplos **sintéticos** e templates.
- Prefira mudanças pequenas e revisáveis.

## Onde alterar
Este repositório é híbrido:
- `.agent/` = runtime para IDEs (Cursor/Antigravity/Codex/VSCode)
- `skills/` e `agents/` = biblioteca open-source “humana” (referência global)

Se você editar uma skill/agent em um lado, mantenha o outro consistente.

## Padrão de Skills
Cada `SKILL.md` deve conter:
- Objective
- When to use
- Inputs required
- Step-by-step
- Outputs generated
- Risks & controls
- Example usage

## Padrão de Agents
Cada `AGENT.md` deve conter:
- Role
- Responsibilities
- When activated
- Inputs
- Outputs
- Interaction with other agents

## Fluxo de PR
1. Crie uma branch: `feat/<nome>` ou `fix/<nome>`
2. Commits claros
3. Abra PR descrevendo: problema, solução e impacto

## Segurança
Vulnerabilidades: veja `SECURITY.md`.

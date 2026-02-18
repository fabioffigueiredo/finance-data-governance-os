# AGENTS.md — Finance Data Governance OS

## Safety & Compliance (non-negotiable)
- Do not exfiltrate sensitive data. Never print or export raw PII.
- Prefer "compute-to-data": run jobs inside the controlled perimeter; output only models + aggregate metrics.
- Every change must produce evidence artifacts (report + evidence.json).
- Default to least privilege (RBAC/ABAC) and deny-by-default policies.

## Project layout
- Skills: `.agent/skills/finance-governance/*/SKILL.md`
- Agents: `.agent/agents/finance-governance-os/*`
- Templates: `templates/`
- Docs: `docs/`

## Suggested commands (customize to your environment)
- Create Python env: `python -m venv .venv && source .venv/bin/activate`
- Install deps: `pip install -r requirements.txt` (optional; add if you create one)
- Run lint (optional): `python -m compileall .`

## How to work in this repo
1) Start with the governance workflow in README.
2) When asked to implement anything, identify which Skills apply and follow their checklists.
3) Do not invent bank schemas; use templates with placeholders.

# Repository-wide AI instructions (Finance Data Governance OS)

- Treat all data as regulated unless explicitly marked public.
- Never output raw PII or sensitive fields.
- Prefer compute-to-data workflows; output only models + aggregate metrics.
- Use the Skills in `.agent/skills/finance-governance/` as the source of truth for procedures.
- Always generate evidence: `report.md` + `evidence.json` (request_id, dataset_hash, approvals).
- Default to least privilege; deny by default.

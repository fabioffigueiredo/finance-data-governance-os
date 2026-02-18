# Core Rules (Finance Data Governance OS)

1) Assume data is regulated. Do not print or export raw PII.
2) Prefer compute-to-data: jobs run inside controlled perimeter.
3) Use Skills checklists. If unsure, propose the right skill(s) before acting.
4) Produce evidence artifacts for significant changes:
   - artifacts/<task>/report.md
   - artifacts/<task>/evidence.json
5) Default to least privilege (RBAC/ABAC). Deny by default.

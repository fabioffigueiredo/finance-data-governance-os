# Finance Data Governance OS

Operating System for AI & Data Governance in Financial Institutions.

A practical framework for building audit-ready, compliant and production-safe data science and machine learning workflows in regulated environments (LGPD, BACEN, CVM aligned).

---

## Why this exists

Financial institutions are rapidly adopting AI and advanced analytics, but most environments still lack:

- clear AI governance workflows  
- audit-ready ML pipelines  
- controlled data access for training  
- reproducible and explainable models  
- safe storytelling and reporting practices  

This repository provides a structured operating model for governing data, analytics and machine learning in regulated environments.

---

## Core Principles

**1. Data never travels unnecessarily**  
Compute must go to the data. Outputs must be aggregated, controlled and auditable.

**2. Governance by design**  
Compliance and auditability are embedded into the workflow, not added later.

**3. Evidence-first pipelines**  
Every critical step produces structured evidence for audit and traceability.

**4. Reproducible and explainable ML**  
Models must be transparent, documented and defensible.

**5. Secure storytelling**  
Dashboards and reports must never expose sensitive data.

---

## What this repository provides

- AI & Data Governance operational framework  
- Multi-agent governance structure  
- Reusable skills for regulated ML workflows  
- Evidence and audit templates  
- SQL patterns for governed datasets  
- Model validation and approval flows  
- Safe BI and storytelling patterns  

Designed for:
- banks  
- asset managers  
- fintechs  
- regulated analytics environments  

---

## Governance Workflow (High Level)

1. Data classification and sensitivity mapping  
2. Legal basis and compliance validation (LGPD/BACEN/CVM)  
3. Access control and audit logging  
4. Governed dataset creation (SQL views)  
5. Data quality and lineage validation  
6. Protected model training (compute-to-data)  
7. Model selection and validation  
8. Evidence generation and model card  
9. Approval and production deployment  
10. Monitoring and safe reporting  

---

## Repository Structure

```
agents/       → governance and ML agents (10 core + Databricks)
skills/       → operational governance skills (29 finance + 5 Databricks)
workflows/    → reusable governance workflows
rules/        → compliance and governance rules
docs/         → operating manuals, architecture docs
templates/    → evidence, policy and report templates
demos/        → synthetic examples and use cases
install/      → shell installers (local & global)
cli/          → npm CLI installer (npx @fabioforest/fgos-kit init)
docs_site/    → MkDocs documentation site
.agent/       → IDE runtime (Cursor, VSCode, Codex, Antigravity)
```

---

## Quick Install

### Local (per project)
```bash
git clone https://github.com/fabioffigueiredo/finance-data-governance-os.git
cd finance-data-governance-os
bash install/local/install.sh
```

### Global (entire machine)
```bash
git clone https://github.com/fabioffigueiredo/finance-data-governance-os.git
cd finance-data-governance-os
bash install/global/install.sh
```

### Via npm CLI
```bash
npx @fabioforest/fgos-kit init
```

See [INSTALL.md](INSTALL.md) for full installation details.

---

## Example Use Cases

- Credit risk modeling with audit-ready pipelines  
- Fraud detection governance  
- Customer analytics under LGPD constraints  
- Model validation and regulatory reporting  
- Executive dashboards without sensitive data exposure  

---

## Who is this for

Data scientists, ML engineers, data engineers and technical leaders working in regulated environments who need structured and defensible AI workflows.

---

## Roadmap

v1 — Governance OS (current)  
v2 — MCP Server + Advanced ML governance modules  
v3 — Enterprise governance platform (future direction)

---

## 🛡️ Safety & Reliability

The installer is **enterprise-grade safe**:
*   **Dry-run**: `npx @fabioforest/fgos-kit init --dry-run` (simulate without changes)
*   **Audit Logs**: detailed execution logs saved to `.agent/_audit/`
*   **Auto-backup**: overwrites automatically create backups (e.g., `.agent.bak-2024...`)
*   **Safe-by-default**: never overwrites without `--overwrite` flag

See [Safety Policy](docs/INSTALL_SAFETY.md) for details.

## Author

Fabio Ferreira Figueiredo  
AI, Data & Infrastructure Engineer  
Focus: AI governance, data platforms and regulated environments

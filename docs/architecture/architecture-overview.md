# Architecture Overview

```mermaid
flowchart LR
  subgraph Perimeter["Banco/Perímetro Controlado (sem egress)"]
    DB[(Core DB / DW / Lakehouse)]
    Views[[Views Governadas]]
    Train[Compute-to-Data: Job de Treino]
    Registry[(Model Registry)]
    Audit[(Audit Logs)]
  end

  IDE["IDE Agent (Cursor/Codex/Antigravity/VS Code)"] -->|aplica skills| Orchestrator["Governance Orchestrator"]
  Orchestrator --> Views
  Views --> Train
  Train --> Registry
  Orchestrator --> Audit
  DB --> Views

  subgraph Prod["Produção"]
    Serving[Model Serving]
    Monitor[Monitoring/Drift]
  end
  Registry --> Serving
  Serving --> Monitor
  Monitor --> Audit
```

## Key Principles
- **Compute-to-Data**: dados não saem do perímetro; saem apenas modelos e métricas agregadas.
- **Deny-by-default**: RBAC/ABAC e acesso mínimo.
- **Evidence-first**: toda ação gera `report.md` + `evidence.json`.

# Security Model (High Level)

```mermaid
flowchart TB
  subgraph Controls
    RBAC[RBAC/ABAC]
    MFA[MFA]
    Logs[Immutable Audit Logs]
    Egress[No/Restricted Egress]
    Mask[Masking/Tokenization]
    DP[Differential Privacy (optional)]
  end

  User --> RBAC --> Views
  Views --> Mask --> Train
  Train --> Logs
  Train --> DP --> Registry
  Egress --> Train
```

## Notes
- Prefer **views** + **row-level security** (where available) over direct table access.
- Never store raw PII in logs or artifacts.

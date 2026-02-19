# Workflows

Diretório para fluxos de governança reutilizáveis.

## Finalidade

Workflows são sequências de passos padronizados que combinam múltiplos agents e skills para executar processos completos de governança.

## Exemplos de workflows futuros

- **credit-risk-pipeline**: fluxo end-to-end de modelagem de risco de crédito com governança embarcada
- **data-onboarding**: classificação → base legal → catalogação → quality check
- **model-approval**: validação → evidence pack → model card → gate de aprovação
- **incident-response**: detecção → triage → evidência → comunicação regulatória

## Formato

Cada workflow deve ser uma pasta com:

```
workflows/
  nome-do-workflow/
    WORKFLOW.md      # Descrição, passos, pré-requisitos
    config.yaml      # Configurações opcionais
```

> Os scripts de instalação (`install/`) copiam automaticamente esta pasta para `.agent/workflows/` quando presente.

# Rules

Diretório para regras de compliance e governança reutilizáveis.

## Finalidade

Rules são diretrizes e políticas codificadas que agents e skills devem seguir ao operar em ambientes financeiros regulados.

## Exemplos de rules futuros

- **lgpd-data-handling**: regras de minimização, retenção e anonimização de dados pessoais
- **bacen-security-baseline**: controles mínimos de segurança para instituições reguladas pelo BACEN
- **safe-output-policy**: política de saídas seguras (somente métricas agregadas, sem PII)
- **model-deployment-gates**: critérios mínimos para deploy de modelos em produção

## Formato

Cada rule deve ser um arquivo markdown ou YAML:

```
rules/
  nome-da-rule.md      # Markdown com descrição e checklist
  nome-da-rule.yaml    # Ou YAML com regras programáticas
```

> Os scripts de instalação (`install/`) copiam automaticamente esta pasta para `.agent/rules/` quando presente.

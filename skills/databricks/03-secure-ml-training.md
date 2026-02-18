# Secure ML Training (Databricks)

## Objective
Treinar modelos sem expor dados sensíveis.

## Rules
- Nunca exportar dataset
- Treinar dentro do lakehouse
- Apenas features agregadas
- Logs sem PII

## Pipeline
1. SQL view governada
2. Feature table
3. Training notebook
4. MLflow tracking

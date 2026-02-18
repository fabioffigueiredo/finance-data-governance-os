# Finance Data Governance OS (LGPD + BACEN + CVM) — Agents, Skills, Rules, Workflows

Este repositório é um **kit pronto** (estrutura + playbooks) para governança de dados no mercado financeiro, cobrindo:
- LGPD (privacidade e dados pessoais)
- Controles de segurança e risco (Bacen) e controles internos (CVM)
- DCAM e DMBOK como referência de maturidade/operating model
- Fluxo completo para **Data Science / Analytics / Data Eng / ML** com **auditoria, lineage, políticas e privacidade**

> ⚠️ Uso responsável: este kit é para **ambientes autorizados** (dados e sistemas sob responsabilidade legítima).
> Ele foi desenhado para reduzir risco de exposição de dados: compute perto do dado, minimização, auditoria, RBAC e evidências.

---

## 1) Estrutura do projeto

## Novidades da versão 2
- `docs/architecture/` com diagramas Mermaid (arquitetura, fluxo de dados, ciclo ML, segurança)
- `demo/` com cenários **sintéticos** (crédito, fraude, churn)
- `templates/evidence/` com `report.md` e `evidence.json`
- Skills novas: `22-evidence-pack` e `23-model-card`


- `.agent/skills/finance-governance/` — Skills (Antigravity-style; pasta + `SKILL.md`)
- `.agent/agents/finance-governance-os/` — Agents (especificações e responsabilidades)
- `AGENTS.md` — Instruções para **OpenAI Codex / Codex CLI**
- `CLAUDE.md` — Instruções para **Claude Code**
- `.github/copilot-instructions.md` — Instruções para **GitHub Copilot (VS Code)**
- `.cursor/rules/` e `.cursorrules` — Regras para **Cursor**
- `.github/workflows/ci.yml` — Workflow (lint/links/checks básicos)

---

## 2) Instalação por IDE (passo a passo didático)

### A) Google Antigravity
1. Abra este repositório no Antigravity.
2. As skills estão em `.agent/skills/finance-governance/`.
3. No chat do agent, peça por nome:
   - “Aplique a skill `finance-governance/01-data-classification` neste dataset/projeto”
4. Mantenha o padrão: **01 → 02 → 08 → 18 → 07 → 09 → 10 → (11/12/13) → 14/16 → 17**.

### B) Cursor
1. Abra este repositório no Cursor.
2. Regras já estão em:
   - `.cursor/rules/*.md` (recomendado)
   - e `.cursorrules` (compatibilidade/alternativa)
3. Use o chat do Cursor normalmente. As regras são carregadas automaticamente pelo Cursor.

### C) VS Code + GitHub Copilot
1. Abra no VS Code.
2. Garanta que existe `.github/copilot-instructions.md` (já incluído).
3. O Copilot usa essas instruções automaticamente no chat e geração.

### D) OpenAI Codex / Codex CLI
1. Abra o repo no Codex/Codex CLI.
2. O arquivo `AGENTS.md` está na raiz com:
   - comandos de setup
   - convenções
   - políticas de segurança (não exfiltrar dados)
3. No Codex, peça: “Use os runbooks/skills deste repo para <tarefa>”.

### E) Claude Code
1. Abra no diretório do repo.
2. O `CLAUDE.md` (raiz) dá contexto permanente.
3. Use os nomes das skills em prompts.

> Outros editores: se suportarem “instruction files”, a regra é simples:
> aponte o agente/IDE para ler o README + `AGENTS.md` + `CLAUDE.md` + `docs/OPERATIONS.md`.

---

## 3) Como usar (workflow recomendado)

### 3.1 Iniciar um projeto novo (Analytics/DS/ML)
1. **Classificação e base legal**
   - `01-data-classification`
   - `02-lgpd-legal-basis-check`
2. **Controles e acessos**
   - `08-access-control-rbac-abac`
   - `03-bacen-cyber-controls`
   - `04-cvm-controls-check`
3. **Dados**
   - `18-sql-extraction-financial` (criar views governadas)
   - `07-data-quality-contracts` (testes/contratos)
   - `06-lineage-setup` (linhagem)
4. **Treino protegido**
   - `09-privacy-preserving-training-db`
   - `10-model-selection-tabular` → escolher modelo
   - `11-logistic-regression` ou `12-random-forest` ou `13-xgboost-lightgbm`
5. **Produção**
   - `14-ml-registry-approval`
   - `16-observability-mlflow`
   - `17-production-release-playbook`
6. **Evidências e apresentação**
   - `19-executive-presentation-pack`
   - `20-dcam-assessment`
   - `21-dmbok-operating-model`

---

## 4) O que este kit NÃO faz
- Não fornece queries reais do seu banco (use os templates com placeholders).
- Não incentiva exportar dados sensíveis para fora do perímetro.
- Não tenta “burlar” LGPD/Bacen/CVM. Ele faz o oposto.

---

## 5) Próximos passos (customização rápida)
1. Edite `templates/policies/*.md` para refletir seu banco/fintech.
2. Ajuste `docs/THREAT_MODEL.md` e `docs/OPERATIONS.md`.
3. Adapte `templates/sql/*.sql` para o seu schema real (mantendo minimização/masking).
4. Se quiser, crie um “project overlay”:
   - `.agent/skills/finance-governance/ZZ-your-bank-overrides/`

---

## 6) Licença
Use a licença que preferir (MIT/Apache-2.0). Este kit vem sem licença por padrão: adicione a sua antes de publicar.

Criado em: 2026-02-18


## Documentação (GitHub Pages com MkDocs)
Este repo inclui um site MkDocs pronto.

### Como rodar localmente
```bash
pip install -r requirements-docs.txt
mkdocs serve
```

### Como publicar no GitHub Pages
1. Suba o repo no GitHub (branch `main`).
2. Vá em **Settings → Pages** e selecione **GitHub Actions**.
3. O workflow `.github/workflows/docs.yml` fará build/deploy automático.

> O tema usado é Material for MkDocs (9.7.1). citeturn0search2turn0search3

## Storytelling & BI (novas skills)
- 24-storytelling-narrative
- 25-powerbi-reporting
- 26-metabase-dashboard
- 27-looker-studio-dashboard
- 28-web-portal-google-charts

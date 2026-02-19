#!/usr/bin/env bash
# install/local/install.sh — Instala o Finance Data Governance OS localmente no projeto
# Cria .agent/ com agents, skills, workflows e rules copiados do repositório
set -euo pipefail

# Detecta a raiz do repositório ANTES de trocar de diretório
# (o script está em install/local/, então a raiz é dois níveis acima)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Diretório alvo (default: diretório atual de onde o script foi chamado)
TARGET="${1:-.}"
cd "$TARGET"

echo "📦 Installing Finance Data Governance OS locally into: $(pwd)"

# Cria diretório .agent se não existir
mkdir -p .agent

# Remove versões anteriores para garantir atualização limpa
rm -rf .agent/agents .agent/skills .agent/workflows .agent/rules 2>/dev/null || true

# Copia agents e skills (obrigatórios)
cp -r "$REPO_ROOT/agents" .agent/agents
cp -r "$REPO_ROOT/skills" .agent/skills

# Copia workflows e rules (opcionais, se existirem)
[ -d "$REPO_ROOT/workflows" ] && cp -r "$REPO_ROOT/workflows" .agent/workflows || true
[ -d "$REPO_ROOT/rules" ] && cp -r "$REPO_ROOT/rules" .agent/rules || true

echo "✅ Done. .agent/ ready at $(pwd)/.agent"
echo ""
echo "Contents:"
ls -1 .agent/

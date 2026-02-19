#!/usr/bin/env bash
# install/global/install.sh — Instala o Finance Data Governance OS globalmente
# Copia agents, skills, workflows e rules para ~/.ai-governance
set -euo pipefail

BASE="${HOME}/.ai-governance"

echo "📦 Installing Finance Data Governance OS globally into: ${BASE}"

# Cria diretório base se não existir
mkdir -p "$BASE"

# Remove versões anteriores para garantir atualização limpa
rm -rf "$BASE/agents" "$BASE/skills" "$BASE/workflows" "$BASE/rules" 2>/dev/null || true

# Detecta a raiz do repositório (onde este script está localizado)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Copia agents e skills (obrigatórios)
cp -r "$REPO_ROOT/agents" "$BASE/agents"
cp -r "$REPO_ROOT/skills" "$BASE/skills"

# Copia workflows e rules (opcionais, se existirem)
[ -d "$REPO_ROOT/workflows" ] && cp -r "$REPO_ROOT/workflows" "$BASE/workflows" || true
[ -d "$REPO_ROOT/rules" ] && cp -r "$REPO_ROOT/rules" "$BASE/rules" || true

# Copia templates e docs (referência)
[ -d "$REPO_ROOT/templates" ] && cp -r "$REPO_ROOT/templates" "$BASE/templates" || true
[ -d "$REPO_ROOT/docs" ] && cp -r "$REPO_ROOT/docs" "$BASE/docs" || true

echo "✅ Installed in ${BASE}"
echo ""
echo "Contents:"
ls -1 "$BASE"
echo ""
echo "💡 Tip: use 'bash install/local/install.sh' inside each project to create .agent/"

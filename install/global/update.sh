#!/usr/bin/env bash
# install/global/update.sh — Atualiza o Finance Data Governance OS global
# Faz git pull e re-executa o install global
set -euo pipefail

# Detecta a raiz do repositório (onde este script está localizado)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo "🔄 Updating Finance Data Governance OS..."

cd "$REPO_ROOT"
git pull

echo ""
echo "🔄 Re-installing global library..."
bash "$SCRIPT_DIR/install.sh"

echo ""
echo "✅ Update complete."

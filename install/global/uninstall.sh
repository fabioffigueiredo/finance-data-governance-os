#!/usr/bin/env bash
# install/global/uninstall.sh — Remove a instalação global do Finance Data Governance OS
set -euo pipefail

BASE="${HOME}/.ai-governance"

if [ -d "$BASE" ]; then
  echo "🗑️  Removing: ${BASE}"
  rm -rf "$BASE"
  echo "✅ Uninstalled successfully."
else
  echo "ℹ️  Nothing to remove. ${BASE} does not exist."
fi

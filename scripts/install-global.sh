#!/bin/bash

echo "Installing Finance Governance OS globally..."

BASE_DIR="$HOME/.ai-governance-os"

mkdir -p $BASE_DIR

git clone https://github.com/fabioffigueiredo/finance-data-governance-os.git $BASE_DIR 2>/dev/null || true

cp -r $BASE_DIR/agents $HOME/.ai-governance-os/
cp -r $BASE_DIR/skills $HOME/.ai-governance-os/
cp -r $BASE_DIR/.agent $HOME/.ai-governance-os/

echo "Global install complete."
echo "Location: ~/.ai-governance-os"

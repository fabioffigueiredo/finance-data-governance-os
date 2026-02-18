#!/bin/bash

echo "Updating Governance OS..."

git pull

BASE="$HOME/.ai-governance"

cp -r agents $BASE/ 2>/dev/null || true
cp -r skills $BASE/ 2>/dev/null || true
cp -r templates $BASE/ 2>/dev/null || true

echo "Updated."

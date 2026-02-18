#!/bin/bash

echo "Installing Finance Governance OS globally..."

BASE="$HOME/.ai-governance"

mkdir -p $BASE

cp -r agents $BASE/
cp -r skills $BASE/
cp -r templates $BASE/ 2>/dev/null || true
cp -r docs $BASE/ 2>/dev/null || true

echo "Installed in $BASE"

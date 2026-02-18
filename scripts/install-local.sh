#!/bin/bash

echo "Installing locally in project..."

PROJECT_DIR=$(pwd)

mkdir -p $PROJECT_DIR/.agent
mkdir -p $PROJECT_DIR/.governance

git clone https://github.com/fabioffigueiredo/finance-data-governance-os.git /tmp/govos 2>/dev/null || true

cp -r /tmp/govos/.agent/* $PROJECT_DIR/.agent/
cp -r /tmp/govos/agents $PROJECT_DIR/.governance/
cp -r /tmp/govos/skills $PROJECT_DIR/.governance/

echo "Local install complete."

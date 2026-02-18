#!/bin/bash

echo "Updating Governance OS..."

BASE_DIR="$HOME/.ai-governance-os"

cd $BASE_DIR
git pull

echo "Updated."

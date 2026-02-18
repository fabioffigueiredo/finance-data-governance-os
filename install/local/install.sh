#!/bin/bash

echo "Installing locally..."

mkdir -p .agent
mkdir -p .project

cp -r agents .agent/
cp -r skills .agent/

echo "Local install done."

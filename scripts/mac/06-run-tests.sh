#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

echo "==> Testes do backend"
cd "$ROOT_DIR/backend"
npm install
npm test

echo ""
echo "==> Testes de lógica do frontend (perceptualHash, etc.)"
cd "$ROOT_DIR/frontend"
npm install
npx jest src/__tests__

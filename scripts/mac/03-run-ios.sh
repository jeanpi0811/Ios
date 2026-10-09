#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
NATIVE_DIR="$ROOT_DIR/CleanOSProNative"

if [ ! -d "$NATIVE_DIR" ]; then
  echo "Projeto nativo não encontrado. Rode primeiro: ./scripts/mac/01-generate-native-project.sh"
  exit 1
fi

cd "$NATIVE_DIR"
npx react-native run-ios

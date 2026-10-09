#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
NATIVE_DIR="$ROOT_DIR/CleanOSProNative"

if [ ! -d "$NATIVE_DIR" ]; then
  echo "Projeto nativo não encontrado. Rode primeiro: ./scripts/mac/01-generate-native-project.sh"
  exit 1
fi

echo "Isso requer uma conta Apple Developer já configurada no Xcode (Signing & Capabilities)."
cd "$NATIVE_DIR/ios"

xcodebuild -workspace CleanOSProNative.xcworkspace \
  -scheme CleanOSProNative \
  -configuration Release \
  -archivePath build/CleanOSProNative.xcarchive \
  archive

echo ""
echo "Archive gerado em: $NATIVE_DIR/ios/build/CleanOSProNative.xcarchive"
echo "Abra o Xcode > Window > Organizer para validar e enviar à App Store."

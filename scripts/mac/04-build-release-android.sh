#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
NATIVE_DIR="$ROOT_DIR/CleanOSProNative"

if [ ! -d "$NATIVE_DIR" ]; then
  echo "Projeto nativo não encontrado. Rode primeiro: ./scripts/mac/01-generate-native-project.sh"
  exit 1
fi

cat <<'EOM'
ATENÇÃO: antes de gerar o release, configure sua keystore de assinatura em
CleanOSProNative/android/app/build.gradle (signingConfigs), ou o APK/AAB
gerado não poderá ser publicado na Play Store.
EOM

cd "$NATIVE_DIR/android"
./gradlew bundleRelease

echo ""
echo "AAB (para a Play Store) gerado em:"
echo "  $NATIVE_DIR/android/app/build/outputs/bundle/release/app-release.aab"

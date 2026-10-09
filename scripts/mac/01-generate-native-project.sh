#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
FRONTEND_SRC="$ROOT_DIR/frontend"
NATIVE_DIR="$ROOT_DIR/CleanOSProNative"
RN_VERSION="0.75.4"

if [ -d "$NATIVE_DIR" ]; then
  echo "Já existe $NATIVE_DIR — apague a pasta antes de rodar de novo:"
  echo "  rm -rf \"$NATIVE_DIR\""
  exit 1
fi

echo "==> Gerando projeto nativo com react-native init (isso gera android/ e ios/)..."
cd "$ROOT_DIR"
npx react-native@"$RN_VERSION" init CleanOSProNative --template react-native-template-typescript

echo "==> Copiando o código-fonte do CleanOS Pro para dentro do projeto nativo..."
rm -rf "$NATIVE_DIR/src"
cp -R "$FRONTEND_SRC/src" "$NATIVE_DIR/src"
cp "$FRONTEND_SRC/App.tsx" "$NATIVE_DIR/App.tsx"
cp "$FRONTEND_SRC/tsconfig.json" "$NATIVE_DIR/tsconfig.json"

echo "==> Mesclando dependências do package.json..."
python3 "$ROOT_DIR/scripts/mac/merge_package_json.py" "$FRONTEND_SRC/package.json" "$NATIVE_DIR/package.json"

echo "==> Instalando dependências npm..."
cd "$NATIVE_DIR"
npm install

echo "==> Instalando pods do iOS..."
cd ios
pod install
cd ..

cat <<EOM

==============================================================
Projeto nativo gerado em: $NATIVE_DIR

Para rodar:
  ./scripts/mac/02-run-android.sh
  ./scripts/mac/03-run-ios.sh
==============================================================
EOM

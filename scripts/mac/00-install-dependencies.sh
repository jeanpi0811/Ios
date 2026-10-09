#!/usr/bin/env bash
set -euo pipefail

echo "==> Verificando Xcode Command Line Tools..."
if ! xcode-select -p >/dev/null 2>&1; then
  xcode-select --install
  echo "Confirme a instalação na janela que abriu e rode este script de novo."
  exit 0
fi

if ! command -v brew >/dev/null 2>&1; then
  echo "==> Instalando Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

echo "==> Instalando Node, Watchman e CocoaPods..."
brew install node watchman cocoapods

echo "==> Instalando JDK (Temurin 17), necessário para compilar o Android..."
brew install --cask temurin17

echo "==> Instalando Android Studio..."
brew install --cask android-studio

cat <<'EOM'

==============================================================
Passos manuais que só precisam ser feitos uma vez:

1. Abra o Android Studio, conclua o assistente inicial e instale
   o Android SDK (API 34 ou 35) pelo SDK Manager.
2. Em Device Manager, crie um emulador (ex.: Pixel 8, API 34).
3. Adicione estas duas linhas ao seu ~/.zshrc:

     export ANDROID_HOME=$HOME/Library/Android/sdk
     export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools

4. Feche e reabra o terminal (ou rode: source ~/.zshrc).

Depois disso, rode:  ./scripts/mac/01-generate-native-project.sh
==============================================================
EOM

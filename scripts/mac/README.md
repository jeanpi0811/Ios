# Scripts para Mac

Automatizam a instalação e o build local do CleanOS Pro. Rode em ordem, da raiz do projeto:

```bash
cd CleanOS-Pro
chmod +x scripts/mac/*.sh   # garante permissão de execução após extrair o ZIP

./scripts/mac/00-install-dependencies.sh     # Homebrew, Node, Watchman, CocoaPods, JDK, Android Studio
# → siga as instruções manuais que o script imprime no final (SDK, emulador, variáveis de ambiente)

./scripts/mac/01-generate-native-project.sh  # gera android/ e ios/ com react-native init e copia o código-fonte
./scripts/mac/02-run-android.sh              # roda no emulador/aparelho Android
./scripts/mac/03-run-ios.sh                  # roda no simulador iOS

./scripts/mac/06-run-tests.sh                # testes do backend e do frontend

# quando estiver pronto para publicar:
./scripts/mac/04-build-release-android.sh    # gera o .aab para a Play Store
./scripts/mac/05-build-release-ios.sh        # gera o .xcarchive para a App Store
```

## Backend

Os scripts acima cuidam só do app mobile. Para rodar o backend localmente:

```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run dev
```

## O que estes scripts NÃO fazem

Eles automatizam o *setup e build* do projeto, mas não escrevem os módulos nativos
que faltam (MediaStore/PhotoKit, IA on-device, IAP) — isso continua sendo trabalho de
desenvolvimento descrito em `../../docs/ARCHITECTURE.md`.

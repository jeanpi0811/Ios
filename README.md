# CleanOS Pro

App de limpeza e otimização para Android e iOS, inspirado no CCleaner Pro / Avast Cleanup Pro.

Este é o ponto de partida do projeto — backend funcional e esqueleto do app mobile.
Veja `docs/ARCHITECTURE.md` para o que já está pronto e o que falta para virar um produto
publicável nas lojas.

## Setup e build no Mac (recomendado)

Scripts prontos em `scripts/mac/` automatizam instalação de dependências, geração do
projeto nativo, execução no Android/iOS e build de release. Veja `scripts/mac/README.md`.

```bash
chmod +x scripts/mac/*.sh
./scripts/mac/00-install-dependencies.sh
```

## Backend (manual)

```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run dev
```

## Frontend (manual, sem os scripts)

```bash
cd frontend
npm install
npx react-native init CleanOSProNative --template react-native-template-typescript
# copiar src/, App.tsx e package.json deps para dentro do projeto gerado
npm run android   # ou npm run ios
```

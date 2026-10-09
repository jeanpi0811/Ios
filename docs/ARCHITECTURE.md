# CleanOS Pro — Arquitetura e status do projeto

## O que já está implementado (código real, não placeholder)

### Backend (`/backend`)
- Express + TypeScript, com Helmet, CORS e rate limit.
- Prisma schema completo: User, Device, CleanupHistory, Subscription, Notification, Settings.
- Autenticação real: registro, login e refresh token com JWT + bcrypt.
- Rotas de histórico de limpeza (listar e registrar).
- Dockerfile + docker-compose (API + Postgres).

### Frontend (`/frontend`)
- Estrutura TypeScript de um app React Native (sem os diretórios nativos `android/` e `ios/` —
  eles são gerados pela CLI do React Native, que precisa rodar num ambiente com Node,
  Android SDK/Xcode e acesso à internet real).
- Navegação (React Navigation), estado global (Zustand), tema dark/glassmorphism.
- Tela de Dashboard e Scanner com lógica funcional de ponta a ponta — hoje o `scanner.service.ts`
  devolve dados mockados; é o ponto exato onde entra o módulo nativo real.

## O que NÃO está incluído nesta primeira entrega, e por quê

Estes itens exigem ferramentas que este ambiente não tem (sem acesso à internet para
`npm install`/`pod install`, sem Xcode, sem Android Studio, sem dispositivo físico para testar
permissões de mídia/contatos/bateria):

- Projetos nativos Android (`android/`) e iOS (`ios/`) gerados e configurados.
- Módulos nativos de acesso a MediaStore (Android) e PhotoKit (iOS).
- Hash perceptual / agrupamento de fotos semelhantes, e o modelo de IA on-device
  (TensorFlow Lite / ML Kit) para classificar selfie, documento, comida, etc.
- Integração real de compra (Google Play Billing / StoreKit) para o plano Premium.
- Widgets (Android AppWidget / iOS WidgetKit).
- Testes E2E (Detox), cobertura de testes, e pipelines de build Android/iOS no GitHub Actions
  (o pipeline de lint/teste/build do backend pode ser feito sem esses recursos).
- Assets de marca (logo, ícone, splash) — não gero artes de marca sem direção visual do cliente.

## Próximos passos sugeridos (em ordem)

1. Gerar os projetos nativos com `npx react-native init` num ambiente com Android
   Studio/Xcode, e portar a pasta `src/` para dentro dele.
2. Implementar o módulo nativo de leitura de mídia (Android: MediaStore; iOS: PhotoKit)
   como um "Native Module" do React Native.
3. Trocar `runDeviceScan()` mockado pela chamada real a esse módulo.
4. Adicionar hashing perceptual (ex.: pHash) para detecção de duplicadas/semelhantes.
5. Integrar IAP (RevenueCat é o caminho mais rápido para cobrir Google Play + App Store
   com uma API única).

# WDIO + Appium | Native Demo App (Android & iOS)

Automação mobile com **WebdriverIO + Appium**, **Mocha/Chai**, **Page Objects**, **Allure**, execução em **Android/iOS** e integração opcional com **BrowserStack** e **GitLab CI**.

🔗 **Repositório**: https://github.com/danilopuh/wdio-mobile-native-demo

##  Pré-requisitos

###  Requisitos Gerais
- **Node.js** 18+ (testado com v18.x)
- **Java JDK** 11+ (testado com JDK 21)
- **Appium** 2.x (instalado automaticamente via NPM)
- **Git** para clonar o repositório

###  Para Android (Windows/macOS/Linux)
- **Android Studio** ou **Android SDK**
- **Android SDK Build Tools**
- **Android Emulator** ou dispositivo físico
- **Variável de ambiente**: `ANDROID_HOME` configurada
- **PATH**: Adicionar `$ANDROID_HOME/platform-tools` e `$ANDROID_HOME/tools`

###  Para iOS ( Apenas macOS)
- **macOS** (obrigatório)
- **Xcode** 14+
- **iOS Simulator** 
- **Xcode Command Line Tools**: `xcode-select --install`
- **Homebrew** (recomendado para dependências)

###  Apps de Teste
- **Android**: `./apps/android.wdio.native.app.v1.0.8.apk` 
- **iOS**: `./apps/ios.simulator.wdio.native.app.v1.0.8/Payload/wdiodemoapp.app` 

##  Instalação

### 1. Clonar o repositório
```bash
git clone https://github.com/danilopuh/wdio-mobile-native-demo.git
cd wdio-mobile-native-demo
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Verificar configuração do ambiente
```bash
# Verificar se Java está instalado
java -version

# Verificar se Android SDK está configurado (para Android)
adb devices

# Verificar se Appium drivers estão instalados
npx appium driver list
```

##  Como Executar

###  Android ( Testado e Funcionando)

#### Preparar Emulador
```bash
# Listar emuladores disponíveis
emulator -list-avds

# Iniciar emulador (substitua pelo nome do seu AVD)
emulator -avd Pixel_4_API_30

# Verificar se o device está conectado
adb devices
```

#### Executar Testes
```bash
# Executar todos os testes Android
npm run android

# Executar teste específico
npx wdio wdio.android.conf.js --spec="test/specs/01_login_success.e2e.js"

# Executar com configuração personalizada
ANDROID_DEVICE_NAME=emulator-5554 npm run android
```

###  iOS ( Limitações no Windows)

####  Funciona apenas no macOS
```bash
# No macOS, com Xcode instalado
npm run ios

# Executar teste específico
npx wdio wdio.ios.conf.js --spec="test/specs/01_login_success.e2e.js"
```

####  Windows/Linux: Use BrowserStack
```bash
# Configure as variáveis de ambiente para BrowserStack
export BROWSERSTACK_USERNAME=seu_usuario
export BROWSERSTACK_ACCESS_KEY=sua_chave
export BS_APP_ID=bs://app-id-ios

# Execute via BrowserStack
npm run bs
```

###  Variáveis de Ambiente (Opcional)

Crie um arquivo `.env` na raiz do projeto:

```env
# Android
ANDROID_DEVICE_NAME=emulator-5554
ANDROID_PLATFORM_VERSION=14
ANDROID_APP=./apps/android.wdio.native.app.v1.0.8.apk

# iOS (apenas macOS)
IOS_DEVICE_NAME=iPhone 14
IOS_PLATFORM_VERSION=16.4
IOS_APP=./apps/ios.simulator.wdio.native.app.v1.0.8/Payload/wdiodemoapp.app

# BrowserStack
BROWSERSTACK_USERNAME=seu_usuario
BROWSERSTACK_ACCESS_KEY=sua_chave
BS_APP_ID=bs://app-id
BUILD_NAME=CI Build
```

##  Relatórios e Análise

### Gerar Relatórios Allure
```bash
# Executar testes e gerar relatório
npm run android && npm run allure:generate

# Ou executar comando específico
npx allure generate allure-results --clean -o allure-report
```

### Visualizar Relatórios
```bash
# Abrir relatório Allure no navegador
npm run allure:serve

# Ou manualmente
npx allure serve allure-results
```

### Scripts Disponíveis
- `npm run android` - Executar testes Android
- `npm run ios` - Executar testes iOS (apenas macOS)
- `npm run bs` - Executar testes no BrowserStack
- `npm run allure:generate` - Gerar relatório Allure
- `npm run allure:serve` - Visualizar relatório Allure

##  Estrutura dos Testes

### Casos de Teste Implementados
1. **01_login_success.e2e.js** - Login com sucesso
2. **02_login_error.e2e.js** - Tratamento de erro no login
3. **03_signup_success.e2e.js** - Cadastro de usuário
4. **04_navigation_menu.e2e.js** - Navegação pelo menu
5. **05_navigation_forms.e2e.js** - Navegação em formulários
6. **06_form_validation_error.e2e.js** - Validação de formulários
7. **07_data_driven_login.e2e.js** - Login orientado a dados
8. **08_webview_navigation.e2e.js** - Navegação em WebView
9. **09_error_messages.e2e.js** - Mensagens de erro
10. **10_end_to_end_flow.e2e.js** - Fluxo completo E2E

### Page Object Model
```
test/pageobjects/
├── base.screen.js      # Classe base para telas
├── forms.screen.js     # Tela de formulários
├── home.screen.js      # Tela inicial/home
├── login.screen.js     # Tela de login
└── signup.screen.js    # Tela de cadastro
```

### Dados de Teste
- `data/users.json` - Usuários válidos e inválidos para testes

### Estrutura do Projeto
```
wdio-mobile-native-demo/
├── apps/                           # Apps para teste
│   ├── android.wdio.native.app.v1.0.8.apk
│   └── ios.simulator.wdio.native.app.v1.0.8/
├── data/
│   └── users.json                  # Dados para testes data-driven
├── test/
│   ├── pageobjects/               # Page Object Model
│   └── specs/                     # Casos de teste
├── allure-results/                # Resultados dos testes
├── allure-report/                 # Relatórios HTML gerados
├── wdio.android.conf.js          # Configuração Android
├── wdio.ios.conf.js              # Configuração iOS
├── wdio.bs.conf.js               # Configuração BrowserStack
└── wdio.shared.conf.js           # Configuração compartilhada
```

##  BrowserStack (iOS no Windows/Linux)

### Configurar BrowserStack
```bash
# Definir variáveis de ambiente
export BROWSERSTACK_USERNAME=seu_usuario
export BROWSERSTACK_ACCESS_KEY=sua_chave
export BS_APP_ID=bs://app-id-ios
export BUILD_NAME="Automated Tests"
```

### Executar via BrowserStack
```bash
# Executar todos os testes
npm run bs

# Executar teste específico
npx wdio wdio.bs.conf.js --spec="test/specs/01_login_success.e2e.js"
```

##  Troubleshooting

### Problemas Comuns Android
```bash
# Emulador não conectado
adb kill-server && adb start-server
adb devices

# App não instalado
adb install ./apps/android.wdio.native.app.v1.0.8.apk

# Limpar dados do app
adb shell pm clear io.wdiodemoapp

# Verificar processos Appium
tasklist | findstr node
```

### Problemas iOS no macOS
```bash
# Verificar simuladores disponíveis
xcrun simctl list devices

# Resetar simulador
xcrun simctl erase "iPhone 14"

# Instalar app no simulador
xcrun simctl install "iPhone 14" ./apps/ios.simulator.wdio.native.app.v1.0.8/Payload/wdiodemoapp.app

# Verificar permissões
codesign -dv --verbose=4 ./apps/ios.simulator.wdio.native.app.v1.0.8/Payload/wdiodemoapp.app
```

### Verificar Configuração Appium
```bash
# Listar drivers instalados
npx appium driver list

# Instalar driver Android (se necessário)
npx appium driver install uiautomator2

# Instalar driver iOS (se necessário - apenas macOS)
npx appium driver install xcuitest

# Verificar status do Appium server
npx appium doctor
```

### Problemas de Performance
```bash
# Aumentar timeout nos testes
# Editar wdio.shared.conf.js
waitforTimeout: 10000,
connectionRetryTimeout: 120000,

# Fechar outros emuladores/simuladores
adb devices
pkill -f emulator
```

##  CI/CD

### GitLab CI (Android)
Arquivo `.gitlab-ci.yml` incluído para execução em runners com Android SDK configurado.

### GitHub Actions
```yaml
# Exemplo para Android
- name: Run Android Tests
  run: |
    emulator -avd test_android_emulator -no-window &
    adb wait-for-device
    npm run android
```

##  Notas Importantes

- **Localizadores**: Podem variar conforme a versão do app demo; ajuste se necessário
- **iOS**: Requer assinatura/permissão para execução do `.app` gerado
- **Screenshots**: Capturados automaticamente em falhas (`./reports/screenshots`)
- **Allure**: Mantém histórico de execuções - use `--clean` para limpar
- **Data-driven**: Arquivo `users.json` contém dados para múltiplos cenários
- **Timeouts**: Configuráveis por teste ou globalmente nos arquivos de configuração
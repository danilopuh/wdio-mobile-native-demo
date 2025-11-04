const Home = require('../pageobjects/home.screen');
const Login = require('../pageobjects/login.screen');
const Forms = require('../pageobjects/forms.screen');
const data = require('../../data/users.json');

describe('Fluxo E2E - login + navegar + form', () => {
  beforeEach(async () => {
    // Reseta o estado da app antes de cada teste
    await Home.ensureAppHomeScreen();
  });

  it('deve logar, navegar até forms e preencher', async () => {
    try {
      // 1. Fazer login
      await Home.openLogin();
      await Login.login(data.validUsers[0].username, data.validUsers[0].password);
      
      // 2. Aguardar retorno à tela inicial e verificar login
      await browser.pause(3000); // Aguarda transição após login
      
      const isLoggedIn = await Home.isLoggedIn();
      await expect(isLoggedIn).to.be.true;
      
      // 3. Aguardar elementos ficarem disponíveis e navegar para forms
      await browser.pause(2000); // Aguarda interface estabilizar
      
      // Estratégia robusta para encontrar o botão Forms
      let formsFound = false;
      const formsSelectors = [
        () => $('~Forms'),
        () => $('android=new UiSelector().text("Forms")'),
        () => $('android=new UiSelector().textContains("Forms")'),
        () => $('android=new UiSelector().description("Forms")'),
        () => $('android=new UiSelector().className("android.widget.Button").textContains("Forms")')
      ];
      
      for (let i = 0; i < formsSelectors.length; i++) {
        try {
          console.log(`Trying forms selector ${i + 1}...`);
          const formsElement = formsSelectors[i]();
          await formsElement.waitForDisplayed({ timeout: 5000 });
          await formsElement.click();
          console.log(`Forms selector ${i + 1} worked!`);
          formsFound = true;
          break;
        } catch (error) {
          console.log(`Forms selector ${i + 1} failed: ${error.message}`);
          continue;
        }
      }
      
      if (!formsFound) {
        console.log('Forms button not found with any selector, trying menu navigation...');
        await Home.openMenu();
        await browser.pause(2000);
        const formsViaMenu = $('~Forms');
        await formsViaMenu.waitForDisplayed({ timeout: 5000 });
        await formsViaMenu.click();
      }
      
      await browser.pause(3000); // Aguarda navegação para forms
      
      // 4. Preencher o formulário
      await Forms.fillForm('Teste E2E', false);
      
      // 5. Verificar se preencheu corretamente
      const inputText = await Forms.getInputText();
      await expect(inputText).to.equal('Teste E2E');
      
    } catch (error) {
      console.log('E2E Flow test error:', error.message);
      
      // Captura estado da tela para debug
      try {
        const isHomeVisible = await Home.isVisible(Home.btnForms);
        const isLoginVisible = await Home.isVisible(Home.btnLogin);
        console.log('Forms button visible:', isHomeVisible);
        console.log('Login button visible:', isLoginVisible);
      } catch (debugError) {
        console.log('Debug error:', debugError.message);
      }
      
      throw error;
    }
  });
});
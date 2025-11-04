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
    // 1. Fazer login
    await Home.openLogin();
    await Login.login(data.validUsers[0].username, data.validUsers[0].password);
    
    // 2. Verificar se logou com sucesso
    const isLoggedIn = await Home.isLoggedIn();
    await expect(isLoggedIn).to.be.true;
    
    // 3. Navegar para forms
    await Home.openForms();
    
    // 4. Preencher o formulário
    await Forms.fillForm('Teste E2E', false);
    
    // 5. Verificar se preencheu corretamente
    const inputText = await Forms.getInputText();
    await expect(inputText).to.equal('Teste E2E');
  });
});
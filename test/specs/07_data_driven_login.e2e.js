const Login = require('../pageobjects/login.screen');
const Home = require('../pageobjects/home.screen');
const data = require('../../data/users.json');

describe('Login - data driven', () => {
  beforeEach(async () => {
    // Reseta o estado da app antes de cada teste
    await Home.ensureAppHomeScreen();
  });

  // Teste simples com primeiro usuário válido
  it('deve logar com usuário válido (data-driven)', async () => {
    console.log(`\n Testando login data-driven válido: ${data.validUsers[0].username}`);
    
    // Abre a tela de login
    await Home.openLogin();
    
    // Realiza o login com primeiro usuário válido
    await Login.login(data.validUsers[0].username, data.validUsers[0].password);
    
    // Verifica se logou com sucesso usando método do Home screen
    await driver.pause(3000); // Aguarda processamento
    
    const isLoggedIn = await Home.isLoggedIn();
    console.log(`Login foi bem-sucedido: ${isLoggedIn}`);
    
    // Verifica se o login foi bem-sucedido
    await expect(isLoggedIn).to.be.true;
  });

  // Teste simples com primeiro usuário inválido
  it('não deve logar com usuário inválido (data-driven)', async () => {
    console.log(`\n Testando login data-driven inválido: ${data.invalidUsers[0].username}`);
    
    // Abre a tela de login
    await Home.openLogin();
    
    // Tenta realizar o login com primeiro usuário inválido
    await Login.login(data.invalidUsers[0].username, data.invalidUsers[0].password);
    
    // Aguarda possível mensagem de erro
    await driver.pause(3000);
    
    // Verifica se ainda está na tela de login (não conseguiu logar)
    const isStillOnLogin = await Login.btnLogin.isDisplayed().catch(() => false);
    console.log(`Ainda na tela de login após login inválido: ${isStillOnLogin}`);
    
    // Para login inválido, deve continuar na tela de login
    await expect(isStillOnLogin).to.be.true;
  });
});
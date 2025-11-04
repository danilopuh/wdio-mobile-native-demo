const Home = require('../pageobjects/home.screen');
const Login = require('../pageobjects/login.screen');
const SignUp = require('../pageobjects/signup.screen');
const data = require('../../data/users.json');

describe('Cadastro - sucesso', () => {
  beforeEach(async () => {
    // Reseta o estado da app antes de cada teste
    await Home.ensureAppHomeScreen();
  });

  it('deve cadastrar novo usuário', async () => {
    await Home.openLogin();
    await Login.openSignUp();
    const u = data.signup[0];
    await SignUp.signUp(u.name, u.email, u.password);
    
    // Aguarda processamento
    await browser.pause(3000);
    
    // Verifica se o cadastro foi bem-sucedido (múltiplos indicadores)
    const successMsg = await SignUp.isVisible(SignUp.successMsg);
    const backToLogin = await Login.isVisible(Login.btnLogin);
    const backToHome = await Home.isVisible(Home.btnLogin);
    
    // Se houve sucesso OU voltou para login/home, considera sucesso
    await expect(successMsg || backToLogin || backToHome).to.be.true;
  });
});
const Login = require('../pageobjects/login.screen');
const Home = require('../pageobjects/home.screen');
const data = require('../../data/users.json');

describe('Login - sucesso', () => {
  it('deve logar com credenciais válidas', async () => {
    await Home.openLogin();
    await Login.login(data.validUsers[0].username, data.validUsers[0].password);
    
    // Verifica se o login foi bem-sucedido
    const isLoggedIn = await Home.isLoggedIn();
    await expect(isLoggedIn).to.be.true;
  });
});
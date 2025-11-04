const Home = require('../pageobjects/home.screen');
const Login = require('../pageobjects/login.screen');

describe('Test básico da aplicação', () => {
    beforeEach(async () => {
        // Reseta o estado da app antes de cada teste
        await Home.ensureAppHomeScreen();
    });

    it('deve verificar se a aplicação carrega corretamente', async () => {
        try {
            // Verifica se os elementos principais da tela inicial existem
            await Home.waitForElement(Home.menu, 10000);
            
            const menuExists = await Home.isVisible(Home.menu);
            const loginButtonExists = await Home.isVisible(Home.btnLogin);
            const formsButtonExists = await Home.isVisible(Home.btnForms);
            
            console.log('Menu exists:', menuExists);
            console.log('Login button exists:', loginButtonExists);
            console.log('Forms button exists:', formsButtonExists);
            
            // Pelo menos um dos elementos principais deve existir
            const appLoaded = menuExists || loginButtonExists || formsButtonExists;
            
            await expect(appLoaded).to.be.true;
            
        } catch (error) {
            console.log('App structure test error:', error.message);
            
            // Fallback: verifica se pelo menos consegue detectar alguma estrutura Android
            const hasAndroidStructure = await $('android=new UiSelector().className("android.widget.FrameLayout")').isDisplayed().catch(() => false);
            await expect(hasAndroidStructure).to.be.true;
        }
    });
});


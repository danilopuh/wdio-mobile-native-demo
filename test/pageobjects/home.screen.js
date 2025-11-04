const Base = require('./base.screen');

class HomeScreen extends Base {
  get menu() { return $('~open menu'); }
  get catalog() { return $('~products'); }
  get content() { return $('android=new UiSelector().textContains("Products")'); }
  get cart() { return $('~cart badge'); }
  get btnForms() { return $('~Forms'); }
  get btnWebview() { return $('~Webview'); }
  get btnLogin() { return $('~Login'); }

  async openMenu() { 
    await this.tap(this.menu); 
    await browser.pause(2000);
  }
  
  async openForms() { 
    await this.tap(this.btnForms);
    await browser.pause(3000);
  }
  
  async openWebview() { 
    await this.tap(this.btnWebview);
    await browser.pause(3000);
  }
  
  async openLogin() {
    // Sistema robusto de fallback para encontrar o Login button
    const loginSelectors = [
      // Selector 1: Accessibility ID
      () => $('~Login'),
      // Selector 2: Text direto
      () => $('android=new UiSelector().text("Login")'),
      // Selector 3: UiAutomator com text regex (funcionou no login.screen.js!)
      () => $('android=new UiSelector().textMatches("(?i).*login.*")'),
      // Selector 4: Description
      () => $('android=new UiSelector().description("Login")'),
      // Selector 5: Botão com texto Login
      () => $('android=new UiSelector().className("android.widget.Button").textContains("Login")'),
      // Selector 6: ResourceId genérico
      () => $('android=new UiSelector().resourceIdMatches(".*login.*")'),
      // Selector 7: Text Contains
      () => $('android=new UiSelector().textContains("Login")'),
      // Selector 8: Genérico - qualquer botão (último recurso)
      () => $('android=new UiSelector().className("android.widget.Button").instance(0)')
    ];

    for (let i = 0; i < loginSelectors.length; i++) {
      try {
        console.log(`Tentando Home Login selector ${i + 1}...`);
        const element = loginSelectors[i]();
        await element.waitForDisplayed({ timeout: 8000 });
        await element.click();
        console.log(`Home Login selector ${i + 1} worked!`);
        await browser.pause(2000);
        return;
      } catch (error) {
        console.log(`Home Login selector ${i + 1} failed: ${error.message}`);
        continue;
      }
    }

    // Se todos falharam, tenta via menu
    try {
      console.log('All direct selectors failed, trying via menu...');
      await this.openMenu();
      const loginViaMenu = $('~Login');
      await loginViaMenu.waitForDisplayed({ timeout: 5000 });
      await loginViaMenu.click();
      console.log('Home Login via menu worked!');
      await browser.pause(2000);
    } catch (menuError) {
      throw new Error('Could not find Login button with any selector');
    }
  }
  
  async isLoggedIn() {
    // Verifica múltiplos indicadores de login bem-sucedido
    try {
      const indicators = [
        $('android=new UiSelector().textContains("Products")'),
        $('~open menu'),
        $('~cart badge'),
        $('android=new UiSelector().resourceId("android:id/list")'),
        $('android=new UiSelector().className("android.widget.ScrollView")')
      ];
      
      for (const indicator of indicators) {
        try {
          if (await indicator.isDisplayed()) {
            return true;
          }
        } catch (e) {
          continue;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}

module.exports = new HomeScreen();
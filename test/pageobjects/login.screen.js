const Base = require('./base.screen');

class LoginScreen extends Base {
  get inputUsername() { return $('~input-email'); }
  get inputPassword() { return $('~input-password'); }
  get btnLogin() { return $('~button-LOGIN'); }
  get btnSignUp() { return $('~button-SIGN UP'); }
  get errorMsg() { return $('~generic-error-message'); }
  
  // Fallback selectors for login button
  get btnLoginAlt() { return $('~LOGIN'); }
  get btnLoginAlt2() { return $('android=new UiSelector().textContains("LOGIN")'); }

  async login(username, password) {
    await this.type(this.inputUsername, username);
    await this.type(this.inputPassword, password);
    
    // Múltiplas estratégias para encontrar o botão login
    const loginSelectors = [
      this.btnLogin,                                                          // ~button-LOGIN
      this.btnLoginAlt,                                                       // ~LOGIN  
      this.btnLoginAlt2,                                                      // text contains LOGIN
      $('android=new UiSelector().text("LOGIN")'),                          // Texto exato
      $('android=new UiSelector().description("LOGIN")'),                   // Description
      $('android=new UiSelector().className("android.widget.Button").text("LOGIN")'), // Button com texto
      $('android=new UiSelector().resourceId("*login*")'),                  // Resource ID contém login
      $('android=new UiSelector().clickable(true).textMatches(".*[Ll][Oo][Gg][Ii][Nn].*")') // Regex case insensitive
    ];
    
    let loginSuccess = false;
    for (let i = 0; i < loginSelectors.length; i++) {
      try {
        console.log(`Trying login selector ${i + 1}/${loginSelectors.length}...`);
        await this.tap(loginSelectors[i]);
        console.log(`Login selector ${i + 1} worked!`);
        loginSuccess = true;
        break;
      } catch (error) {
        console.log(`Login selector ${i + 1} failed:`, error.message);
        continue;
      }
    }
    
    if (!loginSuccess) {
      console.log('All login selectors failed, trying generic button approach...');
      // Último recurso: procura qualquer botão clicável na tela
      const buttons = await $$('android=new UiSelector().className("android.widget.Button").clickable(true)');
      if (buttons.length > 0) {
        console.log(`Found ${buttons.length} clickable buttons, trying the first one...`);
        await buttons[0].click();
        loginSuccess = true;
      }
    }
    
    if (!loginSuccess) {
      throw new Error('Could not find any login button with any strategy');
    }
    
    // Aguarda o login processar
    await browser.pause(3000);
  }

  async openSignUp() {
    try {
      await this.tap(this.btnSignUp);
      await browser.pause(2000);
    } catch (error) {
      console.log('Sign Up button not found directly, trying alternatives...');
      
      // Fallbacks para encontrar o botão Sign Up
      const signUpSelectors = [
        $('android=new UiSelector().text("SIGN UP")'),
        $('android=new UiSelector().textContains("SIGN UP")'),
        $('android=new UiSelector().text("Sign Up")'),
        $('android=new UiSelector().textContains("Sign Up")'),
        $('android=new UiSelector().description("button-SIGN UP")'),
        $('android=new UiSelector().className("android.widget.Button").textContains("SIGN")')
      ];
      
      let found = false;
      for (const selector of signUpSelectors) {
        try {
          await selector.waitForDisplayed({ timeout: 5000 });
          await selector.click();
          await browser.pause(2000);
          found = true;
          break;
        } catch (e) {
          continue;
        }
      }
      
      if (!found) {
        throw new Error('Could not find Sign Up button with any selector');
      }
    }
  }
}

module.exports = new LoginScreen();
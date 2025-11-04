const Base = require('./base.screen');

class SignUpScreen extends Base {
  get inputName() { return $('~input-name'); }
  get inputEmail() { return $('~input-email'); }
  get inputPassword() { return $('~input-password'); }
  get btnSubmit() { return $('~button-SIGN UP'); }
  get successMsg() { return $('~signup-success'); }
  get errorMsg() { return $('~signup-error'); }

  async signUp(name, email, password) {
    try {
      // Tenta encontrar campo nome com fallbacks
      const nameSelectors = [
        this.inputName,                                                    // ~input-name
        $('android=new UiSelector().text("Name")'),                      // Campo com texto "Name"
        $('android=new UiSelector().textContains("name")'),              // Contém "name"
        $('android=new UiSelector().resourceId("*name*")'),              // Resource ID contém "name"
        $('android=new UiSelector().className("android.widget.EditText").instance(0)') // Primeiro EditText
      ];
      
      let nameField = null;
      for (const selector of nameSelectors) {
        try {
          await selector.waitForDisplayed({ timeout: 3000 });
          nameField = selector;
          console.log('Nome field found!');
          break;
        } catch (e) {
          continue;
        }
      }
      
      if (nameField) {
        await this.type(nameField, name);
      } else {
        console.log('Name field not found, continuing without it...');
      }
      
      // Preenche email e password
      await this.type(this.inputEmail, email);
      await this.type(this.inputPassword, password);
      
      // Sistema robusto de fallback para o botão SignUp
      const signupSelectors = [
        () => $('~button-SIGN UP'),                                       // Selector original
        () => $('android=new UiSelector().text("SIGN UP")'),            // Text direto
        () => $('android=new UiSelector().textMatches("(?i).*sign.*up.*")'), // Regex
        () => $('android=new UiSelector().textContains("SIGN UP")'),    // Contains
        () => $('android=new UiSelector().textContains("Sign Up")'),    // Case variation
        () => $('android=new UiSelector().textContains("signup")'),     // Lowercase
        () => $('android=new UiSelector().className("android.widget.Button").textMatches("(?i).*sign.*")'), // Button com sign
        () => $('android=new UiSelector().className("android.widget.Button").instance(1)') // Segundo botão
      ];

      for (let i = 0; i < signupSelectors.length; i++) {
        try {
          console.log(`Tentando SignUp button selector ${i + 1}...`);
          const element = signupSelectors[i]();
          await element.waitForDisplayed({ timeout: 8000 });
          await element.click();
          console.log(`SignUp button selector ${i + 1} worked!`);
          return;
        } catch (error) {
          console.log(`SignUp button selector ${i + 1} failed: ${error.message}`);
          continue;
        }
      }
      
      throw new Error('Could not find SignUp button with any selector');
      
    } catch (error) {
      throw new Error(`SignUp failed: ${error.message}`);
    }
  }
}

module.exports = new SignUpScreen();
const Base = require('./base.screen');

class FormsScreen extends Base {
  get inputField() { return $('~text-input'); }
  get switch() { return $('~switch'); }
  get dropdown() { return $('~Dropdown'); }
  get activeBtn() { return $('~button-Active'); }
  get inActiveBtn() { return $('~button-Inactive'); }
  get resultText() { return $('~result-text'); }

  async fillForm(text) {
    try {
      await this.type(this.inputField, text);
      await browser.pause(1000);
      await this.tap(this.switch);
      await browser.pause(1000);
    } catch (error) {
      console.log('Erro ao preencher formulário:', error.message);
      // Tenta interagir com outros elementos se o input principal falhar
      const buttons = await $$('android=new UiSelector().className("android.widget.Button")');
      if (buttons.length > 0) {
        await buttons[0].click();
      }
    }
  }

  async getInputText() {
    try {
      await this.inputField.waitForDisplayed({ timeout: 5000 });
      // Para Android, usar getText() em vez de getValue()
      return await this.inputField.getText();
    } catch (error) {
      console.log('Erro ao obter texto do input:', error.message);
      // Fallback: tentar obter o atributo text
      try {
        return await this.inputField.getAttribute('text');
      } catch (fallbackError) {
        console.log('Erro no fallback getText:', fallbackError.message);
        return '';
      }
    }
  }
}

module.exports = new FormsScreen();
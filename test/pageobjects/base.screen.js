class BaseScreen {
  async tap(element) {
    await element.waitForDisplayed({ timeout: 10000 });
    await element.click();
    await browser.pause(500); // Pequena pausa após o clique
  }

  async type(element, text) {
    try {
      await element.waitForDisplayed({ timeout: 10000 });
      
      // Método mais robusto para inserir texto
      await element.click(); // Foca no elemento primeiro
      await browser.pause(500);
      
      await element.clearValue(); // Limpa valor existente
      await browser.pause(300);
      
      await element.setValue(text);
      await browser.pause(500); // Aguarda após inserir
      
    } catch (error) {
      console.log(`Error typing "${text}":`, error.message);
      // Fallback: tenta método alternativo
      try {
        await element.click();
        await browser.pause(500);
        
        // Tenta inserir caractere por caractere se setValue falhar
        for (const char of text) {
          await browser.keys(char);
          await browser.pause(50);
        }
      } catch (fallbackError) {
        console.log('Fallback typing also failed:', fallbackError.message);
        throw error;
      }
    }
  }

  async isVisible(element) {
    try {
      await element.waitForDisplayed({ timeout: 5000 });
      return await element.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  async waitForElement(element, timeout = 10000) {
    try {
      await element.waitForDisplayed({ timeout });
      return true;
    } catch (error) {
      return false;
    }
  }

  async resetAppState() {
    try {
      console.log('Checking app state and resetting if needed...');
      
      // Método mais simples e confiável para Android
      try {
        // Força fechamento da app
        await browser.terminateApp('com.wdiodemoapp');
        await browser.pause(3000); // Tempo maior para limpeza
        
        // Reinicia a app
        await browser.activateApp('com.wdiodemoapp');
        await browser.pause(5000); // Tempo maior para inicialização completa
        
        console.log('App restarted successfully');
        return true;
      } catch (basicError) {
        console.log('Basic restart failed, trying background/foreground:', basicError.message);
        
        // Fallback: colocar em background e trazer de volta
        await browser.background(2);
        await browser.pause(2000);
        
        return true;
      }
    } catch (error) {
      console.log('Error in resetAppState, continuing without reset:', error.message);
      // Se não conseguir resetar, pelo menos aguarda um tempo
      await browser.pause(3000);
      return false;
    }
  }

  async ensureAppHomeScreen() {
    try {
      console.log('Ensuring app is on home screen...');
      
      // Primeiro reseta o estado da app
      await this.resetAppState();
      
      // Verifica se está na tela inicial
      const homeIndicators = [
        $('android=new UiSelector().textContains("Products")'),
        $('~open menu'),
        $('~cart badge'),
        $('~Login'),
        $('~Forms')
      ];
      
      let isOnHome = false;
      for (const indicator of homeIndicators) {
        try {
          if (await indicator.isDisplayed()) {
            isOnHome = true;
            break;
          }
        } catch (e) {
          continue;
        }
      }
      
      if (!isOnHome) {
        console.log('Not on home screen, pressing back buttons...');
        // Tenta voltar para tela inicial pressionando back várias vezes
        for (let i = 0; i < 3; i++) {
          await browser.back();
          await browser.pause(1000);
        }
      }
      
      await browser.pause(2000);
      return true;
    } catch (error) {
      console.log('Error ensuring home screen:', error.message);
      return false;
    }
  }
}
module.exports = BaseScreen;
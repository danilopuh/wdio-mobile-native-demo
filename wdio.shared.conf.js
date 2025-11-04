const dotenv = require('dotenv');
dotenv.config();

exports.config = {
  runner: 'local',
  specs: [
    './test/specs/**/*.e2e.js'
  ],
  exclude: [
    './test/specs/test.e2e.js' // Arquivo removido mas pode estar em cache
  ],
  maxInstances: 1,
  capabilities: [], // filled by platform-specific configs
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 60000,
  connectionRetryTimeout: 300000,
  connectionRetryCount: 5,
  framework: 'mocha',
  reporters: [
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: false,
      disableWebdriverScreenshotsReporting: false
    }],
    'spec'
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 300000
  },
  services: [
    ['appium', {
      args: {
        // allow external Appium 2 plugins/drivers if needed
      },
      logPath: './reports/appium'
    }]
  ],
  before: function () {
    const chai = require('chai')
    global.expect = chai.expect
    global.assert = chai.assert
    global.should = chai.should()
  },
  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    if (!passed) {
      try {
        const sanitizedTitle = test.title.replace(/[^a-zA-Z0-9]/g, '_');
        await browser.saveScreenshot(`./reports/screenshots/${Date.now()}_${sanitizedTitle}.png`);
      } catch (screenshotError) {
        console.log('Erro ao salvar screenshot:', screenshotError.message);
      }
    }
  }
}
const { config } = require('./wdio.shared.conf');

config.user = process.env.BROWSERSTACK_USERNAME;
config.key = process.env.BROWSERSTACK_ACCESS_KEY;
config.services = (config.services || []).concat([['browserstack', {
  app: process.env.BS_APP_ID || undefined
}]]);

// Run on Android sample device
config.capabilities = [{
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Google Pixel 7',
  'appium:platformVersion': '13.0',
  'appium:app': process.env.BS_APP_ID, // e.g. bs://<app-id>
  'bstack:options': {
    projectName: 'WDIO Native Demo',
    buildName: process.env.BUILD_NAME || 'Local-Run',
    sessionName: 'Mobile E2E',
    debug: true,
    networkLogs: true,
  }
}];

exports.config = config;
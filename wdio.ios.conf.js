const { config } = require('./wdio.shared.conf');

config.port = 4723;
config.path = '/wd/hub';

config.capabilities = [{
  platformName: 'iOS',
  'appium:automationName': 'XCUITest',
  'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 14',
  'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '16.4',
  'appium:app': process.env.IOS_APP || './apps/ios.simulator.wdio.native.app.v1.0.8/Payload/wdiodemoapp.app',
  'appium:noReset': true,
  'appium:newCommandTimeout': 3600
}];

exports.config = config;
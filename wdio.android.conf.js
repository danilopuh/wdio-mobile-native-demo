const { config } = require('./wdio.shared.conf');

config.port = 4723;
config.path = '/wd/hub';

config.capabilities = [{
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'emulator-5554',
  'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '16',
  'appium:app': process.env.ANDROID_APP || './apps/android.wdio.native.app.v1.0.8.apk',
  'appium:noReset': true,
  'appium:newCommandTimeout': 3600,
  'appium:uiautomator2ServerLaunchTimeout': 60000,
  'appium:uiautomator2ServerInstallTimeout': 60000,
  'appium:androidInstallTimeout': 120000,
  'appium:autoGrantPermissions': true,
  'appium:systemPort': 8200,
  'appium:skipUnlock': true,
  'appium:skipLogcatCapture': true,
  'appium:ignoreHiddenApiPolicyError': true
}];

exports.config = config;
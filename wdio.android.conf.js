const { config } = require('./wdio.shared.conf');

config.port = 4723;
config.path = '/wd/hub';

config.capabilities = [{
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'emulator-5554',
  'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '10',
  'appium:app': process.env.ANDROID_APP || './apps/android.wdio.native.app.v1.0.8.apk',
  'appium:noReset': false,
  'appium:fullReset': false,
  'appium:newCommandTimeout': 300,
  'appium:uiautomator2ServerLaunchTimeout': 90000,
  'appium:uiautomator2ServerInstallTimeout': 90000,
  'appium:androidInstallTimeout': 180000,
  'appium:autoGrantPermissions': true,
  'appium:systemPort': 8200,
  'appium:skipUnlock': true,
  'appium:skipLogcatCapture': false,
  'appium:ignoreHiddenApiPolicyError': true,
  'appium:disableIdLocatorAutocompletion': true,
  'appium:ensureWebviewsHavePages': true,
  'appium:nativeWebScreenshot': true,
  'appium:recreateChromeDriverSessions': true
}];

exports.config = config;
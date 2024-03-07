
exports.config = {
  
  runner: "local",
  port: 4723,
  path: "/wd/hub",
  specs: [
    //"C:/Users/sraks/fora3/Fora-appium/Fora-appium/Test script/FORA-BOOKING.e2e.js",
    "C:/Users/sraks/fora3/Fora-appium/Fora-appium/Test script/FORA-ForaEmail.e2e.js",

  ],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      "appium:automationName": "UiAutomator2",
      platformName: "android",
      "appium:deviceName": "vivo T1 5G",
      "appium:platformVersion": "13",
      "appium:udid": "137861523000088",
      "appium:ignoreHiddenApiPolicyError": "true",
      browserName: "chrome",
      unhandledPromptBehavior: "dismiss",
    },
  ],

  appium: {
    allowInsecure: ["chromedriver_autodownload"],
  },
  logLevel: "info",
  bail: 0,
  baseUrl: "",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ["appium"],
  framework: "mocha",
  reporters: ['spec',['allure', {
    outputDir: './allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: false,
}]
],
afterTest: async function(test, context, { error, result, duration, passed, retries }) {
  if (error) {
      await browser.takeScreenshot();
  }
},
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};

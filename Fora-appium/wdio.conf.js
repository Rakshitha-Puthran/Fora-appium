
exports.config = {
  runner: "local",
  port: 4723,
  path: "/wd/hub",
  specs: [
    "C:/Users/DCKLP-082/Fora-appium/Fora-appium/Test script/FORA-HOMEPGAE.e2e.js",
    //"C:/Users/DCKLP-082/Fora-appium/Fora-appium/Test script/FORA-HOMEPGAE1.e2e.js",
    //"C:/Users/DCKLP-082/Fora-appium/Fora-appium/Test script/FORA-SCHDULE-ADVISORCALL.e2e.js"
    //"Fora-appium\Test script\FORA-Login.e2e.js",
    //"Fora-appium\Test script\FORA.e2e.js",
  ],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      "appium:automationName": "UiAutomator2",
      platformName: "android",
       "appium:deviceName": "vivo",
     // "appium:deviceName": "Surya",
     // "appium:platformVersion": "14",
     // "appium:udid": "emulator-5554",


      "appium:platformVersion": "13",

       "appium:udid": "10BDB92UT5000U8",
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

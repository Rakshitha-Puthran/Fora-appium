exports.config = {
  runner: "local",
  port: 4723,
  path: "/wd/hub",
  specs: [
    //"Fora-appium\Test script\FORA-HOMEPGAE.e2e.js",
    "C:/Users/DCKLP-082/Fora-appium/Fora-appium/Test script/FORA-HOMEPGAE1.e2e.js",
    //"Fora-appium\Test script\FORA-Login.e2e.js",
    //"Fora-appium\Test script\FORA.e2e.js",
  ],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      "appium:automationName": "UiAutomator2",
      platformName: "android",
      platformName: "android",
      "appium:deviceName": "vivo",
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
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};

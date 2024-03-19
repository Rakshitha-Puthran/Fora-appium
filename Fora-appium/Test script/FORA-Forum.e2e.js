const { expect, browser, $ } = require("@wdio/globals");
const { remote } = require("webdriverio");
const assert = require("assert");
const { Builder, By, Key, until } = require("selenium-webdriver");

describe("fora", () => {
  it("Advisor_Foraemail_TC001", async () => {
    await browser.url("https://advisor.forastaging.net/");
    const signInButton = await $(
      "//button[normalize-space()='Sign in with your Fora email']"
    );
    await signInButton.click();
    await browser.pause(10000);

    const emailinputField = await $("//input[@id='identifierId']");
    await emailinputField.setValue("mqa.mqa020201@forastaging.net");
    await browser.pause(2000);

    const nextButton = await $('//*[@id="identifierNext"]/div/button/span');
    await nextButton.click();
    await browser.pause(2000);

    const password = await $("//input[@name='Passwd']");
    await password.setValue("Qaoncloud@01");
    await browser.pause(3000);
    //const nextButton2 = await $("//*[@id=\"passwordNext\"]/div/button/div[3]")
    const nextButton2 = await $("//span[normalize-space()='Next']");
    await nextButton2.click();
    await browser.pause(2000);
    const continueBtn = await $("//span[normalize-space()='Continue']");
    await continueBtn.click();
    await browser.pause(10000);
    //welcome mqa!
    const welcometext = await $("//h1[normalize-space()='Welcome, mqa!']");
    if (!welcometext.isDisplayed()) {
      throw new Error("Welcome text not displayed");
    }

    //click menu and click forum
    console.log("click menu ");
    const menu = await $('//*[@id="navbar-open"]');
    menu.click();
    const forum = await $("//span[normalize-space()='Forum']");
    forum.click();

    await browser.pause(2000);
    const foratitle = await $("//img[@alt='Fora Forum']");
    if (!foratitle.isDisplayed()) {
      throw new Error("foratitle  not displayed");
    }
    const login = await $("//h1[normalize-space()='Log in to your account']");
    if (!login.isDisplayed()) {
      throw new Error("login  not displayed");
    }
    const continue1 = await $(
      "//button[contains(text(),'Continue with your fora.travel email single sign-o')]"
    );
    if (!continue1.isDisplayed()) {
      throw new Error(
        "Continue with your fora.travel email single sign-on  not displayed"
      );
    }
    const legacy = await $(
      "//button[contains(text(),'Legacy Login: Sign in using your existing email & ')]"
    );
    if (!legacy.isDisplayed()) {
      throw new Error("legacy  not displayed");
    }
    const forgotpass = await $(
      "//a[normalize-space()='Forgot your password?']"
    );
    if (!forgotpass.isDisplayed()) {
      throw new Error("legacy  not displayed");
    }
  });
});

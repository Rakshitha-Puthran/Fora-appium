const { expect, browser, $ } = require("@wdio/globals");
const { remote } = require("webdriverio");
const assert = require("assert");
const { Builder, By, Key, until } = require("selenium-webdriver");

//const { click } = require("webdriverio/build/commands/element");

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
    //click menu and click RESOURCES
    console.log("click menu ");
    const menu = await $('//*[@id="navbar-open"]');
    menu.click();
    const foraEmail = await $("//a[@title='Fora Email']");
    foraEmail.click();
    await browser.pause(10000); // pause for 10 seconds

    // check fields
    const enteremail = await $("//input[@id='identifierId']");
    if (!enteremail.isDisplayed()) {
      throw new Error("enter email not displayed");
    }
    const nextButton1 = await $('//*[@id="identifierNext"]/div/button/span');
    //const nextButton1 = await $(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b");
    if (!nextButton1.isDisplayed()) {
      throw new Error("next Button1  not displayed");
    }
  });
});

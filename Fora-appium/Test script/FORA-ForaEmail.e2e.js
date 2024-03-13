const { expect, browser, $ } = require("@wdio/globals");
const { remote } = require('webdriverio');
const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');

describe("fora", () => {
  

  it("Advisor_Foraemail_TC001", async () => {
    // login 
    await browser.url("https://advisor.forastaging.net/");
    const signInButton = await $("//button[normalize-space()='Sign in with your Fora email']")
    await signInButton.click()   
    //enter valid email ID
    const emailinputField = await $("//input[@id='identifierId']")
    await emailinputField.setValue("mqa.mqa020201@forastaging.net")
    emailinputField.sendKeyEvent(66)
   const nextButton = await $(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b")
   await nextButton.click();
   //enter valid password
   const password = await $("//input[@name='Passwd']");
   await password.setValue("Qaoncloud@01");
   await nextButton.click();
   const continueBtn = await $("//body[1]/div[1]/div[1]/div[2]/div[1]/c-wiz[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/button[1]")
   await continueBtn.click();
   await browser.pause(10000); // pause for 10 seconds

   //welcome mqa!
   const welcometext = await $("//h1[normalize-space()='Welcome, mqa!']")
   if(!welcometext.isDisplayed()) {
   throw new Error("Welcome text not displayed");
   }
  //click menu and click RESOURCES
  console.log("click menu ");
  const menu = await $("//*[@id=\"navbar-open\"]")
  menu.click()
  const foraEmail = await $("//a[@title='Fora Email']")
  foraEmail.click()
  await browser.pause(10000); // pause for 10 seconds
 
  // enter invalid email
  const enteremail = await $("//input[@id='identifierId']");
  if(!enteremail.isDisplayed()) {
    throw new Error("enter email not displayed");
    }  
  const nextButton1 = await $(
    ".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b"
  );
  if(!nextButton1.isDisplayed()) {
    throw new Error("next Button1  not displayed");
    }  
})
})

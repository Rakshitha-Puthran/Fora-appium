const { expect, browser, $ } = require("@wdio/globals");
const { remote } = require('webdriverio');
const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');

describe("fora", () => {
  

  it("Advisor_Resources_TC001", async () => {
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
  const resource = await $("//span[normalize-space()='Resources']")
  resource.click()
  await browser.pause(10000); // pause for 10 seconds
  //resource title
   const resourcetitle = await $("//h1[normalize-space()='Resources']")
   if(!resourcetitle.isDisplayed()) {
   throw new Error("resource title not displayed");
   }

   //email template
   const emailtemp = await $("//p[normalize-space()='Email templates']")
   if(!emailtemp.isDisplayed()) {
   throw new Error("resource title not displayed");
   }

   //Itinerary
   const Itinerary = await $("//p[normalize-space()='Itinerary template']")
   if(!Itinerary.isDisplayed()) {
   throw new Error("Itinerary not displayed");
   }

   //Forms
   const Forms = await $("//p[normalize-space()='Forms']")
   if(!Forms.isDisplayed()) {
   throw new Error("Forms not displayed");
   }

   //Other
   const Other = await $("//p[normalize-space()='Other resources']")
   if(!Other.isDisplayed()) {
   throw new Error("Other not displayed");
   }

 
})
it("Advisor_Resources_TC002", async () => {
//open in google drive - email template
const email = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[2]/dl/div[1]/div/a/span")
email.click()
await browser.pause(10000);
/*const selectaccnt = await $("//*[@id=\"com.google.android.apps.docs.editors.docs:id/alertTitle\"]")
if(!selectaccnt.isDisplayed()) {
    throw new Error("select accnt not displayed");
    }
    
//const cancel = await $("//*[@id=\"android:id/button2\"]")
//const cancel = await $("//button[normalize-space()='Cancel']")
const cancel = await $("//button[@id='android:id/button2']");

cancel.click() */
await browser.pause(10000);
})

it("Advisor_Resources_TC003", async () => {
    //open in google drive - Itinerary
    const Itinerary = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[2]/dl/div[2]/div/a/span")
    Itinerary.click() 
    await browser.pause(10000);

})

it("Advisor_Resources_TC004", async () => {
    //open in google drive - Forms
    const Forms = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[2]/dl/div[3]/div/a/span")
    Forms.click()
    await browser.pause(10000);

})

it("Advisor_Resources_TC005", async () => {
    //open in google drive - Other
    const Other = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[2]/dl/div[4]/div/a/span")
    Other.click()
    await browser.pause(10000);

})

})

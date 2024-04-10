const { expect, browser, $ } = require("@wdio/globals");
const { remote } = require('webdriverio');
const assert = require('assert');
const fs = require('fs-extra');
const path = require('path');
const { Builder, By, Key, until } = require('selenium-webdriver');

describe("fora", () => {
  

  it("Advisor_Cancel_Subscription_TC001", async () => {
    //Check subscription Home page
    
    await browser.url("https://advisor.forastaging.net/");
    const signInButton = await $("//button[normalize-space()='Sign in with your Fora email']")
    await signInButton.click()   
    await browser.pause(5000); 

    const emailinputField = await $("//input[@id='identifierId']")
    await emailinputField.setValue("test.appium@forastaging.net")
    await browser.pause(2000); 

   const nextButton = await $("//*[@id=\"identifierNext\"]/div/button/span")
   await nextButton.click();
   await browser.pause(2000); 

   const password = await $("//input[@name='Passwd']");
   await password.setValue("Qaoncloud@01");
   await browser.pause(3000); 
   //const nextButton2 = await $("//*[@id=\"passwordNext\"]/div/button/div[3]")
  const nextButton2 = await $("//span[normalize-space()='Next']")
   await nextButton2.click();
   await browser.pause(5000); 
   const continueBtn = await $("//span[normalize-space()='Continue']")
   await continueBtn.click();
   await browser.pause(5000); 
   //welcome mqa!
   const welcometext = await $("//h1[normalize-space()='Welcome, mqa!']")
   if(!welcometext.isDisplayed()) {
   throw new Error("Welcome text not displayed");
   }

  //click menu and click profile
  const menu = await $("//*[@id=\"navbar-open\"]")
  menu.click()
  await browser.pause(1000); 
  //click profile
  const profile = await $('//*[@id="side-menu"]/nav/div[3]/a/span[2]')
  profile.click()
  await browser.pause(1000);
  //click cancel subscription
  const cancel = await $("//span[contains(text(),'Cancel your subscription')]")
  cancel.click()
  await browser.pause(1000);

  //check fields
  const subscription = await $('//*[@id="headlessui-dialog-panel-:rn:"]/div');
  const texts = [
  "Are you sure?",
  "Please note that at the end of your billing cycle your account will close and you will lose access to the Fora Advisor Portal and your Fora email.",
  "At this time, we can not accommodate membership pauses.",
  "Continue to cancel",
  ];
  
  for (const text of texts) {
  const isTextPresent = await subscription
    .$(`//*[contains(text(), '${text}')]`)
    .isDisplayed();
  if (isTextPresent) {
    console.log(`"${text}" is present `);
  } else {
    console.error(`"${text}" is not present `);
  }
  }
  await browser.pause(2000); 

  //check close icon
  const close = await $("//span[@class='flex w-full items-center']//*[name()='svg']")
  close.click()
  //cancel sub should show
  const cancelsub = await $("//span[contains(text(),'Cancel your subscription')]")
  const isDisplayed = await cancelsub.isDisplayed();
  await expect(isDisplayed).toBe(true);
  await browser.pause(2000); 
  //click cancel sub
  cancelsub.click()

  })


  it("Advisor_Cancel_Subscription_TC002", async () => {
    //click continue and click keep account
    const continue_cancel = await $("//button[normalize-space()='Continue to cancel']")
    continue_cancel.click()
    //check fields
   const cancel = await $('//*[@id="headlessui-dialog-panel-:rn:"]/div');
  const texts = [
  "Cancel your subscription",
  "Once you cancel your subscription, any future commissions you are owed will be paid once those commissions have been received from the travel partner by Fora.",
  "After you cancel, you will not be charged any further subscription fees and your account will automatically deactivate at the end of the current pay period.",
  "Cancellation reason *",
  "Additional information (optional)",
  "Keep account",
  "Confirm cancel",
  ];
  
  for (const text of texts) {
  const isTextPresent = await cancel
    .$(`//*[contains(text(), '${text}')]`)
    .isDisplayed();
  if (isTextPresent) {
    console.log(`"${text}" is present `);
  } else {
    console.error(`"${text}" is not present `);
  }
  }
  await browser.pause(2000); 
  const keep_account = await $("//button[normalize-space()='Keep account']")
  keep_account.click()
  //cancel sub should display
  const cancelsub = await $("//span[contains(text(),'Cancel your subscription')]")
  const isDisplayed = await cancelsub.isDisplayed();
  await expect(isDisplayed).toBe(true);
  await browser.pause(2000); 
  //click cancel sub
  cancelsub.click()
  const continue_cancel2 = await $("//button[normalize-space()='Continue to cancel']")
  continue_cancel2.click()


  })

  it("Advisor_Cancel_Subscription_TC003", async () => {
    //click confirm cancel
    const confirm = await $("//button[normalize-space()='Confirm cancel']")
    confirm.click()
   //show show error message
   const error = await $('//*[@id="headlessui-dialog-panel-:rn:"]/div/div[2]/div[3]/text()');
   await expect(error).toHaveText("Reason is required");
   await browser.pause(2000); 

}) 
})
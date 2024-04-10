const { expect, browser, $ } = require("@wdio/globals");
const { remote } = require('webdriverio');
const assert = require('assert');
const fs = require('fs-extra');
const path = require('path');
const { Builder, By, Key, until } = require('selenium-webdriver');
let Plan_name,Plan_name2;
let before_creditcard;

describe("fora", () => {
  

  it("Advisor_Marketing_TC001", async () => {
    //To Check Marketing page				
    
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

  //click menu and click marketing
  const menu = await $("//*[@id=\"navbar-open\"]")
  menu.click()
  await browser.pause(1000); 
  const marketing = await $("//span[normalize-space()='Marketing']")
  marketing.click()
  await browser.pause(2000); 

  const marketing_tab1 = await $('//*[@id="tab-fora-web-content"]/div');
  const isDisplayed1 = await marketing_tab1.isDisplayed();
  await expect(isDisplayed1).toBe(true);

  const marketing_tab2 = await $('//*[@id="tab-templates"]/div');
  const isDisplayed2 = await marketing_tab2.isDisplayed();
  await expect(isDisplayed2).toBe(true);

  const marketing_tab3 = await $('//*[@id="tab-brand-assets"]/div');
  const isDisplayed3 = await marketing_tab3.isDisplayed();
  await expect(isDisplayed3).toBe(true);

  
})

it("Advisor_Marketing_TC002", async () => {
  //To Check Marketing page - For web content section			

  const marketing_fields = await $("//div[@id='fora-web-content']");
  const textsToCheck = [
    "Fora Web Content",
    "Fora profile",
  ];
  for (const text of textsToCheck) {
    const isTextPresent = await marketing_fields
      .$(`//*[contains(text(), '${text}')]`)
      .isDisplayed();
    if (isTextPresent) {
      console.log(`"${text}" is present`);
    } else {
      throw new Error(`"${text}" is not present`);
    }
    await browser.pause(2000)
  }
  

  const guide_trip = await $("//p[normalize-space()='Guides & trip reports']").isDisplayed();
  if (guide_trip) {
  console.log(`guide_trip is present`);
  } 
  else 
  {
  throw new Error(`guide_trip is not present`);
  }
  

  const reviews = await $("//p[normalize-space()='Reviews']").isDisplayed();
  if (reviews) {
  console.log(`reviews is present`);
  } 
  else 
  {
    
  throw new Error(`reviews is not present`);
  }

})
})
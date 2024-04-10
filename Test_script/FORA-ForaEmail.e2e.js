const { expect, browser, $ } = require("@wdio/globals");
const { remote } = require('webdriverio');
const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');


//const { click } = require("webdriverio/build/commands/element");

describe("fora", () => {
  

  
  it("Advisor_Foraemail_TC001", async () => {
    //Check if user can access Fora Email				
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
  //click menu and click foraEmail
  console.log("click menu ");
  const menu = await $("//*[@id=\"navbar-open\"]")
  menu.click()
  const foraEmail = await $("//a[@title='Fora Email']")
  foraEmail.click()
  await browser.pause(5000);
 
  const windowHandles = await browser.getWindowHandles();
  // Switch to the new tab
  await browser.switchToWindow(windowHandles[windowHandles.length - 1]);
  await browser.pause(5000); 


  // check fields
  const enteremail = await $("//input[@id='identifierId']");
  if(!enteremail.isDisplayed()) {
    throw new Error("enter email not displayed");
    } 
  const nextButton1 = await $("//*[@id=\"identifierNext\"]/div/button/span")
  if(!nextButton1.isDisplayed()) {
    throw new Error("next Button1  not displayed");
    }  
    await browser.pause(2000); 
  //enter invalid email
    enteremail.setValue("new.tester2@fora.travel")
    await browser.pause(2000); 
    nextButton1.click()
    await browser.pause(5000); 

    const error=await $("/html[1]/body[1]/div[1]/div[1]/div[2]/c-wiz[1]/div[1]/div[2]/div[1]/div[1]/div[1]/form[1]/span[1]/section[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]")
    await expect(error).toHaveText("Couldn’t find your Google Account");
    await browser.pause(2000);
})
})

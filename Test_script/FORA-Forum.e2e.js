const { expect, browser, $ } = require("@wdio/globals");
const { remote } = require('webdriverio');
const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');

describe("fora", () => {
  

  it("Advisor_Forum_TC001", async () => {
 //Forum screen validations
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
  //click menu and click forum
  console.log("click menu ");
  const menu = await $("//*[@id=\"navbar-open\"]")
  menu.click()
  const forum = await $("//span[normalize-space()='Forum']")
  forum.click()
  await browser.pause(2000); 

  const windowHandles = await browser.getWindowHandles();
  // Switch to the new tab
  await browser.switchToWindow(windowHandles[windowHandles.length - 1]);
  await browser.pause(5000); 

  
  const foratitle = await $("//img[@alt='Fora Forum']")
  if(!foratitle.isDisplayed()) {
  throw new Error("foratitle  not displayed");
  }
  const login = await $("//h1[normalize-space()='Log in to your account']")
  if(!login.isDisplayed()) {
  throw new Error("login  not displayed");
  }
  const continue1 = await $("//button[contains(text(),'Continue with your fora.travel email single sign-o')]")
  if(!continue1.isDisplayed()) {
  throw new Error("Continue with your fora.travel email single sign-on  not displayed");
  }
  const legacy = await $("//button[contains(text(),'Legacy Login: Sign in using your existing email & ')]")
  if(!legacy.isDisplayed()) {
  throw new Error("legacy  not displayed");
  }
  const forgotpass = await $("//a[normalize-space()='Forgot your password?']")
  if(!forgotpass.isDisplayed()) {
  throw new Error("legacy  not displayed");
  }
})

it("Advisor_Forum_TC002", async () => {
//Continue with your fora.travel email single sign-on
const continue1 = await $("//button[contains(text(),'Continue with your fora.travel email single sign-o')]")
continue1.click()
await browser.pause(2000); 
const access_blocked = await $("//span[contains(text(),'Access blocked: Fora Travel can only be used withi')]")
  if(!access_blocked.isDisplayed()) {
  throw new Error("access_blocked  not displayed");
  }
await browser.pause(5000); 

//click back button manually
console.log("click back button manually")
await browser.pause(5000); 
})


it("Advisor_Forum_TC003", async () => {
  //Legacy Login
  //screen validation
  const legacy = await $("//button[contains(text(),'Legacy Login: Sign in using your existing email & ')]")
  legacy.click()

  const legacy_page = await $('//*[@id="react-root"]/div');

  await browser.pause(4000); 

  const textsToCheck = [
    "Log in to your account",
    "Email",
    "Password",
    "Sign In",
    "← Back",
    "Forgot your password?",

  ];
  for (const text of textsToCheck) {
    const isTextPresent = await legacy_page
      .$(`//*[contains(text(), '${text}')]`)
      .isDisplayed();
      await browser.pause(2000); 

    if (isTextPresent) {
      console.log(`"${text}" is present`);
    } else {
      throw new Error(`"${text}" is not present`);
    }
    await browser.pause(2000); 
  }

//enter invalid email and password
const email_input = await $("//input[@id='user_email']")
const password_input = await $("//input[@id='user_password']")
const signin_btn = await $("//button[normalize-space()='Sign In']")



email_input.setValue("new.tester@forastaging.net")
password_input.setValue("Aaaaaaaa@1")
await browser.pause(2000); 
signin_btn.click()


const error=await $("//span[contains(text(),'Invalid Email or password.')]")
await expect(error).toHaveText("Invalid Email or password.");
await browser.pause(2000); 

  })

})

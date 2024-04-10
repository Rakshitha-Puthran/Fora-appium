const { expect, browser, $ } = require("@wdio/globals");

describe("fora", () => {
  it("Advisor_Login_TC001", async () => {
    console.log("Login - To Check the advisor portal login page");
    //login page screen validation

    //launch portal
    await browser.url("https://advisor.forastaging.net/");
    await browser.pause(5000);

    console.log("Fora title");
    let title = await $(
      '//*[@id="__next"]/div[2]/div/div/div[2]/div[1]/div/div[1]/img'
    );
    if (!title.isDisplayed()) {
      throw new Error("Fora title is not displayed");
    }

    console.log("Welcome to Fora's Advisor portal");
    let welcome = await $(
      '//*[@id="__next"]/div[2]/div/div/div[2]/div[1]/div/h1'
    );
    if (!welcome.isDisplayed()) {
      throw new Error(
        "Welcome to Fora's advisor portal message is not displayed"
      );
    }

    console.log("Support mail");
    let support = await $(
      '//*[@id="__next"]/div[2]/div/div/div[2]/div[1]/div/p/a'
    );
    if (!support.isDisplayed()) {
      throw new Error("Support email is not displayed");
    }

    console.log("Sign in button");
    let signin = await $(
      '//*[@id="__next"]/div[2]/div/div/div[2]/div[1]/div/div[3]/div/button'
    );
    if (!signin.isDisplayed()) {
      throw new Error("Sign in button is not displayed");
    }
  });

  it("Advisor_Login_TC003", async () => {
    console.log(
      "Login - To Check if user is able to login with invalid credentials"
    );
    //check login with invalid credentials

    // Click the sign-in button
    const signInButton = await $(
      "//button[normalize-space()='Sign in with your Fora email']"
    );
    await signInButton.click();
    await browser.pause(2000);

    // enter invalid email
    const emailinputField = await $("//input[@id='identifierId']");
    await emailinputField.setValue("abcd");
    //click next
    const nextButton1 = await $(
      ".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b"
    );
    await nextButton1.click();
    await browser.pause(5000);
    //error message
    let error1 = await $(
      '//*[@id="yDmH0d"]/c-wiz/div/div[2]/div/div[1]/div/form/span/section/div/div/div[1]/div/div[2]/div[2]/div'
    );
    if (!error1.isDisplayed()) {
      throw new Error("error message not displayed");
    }

    //enter valid email
    await emailinputField.setValue("mqa.mqa020201@forastaging.net");
    await browser.pause(1000);
    //click next
    const nextButton = await $(
      ".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b"
    );
    await nextButton.click();

    //enter invalid password
    const password = await $("//input[@name='Passwd']");
    await password.setValue("123");
    await nextButton.click();
    await browser.pause(2000);
    //error message
    let error2 = await $(
      '//*[@id="yDmH0d"]/c-wiz/div/div[2]/div/div[1]/div/form/span/section[2]/div/div/div[1]/div[2]/div[2]/span'
    );
    if (!error2.isDisplayed()) {
      throw new Error("error message not displayed");
    }
  });

  it("Advisor_Login_TC002", async () => {
    console.log(
      "Login - To Check if user is able to login with valid credentials"
    );
    //check login with valid credentials

    //launch portal
    await browser.url("https://advisor.forastaging.net/");
    await browser.pause(10000);

    // Click the sign-in button
    const signInButton = await $(
      "//button[normalize-space()='Sign in with your Fora email']"
    );
    await signInButton.click();
    //check signin title
    const sigin_title = await $('//*[@id="headingText"]/span');
    if (!sigin_title.isDisplayed()) {
      throw new Error("Sign in title not displayed");
    }
    //check fora travel link
    const fora_travel = await $('//*[@id="headingSubtext"]/span/button');
    if (!fora_travel.isDisplayed()) {
      throw new Error("fora travel link not displayed");
    }
    //click fora travel link
    fora_travel.click();
    //chech developer info
    const developerinfo = await $('//*[@id="dwrFZd0"]');
    if (!developerinfo.isDisplayed()) {
      throw new Error("developer info is not displayed");
    }
    //check example email
    const eg_email = await $('//*[@id="jBjuwf"]/span/div/div/span/div[1]');
    if (!eg_email.isDisplayed()) {
      throw new Error("example email is not displayed");
    }
    //check link
    const link = await $('//*[@id="jBjuwf"]/span/div/div/span/div[2]');
    if (!link.isDisplayed()) {
      throw new Error("sign in link is not displayed");
    }
    //check got it
    const gotIt = await $('//*[@id="jBjuwf"]/div[3]/div/span/span');
    if (!gotIt.isDisplayed()) {
      throw new Error("got it is not displayed");
    }
    //click got it
    gotIt.click();

    //enter valid email ID
    const emailinputField = await $("//input[@id='identifierId']");
    await emailinputField.setValue("mqa.mqa020201@forastaging.net");
    emailinputField.sendKeyEvent(66);
    //click next
    const nextButton = await $(
      ".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b"
    );
    await nextButton.click();
    //enter valid password
    const password = await $("//input[@name='Passwd']");
    await password.setValue("Qaoncloud@01");
    await nextButton.click();
    const continueBtn = await $(
      "//body[1]/div[1]/div[1]/div[2]/div[1]/c-wiz[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/button[1]"
    );
    //click continue
    await continueBtn.click();
    await browser.pause(10000); // pause for 10 seconds

    const welcometext = await $("//h1[normalize-space()='Welcome, mqa!']");
    if (!welcometext.isDisplayed()) {
      throw new Error("Welcome text not displayed after successful login");
    }
    
  });
});

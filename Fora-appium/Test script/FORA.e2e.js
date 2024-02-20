const { expect, browser, $ } = require("@wdio/globals");
let firstMatch = true; // Keep track of the first match

describe("fora", () => {
  it("Launch chrome for fora", async () => {
    console.log("hello");

    // Navigate to the URL with incognito mode enabled
    await browser.url("https://advisor.forastaging.net/");
    await browser.pause(10000); // pause for 10 seconds
  });
  it("sigin in for fora", async () => {
    // Locate the sign-in button
    const signInButton = await $(
      "//button[normalize-space()='Sign in with your Fora email']"
    );
    // Click the sign-in button
    await signInButton.click();
    const emailinputField = await $("//input[@id='identifierId']");
    // Type text into the input field
    await emailinputField.setValue("mqa.mqa020201@forastaging.net");
    emailinputField.sendKeyEvent(66);

    // Find the input field using the XPath expression
    const nextButton = await $(
      ".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b"
    );
    await nextButton.click();

    const password = await $("//input[@name='Passwd']");
    await password.setValue("Qaoncloud@01");
    await nextButton.click();
    const continueBtn = await $(
      "//body[1]/div[1]/div[1]/div[2]/div[1]/c-wiz[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/button[1]"
    );
    await continueBtn.click();
    await browser.pause(10000); // pause for 10 seconds
  });
  it("Validate welcome text", async () => {
    const welcomeTextelement = await $(
      "//h1[normalize-space()='Welcome, mqa!']"
    );
    const welcomeText = await welcomeTextelement.getText();
    // Expected welcome text
    const expectedSubstring = "Welcome, mqa!";

    // Check if the welcomeText includes the expected substring
    if (welcomeText.includes(expectedSubstring)) {
      console.log("Text includes the expected substring!");
    } else {
      console.log("Text does not include the expected substring.");
    }
  });
  it("Validate Hamburger menu ITEMS", async () => {
    //hambuger menu open
    const Hamburger = await $("//button[@id='navbar-open']");
    await Hamburger.click();
    // Find the parent element hamburger menu
    const parentElement = await $(
      ".mt-3.pt-3.pb-4.px-2.flex-1.overflow-hidden.overflow-y-auto"
    );

    // Find child elements
    const childElements = await parentElement.$$("a"); // 'a tag elements' selects all child elements

    // Loop through the child elements and print their tag names
    const textsToCheck = [
      "Home",
      "Bookings",
      "Clients",
      "Partners",
      "Marketing",
      "Training",
      "Resources",
      "Fora Email",
      "Forum",
      "Help",
    ];
    for (const element of childElements) {
      const text = await element.getText(); // Get the text of the current element
      const isDisplayed = await element.isDisplayed(); // Check if the element is displayed
      if (!isDisplayed) {
        console.error(`$(text) is not visible`);
      }
      // Loop through the texts to check
      for (const textName of textsToCheck) {
        if (text.includes(textName)) {
          console.log(`The "${text}" element is present in hamburger menu`);
          // if (!firstMatch) {
          //   browser.pause(5000);
          //   await element.click();
          //   browser.pause(5000);
          //   await Hamburger.click();
          // } else {
          //   firstMatch = false; // Set firstMatch to false after skipping the first match
          // }
        }
      }
    }
  });
  it("validate help menu", async () => {
    // const Hamburger1 = await $("//button[@id='navbar-open']");
    // await Hamburger1.click();
    const helpMenu = await $("//a[@title='Help']");
    await helpMenu.click();

    const searchBox = await $(
      "//input[@placeholder='Find answers and resources']"
    );
    await searchBox.setValue("Policy");

    const searchButton = await $("//a[normalize-space()='Search']");
    await searchButton.click();

    await browser.pause(5000);

    const title = await $(
      "//p[@class='text-2xl font-extrabold text-black mb-2']"
    );
    const Welcome = await title.getText();

    if (Welcome.includes("policy")) {
      console.log('The element contains the text "policy".');
      // Additional actions can be performed here if needed
    } else {
      console.log('The element does not contain the text "policy".');
    }
  });
});

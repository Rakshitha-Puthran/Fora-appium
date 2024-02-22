const assert = require("assert");

describe("fora-homepgae", () => {
  it("launch fora in chrome", async () => {
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
    await emailinputField.setValue("qa.home@forastaging.net");
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
  it("validate company information", async () => {
    //text items
    const companyInformation = await $(
      "//div[@class='flex-1 bg-white rounded border border-stroke shadow-card p-6 md:p-8']"
    );
    const textsToCheck = [
      "IATA#",
      "33520476",
      "MAILING ADDRESS",
      "Fora Travel, Inc.",
      "228 Park Ave South #53272",
      "New York, NY 10003-1502",
      "+1 844-409-FORA (3672)",
      "TO GET PAID",
      "Book through Portal or send",
      "confirmations to",
      "commissions@fora.travel for bookings made outside of Portal",
    ];
    for (const text of textsToCheck) {
      const isTextPresent = await companyInformation
        .$(`//*[contains(text(), '${text}')]`)
        .isDisplayed();
      if (isTextPresent) {
        console.log(`"${text}" is present in company information`);
      } else {
        console.error(`"${text}" is not present in company information`);
      }
    }
  });
  it("validate copy buttons", async () => {
    const companyInformation = await $("//div[contains(@class, 'grid gap-')]");

    // Obtain all copy buttons within companyInformation
    const copyButtons = await companyInformation.$$("button");
    for (const button of copyButtons) {
      // Use const button instead of buttons
      await expect(button).toBeDisplayed()


      await button.click(); // Use button instead of buttons
     // await expect(browser).toHaveClipboardText('')


    }
  });
  it("Validate schedule advisor kickoff", async () => {
    browser.pause(5000);


        const advisorKickoff = await $(
      "//body/div[@id='__next']/div[@class='jsx-c8ce0ad902ae85f4 min-h-screen']/div[@id='main-container']/main[@class='jsx-c8ce0ad902ae85f4 flex-1']/div[@class='jsx-c8ce0ad902ae85f4 p-6 md:py-12 md:px-16']/div[@class='container-1440']/div[@class='max-w-']/div[@id='calendly-container']/div[1]"
    );
    if (advisorKickoff.isDisplayed()) {
      console.log("element is visible");
    } else {
      console.log("element is not visible ");
    }
    browser.pause(5000);

    //dropdown button
    const dropdown = await $(
      "//div[@class='flex items-center gap-2']//*[name()='svg']"
    );
    await dropdown.click();
    // Wait for the advisorKickoff element to become invisible
    await browser.waitUntil(async () => !(await advisorKickoff.isDisplayed()), {
      timeout: 5000,
      timeoutMsg:
        "advisorKickoff element did not become invisible after clicking dropdown",
    });

    await dropdown.click();
    browser.pause(5000);
  });
});

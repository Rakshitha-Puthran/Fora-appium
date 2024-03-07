import assert from "assert";

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
    await emailinputField.setValue("automation1708673541367@forastaging.net");
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
    const copyButton1 = await $(
      "//button[@data-tooltip-id='IATA']//*[name()='svg']"
    );
    await copyButton1.isDisplayed();
    await copyButton1.click();
    await browser.pause(5000);
    await expect(browser).toHaveClipboardText("33520476");

    //  const copyButton2= await $("//button[@data-tooltip-id='Mailing Address']//*[name()='svg']")
    //  await copyButton2.isDisplayed()
    //  await copyButton2.click()
    //  await browser.pause(5000)
    //  const receivedText = await browser.getClipboard();
    //  //const receivedArray = receivedText.split('\n').map(text => text.trim());

    //  const expectedArray = ["Fora Travel, Inc. 228 Park Ave South #53272 New York, NY 10003-1502"];

    //  await expect(receivedText).toEqual(expectedArray);

    const copyButton3 = await $(
      "//button[@data-tooltip-id='Phone Number']//*[name()='svg']"
    );
    await copyButton3.isDisplayed();
    await copyButton3.click();
    await browser.pause(5000);
    await expect(browser).toHaveClipboardText("+1 844-409-3672");

    const copyButton4 = await $(
      "//button[@data-tooltip-id='Commission Email']//*[name()='svg']"
    );
    await copyButton4.isDisplayed();
    await copyButton4.click();
    await browser.pause(5000);
    await expect(browser).toHaveClipboardText("commissions@fora.travel");
  });
});

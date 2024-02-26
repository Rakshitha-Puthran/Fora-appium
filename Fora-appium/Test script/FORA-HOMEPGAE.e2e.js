describe("Validate homepage", () => {
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
  it("jump right into book", async () => {
    const expectedTexts = [
      "Add your first client (even add yourself!)",
      "Explore preferred partners and experiences to find the right match",
      'Learn how to make bookings with our video library "Book Your Client" (18 lessons to choose from), our step-by-step guide (25 mins.), or join us at Booking Bootcamp (30 mins.) to work with someone on your first booking',
    ];

    const liElement1 = await $("//li[contains(text(),'Add your first')]");
    const liElement2 = await $(
      "//li[contains(text(),'Explore preferred partners and experiences to find')]"
    );
    const liElement3 = await $(
      "//li[contains(text(),'Learn how to make bookings with our video library')]"
    );

    const text1 = await liElement1.getText();
    console.log("element 1 ", text1);
    const text2 = await liElement2.getText();
    console.log("element 2 ", text2);

    const text3 = await liElement3.getText();
    console.log("element 3 ", text3);

    if (text1 === expectedTexts[0]) {
      console.log("Text 1 is present");
    } else {
      console.error("Text 1 is missing");
    }

    if (text2 === expectedTexts[1]) {
      console.log("Text 2 is present");
    } else {
      console.error("Text 2 is missing");
    }

    if (text3 === expectedTexts[2]) {
      console.log("Text 3 is present");
    } else {
      console.error("Text 3 is missing");
    }
    const body = await $("//div[3]//ul[1]");
    const clickAbleElements = await body.$$("a");
    for (const element of clickAbleElements) {
      await element.click();
      console.log("element clicked", element);
      await browser.pause(5000); // "await" is added here to ensure the pause happens before navigating back
      await browser.back();
    }
  });
});

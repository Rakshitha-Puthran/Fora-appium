module.exports = {
  login: async () => {
    console.log("hello");

    // Navigate to the URL with incognito mode enabled
    await browser.url("https://advisor.forastaging.net/");
    await browser.pause(10000); // pause for 10 seconds
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
  },
};

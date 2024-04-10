//Advisor_Home_TC002
//always use a new account to schedule a call
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
  it("Validate schedule advisor kickoff", async () => {
    //check the title and sub heading
    const title = await $("//div[@class='flex items-center gap-2']");
    await expect(title).toHaveText("Schedule an Advisor kickoff call");

    const subheading = await $("//p[@class='text-secondary mt-2']");
    await expect(subheading).toHaveText(
      "Highly recommended 45-minute session. Connect with other new advisors and learn the essentials to getting started."
    );

    const advisorKickoff = await $(
      "//body/div[@id='__next']/div[@class='jsx-c8ce0ad902ae85f4 min-h-screen']/div[@id='main-container']/main[@class='jsx-c8ce0ad902ae85f4 flex-1']/div[@class='jsx-c8ce0ad902ae85f4 p-6 md:py-12 md:px-16']/div[@class='container-1440']/div[@class='max-w-']/div[@id='calendly-container']/div[1]"
    );
    await advisorKickoff.isDisplayed();

    //dropdown button
    const dropdown = await $(
      "//div[@class='flex items-center gap-2']//*[name()='svg']"
    );
    await dropdown.isDisplayed();

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
  it("Validate schedule advisor kickoff", async () => {
    //check the title and sub heading
    const title = await $("//div[@class='flex items-center gap-2']");
    await expect(title).toHaveText("Schedule an Advisor kickoff call");

    const subheading = await $("//p[@class='text-secondary mt-2']");
    await expect(subheading).toHaveText(
      "Highly recommended 45-minute session. Connect with other new advisors and learn the essentials to getting started."
    );

    
    const advisorKickoff = await $(
      "//body/div[@id='__next']/div[@class='jsx-c8ce0ad902ae85f4 min-h-screen']/div[@id='main-container']/main[@class='jsx-c8ce0ad902ae85f4 flex-1']/div[@class='jsx-c8ce0ad902ae85f4 p-6 md:py-12 md:px-16']/div[@class='container-1440']/div[@class='max-w-']/div[@id='calendly-container']/div[1]"
    );
    await advisorKickoff.isDisplayed();

    //dropdown button
    const dropdown = await $(
      "//div[@class='flex items-center gap-2']//*[name()='svg']"
    );
    await dropdown.isDisplayed();

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
  it("schedule a call ", async () => {
    await browser.waitUntil(
      async () => {
        const iframe = await browser.$(
          "//iframe[@title='Calendly Scheduling Page']"
        );
        return iframe.isExisting();
      },
      { timeout: 10000, timeoutMsg: "Iframe not found" }
    );

    // Now switch to the iframe
    const frame = await browser.$(
      "//iframe[@title='Calendly Scheduling Page']"
    );
    await browser.switchToFrame(frame);
    //to accept cookies
    const acceptCokkies = await $(
      "//button[@id='onetrust-accept-btn-handler']"
    );
    await acceptCokkies.isDisplayed();
    await acceptCokkies.click();
    // Find the button inside the td element
    const button = await browser.$$(
      "//button[contains(@class, 'u1xbh6v5')][contains(@class, 'o5PJ_9jHomezuy5op7Th')][contains(@class, 'gyO7ZjgvT__guDnWiKg5')][contains(@class, 'mIJUmpwwZd5mH9SMq9XQ')]"
    );

    // Click the available datee
    await button[0].click();

    //select time slot button to select thee time here we are clickinng the second element
    const timeSlot = await browser.$$(
      "//button[@data-container='time-button']"
    );
    await timeSlot[1].isDisplayed();
    await timeSlot[1].click();

    //next button
    const nextButton = await $(
      "//button[contains(@class, 'u1xbh6v5') and contains(@class, '_NBjM8Q6c03EfxjK90hm') and contains(@class, '_wYinQZCx29_pxs0TZnM') and contains(@class, 'Iy168r_YSkmFtzeEXUss') and contains(@class, 'uoYd30C1K4Sdef0CubtJ') and contains(@class, 'tg_cqD7Ia3z_hRQg_eyg')]"
    );
    await nextButton.isDisplayed;
    await nextButton.click();

    //ENTER DETAILS TO SCHEDULE CALL
    //name
    const name = await $("//input[@id='full_name_input']");
    await $(name).setValue("automation appium");

    //email
    const email = await $("//input[@id='email_input']");
    await $(email).setValue("reenaz+1708673541366@qaoncloud.com");

    //schedule event button
    const scheduleEvent = await $(
      "//button[contains(span/text(), 'Schedule Event')]"
    );
    await $(scheduleEvent).click();

    await browser.pause(10000);

    //heading after scheduling a call
    const postSchedulingTitle = await $(
      "//h2[contains(text(), 'You are scheduled for an Advisor kickoff call')]"
    );
    await $(postSchedulingTitle).toHaveText(
      "You are scheduled for an Advisor kickoff call"
    );
  });
});

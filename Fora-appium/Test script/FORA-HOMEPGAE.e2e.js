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
    await emailinputField.setValue("new.call@forastaging.net");
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
  it("Learn fundamentals", async () => {
    const LearnfundamentalsTitle = await $(
      "//p[normalize-space()='Learn the fundamentals']"
    );
    await expect(LearnfundamentalsTitle).toHaveText("Learn the fundamentals");

    const contents = await $$(
      "//ul[@class='list-disc ml-4 md:ml-20 text-secondary']"
    );
    await expect(contents[0]).toHaveTextContaining([
      "Ready to book? See “Jump right in to book” below",
      "Feeling lost? Here are the essential materials to get started:",
      'Watch "Welcome to Fora! Getting Started" (38 mins.) to understand what to expect on your Fora Advisor journey',
      'Review "Need to know" (3 mins.) and the glossary of common acronyms',
      "Follow our guided Certified",
    ]);
    const links = await contents[0].$$("a");
    // Click all links in the learn fundamentals section
    const linkTexts = [
      "getting-started",
      "training-need-to-know",
      "advisor-glossary",
      "training#getting-started",
    ];

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const linkText = linkTexts[i];

      await link.click();
      await expect(browser).toHaveUrlContaining(linkText);

      await browser.back(); // Go back to the previous page for the next iteration
    }
  });
  it("engage with fora community", async () => {
    const title = await $$(
      "//*[@class='flex items-center']/p[contains(@class, 'text-staticMobileTitle')]"
    );
    await expect(title[1]).toHaveText("Engage with Fora’s community");
    const contents = await $$(
      "//ul[@class='list-disc ml-4 md:ml-20 text-secondary']"
    );
    await expect(contents[1]).toHaveTextContaining([
      "Schedule your Advisor Kickoff call!",
      "After your Advisor Kickoff:",
      "Only have time for one more live event? Sign up for Certified Office Hours (45 mins.) to ask our HQ team questions",
      "Have a bit more time? Start joining Certified Labs (45 mins.) to develop your skills",
      "Introduce yourself in Forum, your community platform and get help from other new Advisors in the Chat",
      "Access your Fora Email on the left and watch this tutorial to set up your email signature",
    ]);
    // const links = await contents[1].$$("a");
    // for (let i = 0; i < links.length; i++) {
    //   const link = links[i];
    //   //const linkText = linkTexts[i];

    //   await link.click();
    //   //await expect(browser).toHaveUrlContaining(linkText);

    //   await browser.back(); // Go back to the previous page for the next iteration
    // }
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

    expect(await liElement1.getText()).toBe(expectedTexts[0]);
    expect(await liElement2.getText()).toBe(expectedTexts[1]);
    expect(await liElement3.getText()).toBe(expectedTexts[2]);

    const body = await $("//div[3]//ul[1]");
    // const clickAbleElements = await body.$$("a");
    // for (const element of clickAbleElements) {
    //   await element.click();
    //   console.log("element clicked", element);
    //   await browser.pause(5000); // "await" is added here to ensure the pause happens before navigating back
    //   await browser.back();
    // }
  });
  it("validate bookings section", async () => {
    // Check the title of the bookings
    const bookingsTitle = await $(
      "h2.text-header.font-bold.mt-0.md\\:mt-\\[6px\\].custom-m-6"
    );
    await expect(bookingsTitle).toHaveText("Bookings");

    // Check whether booking filter is visible
    const filter = await $(
      "//div[@class='md:relative inline-block text-left w-full md:w-auto']"
    );
    const assert = await filter.isDisplayed();
    console.log(assert);

    // Check the text content of bookings body
    const bookingsBody = await $(
      "//div[@class='flex flex-col flex-wrap sm:flex-row flex-start min1306:flex-nowrap items-start min1306:flex-row gap-8 sm:gap-6 md:gap-4 min1306:gap-0 mb-4 min1306:items-start']"
    );
    await expect(bookingsBody).toHaveTextContaining([
      "BOOKINGS",
      "YOUR TOTAL COMMISSION",
      "TOTAL COMMISSIONABLE VALUE",
      "PAID",
      "PENDING",
      "FUTURE",
    ]);

    await filter.click();

    const filterOptions = await $$(
      ".block.py-2.text-medium.font-normal.text-main.px-4.mb-2.last\\:mb-0.cursor-pointer.hover\\:bg-successLight.hover\\:font-bold"
    );

    for (const option of filterOptions) {
      await option.click();
      await browser.pause(2000);
      await filter.click();
      // Add any additional logic here if needed
    }

    //view theese bookings link
    const link = await $("//a[normalize-space()='View these bookings']");
    await link.click();
    await expect(browser).toHaveUrlContaining("bookings");
  });
});

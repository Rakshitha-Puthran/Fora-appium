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
    await emailinputField.setValue("regression.test22@forastaging.net");
    emailinputField.sendKeyEvent(66);
    await browser.pause(10000); // pause for 10 seconds

    // Find the input field using the XPath expression
    const nextButton = await $("//span[normalize-space()='Next']");
    await nextButton.click();
    await browser.pause(10000); // pause for 10 seconds

    const password = await $("//input[@name='Passwd']");
    await password.setValue("Qaoncloud@01");
    await nextButton.click();
    await browser.pause(5000);
    const continueBtn = await $("//span[normalize-space()='Continue']");
    await continueBtn.click();
    await browser.pause(10000); // pause for 10 seconds
  });
  it("Advisor_Home_TC001  ", async () => {
    //check the banner info
    const banners = await $$('//*[@data-testid="banner-info"]');
    for (const banner of banners) {
      await banner.isDisplayed();
      // You can handle or assert based on isDisplayed value as needed
    }

    //check welcome text
    const welcomeText = await $(
      '//h1[@class="text-titleLH36 lg:text-jumbo font-extrabold text-main mb-4 md:mb-6"]'
    );
    await expect(welcomeText).toHaveTextContaining("Welcome");

    const Scheduleadvisorcall = await $('//div[@id="calendly-container"]');
    await Scheduleadvisorcall.isDisplayed();
    //check learnFundamentals
    const LearnfundamentalsTitle = await $(
      "//p[normalize-space()='Learn the fundamentals']"
    );
    await expect(LearnfundamentalsTitle).toHaveText("Learn the fundamentals");
    //Engage with Fora’s community
    const title = await $$(
      "//*[@class='flex items-center']/p[contains(@class, 'text-staticMobileTitle')]"
    );
    await expect(title[1]).toHaveText("Engage with Fora’s community");
    const jumprightIntoBook = await $$(
      'div[class="p-4 lg:p-8 bg-white border border-stroke rounded"]'
    );
    await jumprightIntoBook[2].isDisplayed();
    const bookingInfo = await $(
      '//div[contains(@class,"flex-1 bg-white rounded border border-stroke shadow-card p-6 md:p-8")]'
    );
    await bookingInfo.isDisplayed();

    const bookingSection = await $(
      '//div[contains(@class,"flex-1 bg-white rounded border border-stroke shadow-card py-4 px-8")]'
    );
    await bookingSection.isDisplayed();
  });
  it("Advisor_Home_TC003  ", async () => {
    const LearnfundamentalsTitle = await $(
      "//p[normalize-space()='Learn the fundamentals']"
    );
    await expect(LearnfundamentalsTitle).toHaveText("Learn the fundamentals");

    const contents = await $$(
      "//ul[contains(@class, 'list-disc') and contains(@class, 'ml-4') and contains(@class, 'md:ml-20') and contains(@class, 'text-secondary')]"
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

    for (let i = 0; i < links.length; i++) {
      const link = links[i];

      await link.click();
      await expect(browser).toHaveUrlContaining("training");
      await browser.pause(10000);
      await browser.back(); // Go back to the previous page for the next iteration
      if ((await browser.getUrl()) !== "https://advisor.forastaging.net/") {
        await browser.back();
      }
    }
  });
  it("Advisor_Home_TC004  ", async () => {
    //engage with fora community
    const title = await $$(
      "//*[@class='flex items-center']/p[contains(@class, 'text-staticMobileTitle')]"
    );
    await expect(title[1]).toHaveText("Engage with Fora’s community");
    const contents = await $(
      "(//ul[@class='list-disc ml-4 md:ml-20 text-secondary'])[2]"
    );
    await expect(contents).toHaveTextContaining([
      "Schedule your Advisor Kickoff call!",
      "After your Advisor Kickoff:",
      "Only have time for one more live event? Sign up for Certified Office Hours (45 mins.) to ask our HQ team questions",
      "Have a bit more time? Start joining Certified Labs (45 mins.) to develop your skills",
      "Introduce yourself in Forum, your community platform and get help from other new Advisors in the Chat",
      "Access your Fora Email on the left and watch this tutorial to set up your email signature",
    ]);
    const Schedulecallbtn = await $(
      '//span[@class="text-link hover:text-blue-600 cursor-pointer"]'
    );
    await Schedulecallbtn.isClickable();
    await Schedulecallbtn.click();
    await browser.pause(10000);

    const links = await contents.$$("a");
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const linkText = [
        "sign_in",
        "sign_in",
        "sign_in",
        "sign_in",
        "mail",
        "help/articles/how-do-i-customize-my-email-signature",
      ];
      await link.click();
      await expect(browser).toHaveUrlContaining(linkText[i]);

      await browser.back(); // Go back to the previous page for the next iteration
      // Check if the current URL is not equal to "https://advisor.forastaging.net/"
      if ((await browser.getUrl()) !== "https://advisor.forastaging.net/") {
        await browser.back();
      }
    }
  });
  it("Advisor_Home_TC005  ", async () => {
    //jump right into book
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
    const contents = await $$(
      "//ul[contains(@class, 'list-disc') and contains(@class, 'ml-4') and contains(@class, 'md:ml-20') and contains(@class, 'text-secondary')]"
    );
    const clickAbleElements = await contents[2].$$("a");
    for (const element of clickAbleElements) {
      await element.click();
      console.log("element clicked", element);
      await browser.pause(5000); // "await" is added here to ensure the pause happens before navigating back
      await browser.back();
      let currentUrl = await browser.getUrl();
      while (currentUrl !== "https://advisor.forastaging.net/") {
        await browser.back();
        currentUrl = await browser.getUrl();
      }
    }
  });
  it("Advisor_Home_TC006  ", async () => {
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
    //validate copy buttons
    const copyButton1 = await $$(
      '//button[@class="w-6 h-6 md:w-8 md:h-8 shrink-0 flex items-center justify-center rounded text-secondary cursor-pointer"]'
    );
    await copyButton1[0].isDisplayed();
    await copyButton1[0].click();
    await expect(browser).toHaveClipboardText("33520476");
    await browser.pause(5000);
    //second copy button is commented out because UNABLE TO SEE THE copied text from the mobile
    // await copyButton1[1].isDisplayed();
    // await copyButton1[1].click();
    // await browser.pause(5000);
    // const receivedText = await browser.getClipboard();

    // const expectedArray = [
    //   "Fora Travel, Inc. 228 Park Ave South #53272 New York, NY 10003-1502",
    // ];

    // await expect(receivedText).toEqual(expectedArray);

    await copyButton1[2].isDisplayed();
    await copyButton1[2].click();
    await browser.pause(5000);
    await expect(browser).toHaveClipboardText("+1 844-409-3672");
  });
  it("Advisor_Home_TC008 ", async () => {
    //validate bookings section
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
    await browser.pause(5000);
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

describe("Fora clients credit card", () => {
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
    await browser.pause(5000); // pause for 10 seconds

    // Find the input field using the XPath expression
    const nextButton = await $("//span[normalize-space()='Next']");
    await nextButton.click();
    await browser.pause(5000); // pause for 10 seconds

    const password = await $("//input[@name='Passwd']");
    await password.setValue("Qaoncloud@01");

    await nextButton.click();
    await browser.pause(5000);
    const phoneNumber = await $("//input[@id='phoneNumberId']");
    await phoneNumber.setValue("8248339107");

    const something = await $("div[id='headingSubtext'] span");
    await something.click();

    await browser.scroll(0, 400);

    const sendButton = await $("//span[normalize-space()='Send']");
    await sendButton.click();

    await browser.pause(30000);
    const next = await $("//span[normalize-space()='Next']");
    await next.click();
    const continueBtn = await $("//span[normalize-space()='Continue']");
    await continueBtn.click();
    await browser.pause(5000); // pause for 10 seconds
  });
  it("check add credit card", async () => {
    //Enter client section
    const Hamburger = await $("//button[@id='navbar-open']");
    await Hamburger.click();

    const clientsMenuOption = await $("a[title='Clients']");
    const isDisplayed = await clientsMenuOption.isDisplayed();
    await expect(isDisplayed).toBe(true); // Assert that the menu option is displayed

    // Click on the clients menu option
    await clientsMenuOption.click();
    await browser.pause(7000);
    const clientCard = await $(
      'a[href="/clients/4f1ed997-ab88-46d4-a70f-a6a095608db4"]'
    );
    const condition = await clientCard.isDisplayed();
    if (condition) {
      await clientCard.click();
    }
    await browser.scroll(0, 800);
    const creditCardSection = await $(
      "//body/div[@id='__next']/div[@class='jsx-c8ce0ad902ae85f4 min-h-screen']/div[@id='main-container']/main[@class='jsx-c8ce0ad902ae85f4 flex-1']/div[@class='jsx-c8ce0ad902ae85f4 p-6 md:py-12 md:px-16']/div[@class='container-1440']/div[@class='grid xl:grid-cols-2 gap-6 items-start mb-6']/div[1]/div[1]"
    );
    await creditCardSection.isDisplayed();

    //check the add button inn credit CARD SECTION
    const addCreditCard = await $("//button[normalize-space()='Add']");
    await addCreditCard.isDisplayed();
    await addCreditCard.click();
    //check the pop after completing 2 factor authentication
    const popUp = await $(
      "div[class='text-headerFS24 lg:text-header font-bold']"
    );
    await expect(popUp).toHaveText("Securely add client’s credit card");
    //check the copy link button
    const copyLinkButton = await $(
      "//span[@class='pl-4 cursor-pointer text-medium font-bold text-link hover:underline m-auto']"
    );
    await copyLinkButton.click();
    //check the tick mark after clicking copy link
    const tickMark = await $(
      "//span[@class='pl-4 cursor-pointer text-medium font-bold text-link hover:underline m-auto']//*[name()='svg']"
    );
    await tickMark.isDisplayed();

    //CHECK ENTER MANUALLY LINK
    const enterManuallyLink = await $(
      "//span[@class='cursor-pointer text-medium font-bold text-link hover:underline']"
    );
    await enterManuallyLink.click();
  });

  it("check enter cardd details page", async () => {
    await browser.pause(5000);
    //check go back link
    const gobackLink = await $(
      "//div[@class='mb-6 lg:mb-4']//div[@class='mb-2']"
    );
    await gobackLink.isDisplayed();
    await gobackLink.click();
    //check the title after navigating back
    const Title = await $("//div[@class='mb-6 lg:mb-4']");
    await expect(Title).toHaveText([
      "Securely add client’s credit card\nCopy this link and send to clients",
    ]);
    //CHECK ENTER MANUALLY LINK
    const enterManuallyLink = await $(
      "//span[@class='cursor-pointer text-medium font-bold text-link hover:underline']"
    );
    await enterManuallyLink.click();
    await browser.pause("5000");
    //check the close buttonn
    const closeButton = await $$("//form[@action='#']//*[name()='svg']");
    await closeButton[0].isDisplayed();
    //check the form whether they havve the following text
    const form = $("//form[@action='#']");
    await expect(form).toHaveText([
      "Card information\nCardholder name\nNickname (optional)\nBilling Address\nCountry or region\nAddress\nApt number\nsuite\nfloor, etc.\nCity\nState\nZip code (postcode)",
    ]);
    //click the save button before entering any data
    const saveBtn = await $("//button[@id='btnSubmit']");
    await saveBtn.isDisplayed();
    await saveBtn.click();

    //check the validation message displayed
    const validationMessage = await $(
      "div[class='mb-6 [&:not(:empty)]:-mt-4']"
    );
    await expect(validationMessage).toHaveText([
      "Card number is required.",
      "Expiring date is required.",
      "CVC is required.",
    ]);
    const cardHolderValidation = await $(
      "//div[@class='w-full']//div//div[@class='my-1 text-medium text-error items-start whitespace-pre-wrap flex'][normalize-space()='This field is required.']"
    );
    await expect(cardHolderValidation).toHaveText("This field is required.");
    async function checkvalidationMessage(i) {
      //enter inavalid card number and check validation messgae
      const cardNumberInputBox = await $(
        '//input[@id="data" and @name="cardNumber"]'
      );
      await cardNumberInputBox.setValue(i);
      const cardHolderLabel = await $(
        "//span[@class='block mb-1 text-medium font-bold text-label']"
      );
      await cardHolderLabel.click();
      const cardNumberValidation = await $(
        "//div[@class='my-1 text-medium text-error items-start whitespace-pre-wrap flex']"
      );
      await expect(cardNumberValidation).toHaveText("Invalid card number.");
      await cardNumberInputBox.click();
      await browser.keys(["Ctrl", "a"]);
      await browser.keys(["Backspace"]);
    }
    await checkvalidationMessage(4242);
    await checkvalidationMessage(" ");
  });
});

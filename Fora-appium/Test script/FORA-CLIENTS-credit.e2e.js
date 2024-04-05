const assert = require("assert");
const { brotliCompress } = require("zlib");
//here we are checking the add credit card section after enabling 2 factor authenticatipon for ann account

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
    await emailinputField.setValue("automation1711090348057@forastaging.net");
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
  it("Advisor_Clients_TC007 ", async () => {
    // check add credit card
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
    const addCreditCard = await $(
      "//button[@class='lg:mt-auto flex justify-center gap-1 items-center text-medium font-bold text-secondary rounded bg-white border border-lightGreyBorder cursor-pointer hover:bg-lightGreyBg p-2 whitespace-nowrap']"
    );
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

  it("Advisor_Clients_TC007", async () => {
    //here we are checking the add credit card section after enabling 2 factor authenticatipon for ann account
    await browser.pause(5000);

    //check the form whether they havve the following text
    const form = $("//form[@action='#']");
    await expect(form).toHaveTextContaining([
      "Card information",
      "Cardholder name",
      "Nickname (optional)",
      "Billing Address",
      "Country or region",
      "Address",
      "Apt number",
      "suite",
      "floor, etc.",
      "City",
      "State",
      "Zip code (postcode)",
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
      "Card number is required.\nExpiring date is required.\nCVC is required.",
    ]);
    const cardHolderValidation = await $(
      "//div[@class='w-full']//div//div[@class='my-1 text-medium text-error items-start whitespace-pre-wrap flex'][normalize-space()='This field is required.']"
    );
    await browser.pause("5000");
    await expect(cardHolderValidation).toHaveText("This field is required.");
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
    await browser.pause("10000");

    //check the close buttonn
    const closeButton = await $$("//form[@action='#']//*[name()='svg']");
    await closeButton[0].isDisplayed();

    // Now you are inside the iframe context
    // Locate the input field within the iframe and enter a value into it
    async function checkvalidationMessage(i) {
      // Locate the iframe element
      const iframe = await $("//iframe[@id='tx_iframe_tokenExIframeDivPCI']");

      // Switch to the iframe context
      await browser.switchToFrame(iframe);
      //enter inavalid card number and check validation messgae
      const cardNumberInputBox = await $("#data");
      await cardNumberInputBox.setValue(i);
      // Switch back to the default context if needed
      await browser.switchToParentFrame();

      const cardHolderLabel = await $(
        "//span[@class='block mb-1 text-medium font-bold text-label']"
      );
      await cardHolderLabel.click();
      const cardNumberValidation = await $(
        "//div[@class='my-1 text-medium text-error items-start whitespace-pre-wrap flex']"
      );
      await expect(cardNumberValidation).toHaveText("Invalid card number.");
    }
    await checkvalidationMessage(4242);
    const iframe1 = await $("//iframe[@id='tx_iframe_tokenExIframeDivPCI']");
    await browser.switchToFrame(iframe1);
    const cardNumberInputBox1 = await $("#data");
    await cardNumberInputBox1.click();
    // Use keyboard shortcuts to select and clear the input field
    await browser.keys(["Control", "a"]); // Select all
    await browser.keys("Backspace"); // Clear the input field

    await cardNumberInputBox1.setValue("4242424242424242");
    await browser.switchToParentFrame();
    const cardHolderLabel1 = await $(
      "//span[@class='block mb-1 text-medium font-bold text-label']"
    );
    await cardHolderLabel1.click();
    const cardNumberValidation = await $(
      "//div[@class='my-1 text-medium text-error items-start whitespace-pre-wrap flex']"
    );
    // Assertion to ensure the element is not displayed
    await expect(cardNumberValidation).not.toBeDisplayed();

    //check month input box by entering passed date
    const monthInput = await $("//input[@id='expiringDate']");
    await monthInput.isDisplayed();
    await monthInput.setValue("2/22");
    await cardHolderLabel1.click();
    const cardHolderValidation1 = await $(
      ".my-1.text-medium.text-error.items-start.whitespace-pre-wrap.flex"
    );
    await expect(cardHolderValidation1).toHaveText(
      "Date in the past is not allowed."
    );
    //check month input box by entering incomplete date
    await monthInput.click();
    await browser.keys(["Control", "a"]); // Select all
    await browser.keys(["Backspace"]);
    await monthInput.setValue("2/2");
    await cardHolderLabel1.click();
    await expect(cardHolderValidation1).toHaveText("Enter month and year");

    //enter proper date
    await monthInput.click();
    await browser.keys(["Control", "a"]); // Select all
    await browser.keys(["Backspace"]);
    await monthInput.setValue("2/30");
    await cardHolderLabel1.click();
    assert.strictEqual(
      await cardNumberValidation.isDisplayed(),
      false,
      "Element should not be visible"
    );
    const cvvIframe = await $("//iframe[@id='tx_iframe_cvvID']");
    await browser.switchToFrame(cvvIframe);
    //check cvv input box
    const cvvInputBox = await $('input[placeholder="CVC"]');
    await cvvInputBox.setValue("1");
    await browser.switchToParentFrame();
    await cardHolderLabel1.click();
    const cvvValidation = await $(
      ".my-1.text-medium.text-error.items-start.whitespace-pre-wrap.flex"
    );
    await expect(cvvValidation).toHaveText("CVC: Enter 3 or 4 digits.");
    //chek cvv input box by enter space character
    await browser.switchToFrame(cvvIframe);
    await cvvInputBox.click();
    await browser.keys(["Control", "a"]); // Select all
    await browser.keys(["Backspace"]);
    await cvvInputBox.setValue(" ");
    await browser.switchToParentFrame();
    await expect(cvvValidation).toHaveText("CVC: Enter 3 or 4 digits.");
    //check cvv innout box by entering proper values
    await browser.switchToFrame(cvvIframe);
    await cvvInputBox.click();
    await browser.keys(["Control", "a"]); // Select all
    await browser.keys(["Backspace"]);
    await cvvInputBox.setValue("222");
    await browser.switchToParentFrame();
    await cardHolderLabel1.click();
    await cvvValidation.waitForDisplayed({ reverse: true });

    // Assertion to ensure the element is not displayed
    expect(await cvvValidation.isDisplayed()).toBe(false);
    //check the cardholder name input box by setting space character

    const cardHolderInput = await $("//input[@id='cardHolder']");
    await cardHolderInput.isDisplayed();

    await cardHolderInput.setValue(" ");
    const holderNmaeLabel = await $(
      "//label[normalize-space()='Cardholder name']"
    );

    await holderNmaeLabel.click();
    const HolderNameValidation = await $(
      "//div[@class='my-1 text-medium text-error items-start whitespace-pre-wrap flex']"
    );
    await expect(HolderNameValidation).toHaveText("This field is required.");
    await cardHolderInput.setValue("testing");

    //check nick name label whether it has optional
    const nickNameOptional = await $(
      "//label[normalize-space()='Nickname (optional)']"
    );
    await expect(nickNameOptional).toHaveTextContaining("optional");
    const nickNameInput = await $("//input[@id='nickname']");
    await nickNameInput.isDisplayed();
    await nickNameInput.setValue("test");
    await nickNameOptional.click();

    //check billing address
    const billingAddressBody = await $(
      "//div[@class='grid grid-cols-6 gap-y-6 gap-x-4']"
    );
    await billingAddressBody.isDisplayed();
    await browser.pause(10000);
    // //check country dropdown select usa option
    const country_dropdwn1 = await $('//input[@id="country_id"]');
    await country_dropdwn1.click();
    await country_dropdwn1.setValue("United States of America");
    await browser.pause(10000);
    await browser.keys("\uE007");
    //check address field
    const address = await $("//label[normalize-space()='Address']");
    await expect(address).toHaveText("Address");

    //check address field place holder
    const addressInputBox = await $("//input[@id='address']");
    //check validation mesage
    await addressInputBox.click();
    await address.click();
    const validation = await $(
      ".my-1.text-medium.text-error.items-start.whitespace-pre-wrap.flex"
    );
    await expect(validation).toHaveText("This field is required.");
    const addressPlaceHolder = await addressInputBox.getAttribute(
      "placeholder"
    );
    await expect(addressPlaceHolder).toEqual("Enter address");
    await addressInputBox.setValue("a");
    await addressInputBox.clearValue();
    //check the suggestion list
    const suggestionList = await $('//div[@id="autocomplete-suggestions"]');
    await suggestionList.isDisplayed();
    await browser.pause(20000);

    // Execute JavaScript to click on the element
    await browser.execute(() => {
      // Find the element using JavaScript selector
      const element = document.querySelector(
        ".Suggestion_autocomplete--suggestion__9w7xm"
      );
      // Perform click
      element.click();
    });

    //check apt number ,floor
    const floorlabel = await $(
      "//label[normalize-space()='Apt number, suite, floor, etc.']"
    );
    await floorlabel.isDisplayed();
    await expect(floorlabel).toHaveText("Apt number, suite, floor, etc.");
    const floorfieldInput = await $(
      "input[placeholder='Enter address'][name='addresses[0].addressAdditional']"
    );

    // //check the place holder
    // const floorplaceholder = await floorfieldInput.getAttribute("placeholder");
    // await expect(floorplaceholder).toEqual("Enter address");
    // await floorfieldInput.setValue("12/A");
    // await floorlabel.click();

    // //check city field
    // const cityFieldLabel = await $("//label[normalize-space()='City']");
    // await cityFieldLabel.isDisplayed();
    // await expect(cityFieldLabel).toHaveText("City");

    // //check the city field placeholder
    // const cityFieldInput = await $("//input[@placeholder='Enter city']");
    // const cityFieldPlaceHolder = await cityFieldInput.getAttribute(
    //   "placeholder"
    // );
    // //check the validation message
    // await cityFieldInput.click();
    // await cityFieldLabel.click();
    // await expect(validation).toHaveText("This field is required.");
    // //check the paceholder
    // await expect(cityFieldPlaceHolder).toEqual("Enter city");
    // await cityFieldInput.setValue("Dorado");
    // await cityFieldLabel.click();

    // //CHECK STATE FIELD
    // const stateFieldLabel = await $("//label[normalize-space()='State']");
    // await expect(stateFieldLabel).toHaveText("State");
    // const stateFieldInput = await $("//input[@placeholder='Enter state']");
    // //check the validation message
    // await stateFieldInput.click();
    // await stateFieldLabel.click();
    // await expect(validation).toHaveText("This field is required.");
    // //check the place holder
    // const stateFieldplaceholder = await stateFieldInput.getAttribute(
    //   "placeholder"
    // );
    // await expect(stateFieldplaceholder).toEqual("Enter state");
    // await stateFieldInput.setValue("PR");
    // await stateFieldLabel.click();

    // //CHECK ZIP CODE FIELD
    // const zipcodeFieldLabel = await $("//label[normalize-space()='Zip code']");
    // await expect(zipcodeFieldLabel).toHaveText("Zip code");
    // const zipcodeFieldInput = await $("//input[@placeholder='Enter code']");
    // //check the validation message
    // await zipcodeFieldInput.click();
    // await zipcodeFieldLabel.click();
    // await expect(validation).toHaveText("This field is required.");
    // //check the place holder
    // const zipcodeFieldplaceholder = await zipcodeFieldInput.getAttribute(
    //   "placeholder"
    // );
    // await expect(zipcodeFieldplaceholder).toEqual("Enter code");
    // await zipcodeFieldInput.setValue("32435");
    // await zipcodeFieldLabel.click();

    //check save button
    const savebtn = await $("//button[@id='agree']");
    await savebtn.isDisplayed();
    await savebtn.click();
  });
  it("Advisor_Clients_TC008 ", async () => {
    //check edit card details
    browser.pause("10000");
    //checl the reveal btn
    const revealbtn = await $('//button[normalize-space()="Reveal"]');
    await revealbtn.isDisplayed();
    await revealbtn.click();
    await browser.pause(10000);
    //click the three dot option to edit the card details
    const threeDots = await $('//div[@class="ml-auto relative"]');
    await threeDots.click();

    //check edit btn
    const editBtn = await $(
      '//div[@class="w-full cursor-pointer py-2 px-4 text-[14px] leading-[1.43] text-gray-700"]'
    );
    await editBtn.click();
    await browser.pause(5000);

    //edit the card holder name
    const cardHolderInputedit = await $('//input[@id="cardHolder"]');
    await cardHolderInputedit.click();
    // Use keyboard shortcuts to select and clear the input field
    await browser.keys(["Control", "a"]); // Select all
    await browser.keys("Backspace"); // Clear the input field
    await cardHolderInputedit.setValue("something");
    const some = await $('//label[normalize-space()="Cardholder name"]');
    await some.click();
    //click the save button to save changes
    await browser.pause(2000);
    const save = await $('//button[normalize-space()="Save"]');
    await save.click();
    //check the prompt after saving
    await browser.pause(10000);
    const prompt = await $('//div[@class="mb-6 md:mb-8 md:text-center"]');
    await expect(prompt).toHaveText(
      "Successfully updated credit card\nYour card is securely updated on the credit card section"
    );
    //check the gotit button
    const gotItBtn = await $('//button[normalize-space()="Got it"]');
    await gotItBtn.click();
    await browser.pause(5000);

    //check the update card once
    const updatedName = await $(
      '//span[@class="block text-medium font-bold break-all md:max-w-xl lg:max-w-[235px]"]'
    );
    await expect(updatedName).toHaveText("something");
  });
});

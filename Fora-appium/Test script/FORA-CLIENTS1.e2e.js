describe("fora-appium", () => {
  it("launch fora in chrome", async () => {
    console.log("hello");

    // Navigate to the URL with incognito mode enabled
    await browser.url("https://advisor.forastaging.net/");
    await browser.pause(20000); // pause for 10 seconds
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
  it("Advisor_Clients_TC011", async () => {
    const Hamburger = await $("//button[@id='navbar-open']");
    await Hamburger.click();

    const clientsMenuOption = await $("a[title='Clients']");
    const isDisplayed = await clientsMenuOption.isDisplayed();
    expect(isDisplayed).toBe(true); // Assert that the menu option is displayed

    // Click on the clients menu option
    await clientsMenuOption.click();

    const addClient = await $(
      "a[class='cursor-pointer shrink-0 text-smallLH20 font-bold text-secondary bg-white rounded-lg border border-lightGreyBorder py-[11px] px-4 hover:bg-whiteSmoke md:hidden']"
    );
    await addClient.click();
    await expect(browser).toHaveUrl(
      "https://advisor.forastaging.net/clients/add-client"
    );

    const goBackBtn = await $(
      "//a[@class='inline-flex items-center gap-1 text-medium font-bold cursor-pointer text-link hover:underline']"
    );
    await goBackBtn.isDisplayed();

    //check the available name fields
    const childElements = await $$(".flex.flex-col.gap-6");
    const labels = await childElements[0].$$("label");
    // Define the text fields to check for
    const textFields = [
      "Prefix",
      "First name *",
      "Middle name",
      "Last name *",
      "Suffix",
      "Preferred names",
      "Pronouns",
    ];

    // Iterate over each child element to check its text content
    for (const label of labels) {
      const textContent = await label.getText();
      // Check if each text field is included in the text content
      textFields.forEach((field) => {
        expect(textContent).toHaveText(field);
      });
    }
    //check prefix field
    const prefix = await $('[data-testid="dropdownButton"]');
    await prefix.isDisplayed();
    await prefix.click();
    await browser.pause(5000);

    const prefixOptions = await $(
      "body > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)"
    );
    const expectedOptions = "Select\nMrs\nMiss\nMs\nMr\nDr";

    await expect(prefixOptions).toHaveText(expectedOptions);

    const prefixMrOption = await $("//div[@id='prefix-option-4']");
    await prefixMrOption.click();
    //check each name section fields
    //first name inputbox:
    const firstNameInputBox = await $("//input[@id='firstName']");
    const firstNameInputBoxTxt = await firstNameInputBox.getAttribute(
      "placeholder"
    );
    await expect(firstNameInputBoxTxt).toEqual("Enter name*");

    //check validation message of firstname field
    await firstNameInputBox.click();
    const something = await $("//span[normalize-space()='Name']");
    await something.click();
    const firstNameValidation = await $(
      "div.my-1.text-medium.text-error.items-start.whitespace-pre-wrap.flex"
    );
    await expect(firstNameValidation).toHaveText("First name is required");

    //enter first name values
    const firstName = await $("//input[@id='firstName']");
    await firstName.setValue("something");
    //check validation message after entering values
    await firstNameValidation.waitForDisplayed({ reverse: true });

    //check middle name section
    const middleName = await $("//input[@id='middleName']");
    const middleNamePlaceholder = await middleName.getAttribute("placeholder");
    await expect(middleNamePlaceholder).toEqual("Enter name");
    await middleName.setValue("new");
    const something1 = await $("//label[normalize-space()='Last name *']"); //check lastname validation message
    await something1.click();

    await browser.pause("5000");
    //check last name field
    const LastName = await $("//input[@id='lastName']");
    const lastNamePlaceholder = await LastName.getAttribute("placeholder");
    await expect(lastNamePlaceholder).toEqual("Enter name*");
    await browser.scroll(0, 200);
    await LastName.click();
    await something1.click();
    const lastNameValidation = await $(
      "//div[contains(text(),'Last name is required')]"
    );
    await expect(lastNameValidation).toHaveText("Last name is required");
    await LastName.setValue("client");
    await lastNameValidation.waitForDisplayed({ reverse: true });

    //check suffix field
    const SuffixField = await $("//input[@id='suffix']");
    await SuffixField.setValue("testing");
    //check preffered names field
    const prefferedNames = await $("//input[@id='preferredName']");
    const preferredNamePlaceholder = await prefferedNames.getAttribute(
      "placeholder"
    );
    await expect(preferredNamePlaceholder).toEqual("Enter name");
    await prefferedNames.setValue("appium testing");
    const something2 = await $("//label[normalize-space()='Pronouns']");
    await something2.click();

    //check pronouns field
    const pronouns = await $$("button[data-testid='dropdownButton']");
    await pronouns[1].click();
    await browser.pause(5000);
    const pronounsOption = await $$(
      "//*[contains(@id, 'headlessui-popover-panel-:r')]"
    );
    await expect(pronounsOption).toHaveText([
      "Select\nHe/him\nShe/her\nThey/them",
    ]);
    const pronounsOption1 = await $("//div[@id='pronouns-option-1']");
    await pronounsOption1.click();
    //check email section
    const emailSection = await $(
      "//body/div/div/div/main/div/div/div/div/form[@action='#']/div[2]"
    );
    await emailSection.isDisplayed();
    //check phone number section
    const phoneNumberSection = await $(
      "//body/div/div/div/main/div/div/div/div/form[@action='#']/div[3]"
    );
    await phoneNumberSection.isDisplayed();
    //check cancel button
    const cancelBtn = await $("//a[normalize-space()='Cancel']");
    await cancelBtn.isDisplayed();
    await browser.pause(20000);
  });
  it("Advisor_clients_TC012", async () => {
    await browser.scroll(0, 400);
    //check email section
    const emailSection = await $(
      "//body/div/div/div/main/div/div/div/div/form[@action='#']/div[2]"
    );
    await emailSection.isDisplayed();
    await expect(emailSection).toHaveText([
      "Email\nPersonal email\nWork email\nOther email",
    ]);
    //check personal emial field
    const personalEmailField = await $("//input[@id='personal']");
    const personalEmailPlaceholder = await personalEmailField.getAttribute(
      "placeholder"
    );
    expect(personalEmailPlaceholder).toHaveText("Enter email");
    await personalEmailField.setValue(" ");
    const validationMessage = await $(
      "//div[@class='my-1 text-medium text-error items-start whitespace-pre-wrap flex']"
    );
    const something = await $("//label[normalize-space()='Personal email']");
    await something.click();
    await expect(validationMessage).toHaveText("Please enter valid email");
    await personalEmailField.setValue("something@gmail.com");
    await something.click();
    //check work email field
    const workEmailField = await $("//input[@id='work']");
    await workEmailField.setValue(" ");
    await something.click();
    await expect(validationMessage).toHaveText("Please enter valid email");
    await workEmailField.setValue("some@gmail.com");
    await something.click();
    //check other email field
    const otherEmailField = await $("//input[@id='other']");
    await otherEmailField.setValue("  ");
    const so = await $("//label[normalize-space()='Other email']");
    await so.click();
    await expect(validationMessage).toHaveText("Please enter valid email");
    await otherEmailField.setValue("ss@gmail.com");
    const otheremailLabel = await $("//label[normalize-space()='Other email']");
    await otheremailLabel.click();
    await browser.scroll(0, 400);
    await browser.pause(5000);
  });
  it("Advisor_Clients_TC013", async () => {
    //check whether all the fields are available in phone number section
    const phoneNumberSection = await $(
      "//body/div/div/div/main/div/div/div/div/form[@action='#']/div[3]"
    );
    await phoneNumberSection.isDisplayed();
    const mobilePhone = await $("//label[normalize-space()='Mobile phone']");
    await expect(mobilePhone).toHaveText("Mobile phone");
    const homePhone = await $("//label[normalize-space()='Home phone']");
    await expect(homePhone).toHaveText("Home phone");
    const workPhone = await $("//label[normalize-space()='Work phone']");
    await expect(workPhone).toHaveText("Work phone");
    const otherPhone = await $("//label[normalize-space()='Other phone']");
    await expect(otherPhone).toHaveText("Other phone");
    async function testMobilePhoneFunctionality(i) {
      //check select country in mobile phone field
      const selectCountry = await $$("select[class='PhoneInputCountrySelect']");
      await selectCountry[i].isDisplayed();
      const mobilePhoneInput = await $$("input[id^='phoneInput']");
      await mobilePhoneInput[i].isDisplayed();
      //check whether default value is usa +1
      const mobilePhoneInputValue = await mobilePhoneInput[i].getAttribute(
        "value"
      );
      await expect(mobilePhoneInputValue).toEqual("+1");
      //check whether the country code is displayed while selecting country
      await selectCountry[i].selectByAttribute("value", "AF");
      const mobilePhoneInputValue1 = await mobilePhoneInput[i].getAttribute(
        "value"
      );
      await expect(mobilePhoneInputValue1).toEqual("+93");
      await mobilePhoneInput[i].click();
      await browser.keys(["Ctrl", "a"]);
      await browser.keys(["Backspace"]);
      //check whether country flag is displayed while entering country code
      // Example of pressing the delete key three times
      await mobilePhoneInput[i].setValue("+91");
      await mobilePhone.click();
      await selectCountry[i].isDisplayed();
      //check validation
      const validation = await $("//p[@class='text-medium text-error']");
      await expect(validation).toHaveText([
        "Please, enter a valid phone number",
      ]);
      await mobilePhoneInput[i].setValue("8248339108");
      await browser.pause(10000);
    }
    // Call the function
    await testMobilePhoneFunctionality(0);
    await testMobilePhoneFunctionality(1);
    await testMobilePhoneFunctionality(2);
    const someLabel = await $("//span[normalize-space()='Address']");
    await someLabel.click();
    await browser.scroll(0, 400);
  });
  it("Advisor_Clients_TC014", async () => {
    //check add another section
    //check add aother address button
    const addOtherAddressBtn = await $(
      '//button[normalize-space()="Add another address"]'
    );
    await addOtherAddressBtn.click();
    //check address section
    //address name inputBox
    const addressName = await $$("//label[normalize-space()='Address name']");
    await expect(addressName).toHaveTextContaining("Address name");
    const addressNameInputbox = await $$(
      "//input[@placeholder='Example: Summer house']"
    );
    //check inputbox place holder
    const addressNamePlaceholder = await addressNameInputbox[0].getAttribute(
      "placeholder"
    );
    await expect(addressNamePlaceholder).toEqual("Example: Summer house");
    await addressNameInputbox[0].setValue("winter House");
    await addressName[0].click();

    const country = await $$('//input[contains(@id,"addresses")]');
    await country[0].setValue("asedcw3e23");
    const noOptions = await $('//div[@class=" css-9x5mqu"]');
    await expect(noOptions).toHaveText("No options");
    await country[0].clearValue();

    //country option code is need to be written select united kingdom option
    await browser.pause(10000);
    const country_dropdwn1 = await $("//input[contains(@id,'addresses')]");
    await country_dropdwn1.click();
    await country_dropdwn1.setValue("United Kingdom");
    await browser.pause(10000);
    await browser.keys("\uE007");

    await browser.pause(30000);
    //check address field
    const address = await $$("//label[normalize-space()='Address']");
    await expect(address).toHaveText("Address");

    //check address field place holder
    const addressInputBox = await $$("//input[@id='address']");
    const addressPlaceHolder = await addressInputBox[0].getAttribute(
      "placeholder"
    );
    await expect(addressPlaceHolder).toEqual("Enter address");
    await addressInputBox[0].setValue("V Calle 11");
    await address[0].click();

    //check apt number ,floor
    const floorlabel = await $$(
      "//label[normalize-space()='Apt number, suite, floor, etc.']"
    );
    await floorlabel[0].isDisplayed();
    await expect(floorlabel).toHaveText("Apt number, suite, floor, etc.");
    const floorfieldInput = await $$(
      "input[placeholder='Enter address'][name='addresses[0].addressAdditional']"
    );
    const floorplaceholder = await floorfieldInput[0].getAttribute(
      "placeholder"
    );
    await browser.scroll(0, 400);
    await expect(floorplaceholder).toEqual("Enter address");
    await floorfieldInput[0].setValue("12/A");
    await browser.pause(5000);

    //check city field
    const cityFieldLabel = await $$("//label[normalize-space()='City']");
    await cityFieldLabel[0].isDisplayed();
    await expect(cityFieldLabel[0]).toHaveText("City");

    //check the city field placeholder
    const cityFieldInput = await $$("//input[@placeholder='Enter city']");
    const cityFieldPlaceHolder = await cityFieldInput[0].getAttribute(
      "placeholder"
    );
    await expect(cityFieldPlaceHolder).toEqual("Enter city");
    await cityFieldInput[0].setValue("Dorado");
    await cityFieldLabel[0].click();

    //CHECK STATE FIELD
    const stateFieldLabel = await $$("//label[normalize-space()='State']");
    await expect(stateFieldLabel[0]).toHaveText("State");
    const stateFieldInput = await $$("//input[@placeholder='Enter state']");
    const stateFieldplaceholder = await stateFieldInput[0].getAttribute(
      "placeholder"
    );
    await expect(stateFieldplaceholder).toEqual("Enter state");
    await stateFieldInput[0].setValue("PR");
    await stateFieldLabel[0].click();

    //CHECK ZIP CODE FIELD
    const zipcodeFieldLabel = await $$("//label[normalize-space()='Zip code']");
    await expect(zipcodeFieldLabel[0]).toHaveText("Zip code");
    const zipcodeFieldInput = await $$("//input[@placeholder='Enter code']");
    const zipcodeFieldplaceholder = await zipcodeFieldInput[0].getAttribute(
      "placeholder"
    );
    await expect(zipcodeFieldplaceholder).toEqual("Enter code");
    await zipcodeFieldInput[0].setValue("32435");
    await zipcodeFieldLabel[0].click();
    await browser.pause(10000);
    const removeBtn = await $(
      '//div[@class="text-error cursor-pointer w-min"]'
    );
    const address2 = await $('//span[normalize-space()="Address #2"]');
    await removeBtn.click();
    //check the body after clicking remove button
    address2.waitForDisplayed({ reverse: true });
    await addOtherAddressBtn.click();
    //select united states of america country
    //need code for country selection
    //check address section
    //address name inputBox
    const addressName1 = await $(
      "(//label[contains(text(),'Address name')])[2]"
    );
    await expect(addressName1).toHaveText("Address name");

    //check inputbox place holder
    const addressNamePlaceholder1 = await addressNameInputbox[1].getAttribute(
      "placeholder"
    );
    await expect(addressNamePlaceholder1).toEqual("Example: Summer house");
    await addressNameInputbox[1].setValue("winter House");
    await addressName[1].click();

    await country[1].setValue("asedcw3e23");
    const noOptions1 = await $("(//div[@class=' css-9x5mqu'])[1]");
    await expect(noOptions1).toHaveText("No options");
    await country[1].clearValue();

    //country option code is need to be written select usa option
    const country_dropdwn = await $("//input[contains(@id,'addresses')]");
    await country_dropdwn.click();
    await country_dropdwn.setValue("United Kingdom");
    await browser.pause(10000);
    await browser.keys("\uE007");

    //check address field
    await expect(address[1]).toHaveText("Address");

    //check address field place holder
    const addressPlaceHolder1 = await addressInputBox[1].getAttribute(
      "placeholder"
    );

    await expect(addressPlaceHolder1).toEqual("Enter address");
    await addressInputBox[1].setValue("A");
    await browser.pause(5000);
    const addressList = await $('//div[@id="autocomplete-suggestions"]');
    await addressList.isDisplayed();
    await addressInputBox[1].setValue("V Calle 11");
    await address[1].click();

    //check apt number ,floor fields

    await floorlabel[1].isDisplayed();
    await expect(floorlabel).toHaveText("Apt number, suite, floor, etc.");
    const floorfieldInput1 = await $(
      "input[placeholder='Enter address'][name='addresses[1].addressAdditional']"
    );
    const floorplaceholder1 = await floorfieldInput1.getAttribute(
      "placeholder"
    );
    await expect(floorplaceholder1).toEqual("Enter address");

    await floorfieldInput1.setValue("12/A");
    await floorlabel[1].click();

    //check city field
    await cityFieldLabel[1].isDisplayed();
    await expect(cityFieldLabel[1]).toHaveText("City");

    //check the city field placeholder
    const cityFieldPlaceHolder1 = await cityFieldInput[1].getAttribute(
      "placeholder"
    );
    await expect(cityFieldPlaceHolder1).toEqual("Enter city");
    await cityFieldInput[1].setValue("Dorado");
    await cityFieldLabel[1].click();

    //CHECK STATE FIELD
    await expect(stateFieldLabel[1]).toHaveText("State");
    const stateFieldplaceholder1 = await stateFieldInput[1].getAttribute(
      "placeholder"
    );
    await expect(stateFieldplaceholder1).toEqual("Enter state");
    await stateFieldInput[1].setValue("PR");
    await stateFieldLabel[1].click();

    //CHECK ZIP CODE FIELD
    await expect(zipcodeFieldLabel[1]).toHaveText("Zip code");
    const zipcodeFieldInput1 = await $('//input[@name="addresses[1].zipCode"]');
    // const zipcodeFieldplaceholder1 = await zipcodeFieldInput1.getAttribute(
    //   "placeholder"
    // );
    //await expect(zipcodeFieldplaceholder1[1]).toEqual("Enter code");
    await zipcodeFieldInput[1].setValue("32435");
    await zipcodeFieldLabel[1].click();
    await browser.pause(10000);

    //check save button
    const savebtn = await $("//button[@id='agree']");
    await savebtn.isDisplayed();
    await savebtn.click();
  });
  it("Advisor_Clients_TC016", async () => {
    await browser.pause(15000);
    //edit the first name and check whether edit functionality is working
    const editLink = await $("//a[normalize-space()='Edit']");
    await editLink.isDisplayed();
    await editLink.click();

    await browser.pause("6000");

    const firstNameInputBox = await $("//input[@id='firstName']");
    await firstNameInputBox.click();
    await browser.keys(["Control", "a"]);
    await browser.keys(["Backspace"]);

    await firstNameInputBox.setValue("test edit link");
    const some = await $("//label[normalize-space()='Middle name']");
    await some.click();
    await browser.scroll(0, 700);
    const some1 = await $("//label[normalize-space()='Zip code']");
    await some1.click();

    const savebtn = await $("//button[@id='agree']");
    await savebtn.isDisplayed();
    await savebtn.click();

    await browser.pause("10000");
    const firstNamepreview = await $(
      "(//span[contains(text(),'test edit link')])"
    );
    await expect(firstNamepreview).toHaveText(/test edit link/);
  });

  it("delete client -Advisor_Clients_TC010", async () => {
    await browser.scroll(0, 400);

    const deleteClient = await $$(
      "//button[@class='cursor-pointer w-fit text-smallLH20 font-bold text-error bg-white rounded border border-lightGreyBorder py-[6px] px-3 hover:bg-lightGreyBg']"
    );
    await deleteClient[1].isDisplayed();
    await deleteClient[1].click();
    await browser.pause(10000);
    const confirmDeleteBtn = await $(
      "//button[normalize-space()='Yes, delete client']"
    );
    await confirmDeleteBtn.isDisplayed();
    await confirmDeleteBtn.click();
    await browser.pause(10000);
  });

  //need to add the client which has booking
  //to over come this intergrate this script with bookings script and try to make a booking with default client account
  it("delete client -Advisor_Clients_TC010", async () => {
    const clientCards = await $$(
      '//a[.//span[@class="block text-title font-bold break-all"]]'
    );

    // Ensure there's at least one matching element
    if (clientCards.length > 0) {
      const lastElement = clientCards[clientCards.length - 1];
      await lastElement.click();
    } else {
      console.log("No matching elements found.");
    }

    await browser.scroll(0, 400);

    const deleteClient = await $(
      '//div[@class="xl:hidden"]//button[@class="cursor-pointer w-fit text-smallLH20 font-bold text-error bg-white rounded border border-lightGreyBorder py-[6px] px-3 hover:bg-lightGreyBg"][normalize-space()="Delete client"]'
    );
    await deleteClient.isDisplayed();
    await deleteClient.click();
    await browser.pause(10000);
    const popupText = await $(
      "div[class='text-medium font-bold text-secondary']"
    );
    expect(popupText).toHaveText(
      "You can't delete a client that has at least one booking assigned to them. You can reassign bookings to different clients on the Bookings page."
    );
    const closeBtn = await $("//button[normalize-space()='Close']");
    await closeBtn.isDisplayed();
    await closeBtn.click();
  });
});

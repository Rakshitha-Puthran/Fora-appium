describe("fora-appium", () => {
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
    const nextButton = await $("//span[normalize-space()='Next']");
    await nextButton.click();

    const password = await $("//input[@name='Passwd']");
    await password.setValue("Qaoncloud@01");
    await nextButton.click();
    browser.pause(5000);
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
    //check whether the name section displayed
    const nameSection = await $(
      "//body[1]/div[1]/div[2]/div[1]/main[1]/div[1]/div[1]/div[3]/div[1]/form[1]/div[1]/div[2]"
    );
    await nameSection.isDisplayed();
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

    const prefixOptions = await $(
      "body > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)"
    );
    const expectedOptions = "Select\nMrs\nMiss\nMs\nMr\nDr";

    const con = await expect(prefixOptions).toHaveText(expectedOptions);

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
    //await expect(firstNameValidation.isDisplayed()).toBe(false);
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
    await browser.scroll(0, 200);

    //check pronouns field
    const pronouns = await $$("button[data-testid='dropdownButton']");
    await pronouns[1].click();
    const pronounsOption = await $$(
      "//div[@id='headlessui-popover-panel-:rb:']"
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

    // const lastName = await $("#lastName");
    // await lastName.setValue("something");

    // const clicksomething = await $$("label.text-medium.font-bold.text-label");
    // await clicksomething[20].click();

    // const save = await $("#agree");
    // await save.isDisplayed();
    // await save.click();

    await browser.pause(20000);
  });
  it.skip("delete client -Advisor_Clients_TC010", async () => {
    await browser.scroll(0, 400);

    const deleteClient = await $(
      "//div[@class='xl:hidden']//span[contains(@class,'cursor-pointer text-smallLH20 font-bold text-error bg-white rounded border border-lightGreyBorder py-[6px] px-3 hover:bg-lightGreyBg')][normalize-space()='Delete client']"
    );
    await deleteClient.isDisplayed();
    await deleteClient.click();
    await browser.pause(10000);
    const confirmDeleteBtn = await $(
      "//button[normalize-space()='Yes, delete client']"
    );
    await confirmDeleteBtn.isDisplayed();
    await confirmDeleteBtn.click();
    await browser.pause(10000);
  });
  it.skip("delete client -Advisor_Clients_TC010", async () => {
    const clientCard = await $(
      "a[href='/clients/4f1ed997-ab88-46d4-a70f-a6a095608db4']"
    );
    await clientCard.click();
    await browser.scroll(0, 400);

    const deleteClient = await $(
      "//div[@class='xl:hidden']//span[contains(@class,'cursor-pointer text-smallLH20 font-bold text-error bg-white rounded border border-lightGreyBorder py-[6px] px-3 hover:bg-lightGreyBg')][normalize-space()='Delete client']"
    );
    await deleteClient.isDisplayed();
    await deleteClient.click();
    await browser.pause(10000);
    const popupText = await $(
      "div[class='text-medium font-bold text-secondary']"
    ).getText();
    expect(popupText).toHaveText(
      "You can't delete a client that has at least one booking assigned to them. You can reassign bookings to different clients on the Bookings page."
    );
    const closeBtn = await $("//button[normalize-space()='Close']");
    await closeBtn.isDisplayed();
    await closeBtn.click();
  });
});

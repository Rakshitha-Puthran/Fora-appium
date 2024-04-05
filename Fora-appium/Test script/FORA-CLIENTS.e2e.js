//always use a new account while running the test since it has default condition to check
describe("Fora advisor portal", () => {
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
  it("clients page TC001", async () => {
    //hambuger menu open
    const Hamburger = await $("//button[@id='navbar-open']");
    await Hamburger.click();
    const AccountName = await $(
      "span[class='text-main text-medium font-medium break-words group-hover:text-main']"
    ).getText();
    const clientsMenuOption = await $("a[title='Clients']");
    const isDisplayed = await clientsMenuOption.isDisplayed();
    expect(isDisplayed).toBe(true); // Assert that the menu option is displayed

    // Click on the clients menu option
    await clientsMenuOption.click();
    await browser.pause(5000);
    const currentURL = await browser.getUrl();
    expect(currentURL).toContain("client"); // Assert that the URL contains "client"

    const clientName = await $(
      ".block.text-title.font-bold.break-all"
    ).getText();
    //this condition staisfies only when no cliennts are added are the client is not altered
    await expect(clientName).toHaveText([expect.stringContaining(AccountName)]);
  });
  it("clients page Advisor_Clients_TC002", async () => {
    //CHECK ADDRESS SECTION IN CLIENT CARD
    const Address = await $(
      "span[class='block text-medium font-bold text-secondary']"
    );
    Address.isDisplayed();
    const email = await $("//span[normalize-space()='Email']");
    await email.isDisplayed();
    await expect(email).toHaveText("Email");
    const emailId = await $(
      "div[class='mb-5 xl:mb-0 xl:grow'] div[class='flex flex-col gap-1']"
    );
    await emailId.isDisplayed();

    //check phone number field
    const phoneNumber = await $("div[class='xl:grow']");
    await phoneNumber.isDisplayed();
    expect(phoneNumber).toHaveText("Phone number");

    // Find the parent element
    const parentElement = $("div[class='text-medium font-bold text-tertiary']");
    const check = expect(parentElement).toHaveText(
      "Add your client's travel preferences, accompanying travelers and other notes. Add notes"
    );
    if (check) {
      // Find the "Add notes" button within the parent element
      const addNotesButton = parentElement.$(
        "//button[normalize-space()='Add notes']"
      );
      await addNotesButton.click();
    }

    await browser.back();

    //validate view client details link
    const clientDetailsLink = await $(
      "p[class='text-medium font-bold text-link hover:underline']"
    );
    await clientDetailsLink.click();
    const currentURL = await browser.getUrl();
    expect(currentURL).toContain("clients/");
    await browser.back();
    //booking details
    const bookingDetails = await $(
      "//div[@class='!flex mb-8 lg:mb-4 xl:flex hidden p-4 rounded bg-primaryBg justify-between flex-wrap gap-4']"
    );
    expect(bookingDetails).toHaveText([
      "Bookings",
      "Commissionable Value",
      "Commissions",
    ]);
    // Find the specified div element
    const divElement = await $(
      "div.xl\\:grow.lg\\:flex.flex-col.shrink-0.pt-2.pb-6.px-6.lg\\:p-8.border-lightGreyBorder.lg\\:border-l"
    );

    // Get the text content of the div element
    const divText = await divElement.getText();

    // Log the text content for reference
    console.log("Text Content:", divText);

    // Check if the div text contains "There are no credit cards saved"
    if (divText.includes("There are no credit cards saved")) {
      console.log(
        'True: The text includes "There are no credit cards saved"',
        divText
      );
    } else {
      console.log(
        'False: The text does not include "There are no credit cards saved"'
      );
      const creditCard = await $(" $('.flex.flex-col.gap-4.mb-2')");
      await creditCard.isDisplayed();
    }
  });
  it("clients page Advisor_Clients_TC003", async () => {
    const ViewClientsLink = await $(
      "p[class='text-medium font-bold text-link hover:underline']"
    );
    await ViewClientsLink.click();
    browser.pause(5000);
    const currentURL = await browser.getUrl();
    const regex = /clients\/(\d+|[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12})$/;

    expect(currentURL).toMatch(regex);

    const body = await $(".container-1440");
    const BodyText = await body.getText();
    expect(BodyText).toHaveText([
      "Personal information",
      "Important dates",
      "Notes",
      "Credit cards",
      "Loyalty programs",
    ]);
    const PersonalInfoEditLink = await $("//a[normalize-space()='Edit']");
    await PersonalInfoEditLink.isDisplayed();

    const PersonalInfo = await $(
      "div[class='bg-white border border-lightGreyBorder rounded-lg relative'] div[class='p-6']"
    );
    expect(PersonalInfo).toHaveText([
      "Prefix",
      "First name",
      "Middle name",
      "Last name",
      "Suffix",
      "Preferred name",
      "Pronouns",
      "Personal email",
      "Work email",
      "Mobile number",
      "Other number",
      "Address",
    ]);
  });
  it("Advisor_Clients_TC005", async () => {
    //this testcase needs a client with bookings made previously so in bookings modules always create a client name testing and book from the
    // have a client created with name testing software to change the bookings one client to anaother
    //check booking details
    const bookingDetails = await $('//div[@class="py-4 px-6 md:py-6 md:px-8"]');
    expect(bookingDetails).toHaveText([
      "Total Bookings",
      "Commissionable Value",
      "Commissions",
    ]);
    //change booking s to  a client
    const Hamburger = await $("//button[@id='navbar-open']");
    await Hamburger.click();
    await browser.pause(5000);
    const bookingsOption = await $("//a[@title='Bookings']");
    await bookingsOption.click();
    // Locate the adjacent <svg> element
    const svgElement = await $(
      "//body/div[@id='__next']/div[@class='jsx-c8ce0ad902ae85f4 min-h-screen']/div[@id='main-container']/main[@class='jsx-c8ce0ad902ae85f4 flex-1']/div[@class='jsx-c8ce0ad902ae85f4 p-6 md:py-12 md:px-16']/div[@class='container-1440 min1100:m-0 container-bookings-v2_1']/div/div[@class='relative']/div[@class='divide-y divide-gray-200']/div[@class='flex flex-col mt-4 md:mt-6']/div[@class='lg:-mx-8']/div[@class='inline-block min-w-full align-middle lg:px-8']/div[@class='space-y-4']/div[@class='flex flex-col space-y-4 relative !mt-4']/div[1]/div[2]/div[1]/div[2]//*[name()='svg']"
    );

    // Click the <svg> element
    await svgElement.click();
    const dropdown = await $(
      "//div[@class='react-select__indicators css-1h2huwg']//*[name()='svg']"
    );
    const input = await $("//input[@id='client']");
    await input.setValue("Testing Software");
    await browser.pause(5000);

    await browser.keys("\uE007"); // Unicode escape sequence for 'Enter' key
    const submit = await $("button[type='submit']");
    await submit.click();
    await browser.pause(10000);

    const commission = await $(
      "//div[@class='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 justify-between']//div//p[@class='text-medium font-bold'][normalize-space()='$2,134.92']"
    );
    const commissionText = await commission.getText();
    const commissionNumber = parseFloat(
      commissionText.replace(/[^0-9.-]+/g, "")
    ); // Extract numerical part and convert to a number
    const roundedCommission = Math.round(commissionNumber); // Round off the number

    await Hamburger.click();
    const clientsMenuOption = await $("a[title='Clients']");

    await clientsMenuOption.click();

    const commissionableValue = await $(
      "//body[1]/div[1]/div[2]/div[1]/main[1]/div[1]/div[1]/div[1]/div[5]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/span[2]"
    );
    const commissionableValueText = await commissionableValue.getText();
    const commissionableValuenum = parseFloat(
      commissionableValueText.replace(/[^0-9.-]+/g, "")
    ); // Extract numerical part and convert to a number
    const roundedCommissionablenum = Math.round(commissionableValuenum); // Round off the number

    expect(roundedCommissionablenum).toEqual(roundedCommission);
  });
  it("Advisor_Clients_TC006", async () => {
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
    const editButton = await $(
      "//div[@class='ml-auto']//span[@class='text-medium font-bold cursor-pointer text-link hover:underline'][normalize-space()='Edit']"
    );
    await editButton.isDisplayed();
    const text = await $("span[class='font-bold text-tertiary']").getText();
    expect(text).toContain(
      "Add your client's travel preferences, accompanying travelers and other notes"
    );
    await editButton.click();
    const cancel = await $(
      "span[class='cursor-pointer text-smallLH20 font-bold text-secondary hover:underline']"
    );
    await cancel.isDisplayed();
    const save = await $("//button[normalize-space()='Save']");
    await save.isDisplayed();
    const placeholder = await $(".ql-editor").getAttribute("data-placeholder");

    expect(placeholder).toEqual("Type here...");

    const boldicon = await $("button[class='ql-bold']");
    const italyIcon = await $("//button[@class='ql-italic']");
    const Underline = await $("//button[@class='ql-underline']");
    const strike = await $("//button[@class='ql-blockquote']");
    const Numberlist = await $("button[value='ordered']");
    const bulletList = await $("//button[@value='bullet']");
    const leftAlign = await $("button[value='-1']");
    const rightalign = await $("button[value='+1']");
    const addlink = await $("button[class='ql-link']");
    const imageUpload = await $("button[class='ql-image']");

    await boldicon.isDisplayed();
    await italyIcon.isDisplayed();
    await Underline.isDisplayed();
    await strike.isDisplayed();
    await Numberlist.isDisplayed();
    await bulletList.isDisplayed();
    await leftAlign.isDisplayed();
    await rightalign.isDisplayed();
    await addlink.isDisplayed();
    await imageUpload.isDisplayed();
  });
  it("Advisor_Clients_TC009", async () => {
    const LoyaltyPrpgramsEdit = await $(
      "span[class='text-medium font-bold cursor-pointer text-link hover:underline']"
    );
    const placeholder = await $("div[class='p-6 space-y-2'] div:nth-child(1)");
    await LoyaltyPrpgramsEdit.isDisplayed();
    await placeholder.isDisplayed();

    await LoyaltyPrpgramsEdit.click();

    const cancelButton = await $(
      "body > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)"
    );

    await cancelButton.isDisplayed();

    const saveButton = await $("#agree");
    await saveButton.isDisplayed();

    const LoyaltyProgramForm = await $("form[action='#']");
    await LoyaltyProgramForm.isDisplayed();

    const selectProgramDropdown = await $(
      "//input[@id='headlessui-combobox-input-:rd:']"
    );
    await selectProgramDropdown.isDisplayed();
    await browser.scroll(0, 200);

    const dropdownsvg = await $(
      "//button[@id='headlessui-combobox-button-:r5:']"
    );
    await dropdownsvg.click();

    const dropdownList = await $(
      "//ul[@id='headlessui-combobox-options-:r6:']"
    );
    await dropdownList.isDisplayed();

    const listelements = await dropdownList.$$("li");
    // Choose a random index to click (You can generate this randomly or choose based on some criteria)
    const randomIndex = Math.floor(Math.random() * listelements.length);
    console.log("rand", randomIndex);
    // Click on the randomly selected <li> element
    await listelements[5].click();

    const EnterNumber = await $("input[placeholder='Enter number']");
    await EnterNumber.setValue("somethinng");
    await browser.keys(["Enter"]);
    const some = await $(".mb-2.flex.items-center.justify-between");
    await some.click();
    await browser.pause(5000);

    await browser.scroll(0, 200);

    // Find the button element
    const addButton = await $(
      "//button[normalize-space()='Add another program']"
    );
    await addButton.waitForExist();
    const { sx, sy } = await addButton.getLocation(); // Get the location of the button
    // Perform the click action at the specified coordinates
    await addButton.doubleClick();
    await browser.pause(30000);
    const removebtn = await $$('span[data-testid="removeButton"]');

    await removebtn[1].isDisplayed();
    await removebtn[1].click();
    // Check if the element exists based on the given XPath selector
    const elementExists = await $(
      `//div[@class='bg-white border border-lightGreyBorder rounded-lg']//div[4]`
    ).isExisting();

    // Check the result and log a message accordingly
    if (!elementExists) {
      console.log("The element does not exist.");
    } else {
      console.error("The element exists.");
    }
    await saveButton.click();
  });
});

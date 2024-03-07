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
    expect(clientName).toContain(AccountName);
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
    //check booking details
    const bookingDetails = await $(
      "div[class='flex xl:hidden p-4 rounded bg-primaryBg justify-between flex-wrap gap-4']"
    );
    expect(bookingDetails).toHaveText([
      "Bookings",
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
});

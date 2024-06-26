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
    await emailinputField.setValue("regression.test22@forastaging.net");
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

    const continueBtn = await $("//span[normalize-space()='Continue']");
    await continueBtn.click();
    await browser.pause(5000); // pause for 10 seconds
  });
  it("Advisor_Clients_TC015", async () => {
    //
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
      "a[href='/clients/dd95de66-7612-45da-a89e-a8533cc304a0']"
    );
    await clientCard.isDisplayed();
    await clientCard.click();
    await browser.pause(10000);

    async function checkIfTextIncludesAndElementIsDisplayed(x, y) {
      const clientInfo = await $("div.p-6");
      const elements = await $$("span.text-medium.font-bold.break-all");

      const clientInfoText = await clientInfo.getText();
      if (clientInfoText.includes(x)) {
        const isDisplayed = await elements[y].isDisplayed();
        if (isDisplayed) {
          console.log("Element is displayed.");
          // Perform further actions if the element is displayed
        } else {
          console.log("Element is not displayed.");
          // Handle the case where the element is not displayed
        }
      }
    }
    async function checkIfElementIsDisplayed(x, y) {
      const clientInfo = await $("div.p-6");
      const elements = await $$(
        "span.text-medium.font-bold.overflow-hidden.text-ellipsis"
      );

      const clientInfoText = await clientInfo.getText();
      if (clientInfoText.includes(x)) {
        const isDisplayed = await elements[y].isDisplayed();
        if (isDisplayed) {
          console.log("Element is displayed.");
          // Perform further actions if the element is displayed
        } else {
          console.log("Element is not displayed.");
          // Handle the case where the element is not displayed
        }
      }
    }
    async function checkIfElementIsDisplayed1(x, y) {
      const clientInfo = await $("div.p-6");
      const elements = await $$("span.text-medium.font-bold.whitespace-nowrap");
      const img = await $$("span.w-6.shrink-0 > img");
      const clientInfoText = await clientInfo.getText();
      if (clientInfoText.includes(x)) {
        const isDisplayed = await elements[y].isDisplayed();
        await img[y].isDisplayed();
        if (isDisplayed) {
          console.log("Element is displayed.");
          // Perform further actions if the element is displayed
        } else {
          console.log("Element is not displayed.");
          // Handle the case where the element is not displayed
        }
      }
    }
    const elements1 = await $$("span.text-medium.font-bold.whitespace-nowrap");

    //check optional values
    await checkIfTextIncludesAndElementIsDisplayed("Prefix", 0);
    //check first name
    await elements1[1].isDisplayed();
    //check middle name
    await checkIfTextIncludesAndElementIsDisplayed("Middle name", 2);
    //check last name
    await elements1[3].isDisplayed();

    await checkIfTextIncludesAndElementIsDisplayed("Suffix", 4);
    await checkIfTextIncludesAndElementIsDisplayed("Preferred name", 5);
    await checkIfTextIncludesAndElementIsDisplayed("Pronouns", 6);

    const emailContents = $$(
      "span.text-medium.font-bold.overflow-hidden.text-ellipsis"
    );
    //check personal email
    await emailContents[0].isDisplayed();
    //check WorkEmail
    await checkIfElementIsDisplayed("Work email", 1);
    //check other email
    await checkIfElementIsDisplayed("Other email", 2);
    //check mobile number field
    const mobile = await $$("span.text-medium.font-bold.whitespace-nowrap");
    await mobile[0].isDisplayed();
    //check home number
    await checkIfElementIsDisplayed1("Home number", 1);
    //check work number
    await checkIfElementIsDisplayed1("Work number", 2);
    //check other number
    await checkIfElementIsDisplayed1("Other number", 3);
    //check address
    const fullAddress = await $(
      "//div[@class='text-medium font-bold break-all']"
    );
    await fullAddress.isDisplayed();
  });
  it("Advisor_Clients_TC004", async () => {
    //check important dates
    await browser.scroll(0, 900);
    const importantDates = await $(
      "(//div[@class='bg-white border border-lightGreyBorder rounded-lg'])[2]"
    );
    await importantDates.isDisplayed();
    //check edit link
    const editLink = await $(
      "//div[@class='text-medium font-bold cursor-pointer text-link hover:underline']"
    );
    await editLink.isDisplayed();
    //check the text
    const text = await $(
      "//div[contains(text(),'Add dates to keep track of client’s important days')]"
    );
    await expect(text).toHaveText(
      "Add dates to keep track of client’s important days"
    );
    await editLink.click();
    //check cancel button
    const cancelButton = await $(
      "//span[@class='cursor-pointer text-smallLH20 font-bold text-secondary hover:underline']"
    );
    await cancelButton.isDisplayed();
    //check save button
    const saveButton = await $("//button[@id='agree']");
    await saveButton.isDisplayed();
    const defaultDates = await $$("div.grid.items-center.mb-4");
    //check default dates (birthday)
    await expect(defaultDates[0]).toHaveText(["Name of date\nBirthday"]);
    //check default dates (annivesary)
    await expect(defaultDates[1]).toHaveText(["Name of date\nAnniversary"]);
    //check date fields
    const datefield = await $$(
      "//div[contains(@class, 'grid') and contains(@class, 'min1440:grid-cols-[160px_1fr]') and contains(@class, 'min1440:gap-2') and contains(@class, 'items-center')]"
    );
    await datefield[0].isDisplayed();
    await datefield[1].isDisplayed();
    //check add another link
    const addAnotherLink = await $(
      "//span[@class='cursor-pointer text-medium font-bold text-link hover:underline']"
    );
    await addAnotherLink.isDisplayed();
    const Field = await $$(
      "//div[contains(@class, 'md:relative') and contains(@class, 'inline-block') and contains(@class, 'text-left') and contains(@class, 'w-full') and contains(@class, 'md:w-auto') and contains(@class, 'md:!w-full')]"
    );
    // //check the saved date format
    const savedDate = await $("(//div[@class='p-6'])[2]");
    async function checkSavedDate(x, y, z, m, l) {
      const Field = await $$(
        "//div[contains(@class, 'md:relative') and contains(@class, 'inline-block') and contains(@class, 'text-left') and contains(@class, 'w-full') and contains(@class, 'md:w-auto') and contains(@class, 'md:!w-full')]"
      );
      //month field check
      await Field[x].isDisplayed();
      //day field check
      await Field[y].isDisplayed();

      //check year field
      await Field[z].isDisplayed();

      //check month field listbox
      await Field[x].click();
      const monthFieldlistBox = await $(
        "//div[@class='absolute mt-1 w-full md:w-80 max-w-[94vw] border border-stroke rounded bg-white modal-shadow focus:outline-none normal-case z-40 p-2 md:!w-full !border-lightGreyBorder !p-0 h-[240px] overflow-y-scroll scroll-narrow-clients scroll-smooth w-full min-w-[7em]']"
      );

      const months = [
        "Month\nJanuary\nFebruary\nMarch\nApril\nMay\nJune\nJuly\nAugust\nSeptember\nOctober\nNovember\nDecember",
      ];
      await expect(monthFieldlistBox).toHaveText(months);
      //select a month from the list
      const monthOption = await $(`//div[@id='prefix-option-${m}']`);
      await monthOption.click();

      //check the days option according to january month
      await Field[y].click();
      await browser.pause(5000);
      const dayfieldList = await $(
        "//div[contains(@class, 'absolute') and contains(@class, 'mt-1') and contains(@class, 'w-full') and contains(@class, 'md:w-80') and contains(@class, 'max-w-[94vw]') and contains(@class, 'border') and contains(@class, 'border-stroke') and contains(@class, 'rounded') and contains(@class, 'bg-white') and contains(@class, 'modal-shadow') and contains(@class, 'focus:outline-none') and contains(@class, 'normal-case') and contains(@class, 'z-40') and contains(@class, 'p-2') and contains(@class, 'md:!w-full') and contains(@class, '!border-lightGreyBorder') and contains(@class, '!p-0') and contains(@class, 'h-[240px]') and contains(@class, 'overflow-y-scroll') and contains(@class, 'scroll-narrow-clients') and contains(@class, 'scroll-smooth') and contains(@class, 'w-full')]"
      );
      // Get all child elements of the parent div
      const childElements = await dayfieldList.$$("div");

      // Check if the number of child elements is 31
      expect(childElements.length).toBe(l);
      const dayOption = await $('//div[@id="prefix-option-5"]');
      await dayOption.click();
      await browser.pause(5000);
      await expect(Field[y]).toHaveTextContaining("5");

      //check year field
      await Field[z].click();
      const yearFieldList = await $(
        "//div[contains(@class, 'absolute') and contains(@class, 'mt-1') and contains(@class, 'w-full') and contains(@class, 'md:w-80') and contains(@class, 'max-w-[94vw]') and contains(@class, 'border') and contains(@class, 'border-stroke') and contains(@class, 'rounded') and contains(@class, 'bg-white') and contains(@class, 'modal-shadow') and contains(@class, 'focus:outline-none') and contains(@class, 'normal-case') and contains(@class, 'z-40') and contains(@class, 'p-2') and contains(@class, 'md:!w-full') and contains(@class, '!border-lightGreyBorder') and contains(@class, '!p-0') and contains(@class, 'h-[240px]') and contains(@class, 'overflow-y-scroll') and contains(@class, 'scroll-narrow-clients') and contains(@class, 'scroll-smooth') and contains(@class, 'w-full')]"
      );
      //check whether has the cureent year
      const currentYear = new Date().getFullYear();
      const minimumYear = currentYear - 99;

      await expect(yearFieldList).toHaveTextContaining(currentYear.toString());
      await expect(yearFieldList).toHaveTextContaining(minimumYear.toString());
      const yearOption = await $('//div[@id="prefix-option-2"]');
      await yearOption.click();
      await browser.pause(5000);
      await expect(Field[z]).toHaveTextContaining("2023");
    }
    //check using jan
    await checkSavedDate(0, 1, 2, 1, 33);
    await expect(Field[0]).toHaveTextContaining("January");

    //check using feb
    await checkSavedDate(3, 4, 5, 2, 31);
    await expect(Field[3]).toHaveTextContaining("February");

    await saveButton.click();

    //check add another link
    await editLink.click();
    await addAnotherLink.click();
    const removeBtn = await $(
      '//span[@class="cursor-pointer text-medium font-bold text-error hover:underline w-min"]'
    );
    //check remove btn
    await removeBtn.click();

    await addAnotherLink.click();

    //need to add for name text box
    const additionalDateInput = await $(
      '//input[@placeholder="Example: Mom’s Birthday"]'
    );
    await additionalDateInput.isDisplayed();
    await additionalDateInput.setValue("new Date");

    //check using april
    await checkSavedDate(6, 7, 8, 4, 32);

    await browser.pause(5000);
    await browser.scroll(0, -200);
    await saveButton.click();
    //add asserrtion after save
    const expectedTexts = [
      "Birthday\nJanuary 5, 2023\nAnniversary\nFebruary 5, 2023\nnew Date\nApril 5, 2023",
    ];

    await expect(savedDate).toHaveText(expectedTexts);

    async function deselect() {
      const editLink = await $(
        "//div[@class='text-medium font-bold cursor-pointer text-link hover:underline']"
      );
      await editLink.click();
      const Field = await $$(
        "//div[contains(@class, 'md:relative') and contains(@class, 'inline-block') and contains(@class, 'text-left') and contains(@class, 'w-full') and contains(@class, 'md:w-auto') and contains(@class, 'md:!w-full')]"
      );

      await Field[0].click();
      const monthnull = await $('//div[@id="prefix-option-null"]');
      await monthnull.click();
      await Field[1].click();
      const dayNull = await $('//div[@id="prefix-option-0"]');
      await dayNull.click();
      await Field[2].click();
      const yearNull = await $('//div[@id="prefix-option-0"]');
      await yearNull.click();

      //deselect second date
      await Field[3].click();
      await monthnull.click();
      await Field[4].click();
      await dayNull.click();

      await Field[5].click();
      await yearNull.click();

      //deselect third date
      const removeBtn = await $(
        '//span[@class="cursor-pointer text-medium font-bold text-error hover:underline w-min"]'
      );
      //check remove btn
      await removeBtn.click();
      await saveButton.click();
    }
    await deselect();
  });
});

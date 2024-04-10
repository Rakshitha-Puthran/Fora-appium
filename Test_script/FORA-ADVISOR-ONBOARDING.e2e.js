describe("Fora clients credit card", () => {
    it("launch fora in chrome", async () => {
      console.log("hello");
  
      // Navigate to the URL with incognito mode enabled
      await browser.url("https://outlook.live.com/");
      await browser.pause(20000); // pause for 20 seconds
    });
    it("login to the mail", async () => {
      const signIn = await $("a#mectrl_main_trigger");
      await signIn.click();
      await browser.pause(5000); // pause for 5 seconds
  
      const emailInput = await $('//input[@id="i0116"]');
      await emailInput.setValue("foraappium@outlook.com");
      const nextBtn = await $('//button[@id="idSIButton9"]');
      await nextBtn.click();
      await browser.pause(5000); // pause for 5 seconds
  
      const passwordInput = await $('//input[@id="i0118"]');
      await passwordInput.setValue("Qaoncloud@01");
      const signinbtn = await $('//button[@id="idSIButton9"]');
      await signinbtn.click();
      await browser.pause(5000); // pause for 5 seconds
  
      //click no button
      const noBtn = await $("//button[@id='declineButton']");
      await noBtn.click();
      await browser.pause(5000); // pause for 5 seconds
  
      const otherMAILS = await $('//span[normalize-space()="Other"]');
      await otherMAILS.scrollIntoView();
      await otherMAILS.click();
      await browser.pause(20000); // pause for 20 seconds
    });
    it("Advisor_Onboarding_TC001", async () => {
      //check the invitation to the mail
      const foraInvitation = await $$(
        '//h2[normalize-space()="[STAGING] Welcome to Fora!"]'
      );
      await foraInvitation[0].click();
      //check the text off the invitation recived
      const welcomeText = await $('//span[@class="x_tinyMce-placeholder"]');
      await expect(welcomeText).toHaveText("Welcome to Fora");
  
      const congratulationsText = await $(
        '//span[contains(text(),"Congratulations on becoming a FORA ad")]'
      );
      await expect(congratulationsText).toHaveText(
        expect.stringContaining("Congratulations on becoming a FORA advisor")
      );
  
      // Get the text content of the element
      const elementText = await $(
        'p[style="margin:0; font-size:14px; line-height:1.8; word-break:break-word; text-align:center; margin-top:0; margin-bottom:0"]'
      );
      await expect(elementText).toHaveText(
        expect.stringContaining("Let's start with account setup and activation")
      );
      //check the activate account button
      const activatebtn = await $('//div[@class="x_button-container"]//a');
      await activatebtn.click();
    });
    it("Advisor_Onboarding_TC002", async () => {
      const windowHandles = await browser.getWindowHandles();
      // Switch to the new tab
      await browser.switchToWindow(windowHandles[windowHandles.length - 1]);
      await browser.pause(5000);
      const subscriptionDetails = await $(
        '//div[@class="pt-8 pb-[30px] px-[22px] md:px-9"]'
      );
      await subscriptionDetails.isDisplayed();
      const annualPlanDetails = await $(
        '//p[@class="text-small font-bold text-secondary uppercase tracking-wide text-center mb-1"]'
      );
      await expect(annualPlanDetails).toHaveText("ANNUAL PLAN");
      const whatYouGetSection = await $(
        '//div[@class="bg-white py-12 px-6 md:px-[160px] md:pt-[136px] md:pb-[128px]"]'
      );
      await whatYouGetSection.isDisplayed();
  
      const exclusiveBenefits = await $(
        '//div[@class="px-6 py-12 md:px-[160px] md:py-[128px]"]'
      );
      await exclusiveBenefits.isDisplayed();
      const fromOurAdvisorSection = await $(
        '//div[@class="bg-white px-6 pt-14 pb-12 md:px-[160px] md:pb-[128px] md:pt-[136px]"]'
      );
      await fromOurAdvisorSection.isDisplayed();
      const becomeForaAdvisorSection = await $(
        '//div[@class="bg-primary px-8 pt-[56px] pb-12 md:px-[160px] md:pb-[128px] md:pt-[136px]"]'
      );
      await becomeForaAdvisorSection.isDisplayed();
  
      const choosePlanBtn = await $(
        '//button[@class="btn btn-primary w-full md:w-auto justify-center text-[20px] py-5 px-12"]'
      );
      await choosePlanBtn.isDisplayed();
  
      const monthlyPlanBtn = await $('//button[normalize-space()="Monthly"]');
      await monthlyPlanBtn.click();
      const monthlyPlanText = await $(
        '//p[@class="text-small font-bold text-secondary uppercase tracking-wide text-center mb-1"]'
      );
      await expect(monthlyPlanText).toHaveText("MONTHLY PLAN");
  
      //CHECK THE CHOOSE PLAN BUTTON
      await choosePlanBtn.click();
      await browser.pause(5000);
      // Execute JavaScript to get the scroll position
      const scrollPosition = await browser.execute(() => {
        return window.scrollY;
      });
  
      // Validate if the scroll position is at the top (scrollPosition == 0)
      await expect(scrollPosition).toEqual(0);
    });
    it("Advisor_Onboarding_TC003", async () => {
      //check the subscription button
      const subscribeButton = await $('//button[normalize-space()="Subscribe"]');
      await subscribeButton.click();
      await browser.pause(10000);
      //check the email connfirmation section
      const emailConfirmation = await $(
        '//div[@class="mb-4 rounded-lgscroll-mt-2 bg-white border shadow-card"]'
      );
      await emailConfirmation.isDisplayed();
      const emailConfirmationDropdown = await $$(
        '//div[@class="flex items-center p-6 md:p-8 cursor-pointer"]//*[name()="svg"]'
      );
      await emailConfirmationDropdown[1].isDisplayed();
      //check the fora mail provided
      const foraMailInfo = await $('//div[@class="my-6"]');
      await foraMailInfo.isDisplayed();
      //check the copy button
      const copyBtn = await $('//button[normalize-space()="Copy"]');
      await copyBtn.isDisplayed();
      //check the recovery mail info
      const recoveryMailInfo = await $(
        '//div[@class="p-6 md:p-8 border-t border-stroke"]//div[@class="mb-6 md:mb-8"]'
      );
      await recoveryMailInfo.isDisplayed();
  
      //check continue button
      const continuetbn = await $(
        '//button[@class="justify-center w-full px-6 py-3 btn-primary md:w-auto"]'
      );
      await continuetbn.isDisplayed();
  
      await continuetbn.click();
    });
    it("Advisor_Onboarding_TC005", async () => {
      await browser.pause(2000);
      //check personal information section
      const personalInfoSection = await $(
        '//body/div[@id="__next"]/div[@class="min-h-screen"]/div[@class="min-h-screen h-full flex flex-1"]/div[@class="w-full bg-background signup-content-container"]/div[@class="p-6 md:pt-8"]/div[@class="max-w-[640px] mx-auto"]/div[2]'
      );
      await personalInfoSection.isDisplayed();
  
      //check the dropdown svg
      const svg = await $$(
        '//body/div[@id="__next"]/div[@class="min-h-screen"]/div[@class="min-h-screen h-full flex flex-1"]/div[@class="w-full bg-background signup-content-container"]/div[@class="p-6 md:pt-8"]/div[@class="max-w-[640px] mx-auto"]/div[2]/div[1]//*[name()="svg"]'
      );
      //click the svg to close it
      await svg[1].click();
      //again click it open
      await svg[1].click();
  
      //check the country input box in personal info section
      const countryInput = await $('//input[@id="country_id"]');
      //set a improper value and check
      await countryInput.setValue("111");
      const noOption = await $('//div[@class=" css-9x5mqu"]');
      await browser.pause(7000); // //clear the values and set a proper one
      await expect(noOption).toHaveText("No options");
      await countryInput.click();
      await browser.keys(["Control", "a"]);
      await browser.keys(["Backspace"]);
      await browser.pause(7000); // //clear the values and set a proper one
  
      // // Find the dropdown container
      // const dropdownContainer = await $('//input[@id="country_id"]');
      // // Click on the dropdown to open the options
      //country option code is need to be written select usa option
      const country_dropdwn = await $('//input[@id="country_id"]');
      await country_dropdwn.click();
      await country_dropdwn.setValue("United Kingdom");
      await browser.pause(10000);
      await browser.keys("\uE007");
  
      //check address field
      //check address field place holder
      const addressInputBox = await $("//input[@id='address']");
      const address = await $('//label[normalize-space()="Address"]');
      //check validation mesage
      await addressInputBox.click();
  
      await address.click();
      const validation = await $(
        ".my-1.text-medium.text-error.items-start.whitespace-pre-wrap.flex"
      );
      await expect(validation).toHaveText("This field is required.");
      await addressInputBox.setValue("V Calle 11");
      //check apt number ,floor
      const floorlabel = await $(
        '//label[contains(text(),"Apartment, suite, floor, unit number. etc. (if app")]'
      );
      await floorlabel.isDisplayed();
      await expect(floorlabel).toHaveText(
        "Apartment, suite, floor, unit number. etc. (if applicable)"
      );
      const floorfieldInput = await $('//input[@id="address_additional"]');
      await floorfieldInput.setValue("12/A");
      await floorlabel.click();
  
      //check city field
      const cityFieldLabel = await $("//label[normalize-space()='City']");
      await cityFieldLabel.isDisplayed();
      await expect(cityFieldLabel).toHaveText("City");
      const cityFieldInput = await $('//input[@id="city"]');
      //check the validation message
      await cityFieldInput.click();
      await cityFieldLabel.click();
      await expect(validation).toHaveText("This field is required.");
      //set a proper value
      await cityFieldInput.setValue("coimbatore");
      await cityFieldLabel.click();
  
      //CHECK STATE FIELD
      const stateFieldLabel = await $("//label[normalize-space()='State']");
      await expect(stateFieldLabel).toHaveText("State");
      const stateFieldInput = await $('//input[@id="state"]');
      //check the validation message
      await stateFieldInput.click();
      await stateFieldLabel.click();
      await expect(validation).toHaveText("This field is required.");
      //set proper value
      await stateFieldInput.setValue("TamilNadu");
      await stateFieldLabel.click();
  
      //CHECK ZIP CODE FIELD
      const zipcodeFieldLabel = await $('//label[normalize-space()="ZIP code"]');
      await expect(zipcodeFieldLabel).toHaveText("ZIP code");
      const zipcodeFieldInput = await $('//input[@id="postal_code"]');
      //check the validation message
      await zipcodeFieldInput.click();
      await zipcodeFieldLabel.click();
      await expect(validation).toHaveText("This field is required.");
      //set proper value
      await zipcodeFieldInput.setValue("32435");
      await zipcodeFieldLabel.click();
  
      //check phone number field
      const Phonenum = await $('//input[@id="phoneInput"]');
      const value = await $(Phonenum).getAttribute("value");
      await expect(value).toEqual("+91");
      //check the validation
      await Phonenum.setValue("4444");
      await browser.pause(7000);
      const validation2 = await $('//p[@class="text-medium text-error"]');
      await expect(validation2).toHaveText(
        "Enter a valid phone number which must contain at least 7 digits."
      );
      await Phonenum.click();
      await browser.keys(["Control", "a"]);
      await browser.keys(["Backspace"]);
      //check country flag
      const countryFlag = await $('//select[@name="phoneCountry"]');
      await countryFlag.click();
      await countryFlag.selectByVisibleText("India");
      await Phonenum.setValue("8248339108");
      await browser.pause(5000);
      //check the check box available
      const checkBox = await $('//input[@id="is_entity_account"]');
      await checkBox.click();
  
      //check entity name
      const entityName = await $('//input[@id="entity_name"]');
      await entityName.setValue("john");
      //check advisor title
      const title = await $('//input[@id="entity_advisor_title"]');
      await title.setValue("Manager");
  
      //check the password section
      const passwordLabel = await $('//label[normalize-space()="Password"]');
      const password = await $('//input[@id="new_password"]');
      await password.setValue("we23ef2");
      await passwordLabel.click();
  
      const passwordValidation = await $(
        '//div[@class="rounded-md bg-red-100 p-4"]'
      );
      await expect(passwordValidation).toHaveText([
        "The password must contain at least 10 characters.\nThis field is required.",
      ]);
  
      //check entering empty character
      await password.click();
      await browser.keys(["Control", "a"]);
      await browser.keys(["Backspace"]);
      await passwordLabel.click();
      await expect(passwordValidation).toHaveText([
        "This field is required.\nThis field is required.",
      ]);
      //set proper values
      await password.click();
      await browser.keys(["Control", "a"]);
      await browser.keys(["Backspace"]);
      await password.setValue("Qaoncloud@01");
  
      //set improper values at confirm password
      const confirmPassword = await $('//input[@id="confirm_password"]');
      await confirmPassword.setValue("aaa");
      const confirmPasswordLabel = await $(
        '//label[normalize-space()="Confirm password"]'
      );
      await confirmPasswordLabel.click();
      await expect(passwordValidation).toHaveText([
        "The two password fields didn't match.",
      ]);
  
      //set proper values for confirm password
      await confirmPassword.click();
      await browser.pause(5000);
      await browser.keys(["Control", "a"]);
      await browser.keys(["Backspace"]);
      await confirmPassword.setValue("Qaoncloud@01");
  
      //check password field eye icon
      const passwordFieldEyeIcon = await $(
        '//body/div[@id="__next"]/div[@class="min-h-screen"]/div[@class="min-h-screen h-full flex flex-1"]/div[@class="w-full bg-background signup-content-container"]/div[@class="p-6 md:pt-8"]/div[@class="max-w-[640px] mx-auto"]/div[@class="mb-4 rounded-lgscroll-mt-2 bg-white border shadow-card"]/div[@class="p-6 md:p-8 border-t border-stroke"]/form[@action="#"]/div[@class="mb-6 md:mb-8"]/div[@class="grid grid-cols-2 gap-y-6"]/div[@class="col-span-2"]/div[@class="relative"]/div[@class="absolute inset-y-0 right-0 z-10 flex items-center px-2"]/span[1]//*[name()="svg"]'
      );
      await passwordFieldEyeIcon.click();
  
      //check  continue button
      const continueBtn1 = await $(
        '//div[@class="p-6 md:p-8 border-t border-stroke"]//button[@id="agree"]'
      );
      await continueBtn1.click();
    });
    it("Advisor_Onboarding_TC006", async () => {
      const body = await $('//div[@class="p-6 md:p-8 border-t border-stroke"]');
      //check the working of expansion arrow
      const svg = await $$(
        '//body/div[@id="__next"]/div[@class="min-h-screen"]/div[@class="min-h-screen h-full flex flex-1"]/div[@class="w-full bg-background signup-content-container"]/div[@class="p-6 md:pt-8"]/div[@class="max-w-[640px] mx-auto"]/div[3]/div[1]//*[name()="svg"]'
      );
      await svg[1].click();
      //check whether the cloumn is hidden after clicking
      await body.waitForDisplayed({ reverse: true });
      //expand the body by clicking
      await svg[1].click();
  
      //check whether the standrad agreement section is displayed
      const standardAgreement = await $(
        '//div[@class="p-6 md:p-8 border-t border-stroke"]//div[@class="mb-6"]'
      );
      await standardAgreement.isDisplayed();
      //check the contractor agreement is displayed
      const contractorAgreement = await $('//div[@class="mb-8"]');
      await contractorAgreement.isDisplayed();
      //check the continue btn
      const continueButton = await $(
        '//div[@class="p-6 md:p-8 border-t border-stroke"]//button[@id="agree"]'
      );
      await continueButton.isDisplayed();
      // Check if the continue button is enabled when both check boxes are not checked
  
      const isEnabled = await continueButton.isEnabled();
  
      // Assert whether the continue button is enabled
      expect(isEnabled).toBe(false);
  
      //check the check box of contractor agreement
      const contractorAgreementCheckbox = await $(
        '//input[@id="compensation_terms_agree"]'
      );
      await contractorAgreementCheckbox.click();
      const isEnabled1 = await continueButton.isEnabled();
  
      // Assert whether the continue button is enabled
      expect(isEnabled1).toBe(false);
      await contractorAgreementCheckbox.click();
  
      //check the commision schedule checkbox
      const commisioncheckBox = await $('//input[@id="terms_conditions_agree"]');
      await commisioncheckBox.click();
      const isEnabled2 = await continueButton.isEnabled();
  
      // Assert whether the continue button is enabled
      expect(isEnabled2).toBe(false);
      await commisioncheckBox.click();
      //check when both check boxes are checked
      await contractorAgreementCheckbox.click();
      await commisioncheckBox.click();
      await continueButton.isEnabled();
      await continueButton.click();
      await browser.pause(5000);
    });
    it("Advisor_Onboarding_TC007", async () => {
      const subscriptiontext = await $(
        '//p[@class="text-medium font-bold md:text-header"]'
      );
      await expect(subscriptiontext).toHaveText("Monthly Plan");
      //check the card details section
      await browser.pause(2000);
      const iframe = await $("//iframe[@title='Secure payment input frame']");
      // Switch to the iframe context
      await browser.switchToFrame(iframe);
      await browser.pause(4000);
  
      await browser.pause(2000);
      const cardNumber = await $('[placeholder="1234 1234 1234 1234"]');
      const expiry = await $('[placeholder="MM / YY"]');
      const cvv = await $('[placeholder="CVC"]');
      await cardNumber.waitForDisplayed();
      await expiry.waitForDisplayed();
      await cvv.waitForDisplayed();
  
      //enter invalid card number
      await cardNumber.setValue("6454 4545 4532 3244");
      await browser.pause(2000);
      await expiry.setValue("12/25");
      await browser.pause(1000);
      const card_error1 = await $('//*[@id="Field-numberError"]');
      //show show error message
      await expect(card_error1).toHaveText("Your card number is invalid.");
  
      //enter incomplete card - <16 digits
      await cardNumber.clearValue();
      await cardNumber.setValue("4242");
      await browser.pause(2000);
      await expiry.setValue("12/25");
      await browser.pause(1000);
      const card_error2 = await $('//*[@id="Field-numberError"]');
      //show show error message
      await expect(card_error2).toHaveText("Your card number is incomplete.");
      await browser.pause(3000);
      console.log("incomplete card no");
  
      //expiry - 1 digit in year
      await cardNumber.clearValue();
      await cardNumber.setValue("4242 4242 4242 4242");
      await browser.pause(2000);
      await expiry.setValue("12/2");
      await browser.pause(1000);
      await cvv.setValue("123");
      const expiry_error1 = await $('//*[@id="Field-expiryError"]');
      //show show error message
      await expect(expiry_error1).toHaveText(
        "Your card's expiration date is incomplete."
      );
      await browser.pause(3000);
      console.log("year field - 1 digit only");
  
      //expiry - past year
      await expiry.clearValue();
      await expiry.setValue("12/21");
      await browser.pause(2000);
      cvv.setValue("123");
      await browser.pause(1000);
      const expiry_error2 = await $('//*[@id="Field-expiryError"]');
      //show show error message
      await expect(expiry_error2).toHaveText(
        "Your card's expiration year is in the past."
      );
      await browser.pause(3000);
      console.log("expiry year - past");
  
      //expiry - +50 future year
      await expiry.clearValue();
      await expiry.setValue("12/80");
      await browser.pause(2000);
      cvv.setValue("123");
      await browser.pause(1000);
      const expiry_error3 = await $('//*[@id="Field-expiryError"]');
      //show show error message
      await expect(expiry_error3).toHaveText(
        "Your card's expiration year is invalid."
      );
      await browser.pause(3000);
      console.log("expiry year - 50 years");
  
      //cvv - <3 digits
      await expiry.clearValue();
      await expiry.setValue("12/25");
      await browser.pause(2000);
      await cvv.setValue("1");
      await browser.pause(1000);
      await expiry.click();
      const cvv_error1 = await $('//*[@id="Field-cvcError"]');
      //show show error message
      await expect(cvv_error1).toHaveText(
        "Your card's security code is incomplete."
      );
      await browser.pause(3000);
      console.log("CVV - <3 digits");
  
      //enter valid data and click add
      await cvv.clearValue();
      await cvv.setValue("123");
      await browser.pause(1000);
  
      const selectCountry = await $("#Field-countryInput");
  
      // Wait for the dropdown to be clickable
      await selectCountry.waitForClickable();
      await selectCountry.click();
  
      // Select "India" from the dropdown
      await selectCountry.selectByVisibleText("India");
      //switch back to parent
      await browser.switchToParentFrame();
      await browser.pause(10000);
      const createAccount = await $(
        '//button[normalize-space()="Create your account"]'
      );
  
      await createAccount.click();
      await browser.pause(10000);
      //need to click start onbording
      //and check title
    });
  });
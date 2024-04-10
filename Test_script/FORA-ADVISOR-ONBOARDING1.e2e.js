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
    it("Advisor_Onboarding_TC009", async () => {
      const warning = await $(
        '//p[@class="text-staticMobileTitle font-semibold text-black-900"]'
      );
      await warning.isDisplayed();
    });
  });
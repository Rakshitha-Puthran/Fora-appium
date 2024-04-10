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
  
    it("Advisor_Training_TC0001", async () => {
      const Hamburger = await $("//button[@id='navbar-open']");
      await Hamburger.click();
      //click on training menu otpion
      const trainingMenuOption = await $('//a[@title="Training"]');
      await trainingMenuOption.click();
      //check the url of the page
      await expect(browser).toHaveUrl(
        expect.stringContaining("training#getting-started")
      );
      //check whether welcome to fora section
      const welcomeToFora = await $('//div[@id="getting-started"]');
      await welcomeToFora.isDisplayed();
  
      //check get certified section
      const getCertified = await $('//div[@id="certified"]');
      await getCertified.isDisplayed();
  
      //check advisor tool kit section
      const advisorToolkit = await $('//div[@id="advisor-toolkit"]');
      await advisorToolkit.isDisplayed();
  
      //check advisor tool kit section
      const advancedCertification = await $('//div[@id="advanced"]');
      await advancedCertification.isDisplayed();
  
      //check partner Training section
      const partnerTraining = await $('//div[@id="partner-training"]');
      await partnerTraining.isDisplayed();
  
      //check partner Training section
      const destinationTraining = await $('//div[@id="destination"]');
      await destinationTraining.isDisplayed();
  
      //check book better section
      const bookBetter = await $('//div[@id="training-book-better"]');
      await bookBetter.isDisplayed();
  
      //check get started btn in welcome to fora section
      const getStartedBtn = await $$(
        '//a[@class="btn-primary w-full md:w-auto justify-center px-6 py-3" and @data-testid="training-button"]'
      );
      //check how to make a booking in welcome fora
      await getStartedBtn[1].click();
      await browser.pause(7000);
      async function checkLessons(i) {
        //check the launch lesson in welcome fora section
        const launchLesson = await $$(
          "(//a[contains(@rel,'noreferrer')][normalize-space()='Launch Lesson'])"
        );
        for (const button of launchLesson) {
          //uanble to click access the booking guide button
          await button.click();
          //check the video player
          const videoPlayer = await $('//video[@data-testid="player"]');
          await videoPlayer.isDisplayed();
  
          //play the video and check
          const PlayButton = await $('//button[@title="Play Video"]');
          await PlayButton.click();
          await browser.pause(5000);
  
          //mark as completed
          const markCompleted = await $(
            '//article[contains(@class,"mt-4")]//button[contains(@class,"rounded-3xl bg-white font-bold py-2 px-4 text-small border border-main")][normalize-space()="Mark complete"]'
          );
          await markCompleted.isDisplayed();
          const Hamburger = await $("//button[@id='navbar-open']");
          await Hamburger.click();
          //click on training menu otpion
          const trainingMenuOption = await $('//a[@title="Training"]');
          await trainingMenuOption.click();
          await getStartedBtn[i].click();
        }
      }
      await checkLessons(1);
      // we can also validate lesson title and names
  
      //check getting started in welcome to fora
      await getStartedBtn[2].click();
      await checkLessons(2);
      // we can also validate lesson title and names
      //check need to know inn welcome to fora
      await getStartedBtn[3].click();
      await checkLessons(3);
      // we can also validate lesson title and names
    });
  });
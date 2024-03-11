describe("fora", () => {
  it(" Advisor_Bookings_TC001", async () => {
    console.log(" Bookings - To Check the Bookings section");
    // login
    await browser.url("https://advisor.forastaging.net/");
    const signInButton = await $(
      "//button[normalize-space()='Sign in with your Fora email']"
    );
    await signInButton.click();
    //enter valid email ID
    const emailinputField = await $("//input[@id='identifierId']");
    await emailinputField.setValue("mqa.mqa020201@forastaging.net");
    emailinputField.sendKeyEvent(66);
    const nextButton = await $(
      ".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b"
    );
    await nextButton.click();
    //enter valid password
    const password = await $("//input[@name='Passwd']");
    await password.setValue("Qaoncloud@01");
    await nextButton.click();
    const continueBtn = await $(
      "//body[1]/div[1]/div[1]/div[2]/div[1]/c-wiz[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/button[1]"
    );
    await continueBtn.click();
    await browser.pause(10000); // pause for 10 seconds

    //welcome mqa!
    const welcometext = await $("//h1[normalize-space()='Welcome, mqa!']");
    if (!welcometext.isDisplayed()) {
      throw new Error("Welcome text not displayed");
    }
    //click menu and click booking
    console.log("click menu ");
    const menu = await $('//*[@id="navbar-open"]');
    menu.click();
    console.log("click booking ");
    const booking = await $('//*[@id="side-menu"]/nav/div[2]/div[1]/a[1]/span');
    booking.click();
    await browser.pause(10000);
    //booking title
    console.log("booking title ");
    const bookingTitle = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[1]/span'
    );
    if (!bookingTitle.isDisplayed()) {
      throw new Error("booking title not displayed");
    }
    //total booking
    console.log("total booking");
    const totalBooking = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[2]/div/div/div[1]/p'
    );
    if (!totalBooking.isDisplayed()) {
      throw new Error("total booking not displayed");
    }
    //commissionable value
    console.log("Commission value ");
    const commissionValue = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[2]/div/div/div[2]/p[1]'
    );
    if (!commissionValue.isDisplayed()) {
      throw new Error("commission Value not displayed");
    }
    //advisor commision
    console.log("Advisor commision ");
    const advisoncommission = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[2]/div/div/div[3]/p[1]'
    );
    if (!advisoncommission.isDisplayed()) {
      throw new Error("total booking not displayed");
    }
    //make first booking
    console.log("make first booking ");
    const make_first = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[3]/div/div/div/div/h4'
    );
    if (!make_first.isDisplayed()) {
      throw new Error("make first not displayed");
    }
    //browse
    console.log("browse");
    const browse = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[3]/div/div/div/div/p'
    );
    if (!browse.isDisplayed()) {
      throw new Error("browse not displayed");
    }

    //report an issue
    console.log("report an issue");
    const reportissue = await $(
      '//*[@id="main-container"]/main/div/div[2]/div[2]'
    );
    if (!reportissue.isDisplayed()) {
      throw new Error("report an issue not displayed");
    }
  });

  it(" Advisor_Bookings_TC002", async () => {
    //search with invalid
    const search = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[1]/div[1]/div[1]/div/label/input'
    );
    await search.setValue("test");
    //no result found
    console.log("no result found");
    await browser.pause(10000);
    const noresult = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[3]/div/div/p'
    );
    if (!noresult.isDisplayed()) {
      throw new Error("no result found not displayed");
    }

    //validate close icon in search bar
    const close = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[1]/div[1]/div[1]/div/label/div'
    );
    await close.click();
    await browser.pause(5000);
    //const make_first = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[3]/div/div/div/div/h4")
    //if(!make_first.isDisplayed()) {
    // throw new Error("make first not displayed");
    // }
  });

  it(" Advisor_Bookings_TC003", async () => {
    //search by name
    console.log(
      "TC03....................................................................................."
    );
    await browser.pause(5000);
    //fetch total bookings
    const tb = await $("//div[@class='text-header md:text-title font-bold']");
    const Get_booking = tb.getText();
    const total_booking = await Get_booking;
    console.log("total bookings : " + total_booking);

    const search = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[1]/div[1]/div[1]/div/label/input'
    );
    await search.setValue("Anonymous_7f855d69 Anonymous_5d1ef669");
    await browser.pause(2000);
    const tb1 = await $("//div[@class='text-header md:text-title font-bold']");
    const Get_booking1 = tb1.getText();
    const searchReslt_fora = await Get_booking1;
    const expectedResult = "1";
    assert.strictEqual(searchReslt_fora, expectedResult, `search failed"`);
  });
  it(" Advisor_Bookings_TC004", async () => {
    //search by confirmation number
    console.log("TC04............");
    await browser.pause(5000);
    const search = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[1]/div[1]/div[1]/div/label/input'
    );
    await search.setValue("Anonymous_02864d1a");
    await browser.pause(2000);
    const tb1 = await $("//div[@class='text-header md:text-title font-bold']");
    const Get_booking1 = tb1.getText();
    const search_confirmation = await Get_booking1;
    const expectedResult1 = "1";

    const tb2 = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[2]/div/div/div[2]/p[2]'
    );
    const Get_booking2 = tb1.getText();
    const search_confirmation2 = await Get_booking2;
    const expectedResult2 = "$1,330";

    assert.strictEqual(
      search_confirmation2,
      expectedResult2,
      `search failed : price did not match"`
    );
  });

  it(" Advisor_Bookings_TC005", async () => {
    //search by date
    const search = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[1]/div[1]/div[1]/div/label/input'
    );
    await search.setValue("01/01/2024");
    //no result found
    console.log("no result found");
    await browser.pause(10000);
    const noresult = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[3]/div/div/p'
    );
    if (!noresult.isDisplayed()) {
      throw new Error("no result found not displayed");
    }
  });

  it(" Advisor_Bookings_TC006", async () => {
    //search by booking status
    const search = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[1]/div[1]/div[1]/div/label/input'
    );
    await search.setValue("Booked");
    //no result found
    console.log("no result found");
    await browser.pause(10000);
    const noresult = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[3]/div/div/p'
    );
    if (!noresult.isDisplayed()) {
      throw new Error("no result found not displayed");
    }
  });
});

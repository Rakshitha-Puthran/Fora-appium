const { expect, browser, $ } = require("@wdio/globals");
const { remote } = require("webdriverio");
const assert = require("assert");
const { Builder, By, Key, until } = require("selenium-webdriver");

describe("fora", () => {
  it.only("Advisor_Help_TC001", async () => {
    //help screen validation
    await browser.url("https://advisor.forastaging.net/");
    const signInButton = await $(
      "//button[normalize-space()='Sign in with your Fora email']"
    );
    await signInButton.click();
    await browser.pause(10000);

    const emailinputField = await $("//input[@id='identifierId']");
    await emailinputField.setValue("mqa.mqa020201@forastaging.net");
    await browser.pause(2000);

    const nextButton = await $('//*[@id="identifierNext"]/div/button/span');
    await nextButton.click();
    await browser.pause(2000);

    const password = await $("//input[@name='Passwd']");
    await password.setValue("Qaoncloud@01");
    await browser.pause(3000);
    //const nextButton2 = await $("//*[@id=\"passwordNext\"]/div/button/div[3]")
    const nextButton2 = await $("//span[normalize-space()='Next']");
    await nextButton2.click();
    await browser.pause(2000);
    const continueBtn = await $("//span[normalize-space()='Continue']");
    await continueBtn.click();
    await browser.pause(10000);
    //welcome mqa!
    const welcometext = await $("//h1[normalize-space()='Welcome, mqa!']");
    if (!welcometext.isDisplayed()) {
      throw new Error("Welcome text not displayed");
    }

    //click menu and click help
    console.log("click menu ");
    const menu = await $('//*[@id="navbar-open"]');
    menu.click();
    const help = await $("//a[@title='Help']");
    help.click();
    await browser.pause(5000);
    //validate help page fileds

    const help_centre = await $("//h1[normalize-space()='Help Center']");
    if (!help_centre.isDisplayed()) {
      throw new Error("help_centre not displayed");
    }

    const searchBtn = await $("//a[normalize-space()='Search']");
    if (!searchBtn.isDisplayed()) {
      throw new Error("searchBtn not displayed");
    }

    const search_textbx = await $(
      "//input[@placeholder='Find answers and resources']"
    );
    if (!search_textbx.isDisplayed()) {
      throw new Error("search_textbx not displayed");
    }

    const help_fileds = await $('//*[@id="main-container"]/main/div/div[1]');
    const textsToCheck = [
      "Ask the community",
      "Policy",
      "Tech",
      "Membership",
      "Booking",
      "Finance",
      "Training",
      "Marketing",
    ];
    for (const text of textsToCheck) {
      const isTextPresent = await help_fileds
        .$(`//*[contains(text(), '${text}')]`)
        .isDisplayed();
      if (isTextPresent) {
        console.log(`"${text}" is present `);
      } else {
        console.error(`"${text}" is not present `);
      }
    }
  });

  it.only("Advisor_Help_TC002", async () => {
    console.log(
      "TC02............................................................... "
    );
    await browser.pause(5000);
    //search with invalid value
    const search_textbx = await $(
      "//input[@placeholder='Find answers and resources']"
    );
    search_textbx.setValue("sfxx");
    const searchBtn = await $("//a[normalize-space()='Search']");
    await browser.pause(2000);
    searchBtn.click();
    await browser.pause(3000);
    const nosearch = await $(
      "//h3[normalize-space()='No search results found']"
    );
    if (!nosearch.isDisplayed()) {
      throw new Error("nosearch not displayed");
    }
    await browser.pause(5000);
    //search with valid value
    search_textbx.setValue("test");
    searchBtn.click();

    await browser.pause(3000);
    const result = await $$(
      "//h2[contains(text(),'Testing That this Article Makes it to Algolia Sear')]"
    );
    await browser.pause(2000);
    const searchresult = result.text;
    const exp_result = "No search results found";
    assert.notStrictEqual(searchresult, exp_result, `search failed"`);

    //back to help center
    const back = await $("//a[normalize-space()='Fora Help Center']");
    back.click();
    const ask_community = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/p'
    );
    if (!ask_community.isDisplayed()) {
      throw new Error("ask_community not displayed");
    }
  });

  it("Advisor_Help_TC003", async () => {
    console.log(
      "TC03............................................................... "
    );
    //ask the community section
    const askCommunity = await $(`//*[contains(text(), 'Ask the community')]`);
    if (!askCommunity.isDisplayed()) {
      throw new Error("ask Community not displayed");
    }
    const gotoForum = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/p/a'
    );
    if (!gotoForum.isDisplayed()) {
      throw new Error("go to Forum not displayed");
    }
    gotoForum.click();
    await browser.pause(2000);
    //check for fields
    const forum = await $('//*[@id="__next"]/div[2]/div/main/div');
    const textsToCheck = [
      "Page not found",
      "Don’t panic. What do we do when we are lost?",
      "Go back home",
    ];
    for (const text of textsToCheck) {
      const isTextPresent = await forum
        .$(`//*[contains(text(), '${text}')]`)
        .isDisplayed();
      if (isTextPresent) {
        console.log(`"${text}" is present `);
      } else {
        console.error(`"${text}" is not present `);
      }
    }

    //click go back to home
    const home = await $(`//*[contains(text(), 'Go back home')]`);
    home.click();
    //home page validation
    const welcome = await $("//div[@id='__next']");
    if (!welcome.isDisplayed()) {
      throw new Error("welcome not displayed");
    }

    const menu = await $('//*[@id="navbar-open"]');
    menu.click();
    const help = await $("//a[@title='Help']");
    help.click();
    await browser.pause(2000);
  });

  it("Advisor_Help_TC004", async () => {
    console.log(
      "TC04............................................................... "
    );
    //to check policy section
    const policy = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[3]/div/a[1]'
    );
    const texts = ["Policy", "See all"];
    for (const text of texts) {
      const isTextPresent = await policy
        .$(`//*[contains(text(), '${text}')]`)
        .isDisplayed();
      if (isTextPresent) {
        console.log(`"${text}" is present `);
      } else {
        console.error(`"${text}" is not present `);
      }
    }
    //to check policy section
    const seeAll = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[3]/div/a[1]/div/div[2]/div/p'
    );
    seeAll.click();
    const helppolicy = await $('//*[@id="main-container"]/main/div/div[1]/p');
    if (!helppolicy.isDisplayed()) {
      throw new Error("helppolicy not displayed");
    }
    const back = await $("//a[normalize-space()='Fora Help Center']");
    if (!back.isDisplayed()) {
      throw new Error("back not displayed");
    }

    back.click();
    const help_centre = await $("//h1[normalize-space()='Help Center']");
    if (!help_centre.isDisplayed()) {
      throw new Error("help_centre not displayed");
    }
  });
  it("Advisor_Help_TC005", async () => {
    console.log(
      "TC05............................................................... "
    );
    //check Tech section
    const tech = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[3]/div/a[2]'
    );
    const textsToCheck = [
      "[Staging] This is a New Article",
      "12k Bytes Article",
      "TEST Webhook",
      "Testing That this Article Makes it to Algolia Search",
      "See all",
    ];
    for (const text of textsToCheck) {
      const isTextPresent = await tech
        .$(`//*[contains(text(), '${text}')]`)
        .isDisplayed();
      if (isTextPresent) {
        console.log(`"${text}" is present `);
      } else {
        console.error(`"${text}" is not present `);
      }
    }
    //clicking all the links and validating
    const newArticle = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[3]/div/a[2]/div/a[1]'
    );
    newArticle.click();
    await browser.pause(6000);
    //12 bytes
    const byteArticle = await $("//a[normalize-space()='12k Bytes Article']");
    byteArticle.click();
    await browser.pause(2000);
    const byteTitle = await $(`//*[contains(text(), '12k Bytes Article')]`);
    const back = await $(`//*[contains(text(), 'Back')]`);
    if (!byteTitle.isDisplayed()) {
      throw new Error("byteTitle not displayed");
    }
    if (!back.isDisplayed()) {
      throw new Error("back not displayed");
    }
    await browser.pause(2000);
    back.click();
    //TEST Webhook
    const testWebhook = await $(`//a[normalize-space()='TEST Webhook']`);
    testWebhook.click();
    const testweb = await $('//*[@id="main-container"]/main/div/div[1]/div[2]');
    const texts = [
      "TEST Webhook",
      "Testing webhook trigger",
      "Last Updated:",
      "Back",
    ];
    for (const text of texts) {
      const isTextPresent = await testweb
        .$(`//*[contains(text(), '${text}')]`)
        .isDisplayed();
      if (isTextPresent) {
        console.log(`"${text}" is present `);
      } else {
        console.error(`"${text}" is not present `);
      }
    }
    await browser.pause(2000);
    //go back
    const back1 = await $(`//*[contains(text(), 'Back')]`);
    back1.click();
    const ask_community = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/p'
    );
    if (!ask_community.isDisplayed()) {
      throw new Error("ask_community not displayed");
    }
    await browser.pause(2000);
  });
  it("Advisor_Help_TC006", async () => {
    //membership
    console.log(
      "TC06............................................................... "
    );

    const membership = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[3]/div/a[3]'
    );
    const texts = ["Membership", "See all"];
    for (const text of texts) {
      const isTextPresent = await membership
        .$(`//*[contains(text(), '${text}')]`)
        .isDisplayed();
      if (isTextPresent) {
        console.log(`"${text}" is present `);
      } else {
        console.error(`"${text}" is not present `);
      }
    }
    //click see all
    const seeAll = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[3]/div/a[3]/div/div[2]/div/p'
    );
    seeAll.click();
    await browser.pause(2000);
    const helpwithmember = await $(
      `//*[contains(text(), 'Help with Membership')]`
    );
    if (!helpwithmember.isDisplayed()) {
      throw new Error("help with member not displayed");
    }
    await browser.pause(2000);

    const forahelp = await $(`//*[contains(text(), 'Fora Help Center')]`);
    forahelp.click();
    const ask_community = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/p'
    );
    if (!ask_community.isDisplayed()) {
      throw new Error("ask_community not displayed");
    }
    await browser.pause(2000);
  });

  it("Advisor_Help_TC007", async () => {
    //Booking
    console.log(
      "TC07............................................................... "
    );

    const booking = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[3]/div/a[4]'
    );
    const texts = [
      "Booking",
      //   "I'm getting an error message when adding the IATA. What should I do?",
      "How do I get a login for a supplier?",
      "How do I know the commission rate for any given supplier?",
      "How does Fora calculate the commissionable amount in a booking?",
      "See all",
    ];
    for (const text of texts) {
      const isTextPresent = await booking
        .$(`//*[contains(text(), '${text}')]`)
        .isDisplayed();
      if (isTextPresent) {
        console.log(`"${text}" is present `);
      } else {
        console.error(`"${text}" is not present `);
      }
    }
    //click see all
    const seeAll = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[3]/div/a[4]/div/div[2]/div/p'
    );
    seeAll.click();
    await browser.pause(2000);
    const helpbooking = await $(`//*[contains(text(), 'Help with Booking')]`);
    if (!helpbooking.isDisplayed()) {
      throw new Error("help booking not displayed");
    }
    await browser.pause(2000);

    const forahelp = await $(`//*[contains(text(), 'Fora Help Center')]`);
    forahelp.click();
    await browser.pause(2000);

    const ask_community = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/p'
    );
    if (!ask_community.isDisplayed()) {
      throw new Error("ask_community not displayed");
    }
    await browser.pause(2000);

    /*
//clicking 1st link
const link1= await $(`//*[contains(text(), 'I'm getting an error message when adding the IATA. What should I do?')]`)
link1.click()
await browser.pause(2000)
if(!link1.isDisplayed()) {
  throw new Error("link1 not opened");
}
const back= await $(`//*[contains(text(), 'Back')]`)
if(!back.isDisplayed()) {
  throw new Error("back not displayed");
}
back.click()*/
    //clicking 2nd link
    const link2 = await $(
      `//*[contains(text(), 'How do I get a login for a supplier?')]`
    );
    link2.click();
    await browser.pause(2000);
    if (!link2.isDisplayed()) {
      throw new Error("link2 not opened");
    }
    await browser.pause(2000);
    const back2 = await $(`//*[contains(text(), 'Back')]`);
    if (!back2.isDisplayed()) {
      throw new Error("back not displayed");
    }
    back2.click();
    await browser.pause(2000);
    //clicking 3rd link
    const link3 = await $(
      `//*[contains(text(), 'How do I know the commission rate for any given supplier?')]`
    );
    link3.click();
    await browser.pause(2000);
    if (!link3.isDisplayed()) {
      throw new Error("link2 not opened");
    }
    const back3 = await $(`//*[contains(text(), 'Back')]`);
    if (!back3.isDisplayed()) {
      throw new Error("back not displayed");
    }
    back3.click();
    await browser.pause(2000);
    //clicking 4th link
    const link4 = await $(
      `//*[contains(text(), 'How does Fora calculate the commissionable amount in a booking?')]`
    );
    link4.click();
    await browser.pause(2000);
    if (!link4.isDisplayed()) {
      throw new Error("link2 not opened");
    }
    const back4 = await $(`//*[contains(text(), 'Back')]`);
    if (!back4.isDisplayed()) {
      throw new Error("back not displayed");
    }
    back4.click();
    await browser.pause(2000);
    if (!ask_community.isDisplayed()) {
      throw new Error("ask_community not displayed");
    }
  });

  it("Advisor_Help_TC008", async () => {
    //finance
    console.log(
      "TC08............................................................... "
    );
    const finance = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[3]/div/a[5]'
    );
    const texts = [
      "Finance",
      "[Staging] This is a New Article",
      "How do I collect payment information from my clients?",
      "How do I update my bank details?",
      "How do I complete a net rate booking?",
      "See all",
    ];
    for (const text of texts) {
      const isTextPresent = await finance
        .$(`//*[contains(text(), '${text}')]`)
        .isDisplayed();
      if (isTextPresent) {
        console.log(`"${text}" is present `);
      } else {
        console.error(`"${text}" is not present `);
      }
    }
    //click see all
    const seeAll = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[3]/div/a[5]/div/div[2]/div/p'
    );
    seeAll.click();
    await browser.pause(2000);
    const helpFinance = await $(`//*[contains(text(), 'Help with Finance')]`);
    if (!helpFinance.isDisplayed()) {
      throw new Error("help Finance not displayed");
    }
    const forahelp = await $(`//*[contains(text(), 'Fora Help Center')]`);
    forahelp.click();
    await browser.pause(2000);
    const ask_community = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/p'
    );
    if (!ask_community.isDisplayed()) {
      throw new Error("ask_community not displayed");
    }
    //clicking 1st link
    //not working

    //clicking 2nd link
    const link2 = await $(
      `//*[contains(text(), 'How do I collect payment information from my clients?')]`
    );
    link2.click();
    await browser.pause(2000);
    if (!link2.isDisplayed()) {
      throw new Error("link2 not opened");
    }
    const back2 = await $(`//*[contains(text(), 'Back')]`);
    if (!back2.isDisplayed()) {
      throw new Error("back not displayed");
    }
    back2.click();
    await browser.pause(2000);
    //clicking 3rd link
    const link3 = await $(
      `//*[contains(text(), 'How do I update my bank details?')]`
    );
    link3.click();
    await browser.pause(2000);
    if (!link3.isDisplayed()) {
      throw new Error("link2 not opened");
    }
    const back3 = await $(`//*[contains(text(), 'Back')]`);
    if (!back3.isDisplayed()) {
      throw new Error("back not displayed");
    }
    back3.click();
    await browser.pause(2000);

    //clicking 4th link
    const link4 = await $(
      `//*[contains(text(), 'How do I complete a net rate booking?')]`
    );
    link4.click();
    await browser.pause(2000);
    if (!link4.isDisplayed()) {
      throw new Error("link4 not opened");
    }
    const back4 = await $(`//*[contains(text(), 'Back')]`);
    if (!back4.isDisplayed()) {
      throw new Error("back not displayed");
    }
    back4.click();
    if (!ask_community.isDisplayed()) {
      throw new Error("ask_community not displayed");
    }
    await browser.pause(2000);
  });

  it("Advisor_Help_TC009", async () => {
    //training
    console.log(
      "TC09............................................................... "
    );

    const training = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[3]/div/a[6]'
    );
    const texts = [
      "Training",
      "Can I start my cohort training before live sessions begin?",
      "When will I receive the schedule for cohort training?",
      "I missed a training! What do i do?",
      "Which cohort am I in?",
      "See all",
    ];
    for (const text of texts) {
      const isTextPresent = await training
        .$(`//*[contains(text(), '${text}')]`)
        .isDisplayed();
      if (isTextPresent) {
        console.log(`"${text}" is present `);
      } else {
        console.error(`"${text}" is not present `);
      }
    }
    //click see all
    const seeAll = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[3]/div/a[6]/div/div[2]/div/p'
    );
    seeAll.click();
    await browser.pause(2000);
    const helpFinance = await $(`//*[contains(text(), 'Help with Training')]`);
    if (!helpFinance.isDisplayed()) {
      throw new Error("help Finance not displayed");
    }
    const forahelp = await $(`//*[contains(text(), 'Fora Help Center')]`);
    forahelp.click();
    await browser.pause(2000);
    const ask_community = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/p'
    );
    if (!ask_community.isDisplayed()) {
      throw new Error("ask_community not displayed");
    }
  });

  it("Advisor_Help_TC010", async () => {
    //marketing
    console.log(
      "TC10............................................................... "
    );

    const Marketing = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[3]/div/a[7]'
    );
    const texts = ["Marketing", "See all"];
    for (const text of texts) {
      const isTextPresent = await Marketing.$(
        `//*[contains(text(), '${text}')]`
      ).isDisplayed();
      if (isTextPresent) {
        console.log(`"${text}" is present `);
      } else {
        console.error(`"${text}" is not present `);
      }
    }
    //click see all
    const seeAll = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[3]/div/a[7]/div/div[2]/div/p'
    );
    seeAll.click();
    await browser.pause(2000);
    const helpFinance = await $(`//*[contains(text(), 'Help with Marketing')]`);
    if (!helpFinance.isDisplayed()) {
      throw new Error("help Finance not displayed");
    }
    const forahelp = await $(`//*[contains(text(), 'Fora Help Center')]`);
    forahelp.click();
    await browser.pause(2000);
    const ask_community = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/p'
    );
    if (!ask_community.isDisplayed()) {
      throw new Error("ask_community not displayed");
    }
  });

  it("Advisor_Help_TC011", async () => {
    //report an issue
    console.log(
      "TC11............................................................... "
    );
    const reportIssue = await $(
      '//*[@id="main-container"]/main/div/div[2]/div'
    );
    reportIssue.click();
    //  console.log("click menu ");
    const reportissue = await $('//*[@id="__next"]/div[3]/div[2]/div');
    const texts = [
      "Report an Issue",
      //  "We're sorry to hear you're facing issues. Please let us know the details and we'll work to resolve it.",
      "Issue topic*",
      "Issue type*",
      "Issue severity*",
      "Describe the issue*",
      "Report",
      "Cancel",
    ];

    for (const text of texts) {
      const isTextPresent = await reportissue
        .$(`//*[contains(text(), '${text}')]`)
        .isDisplayed();
      if (isTextPresent) {
        console.log(`"${text}" is present `);
      } else {
        console.error(`"${text}" is not present `);
      }
    }
    //click cancel
    const Cancel = await $("//*[contains(text(), 'Cancel')]");
    Cancel.click();
    await browser.pause(4000);
    const ask_community = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/p'
    );
    if (!ask_community.isDisplayed()) {
      throw new Error("ask_community not displayed");
    }
    reportIssue.click();
    await browser.pause(1000);
    //click report button without entering details and type
    const reportBtn = await $("//button[normalize-space()='Report']");
    reportBtn.click();
    await browser.pause(1000);
    //should show error message
    const Type_required = await $(`//*[contains(text(), 'Type is required')]`);
    const details_required = await $(
      `//*[contains(text(), 'Details are required')]`
    );
    if (!Type_required.isDisplayed()) {
      throw new Error("Type_required not displayed");
    }
    if (!details_required.isDisplayed()) {
      throw new Error("Type_required not displayed");
    }
    await browser.pause(2000);

    //select type
    const type_dropdwn = await $(
      '//*[@id="headlessui-popover-button-:r15:"]/svg"'
    );
    type_dropdwn.click();
    await browser.pause(1000);
    const cantFind_partner = await $(
      `//*[contains(text(), 'Can't find partner')]`
    );
    cantFind_partner.click();
    //enter details
    const details = await $(
      "//textarea[@placeholder='Please provide specific details about the issue. The more details you provide, the better we can address the problem and improve the experience.']"
    );
    await browser.pause(1000);
    details.setValue("testing");
    await browser.pause(1000);
    reportBtn.click();
    await browser.pause(1000);
    //should show thank you success msg
    const success = await $('//*[@id="__next"]/div[3]/div[2]/div');
    const text2 = [
      "Report an Issue",
      "Thank you for reporting!",
      "Your feedback helps us improve our product",
      "Close",
    ];

    for (const text of texts) {
      const isTextPresent = await success
        .$(`//*[contains(text(), '${text}')]`)
        .isDisplayed();
      if (isTextPresent) {
        console.log(`"${text}" is present `);
      } else {
        console.error(`"${text}" is not present `);
      }
    }
    //click close
    const closeBtn = await $(`//*[contains(text(), 'Close')]`);
    closeBtn.click();
    const ask_community2 = await $(
      '//*[@id="main-container"]/main/div/div[1]/div[2]/div/p'
    );
    if (!ask_community2.isDisplayed()) {
      throw new Error("ask_community not displayed");
    }
  });
});

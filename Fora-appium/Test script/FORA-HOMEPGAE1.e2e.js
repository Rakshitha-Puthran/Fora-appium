import assert from "assert";

describe("fora-homepgae", () => {
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
    await emailinputField.setValue("automation1708673541367@forastaging.net");
    emailinputField.sendKeyEvent(66);

    // Find the input field using the XPath expression
    const nextButton = await $(
      ".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b"
    );
    await nextButton.click();

    const password = await $("//input[@name='Passwd']");
    await password.setValue("Qaoncloud@01");
    await nextButton.click();
    const continueBtn = await $(
      "//body[1]/div[1]/div[1]/div[2]/div[1]/c-wiz[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/button[1]"
    );
    await continueBtn.click();
    await browser.pause(10000); // pause for 10 seconds
  });
  it("Validate schedule advisor kickoff", async () => {
    //check the title and sub heading
    const title= await $("//div[@class='flex items-center gap-2']")
    await expect(title).toHaveText('Schedule an Advisor kickoff call')

const subheading = await $("//p[@class='text-secondary mt-2']")
await expect(subheading).toHaveText('Highly recommended 45-minute session. Connect with other new advisors and learn the essentials to getting started.')

    const advisorKickoff = await $(
  "//body/div[@id='__next']/div[@class='jsx-c8ce0ad902ae85f4 min-h-screen']/div[@id='main-container']/main[@class='jsx-c8ce0ad902ae85f4 flex-1']/div[@class='jsx-c8ce0ad902ae85f4 p-6 md:py-12 md:px-16']/div[@class='container-1440']/div[@class='max-w-']/div[@id='calendly-container']/div[1]"
);
await advisorKickoff.isDisplayed()

//dropdown button
const dropdown = await $(
  "//div[@class='flex items-center gap-2']//*[name()='svg']"
);
await dropdown.isDisplayed()

await dropdown.click();
// Wait for the advisorKickoff element to become invisible
await browser.waitUntil(async () => !(await advisorKickoff.isDisplayed()), {
  timeout: 5000,
  timeoutMsg:
    "advisorKickoff element did not become invisible after clicking dropdown",
});

await dropdown.click();
browser.pause(5000);
});
it("schedule a call ", async () => {
  await browser.waitUntil(async () => {
    const iframe = await browser.$("//iframe[@title='Calendly Scheduling Page']");
    return iframe.isExisting();
  }, { timeout: 10000, timeoutMsg: 'Iframe not found' });

  // Now switch to the iframe
  const frame = await browser.$("//iframe[@title='Calendly Scheduling Page']");
  await browser.switchToFrame(frame);
  //to accept cookies
  const acceptCokkies = await $("//button[@id='onetrust-accept-btn-handler']")
  await acceptCokkies.isDisplayed()
  await acceptCokkies.click()
  // Find the button inside the td element
  const button = await browser.$$("//button[contains(@class, 'u1xbh6v5')][contains(@class, 'o5PJ_9jHomezuy5op7Th')][contains(@class, 'gyO7ZjgvT__guDnWiKg5')][contains(@class, 'mIJUmpwwZd5mH9SMq9XQ')]");
  

  // Click the available datee 
  await button[0].click();

//select time slot button to select thee time here we are clickinng the second element 
const timeSlot= await browser.$$("//button[@data-container='time-button']")
await timeSlot[1].isDisplayed()
await timeSlot[1].click()

//next button
const nextButton= await $("//button[contains(@class, 'u1xbh6v5') and contains(@class, '_NBjM8Q6c03EfxjK90hm') and contains(@class, '_wYinQZCx29_pxs0TZnM') and contains(@class, 'Iy168r_YSkmFtzeEXUss') and contains(@class, 'uoYd30C1K4Sdef0CubtJ') and contains(@class, 'tg_cqD7Ia3z_hRQg_eyg')]")
await nextButton.isDisplayed
await nextButton.click()

});
  // it("validate company information", async () => {
  //   //text items
  //   const companyInformation = await $(
  //     "//div[@class='flex-1 bg-white rounded border border-stroke shadow-card p-6 md:p-8']"
  //   );
  //   const textsToCheck = [
  //     "IATA#",
  //     "33520476",
  //     "MAILING ADDRESS",
  //     "Fora Travel, Inc.",
  //     "228 Park Ave South #53272",
  //     "New York, NY 10003-1502",
  //     "+1 844-409-FORA (3672)",
  //     "TO GET PAID",
  //     "Book through Portal or send",
  //     "confirmations to",
  //     "commissions@fora.travel for bookings made outside of Portal",
  //   ];
  //   for (const text of textsToCheck) {
  //     const isTextPresent = await companyInformation
  //       .$(`//*[contains(text(), '${text}')]`)
  //       .isDisplayed();
  //     if (isTextPresent) {
  //       console.log(`"${text}" is present in company information`);
  //     } else {
  //       console.error(`"${text}" is not present in company information`);
  //     }
  //   }
  // });
  // it("validate copy buttons", async () => {
  //  const copyButton1= await $("//button[@data-tooltip-id='IATA']//*[name()='svg']")
  //  await copyButton1.isDisplayed()
  //  await copyButton1.click()
  //  await browser.pause(5000)
  //  await expect(browser).toHaveClipboardText('33520476')

  // //  const copyButton2= await $("//button[@data-tooltip-id='Mailing Address']//*[name()='svg']")
  // //  await copyButton2.isDisplayed()
  // //  await copyButton2.click()
  // //  await browser.pause(5000)
  // //  const receivedText = await browser.getClipboard();
  // //  //const receivedArray = receivedText.split('\n').map(text => text.trim());
   
  // //  const expectedArray = ["Fora Travel, Inc. 228 Park Ave South #53272 New York, NY 10003-1502"];
   
  // //  await expect(receivedText).toEqual(expectedArray);
     
  //  const copyButton3= await $("//button[@data-tooltip-id='Phone Number']//*[name()='svg']")
  //  await copyButton3.isDisplayed()
  //  await copyButton3.click()
  //  await browser.pause(5000)
  //  await expect(browser).toHaveClipboardText('+1 844-409-3672')

  //  const copyButton4= await $("//button[@data-tooltip-id='Commission Email']//*[name()='svg']")
  //  await copyButton4.isDisplayed()
  //  await copyButton4.click()
  //  await browser.pause(5000)
  //  await expect(browser).toHaveClipboardText('commissions@fora.travel')
  // });
  
});

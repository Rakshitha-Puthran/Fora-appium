const { expect, browser, $ } = require("@wdio/globals");
const { remote } = require('webdriverio');
const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');


describe("fora", () => {
 


  it.only(" Advisor_Bookings_TC001", async () => {
    console.log(" Bookings - To Check the Bookings section");
    // login
    await browser.url("https://advisor.forastaging.net/");
    const signInButton = await $("//button[normalize-space()='Sign in with your Fora email']")
    await signInButton.click()   
    await browser.pause(5000); 

    const emailinputField = await $("//input[@id='identifierId']")
    await emailinputField.setValue("test.appium1@forastaging.net")
    await browser.pause(2000); 

   const nextButton = await $("//*[@id=\"identifierNext\"]/div/button/span")
   await nextButton.click();
   await browser.pause(2000); 

   const password = await $("//input[@name='Passwd']");
   await password.setValue("Qaoncloud@01");
   await browser.pause(3000); 
   //const nextButton2 = await $("//*[@id=\"passwordNext\"]/div/button/div[3]")
  const nextButton2 = await $("//span[normalize-space()='Next']")
   await nextButton2.click();
   await browser.pause(5000); 
   const continueBtn = await $("//span[normalize-space()='Continue']")
   await continueBtn.click();
   await browser.pause(5000); 
   //welcome mqa!
   const welcometext = await $("//h1[normalize-space()='Welcome, mqa!']")
   if(!welcometext.isDisplayed()) {
   throw new Error("Welcome text not displayed");
   }

  //click menu and click booking
  console.log("click menu ");
  const menu = await $("//*[@id=\"navbar-open\"]")
  menu.click()
  console.log("click booking ");
  const booking = await $("//*[@id=\"side-menu\"]/nav/div[2]/div[1]/a[1]/span")
  booking.click()
  await browser.pause(10000)
  //booking title
  console.log("booking title ");
   const bookingTitle = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[1]/span")
   if(!bookingTitle.isDisplayed()) {
   throw new Error("booking title not displayed");
   }
   //total booking
   console.log("total booking");
   const totalBooking = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[2]/div/div/div[1]/p")
   if(!totalBooking.isDisplayed()) {
   throw new Error("total booking not displayed");
   }
   //commissionable value
   console.log("Commission value ");
   const commissionValue = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[2]/div/div/div[2]/p[1]")
   if(!commissionValue.isDisplayed()) {
   throw new Error("commission Value not displayed");
   }
   //advisor commision
   console.log("Advisor commision ")
   const advisoncommission = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[2]/div/div/div[3]/p[1]")
   if(!advisoncommission.isDisplayed()) {
   throw new Error("total booking not displayed");
   }
   //make first booking
   console.log("make first booking ");
   const make_first = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[3]/div/div/div/div/h4")
   if(!make_first.isDisplayed()) {
   throw new Error("make first not displayed");
   }
   //browse
   console.log("browse");
   const browse = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[3]/div/div/div/div/p")
   if(!browse.isDisplayed()) {
   throw new Error("browse not displayed");
   }
   //report an issue
   console.log("report an issue");
   const reportissue = await $("//*[@id=\"main-container\"]/main/div/div[2]/div[2]")
   if(!reportissue.isDisplayed()) {
   throw new Error("report an issue not displayed");
   }
 
})




it.only(" Advisor_Bookings_TC002", async () => {
    //search by name
    await browser.pause(5000)
    //fetch total bookings
    const tb = await $("//div[@class='text-header md:text-title font-bold']")
    const Get_booking = tb.getText();
    const total_booking = await Get_booking;
    console.log("total bookings : " + total_booking);


    const search = await $("//input[@placeholder='Search by names or confirmation number...']")
    //enter name
    await search.setValue("Fora travel")
    await browser.pause(2000)
    const tb1 = await $("//div[@class='text-header md:text-title font-bold']")
    const Get_booking1 = tb1.getText();
    const searchReslt_fora = await Get_booking1;
    const expectedResult = '1';
    assert.strictEqual(searchReslt_fora, expectedResult, `search failed"`);  
})
it(" Advisor_Bookings_TC003", async () => {
   //search by confirmation number
  await browser.pause(5000)
  const search = await $("//input[@placeholder='Search by names or confirmation number...']")
  await search.setValue("Anonymous_f1fe510e")
  await browser.pause(2000)


  const tb2 = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[2]/div/div/div[2]/p[2]")
  const Get_booking2 = tb2.getText();
  const search_confirmation2 = await Get_booking2;
  const expectedResult2 = '$796';
  console.log("price fetched ",search_confirmation2);
  assert.strictEqual(search_confirmation2, expectedResult2, `search failed : price did not match"`);  
})


it(" Advisor_Bookings_TC004", async () => {
  //search by date
  const search = await $("//input[@placeholder='Search by names or confirmation number...']")
  await search.setValue("01/01/2024")
  //no result found
 console.log("no result found");
 await browser.pause(10000)
 const noresult = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[3]/div/div/p")
 if(!noresult.isDisplayed()) {
 throw new Error("no result found not displayed");
 }
})


it(" Advisor_Bookings_TC005", async () => {
  //search by booking status
  const search = await $("//input[@placeholder='Search by names or confirmation number...']")
  await search.setValue("Booked")
  //no result found
 console.log("no result found");
 await browser.pause(10000)
 const noresult = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[3]/div/div/p")
 if(!noresult.isDisplayed()) {
 throw new Error("no result found not displayed");
 }
})


it(" Advisor_Bookings_TC006", async () => {
  //search by Commission status
  const search = await $("//input[@placeholder='Search by names or confirmation number...']")
  await search.setValue("Pending")
  //no result found
 console.log("no result found");
 await browser.pause(10000)
 const noresult = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[3]/div/div/p")
 if(!noresult.isDisplayed()) {
 throw new Error("no result found not displayed");
 }
})


it(" Advisor_Bookings_TC007", async () => {
  //search by Commission %
  const search = await $("//input[@placeholder='Search by names or confirmation number...']")
  await search.setValue("10%")
  //no result found
 console.log("no result found");
 await browser.pause(10000)
 const noresult = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[3]/div/div/p")
 if(!noresult.isDisplayed()) {
 throw new Error("no result found not displayed");
 }

})


it(" Advisor_Bookings_TC008", async () => {
  //search with invalid
  const search = await $("//input[@placeholder='Search by names or confirmation number...']")
  await search.setValue("test")
  //no result found
 console.log("no result found");
 await browser.pause(10000)
 const noresult = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[3]/div/div/p")
 if(!noresult.isDisplayed()) {
 throw new Error("no result found not displayed");
 }


 //validate close icon in search bar
 const close = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[1]/div[1]/div[1]/div/label/div")
 await close.click()
 await browser.pause(5000)
 const showbookings = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[3]/div[1]/div[2]/div[1]/div[1]/div/p")
 if(!showbookings.isDisplayed()) {
 throw new Error("no result found not displayed");
 }
})

//TC09-TC15 sorting - cannot be automate


it(" Advisor_Bookings_TC016", async () => {
//validating total booking
await browser.url("https://advisor.forastaging.net/");
const signInButton = await $("//button[normalize-space()='Sign in with your Fora email']")
await signInButton.click()   
await browser.pause(10000); 

const emailinputField = await $("//input[@id='identifierId']")
await emailinputField.setValue("mqa.mqa020201@forastaging.net")
await browser.pause(2000); 

const nextButton = await $("//*[@id=\"identifierNext\"]/div/button/span")
await nextButton.click();
await browser.pause(2000); 

const password = await $("//input[@name='Passwd']");
await password.setValue("Qaoncloud@01");
await browser.pause(3000); 
//const nextButton2 = await $("//*[@id=\"passwordNext\"]/div/button/div[3]")
const nextButton2 = await $("//span[normalize-space()='Next']")
await nextButton2.click();
await browser.pause(2000); 
const continueBtn = await $("//span[normalize-space()='Continue']")
await continueBtn.click();
await browser.pause(10000); 

 //click menu and click booking
 console.log("click menu ");
 const menu = await $("//*[@id=\"navbar-open\"]")
 menu.click()
 console.log("click booking ");
 const booking = await $("//*[@id=\"side-menu\"]/nav/div[2]/div[1]/a[1]/span")
 booking.click()
 await browser.pause(10000)

/////////////////////////////////////////////////////////////////////////////

//find total number of booking
//const elements = await $$("//*[@id=\"main-container\"]/main/div/div[1]/div[3]/div/div/div/div/div/div/div[3]/div")
//const elements = await $$('//*[@id="main-container"]/main/div/div[1]/div[2]/div/div/div/div/div/div/div[3]/div')
//const elements = await $("(//div[@class='bg-white border border-stroke rounded-md shadow-card']")
const elements = await $('android=new UiSelector().className("bg-white border border-stroke rounded-md shadow-card")');

await browser.pause(1000)
const find_totalcount = elements.length;
const total1 = parseInt(find_totalcount);
console.log("count found : ", total1);
await browser.pause(1000)


//get total booking count[ no of booking shows under 'Total Bookings']
const tb1 = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[3]/div/div/div/div/div/div/div[2]/div/div/div[1]/div")
const booking1 = tb1.getText();
const total_booking = await booking1;
const total2 = parseInt(total_booking);


console.log("total count : ", total2);
//validate
assert.strictEqual(total1, total2, `total booking match failed"`);  
})




/*
it.skip(" Advisor_Bookings_TC017", async () => {
  await browser.url("https://advisor.forastaging.net/");
  const signInButton = await $("//button[normalize-space()='Sign in with your Fora email']")
  await signInButton.click()  
  //enter valid email ID
  const emailinputField = await $("//input[@id='identifierId']")
  await emailinputField.setValue("new.call@forastaging.net")
  emailinputField.sendKeyEvent(66)
 const nextButton = await $(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b")
 await nextButton.click();
 //enter valid password
 const password = await $("//input[@name='Passwd']");
 await password.setValue("Qaoncloud@01");
 await nextButton.click();
 const continueBtn = await $("//body[1]/div[1]/div[1]/div[2]/div[1]/c-wiz[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/button[1]")
 await continueBtn.click();
 await browser.pause(10000); // pause for 10 seconds
 //click menu and click booking
 console.log("click menu ");
 const menu = await $("//*[@id=\"navbar-open\"]")
 menu.click()
 console.log("click booking ");
 const booking = await $("//*[@id=\"side-menu\"]/nav/div[2]/div[1]/a[1]/span")
 booking.click()
 await browser.pause(10000)


//fetch total commissionable value
const elements = await $$("//*[@id=\"main-container\"]/main/div/div[1]/div[3]/div/div/div/div/div/div/div[2]/div/div/div[2]/p[2]")
await browser.pause(1000)
const find_commission = elements.getText();
const total_commission = parseInt(find_commission);
console.log("total commissionable : ", total_commission);


//calculate all commission value
const tb1 = await $("//*[@id=\"main-container\"]/main/div/div[1]/div[3]/div/div/div/div/div/div/div[2]/div/div/div[1]/div")
const find_totalcount = elements.length;
const total1 = parseInt(find_totalcount);
console.log("count found : ", total1);


})
*/


//TC17,18,19 - unable to automate


it(" Advisor_Bookings_TC020", async () => {
/*//check manage booking link
  await browser.url("https://advisor.forastaging.net/");
  const signInButton = await $("//button[normalize-space()='Sign in with your Fora email']")
  await signInButton.click()  
  //enter valid email ID
  const emailinputField = await $("//input[@id='identifierId']")
  await emailinputField.setValue("new.call@forastaging.net")
  emailinputField.sendKeyEvent(66)
 const nextButton = await $(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b")
 await nextButton.click();
 //enter valid password
 const password = await $("//input[@name='Passwd']");
 await password.setValue("Qaoncloud@01");
 await nextButton.click();
 const continueBtn = await $("//body[1]/div[1]/div[1]/div[2]/div[1]/c-wiz[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/button[1]")
 await continueBtn.click();
 await browser.pause(10000); // pause for 10 seconds
 //click menu and click booking
 console.log("click menu ");
 const menu = await $("//*[@id=\"navbar-open\"]")
 menu.click()
 console.log("click booking ");
 const booking = await $("//*[@id=\"side-menu\"]/nav/div[2]/div[1]/a[1]/span")
 booking.click()*/
 await browser.pause(10000)
 //click on manage booking
 console.log("click manager ");
 const manage = await $("(//span[@class='text-link cursor-pointer mr-8'][normalize-space()='Manage booking'])[2]")
 manage.click()
 await browser.pause(10000)
 console.log("manage booking ");


//text items
const managebooking = await $(
"//div[@class='flex flex-col p-6']"
);
const textsToCheck = [
  "Cancel booking",
  "Report cancellation",
  "Modify booking",
  "Report incorrect data",
  "Report incorrect data",
  "Duplicate booking",
  "Report duplicate",
  "Other issue",
  "Contact Fora",
];
for (const text of textsToCheck) {
  const isTextPresent = await managebooking
    .$(`//*[contains(text(), '${text}')]`)
    .isDisplayed();
  if (isTextPresent) {
    console.log(`"${text}" is present in company information`);
  } else {
    console.error(`"${text}" is not present in company information`);
  }
}


})


it(" Advisor_Bookings_TC021", async () => {
/*//check email
  await browser.url("https://advisor.forastaging.net/");
  const signInButton = await $("//button[normalize-space()='Sign in with your Fora email']")
  await signInButton.click()  
  //enter valid email ID
  const emailinputField = await $("//input[@id='identifierId']")
  await emailinputField.setValue("new.call@forastaging.net")
  emailinputField.sendKeyEvent(66)
 const nextButton = await $(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b")
 await nextButton.click();
 //enter valid password
 const password = await $("//input[@name='Passwd']");
 await password.setValue("Qaoncloud@01");
 await nextButton.click();
 const continueBtn = await $("//body[1]/div[1]/div[1]/div[2]/div[1]/c-wiz[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/button[1]")
 await continueBtn.click();
 await browser.pause(10000); // pause for 10 seconds
 //click menu and click booking
 console.log("click menu ");
 const menu = await $("//*[@id=\"navbar-open\"]")
 menu.click()
 console.log("click booking ");
 const booking = await $("//*[@id=\"side-menu\"]/nav/div[2]/div[1]/a[1]/span")
 booking.click()*/
 await browser.pause(10000)
 //click on manage booking
 console.log("click manager ");
 const manage = await $("(//span[@class='text-link cursor-pointer mr-8'][normalize-space()='Manage booking'])[2]")
 manage.click()
 await browser.pause(10000)
 console.log("manage booking ");
//click on email
const email1 = await $("//a[normalize-space()='commissions@fora.travel']")
email1.click()
 await browser.pause(10000)


})


it(" Advisor_Bookings_TC022", async () => {
/*//cancel existing booking
  await browser.url("https://advisor.forastaging.net/");
  const signInButton = await $("//button[normalize-space()='Sign in with your Fora email']")
  await signInButton.click()  
  //enter valid email ID
  const emailinputField = await $("//input[@id='identifierId']")
  await emailinputField.setValue("new.call@forastaging.net")
  emailinputField.sendKeyEvent(66)
 const nextButton = await $(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b")
 await nextButton.click();
 //enter valid password
 const password = await $("//input[@name='Passwd']");
 await password.setValue("Qaoncloud@01");
 await nextButton.click();
 const continueBtn = await $("//body[1]/div[1]/div[1]/div[2]/div[1]/c-wiz[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/button[1]")
 await continueBtn.click();
 await browser.pause(10000); // pause for 10 seconds
 //click menu and click booking
 console.log("click menu ");
 const menu = await $("//*[@id=\"navbar-open\"]")
 menu.click()
 console.log("click booking ");
 const booking = await $("//*[@id=\"side-menu\"]/nav/div[2]/div[1]/a[1]/span")
 booking.click()*/
 await browser.pause(10000)
 //click on manage booking
 console.log("click manager ");
 const manage = await $("(//span[@class='text-link cursor-pointer mr-8'][normalize-space()='Manage booking'])[2]")
 manage.click()
 await browser.pause(5000)
 console.log("manage booking ");
//click on report canceletion
const cancel = await $("//button[normalize-space()='Report cancellation']")
cancel.click()
await browser.pause(5000)


//check items
//const cancelbooking = await $("//*[@id=\"headlessui-dialog-:r1e:\"]/div[2]/div");
/*const cancelbooking = await $("//*[@id=\"headlessui-dialog-panel-:rv:\"]/div[1]");


  const textsToCheck = [
    "Advisor decision to cancel",
    "Client canceled booking test",
    "test123",
    "Canceled due to supplier reason",
    "Other Reason 1Other Reason 1",
  ];
  for (const text of textsToCheck) {
    const isTextPresent = await cancelbooking
      .$(`//*[contains(text(), '${text}')]`)
      .isDisplayed();
    if (isTextPresent) {
      console.log(`"${text}" is present`);
    } else {
      console.error(`"${text}" is not present`);
    }
  }*/


  //click advisor decision to cancel
  const advisor = await $("//*[@id=\"advisor\"]")
  advisor.click()
  await browser.pause(5000)
  //should show comment box
  const comment = await $("//p[contains(text(),'Comments (optional)')]")
  if(!comment.isDisplayed()) {
    throw new Error("comment box not displayed");
  }
  //submit button should get enabled
  const submit = await $("//button[contains(text(),'Submit')]")
  if(!submit.isEnabled()) {
    throw new Error("test failed : submit button is disabled");
  }
  await browser.pause(5000)
  //input some value in comment box
  const cmt = await $("(//textarea[@placeholder='Please provide additional details/notes.'])[1]");
 await cmt.setValue("testing1", Key.ENTER);
 await browser.pause(5000)
 await cmt.setValue("2nd line", Key.ENTER);
 await browser.pause(5000)
 await cmt.setValue("3rd line", Key.ENTER);
 await browser.pause(5000)




  //click Canceled due to supplier reason
  const advisor2 = await $("//*[@id=\"client\"]")
  advisor2.click()
  await browser.pause(5000)
  //reason and dropdowns
  const reason = await $("//*[@id=\"headlessui-dialog-panel-:rv:\"]/div[1]/div/div[2]/div[2]/div/label");
  if(!reason.isDisplayed()) {
    throw new Error("comment box not displayed");
  }
  const dropdown = await $("//*[@id=\"headlessui-popover-button-:r1a:\"]");
  if(!dropdown.isDisplayed()) {
    throw new Error("comment box not displayed");
  }
  //click dropdown
  dropdown.click()
  await browser.pause(5000)


  //should show dropdown options
  const dropdwnOptions = await $("//*[@id=\"headlessui-dialog-panel-:rv:\"]/div[1]");


  const textsToCheck = [
    "Entire trip canceled",
    "Part of trip canceled",
    "Rebooked a different supplier",
    "Rebooked same supplier with different dates/options",
    "Other",
  ];
  for (const text of textsToCheck) {
    const isTextPresent = await dropdwnOptions
      .$(`//*[contains(text(), '${text}')]`)
      .isDisplayed();
    if (isTextPresent) {
      console.log(`"${text}" is present`);
    } else {
      console.error(`"${text}" is not present`);
    }
  }
  await browser.pause(5000)


  //by default text
    const defaultOptionText = await dropdwnOptions.getText();


    // Assert
    const expectedDefaultText = 'Select (required)';
    if (defaultOptionText === expectedDefaultText) {
      console.log('Default dropdown option is correct.');
    } else {
      console.error('Default dropdown option is not correct.');
    }


  //Click entire trip got cancelled
  const entireTrip = await $("//div[normalize-space()='Entire trip canceled']");
  entireTrip.click()
  await browser.pause(5000)

  //should show comment box
  if(!comment.isDisplayed()) {
    throw new Error("comment box not displayed");
  }
  //submit button should get enabled
  if(!submit.isEnabled()) {
    throw new Error("test failed : submit button is disabled");
  }


})




/*it(" Advisor_Bookings_TC023", async () => {
  //report incorrect data
    await browser.url("https://advisor.forastaging.net/");
    const signInButton = await $("//button[normalize-space()='Sign in with your Fora email']")
    await signInButton.click()  
    //enter valid email ID
    const emailinputField = await $("//input[@id='identifierId']")
    await emailinputField.setValue("new.call@forastaging.net")
    emailinputField.sendKeyEvent(66)
   const nextButton = await $(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b")
   await nextButton.click();
   //enter valid password
   const password = await $("//input[@name='Passwd']");
   await password.setValue("Qaoncloud@01");
   await nextButton.click();
   const continueBtn = await $("//body[1]/div[1]/div[1]/div[2]/div[1]/c-wiz[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/button[1]")
   await continueBtn.click();
   await browser.pause(10000); // pause for 10 seconds
   //click menu and click booking
   console.log("click menu ");
   const menu = await $("//*[@id=\"navbar-open\"]")
   menu.click()
   console.log("click booking ");
   const booking = await $("//*[@id=\"side-menu\"]/nav/div[2]/div[1]/a[1]/span")
   booking.click()
   await browser.pause(10000)
   //click on manage booking
   console.log("click manager ");
   const manage = await $("(//span[@class='text-link cursor-pointer mr-8'][normalize-space()='Manage booking'])[2]")
   manage.click()
   await browser.pause(5000)
   console.log("manage booking ");
  //click on report canceletion
  const reportIncorrect = await $("//button[normalize-space()='Report incorrect data']")
  reportIncorrect.click()
  await browser.pause(5000)


 
 
  })
*/

  it(" Advisor_Bookings_TC024", async () => {
    /*//report duplicate
      await browser.url("https://advisor.forastaging.net/");
      const signInButton = await $("//button[normalize-space()='Sign in with your Fora email']")
      await signInButton.click()  
      //enter valid email ID
      const emailinputField = await $("//input[@id='identifierId']")
      await emailinputField.setValue("new.call@forastaging.net")
      emailinputField.sendKeyEvent(66)
     const nextButton = await $(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b")
     await nextButton.click();
     //enter valid password
     const password = await $("//input[@name='Passwd']");
     await password.setValue("Qaoncloud@01");
     await nextButton.click();
     const continueBtn = await $("//body[1]/div[1]/div[1]/div[2]/div[1]/c-wiz[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/button[1]")
     await continueBtn.click();
     await browser.pause(10000); // pause for 10 seconds
     //click menu and click booking
     console.log("click menu ");
     const menu = await $("//*[@id=\"navbar-open\"]")
     menu.click()
     console.log("click booking ");
     const booking = await $("//*[@id=\"side-menu\"]/nav/div[2]/div[1]/a[1]/span")
     booking.click()*/
     await browser.pause(10000)
     //click on manage booking
     console.log("click manager ");
     const manage = await $("(//span[@class='text-link cursor-pointer mr-8'][normalize-space()='Manage booking'])[2]")
     manage.click()
     await browser.pause(5000)
     console.log("manage booking ");
    //click on report duplicate
    const reportDup = await $("//button[normalize-space()='Report duplicate']")
    reportDup.click()
    await browser.pause(5000)
    //check fileds
    const reportduptitle = await $("//*[@id=\"headlessui-dialog-title-:ru:\"]/div/div")
    if(!reportduptitle.isDisplayed()) {
      throw new Error("title not displayed");
    }
    const notes = await $("//*[@id=\"headlessui-dialog-panel-:rt:\"]/div[1]/div/div[2]/p")
    if(!reportduptitle.isDisplayed()) {
      throw new Error("title not displayed");
    }
    const goback = await $("//button[normalize-space()='Go back']")
    if(!goback.isDisplayed()) {
      throw new Error("go back is not displayed");
    }
    const confirm = await $("//button[normalize-space()='Yes, this is a duplicate']")
    if(!confirm.isDisplayed()) {
      throw new Error("ues this is duplicate is not displayed");
    }
    //type notes
    const cmt = await $("//*[@id=\"headlessui-dialog-panel-:rt:\"]/div[1]/div/div[2]/textarea");
    await cmt.setValue("testing1", Key.ENTER);
    await browser.pause(5000)
   
    //go back
    goback.click
    if(!reportDup.isDisplayed()) {
      throw new Error("back screen not displayed");
    }
    //click report dup
    reportDup.click()
    await browser.pause(5000)
    const thnku = await $("//h4[normalize-space()='Thank you!']")
    if(!thnku.isDisplayed()) {
      throw new Error("thnku is not displayed");
    }
    const gotit = await $("//a[normalize-space()='Got it!']")
    if(!gotit.isDisplayed()) {
      throw new Error("gotit is not displayed");
    }
    if(!manage.isDisplayed()) {
      throw new Error("manage is not displayed");
    }
  })


  it(" Advisor_Bookings_TC025", async () => {
   /* //contact fora
      await browser.url("https://advisor.forastaging.net/");
      const signInButton = await $("//button[normalize-space()='Sign in with your Fora email']")
      await signInButton.click()  
      //enter valid email ID
      const emailinputField = await $("//input[@id='identifierId']")
      await emailinputField.setValue("new.call@forastaging.net")
      emailinputField.sendKeyEvent(66)
     const nextButton = await $(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b")
     await nextButton.click();
     //enter valid password
     const password = await $("//input[@name='Passwd']");
     await password.setValue("Qaoncloud@01");
     await nextButton.click();
     const continueBtn = await $("//body[1]/div[1]/div[1]/div[2]/div[1]/c-wiz[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/button[1]")
     await continueBtn.click();
     await browser.pause(10000); // pause for 10 seconds
     //click menu and click booking
     console.log("click menu ");
     const menu = await $("//*[@id=\"navbar-open\"]")
     menu.click()
     console.log("click booking ");
     const booking = await $("//*[@id=\"side-menu\"]/nav/div[2]/div[1]/a[1]/span")
     booking.click()*/
     await browser.pause(10000)
     //click on manage booking
     console.log("click manager ");
     const manage = await $("(//span[@class='text-link cursor-pointer mr-8'][normalize-space()='Manage booking'])[2]")
     manage.click()
     await browser.pause(5000)
     console.log("manage booking ");
    //click on contact fora
    const contactfora = await $("//button[normalize-space()='Contact Fora']")
    contactfora.click()
    await browser.pause(5000)
    //check fileds
    const otherisse = await $("//div[@class='text-left']")
    if(!otherisse.isDisplayed()) {
      throw new Error("othervisse popup is not displayed");
    }


    const howcan = await $("//*[@id=\"headlessui-dialog-panel-:r11:\"]/div[1]/div/div/p")
    if(!howcan.isDisplayed()) {
      throw new Error("title not displayed");
    }
    const txbox = await $("//textarea[@placeholder='Any additional context about this booking...']")
    if(!txbox.isDisplayed()) {
      throw new Error("text box is not displayed");
    }
    const goBack = await $("//button[normalize-space()='Go back']")
    if(!goBack.isDisplayed()) {
      throw new Error("go Back is not displayed");
    }
    /*const close = await $("//*[@id=\"headlessui-dialog-title-:r12:\"]/svg")
    if(!close.isDisplayed()) {
      throw new Error("go Back is not displayed");
    }*/
    const submit = await $("//button[normalize-space()='Submit']")
    if(!submit.isEnabled()) {
      throw new Error("test failed : submit button is disabled");
    }


    //type something
    //await txbox.setValue("testing1", Key.ENTER);
    //await browser.pause(5000)
    await txbox.setValue("testing2");
    await browser.pause(5000)


    //click submit
    const submit2 = await $("//button[normalize-space()='Submit']")
    submit2.click()
    await browser.pause(2000)


    const thnku = await $("//*[@id=\"headlessui-dialog-panel-:r1h:\"]/div/div/h4")
    if(!thnku.isDisplayed()) {
      throw new Error("thnku is not displayed");
    }


    const pleaseallpw = await $("//p[@class='text-medium text-secondaryDark']")
    if(!pleaseallpw.isDisplayed()) {
      throw new Error("please allpw is not displayed");
    }


    const gotit = await $("//a[normalize-space()='Got it!']")
    if(!gotit.isDisplayed()) {
      throw new Error("gotit is not displayed");
    }
    //clicl got it
    gotit.click()
    if(!manage.isDisplayed()) {
      throw new Error("manage is not displayed");
    }
    //click manage
     manage.click()
     await browser.pause(5000)
     console.log("manage booking ");
    //click on contact fora
    contactfora.click()
    await browser.pause(5000)
    goBack.click()
    await browser.pause(2000)


    if(!contactfora.isDisplayed()) {
      throw new Error("contact fora is not displayed");
    }
  })




  it(" Advisor_Bookings_TC026", async () => {
   /*//contact fora
      await browser.url("https://advisor.forastaging.net/");
      const signInButton = await $("//button[normalize-space()='Sign in with your Fora email']")
      await signInButton.click()  
      //enter valid email ID
      const emailinputField = await $("//input[@id='identifierId']")
      await emailinputField.setValue("new.call@forastaging.net")
      emailinputField.sendKeyEvent(66)
     const nextButton = await $(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.qIypjc.TrZEUc.lw1w4b")
     await nextButton.click();
     //enter valid password
     const password = await $("//input[@name='Passwd']");
     await password.setValue("Qaoncloud@01");
     await nextButton.click();
     const continueBtn = await $("//body[1]/div[1]/div[1]/div[2]/div[1]/c-wiz[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/button[1]")
     await continueBtn.click();
     await browser.pause(10000); // pause for 10 seconds
     //click menu and click booking
     console.log("click menu ");
     const menu = await $("//*[@id=\"navbar-open\"]")
     menu.click()
     console.log("click booking ");
     const booking = await $("//*[@id=\"side-menu\"]/nav/div[2]/div[1]/a[1]/span")
     booking.click()*/
     await browser.pause(10000)
     //filter
     
     const filter = await $("//button[normalize-space()='Filter']")
     filter.click()
     //todays date
     const todaysdate = await $("//div[@class='react-datepicker__day react-datepicker__day--005 react-datepicker__day--today']")
     todaysdate.click()
     //apply
     const apply = await $("//button[normalize-space()='Apply']")
     apply.click()
     await browser.pause(10000);
     const tb1 = await $("//div[@class='text-header md:text-title font-bold']")
     const Get_booking1 = tb1.getText();
     const searchReslt_fora = await Get_booking1;
     const expectedResult = '1';
     assert.strictEqual(searchReslt_fora, expectedResult, `search failed"`);  


  })




})


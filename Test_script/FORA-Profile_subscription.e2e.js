const { expect, browser, $ } = require("@wdio/globals");
const { remote } = require('webdriverio');
const assert = require('assert');
const fs = require('fs-extra');
const path = require('path');
const { Builder, By, Key, until } = require('selenium-webdriver');
let Plan_name,Plan_name2;
let before_creditcard;

describe("fora", () => {
  

  it("Advisor_Profile - Subscription_TC001", async () => {
    //Check subscription Home page
    
    await browser.url("https://advisor.forastaging.net/");
    const signInButton = await $("//button[normalize-space()='Sign in with your Fora email']")
    await signInButton.click()   
    await browser.pause(5000); 

    const emailinputField = await $("//input[@id='identifierId']")
    await emailinputField.setValue("test.appium@forastaging.net")
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

  //click menu and click profile
  const menu = await $("//*[@id=\"navbar-open\"]")
  menu.click()
  await browser.pause(1000); 
  //fetch profile name from menu
  const profile = await $('//*[@id="side-menu"]/nav/div[3]/a/span[2]')
  profile.click()
  await browser.pause(1000); 
  const gotoBilling = await $('//*[@id="main-container"]/main/div/div/div[2]/div/div[4]/div[2]/button/a/span');
  gotoBilling.click()
  await browser.pause(5000); 

  const windowHandles = await browser.getWindowHandles();
  // Switch to the new tab
  await browser.switchToWindow(windowHandles[windowHandles.length - 1]);
  await browser.pause(5000); 

  //check all the fields
  const returntoFora = await $("//span[contains(text(),'Return to Fora')]")
  if(!returntoFora.isDisplayed()) {
  throw new Error("returntoFora not displayed");
  }
  await browser.pause(1000); 

  const currentplan = await $("//span[contains(text(),'Current plan')]")
  if(!currentplan.isDisplayed()) {
  throw new Error("current plan not displayed");
  }
  await browser.pause(1000); 

  const updateplan = await $("//span[contains(text(),'Update plan')]")
  if(!updateplan.isDisplayed()) {
  throw new Error("update plan not displayed");
  }
  await browser.pause(1000); 

  const paymentmethod = await $("//span[contains(text(),'Payment methods')]")
  if(!paymentmethod.isDisplayed()) {
  throw new Error("payment method not displayed");
  }
  await browser.pause(1000); 

  const invocehistory = await $("//span[contains(text(),'Invoice history')]")
  if(!invocehistory.isDisplayed()) {
  throw new Error("invoce history not displayed");
  }

  await browser.pause(1000); 

  const elements = await $$('//body/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div');
  await browser.pause(1000); 
  // Get the count of elements
  const count = elements.length;
  const countCC=parseInt(count)
    before_creditcard=countCC-1

console.log("total credit cards : ",before_creditcard)


})


it("Advisor_Profile - Subscription_TC002", async () => {
//Check update plan screen validation

//fetching current plan name
const current_planName = await $('/html[1]/body[1]/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/span[2]/span[1]')
await browser.pause(1000); 
const name=current_planName.getText()
Plan_name = await name;
await browser.pause(1000); 
console.log("current plan name is :  ",Plan_name);
await browser.pause(5000); 


const updatePlan = await $("//span[contains(text(),'Update plan')]")
updatePlan.click()
await browser.pause(3000); 
//check fields
const Billing = await $("//span[contains(text(),'Billing')]")
  if(!Billing.isDisplayed()) {
  throw new Error("Billing not displayed");
  }
  await browser.pause(1000); 

  const updateyourplan = await $("//span[contains(text(),'Update your plan')]")
  if(!updateyourplan.isDisplayed()) {
  throw new Error("updateyourplan not displayed");
  }
  await browser.pause(1000); 

  const cureentplan = await $("//span[normalize-space()='Current plan']")
  if(!cureentplan.isDisplayed()) {
  throw new Error("cureentplan not displayed");
  }
  await browser.pause(1000); 

  const Subtotal = await $("//span[normalize-space()='Subtotal']")
  if(!Subtotal.isDisplayed()) {
  throw new Error("Subtotal not displayed");
  }
  const continuebtn = await $("//a[contains(@role,'button')]")
  if(!continuebtn.isDisplayed()) {
  throw new Error("continuebtn not displayed");
  }
  await browser.pause(1000); 

})



it("Advisor_Profile - Subscription_TC003", async () => {
//Check if user can update plan

//from yearly to monthly
await browser.pause(3000); 
const monthly_tab = await $('/html[1]/body[1]/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/fieldset[1]/div[1]/div[1]/label[1]/div[1]/div[1]/input[1]')
monthly_tab.click()
//click select button
const select_btn = await $("//span[contains(text(),'Select')]")
select_btn.click()
await browser.pause(1000); 
//click continue
const continue_btn = await $("//span[normalize-space()='Continue']")
continue_btn.click()
await browser.pause(1000); 
//check confirmation screen
const confirmUpdates = await $("//span[contains(text(),'Confirm your updates')]")
  if(!confirmUpdates.isDisplayed()) {
  throw new Error("confirmUpdates not displayed");
}
const confirmBtn = await $("//div[contains(@data-auto-transform-content,'true')]")
  if(!confirmBtn.isDisplayed()) {
  throw new Error("confirmBtn not displayed");
}
const goback = await $("//div[contains(@class,'Box-root Flex-flex Flex-alignItems--baseline Flex-direction--row Flex-justifyContent--center')]")
  if(!goback.isDisplayed()) {
  throw new Error("goback not displayed");
}
await browser.pause(2000); 
//click confirm btn
confirmBtn.click()
await browser.pause(5000); 

//

const current_planName = await $('/html[1]/body[1]/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/span[2]/span[1]')
await browser.pause(1000); 
const name=current_planName.getText()
Plan_name2 = await name;
await browser.pause(1000); 
console.log("current plan name is after updating:  ",Plan_name2);
await browser.pause(2000); 
assert.notStrictEqual (Plan_name, Plan_name2, `plan not updated"`);  
await browser.pause(2000); 

/*
//from monthly to yearly
const yearly_tab = await $('/html[1]/body[1]/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/fieldset[1]/div[1]/div[2]/label[1]/div[1]/div[1]/div[1]')
yearly_tab.click()
const select_btn = await $("//span[contains(text(),'Select')]")
select_btn.click()
await browser.pause(5000);*/ 


/*
const isEnabled = await monthly_tab.isEnabled();
await browser.pause(2000); 
if(isEnabled) 
{
  const yearly_tab = await $('/html[1]/body[1]/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/fieldset[1]/div[1]/div[2]/label[1]/div[1]/div[1]/div[1]')
  yearly_tab.click()
  console.log('Yearly clicked');


}
else
{
  monthly_tab.click()
  console.log('monthly clicked');
  await browser.pause(2000); 
  const select_btn = await $("//span[contains(text(),'Select')]")
  select_btn.click()
  await browser.pause(5000); 
  console.log("testt************************************************************************")

}*/
})


it("Advisor_Profile - Subscription_TC004", async () => {
//Check add payment method screen validation

//click add payment method
const addPayment = await $("//span[contains(text(),'Add payment method')]")
addPayment.click()
await browser.pause(5000); 
//check fields
const paymentmethod = await $("//span[contains(text(),'Add payment method')]")
  if(!paymentmethod.isDisplayed()) {
  throw new Error("paymentmethod title not displayed");
}
const cardNo = await $('//*[@id="card-panel"]/div/div/form/div/div[1]/div[1]/div/label')
  if(!cardNo.isDisplayed()) {
  throw new Error("cardNo title not displayed");
}
const expiry = await $('//*[@id="card-panel"]/div/div/form/div/div[1]/div[2]/div/label')
  if(!expiry.isDisplayed()) {
  throw new Error("expiry title not displayed");
}
const country = await $('//*[@id="card-panel"]/div/div/form/div/div[2]/div/div/label')
  if(!country.isDisplayed()) {
  throw new Error("country title not displayed");
}
const defaults = await $("//span[contains(text(),'Use as default payment method')]")
  if(!defaults.isDisplayed()) {
  throw new Error("defaults title not displayed");
}
const add = await $("//span[contains(text(),'Adding…')]")
  if(!add.isDisplayed()) {
  throw new Error("add title not displayed");
}
const goBack = await $("//span[contains(text(),'Go back')]")
  if(!goBack.isDisplayed()) {
  throw new Error("goBack title not displayed");
}
await browser.pause(2000); 

})

it("Advisor_Profile - Subscription_TC005", async () => {
  //Check if user can add a payment method

 //check add button should be disabled
/*  const addBtn = await $('//*[@id="customer_portal_page_body"]/div[2]/div[3]/div/span[2]/div/div/div/div/div[2]/div/div/div[2]/div/div/div[2]/div/div/div[3]/div/div/div[1]/button/div/div/div/div[1]/span/span')
  ////*[@id="customer_portal_page_body"]/div[2]/div[3]/div/span[2]/div/div/div/div/div[2]/div/div/div[2]/div/div/div[2]/div/div/div[3]/div/div/div[1]/button/div/div/div/div[2]/div/span/span
  const isEnabled = await addBtn.isEnabled();
  await browser.pause(2000); 
  assert.equal(isEnabled, 'false', 'Button is enabled');
  console.log("add button is disabled")
*/
  await browser.pause(2000); 
  const iframe = await $("//iframe[@title='Secure payment input frame']");
  // Switch to the iframe context
  await browser.switchToFrame(iframe);
  await browser.pause(4000); 
  
await browser.pause(2000); 
const cardNumber = $('[placeholder="1234 1234 1234 1234"]');
const expiry = $('[placeholder="MM / YY"]');
const cvv = $('[placeholder="CVC"]');
cardNumber.waitForDisplayed();
expiry.waitForDisplayed();
cvv.waitForDisplayed();


//enter invalid card number
cardNumber.setValue('6454 4545 4532 3244');
await browser.pause(2000); 
expiry.setValue("12/25")
await browser.pause(1000); 
const card_error1 = await $('//*[@id="Field-numberError"]');
//show show error message
await expect(card_error1).toHaveText("Your card number is invalid.");


//enter incomplete card - <16 digits
cardNumber.clearValue()
cardNumber.setValue('4242');
await browser.pause(2000); 
expiry.setValue("12/25")
await browser.pause(1000); 
const card_error2 = await $('//*[@id="Field-numberError"]');
//show show error message
await expect(card_error2).toHaveText("Your card number is incomplete.");
await browser.pause(3000); 
console.log("incomplete card no")


//expiry - 1 digit in year
cardNumber.clearValue()
cardNumber.setValue('4242 4242 4242 4242');
await browser.pause(2000); 
expiry.setValue("12/2")
await browser.pause(1000); 
cvv.setValue("123")
const expiry_error1 = await $('//*[@id="Field-expiryError"]');
//show show error message
await expect(expiry_error1).toHaveText("Your card's expiration date is incomplete.");
await browser.pause(3000); 
console.log("year field - 1 digit only")


//expiry - past year
expiry.clearValue()
expiry.setValue('12/21');
await browser.pause(2000); 
cvv.setValue("123")
await browser.pause(1000); 
const expiry_error2 = await $('//*[@id="Field-expiryError"]');

//show show error message
await expect(expiry_error2).toHaveText("Your card's expiration year is in the past.");
await browser.pause(3000); 
console.log("expiry year - past")

//expiry - +50 future year
expiry.clearValue()
expiry.setValue('12/80');
await browser.pause(2000); 
cvv.setValue("123")
await browser.pause(1000); 
const expiry_error3 = await $('//*[@id="Field-expiryError"]');
//show show error message
await expect(expiry_error3).toHaveText("Your card's expiration year is invalid.");
await browser.pause(3000); 
console.log("expiry year - 50 years")


//cvv - <3 digits
expiry.clearValue()
expiry.setValue('12/25');
await browser.pause(2000); 
cvv.setValue("1")
await browser.pause(1000); 
expiry.click()
const cvv_error1 = await $('//*[@id="Field-cvcError"]');
//show show error message
await expect(cvv_error1).toHaveText("Your card's security code is incomplete.");
await browser.pause(3000); 
console.log("CVV - <3 digits")

//enter valid data and click add
cvv.clearValue()
cvv.setValue("123")
await browser.pause(1000); 
//switch back to parent
await browser.switchToParentFrame();
await browser.pause(2000); 
const add_card = await $('//*[@id="customer_portal_page_body"]/div[2]/div[3]/div/span[2]/div/div/div/div/div[2]/div/div/div[2]/div/div/div[2]/div/div/div[3]/div/div/div[1]/button/div');
add_card.click()
await browser.pause(5000); 

const cards = await $$('//body/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div');
await browser.pause(1000); 
// Get the count of elements
const totalcards =await cards.length;
const count_after=parseInt(totalcards);
console.log("fetched count : ",count_after)

const after_creditcard=count_after-1
console.log("after adding credit card count : ",after_creditcard)
await browser.pause(4000); 
console.log("assertion ")
assert.equal(after_creditcard, before_creditcard+1, `credit card not added`);

console.log("assertion passed")
})





it("Advisor_Profile - Subscription_TC006", async () => {
  //Check if user can add multiple payment methods

  //fetch total number of credit cards before adding
  const elements = await $$('//body/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div');
  await browser.pause(1000); 
  const count = elements.length;
  const countCC=parseInt(count)
    before_creditcard=countCC-1

console.log("total credit cards : ",before_creditcard)


  const addPayment = await $("//span[contains(text(),'Add payment method')]")
  addPayment.click()
  await browser.pause(5000); 

const iframe = await $("//iframe[@title='Secure payment input frame']");
// Switch to the iframe context
await browser.switchToFrame(iframe);
await browser.pause(2000); 
const cardNumber = $('[placeholder="1234 1234 1234 1234"]');
const expiry = $('[placeholder="MM / YY"]');
const cvv = $('[placeholder="CVC"]');
cardNumber.waitForDisplayed();
expiry.waitForDisplayed();
cvv.waitForDisplayed();


//enter card details
cardNumber.setValue('4242 4242 4242 4242');
await browser.pause(1000); 
expiry.setValue("12/25")
await browser.pause(1000); 
cvv.setValue("122")
await browser.pause(1000); 

//switch back to parent
await browser.switchToParentFrame();
await browser.pause(2000); 

const add_card = await $('//*[@id="customer_portal_page_body"]/div[2]/div[3]/div/span[2]/div/div/div/div/div[2]/div/div/div[2]/div/div/div[2]/div/div/div[3]/div/div/div[1]/button/div');
add_card.click()
await browser.pause(5000); 


//adding another card
addPayment.click()
await browser.pause(5000); 
const iframe2 = await $("//iframe[@title='Secure payment input frame']");
// Switch to the iframe context
await browser.switchToFrame(iframe2);
await browser.pause(3000); 

const cardNumber2 = $('[placeholder="1234 1234 1234 1234"]');
const expiry2 = $('[placeholder="MM / YY"]');
const cvv2 = $('[placeholder="CVC"]');


//enter card details
cardNumber2.setValue('4242 4242 4242 4242');
await browser.pause(1000); 
expiry2.setValue("25/30")
await browser.pause(1000); 
cvv2.setValue("589")
await browser.pause(1000); 

//switch back to parent
await browser.switchToParentFrame();
await browser.pause(2000); 

const add_card2 = await $('//*[@id="customer_portal_page_body"]/div[2]/div[3]/div/span[2]/div/div/div/div/div[2]/div/div/div[2]/div/div/div[2]/div/div/div[3]/div/div/div[1]/button/div');
add_card2.click()
await browser.pause(5000);


//fetch total number of credit cards after adding
const cards = await $$('//body/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div');
await browser.pause(5000); 
// Get the count of elements
const totalcards = cards.length;
const count_after=parseInt(totalcards);
console.log("fetched count : ",count_after)
await browser.pause(2000); 

const after_creditcard=count_after-1
console.log("after adding credit card count : ",after_creditcard)

await browser.pause(2000);
console.log("assertion ")
//added 2 cards hence +2
assert.equal(after_creditcard, before_creditcard+2, `credit card not added`);
await browser.pause(2000);

})

it("Advisor_Profile - Subscription_TC007", async () => {
  //Check if user can delete payment method

  //fetch total number of credit cards before deleting
  const elements = await $$('//body/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div');
  await browser.pause(1000); 
  const count = elements.length;
  const countCC=parseInt(count)
  before_creditcard=countCC-1
  console.log("total credit cards : ",before_creditcard)
  //click delte menu
  const delete_menu = await $('/html[1]/body[1]/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/button[1]');
  delete_menu.click()
  await browser.pause(1000);
  //click delete
  const deleteoption = await $('/html[1]/body[1]/div[2]/div[4]/div[1]/span[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/button[1]/div[1]/div[2]/span[1]/span[1]/span[1]');
  deleteoption.click()
  await browser.pause(4000);

  //check delete screen fields
  const delete_title = await $('//*[@id="customer_portal_page_body"]/div[2]/div[4]/div/span[2]/div/div/div/div/div[1]/div/span/span');
  const delete_msg = await $("//span[normalize-space()='This will permanently delete your payment method.']");
  const cancel = await $("//span[contains(text(),'Cancel')]");
  const confirm_delete = await $('//*[@id="customer_portal_page_body"]/div[2]/div[4]/div/span[2]/div/div/div/div/div[3]/div/div/div/div[2]/div/div[1]/button/div/div[2]/span/span');
  
  if(!delete_title.isDisplayed()) {
    throw new Error("delete title not displayed");
  }

  if(!delete_msg.isDisplayed()) {
    throw new Error("delete message not displayed");
  }

  if(!cancel.isDisplayed()) {
    throw new Error("cancel not displayed");
  }

  if(!cancel.isDisplayed()) {
    throw new Error("cancel not displayed");
  }
  if(!confirm_delete.isDisplayed()) {
    throw new Error("confirm delete not displayed");
  }

  confirm_delete.click()
  await browser.pause(4000); 

  //fetch total number of credit cards after  deleting
  const elements2 = await $$('//body/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div');
  await browser.pause(1000); 
  const totalcards = elements2.length;
  const count_after=parseInt(totalcards);
  await browser.pause(2000); 
  const after_creditcard=count_after-1
  console.log("after deleting credit card count : ",after_creditcard)

  assert.equal(after_creditcard, before_creditcard-1, `credit card not deleted `);
  await browser.pause(3000); 

})


it("Advisor_Profile - Subscription_TC008", async () => {
//Check if user can change a payment method to default

 //click delte menu
  const delete_menu = await $('/html[1]/body[1]/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/button[1]');
  delete_menu.click()
  await browser.pause(1000); 
  //make 2nd card as default
  const makedefault = await $("//span[contains(text(),'Make default')]");
  makedefault.click()
  await browser.pause(3000); 
  //check the 2nd should have default text
  const defaultText = await $('/html[1]/body[1]/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/span[1]/span[1]');
  await expect(defaultText).toHaveText("Default");
 // await expect(defaultText).toHaveText("dsddd");
 console.log("default payment changed")


})

it("Advisor_Profile - Subscription_TC009", async () => {
  //Check if user can not delete the default payment method
  //always the first card is default card, hence checking first card should have default text with close icon
  await browser.pause(3000); 
  const defaultText = await $('/html[1]/body[1]/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/span[1]/span[1]');
  await browser.pause(2000); 
  await expect(defaultText).toHaveText("Default");
  await browser.pause(2000); 
  //close icon should be exist
  const closeicon = await $("/html[1]/body[1]/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]");
  const isDisplayed = await closeicon.isDisplayed();
  await expect(isDisplayed).toBe(true);
  await browser.pause(3000); 
  console.log("cannot delete the defalt card")
})

/*it("Advisor_Profile - Subscription_TC010", async () => {
  //Check if a payment method expires

  //Cannot automate - need to wait till payment get expires

})*/


it("Advisor_Profile - Subscription_TC011", async () => {
  //Check invoice history data
  const invoiceHistory = await $("//span[contains(text(),'Invoice history')]");
  const isDisplayed = await invoiceHistory.isDisplayed();
  await expect(isDisplayed).toBe(true);
  

  //checking paid status
  const status = await $('/html[1]/body[1]/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[3]/span[1]');
  await expect(status).toHaveText("Paid");
  await browser.pause(2000); 

  //fetch plan name and compare
  const current_planName = await $('/html[1]/body[1]/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/span[2]/span[1]')
  await browser.pause(1000); 
  const name=current_planName.getText()
  Plan_name = await name;
  await browser.pause(1000); 
  console.log("current plan name is :  ",Plan_name);
  //checking plan name
  const planname = await $('/html[1]/body[1]/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[4]');
  await expect(planname).toHaveText(Plan_name);
  await browser.pause(2000); 

})


it("Advisor_Profile - Subscription_TC016", async () => {
  //Check if user can return to Fora from subscription section
  const return_fora = await $("//span[contains(text(),'Return to Fora')]");
  return_fora.click()
  
  //check fields
  const profilefields2 = await $('//*[@id="main-container"]/main/div/div/div[2]');
  const text3 = [
  "Personal information",
  "Edit",
  "Address",
  "Phone number",
  "Timezone",
  "Commission plan & contract",
  "Your subscription",
  "Go to Billing Portal",
  "Cancel your subscription",
  "Log out of Portal",
  
  ];
  
  for (const text of text3) {
  const isTextPresent = await profilefields2
    .$(`//*[contains(text(), '${text}')]`)
    .isDisplayed();
  if (isTextPresent) {
    console.log(`"${text}" is present `);
  } else {
    console.error(`"${text}" is not present `);
  }
  }
  await browser.pause(2000); 
  
  const gotoBilling = await $('//*[@id="main-container"]/main/div/div/div[2]/div/div[4]/div[2]/button/a/span');
  gotoBilling.click()
  await browser.pause(5000); 



  })






it("Advisor_Profile - Subscription_TC012", async () => {
  //Check invoice screen validations

  //Open invoice and check fields
  const invoice = await $('/html[1]/body[1]/div[2]/div[3]/div[1]/span[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[1]/a[1]/div[1]/span[1]');
  invoice.click()
  await browser.pause(4000); 
  
  // Switch to the new tab
  const windowHandles = await browser.getWindowHandles();
  await browser.switchToWindow(windowHandles[windowHandles.length - 1]);
  await browser.pause(6000); 

  const invoicepaid = await $('//*[@id="root"]/div/div[1]/div/div[3]/div/div/div[1]/div/span');
  const isDisplayed = await invoicepaid.isDisplayed();
  await expect(isDisplayed).toBe(true);
  
  const viewinvoice = await $("//span[contains(text(),'View invoice and payment details')]");
  const isDisplayed2 = await viewinvoice.isDisplayed();
  await expect(isDisplayed2).toBe(true);
  await browser.pause(3000); 

  //check all the fields
  const invoicefields = await $("//div[@class='App-InvoiceDetails flex-item width-grow flex-container direction-column']");
  const textsToCheck = [

    "Invoice number",
    "Payment date",
    "Download receipt",
    "Download invoice",
  ];
  for (const text of textsToCheck) {
    const isTextPresent = await invoicefields
      .$(`//*[contains(text(), '${text}')]`)
      .isDisplayed();
    if (isTextPresent) {
      console.log(`"${text}" is present`);
    } else {
      throw new Error(`"${text}" is not present`);
    }
  }
  await browser.pause(1000)
})


it("Advisor_Profile - Subscription_TC013", async () => {
  //Check view invoice and payment details

  //fetch invoice ID
  const id = await $('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[1]/td[2]/span[1]')
  await browser.pause(1000); 
  const i_id=id.getText()
  const invoice_ID = await i_id;
  await browser.pause(1000); 
  console.log("invoice ID is :  ",invoice_ID);

//click view invoice
  const viewinvoice = await $("//span[contains(text(),'View invoice and payment details')]");
  viewinvoice.click()

  //fetch invoice id after opening invoice
  const id_i = await $('/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[4]/div[1]/table[1]/tbody[1]/tr[3]/td[2]/span[1]')
  await browser.pause(1000); 
  const inv_id=id_i.getText()
  const invoi_ID = await inv_id;
  console.log("after opening invoice ID is :  ",invoi_ID);
  console.log("invoice ID :  ",'#'+invoice_ID);

//validate
await expect(id_i).toHaveText('#'+invoice_ID);
await browser.pause(5000); 

  //check fields
  const invoice_summary = await $('//*[@id="root"]/div/div[2]/div/div/div[2]/div[4]/div/table');
  const textsToCheck = [
    "To",
  "From",
  ];
  for (const text of textsToCheck) {
    const isTextPresent = await invoice_summary
      .$(`//*[contains(text(), '${text}')]`)
      .isDisplayed();
    if (isTextPresent) {
      console.log(`"${text}" is present`);
    } else {
      throw new Error(`"${text}" is not present`);
    }
  }
  await browser.pause(1000)


  //checking other fields

  const items = await $("//div[contains(text(),'Items')]");
  const items_displayed = await items.isDisplayed();
  await expect(items_displayed).toBe(true);


  const total = await $("//div[contains(text(),'Items')]");
  const total_displayed = await total.isDisplayed();
  await expect(total_displayed).toBe(true);

  const applied = await $("//span[contains(text(),'Applied balance')]");
  const applied_displayed = await applied.isDisplayed();
  await expect(applied_displayed).toBe(true);

  const totalDue = await $("//span[contains(text(),'Total due')]");
  const totalDue_displayed = await totalDue.isDisplayed();
  await expect(totalDue_displayed).toBe(true);

  const amtpaid = await $("//span[contains(text(),'Amount paid')]");
  const amtpaid_displayed = await amtpaid.isDisplayed();
  await expect(amtpaid_displayed).toBe(true);

  const amtremaining = await $("//span[contains(text(),'Amount remaining')]");
  const amtremaining_displayed = await amtremaining.isDisplayed();
  await expect(amtremaining_displayed).toBe(true);

  //close invoice details page
  const close = await $('//*[@id="root"]/div/div[2]/div/div/div[1]/button/div/span');
  close.click()
  await browser.pause(2000)

  const viewinvoice_paymentdetails = await $("//span[contains(text(),'View invoice and payment details')]");
  const viewinvoice_displayed = await viewinvoice_paymentdetails.isDisplayed();
  await expect(viewinvoice_displayed).toBe(true);
  
})

it("Advisor_Profile - Subscription_TC014", async () => {
  //Check if user can download invoice

  //fetch invoice id
  const id = await $('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[1]/td[2]/span[1]')
  await browser.pause(1000); 
  const i_id=id.getText()
  const invoice_ID = await i_id;
  await browser.pause(1000); 
  console.log("invoice ID is :  ",invoice_ID);

  const download_invoice = await $("//span[normalize-space()='Download invoice']");
  download_invoice.click()

  const preparing_download= await $("/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[4]/div[1]/div[1]/div[2]/span[1]");
  await expect(preparing_download).toHaveText('Preparing to download Invoice-'+invoice_ID+'.pdf');
 
  await browser.pause(3000); 
/*
   // Check if the file exists in the download directory
   const downloadDir = '/storage/emulated/0/Download/'; // Specify your download directory
        const fileName = `Invoice-${invoice_ID}.pdf`; // Specify the name of the downloaded file
   const filePath = path.join(downloadDir, fileName);

   const fileExists = await fs.pathExists(filePath);
   if (fileExists) {
       console.log('Invoice downloaded successfully.');
   } else {
    throw new Error('Invoice not downloaded.');
   }
*/
})

it("Advisor_Profile - Subscription_TC015", async () => {
  //Check if user can download receipt
  const download_receipt = await $("//span[contains(text(),'Download receipt')]");
  download_receipt.click()
  const preparing_download= await $("/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[4]/div[1]/div[1]/div[2]/span[1]");
  await expect(preparing_download).toHaveText('Preparing to download receipt');
  await browser.pause(3000); 
})


})
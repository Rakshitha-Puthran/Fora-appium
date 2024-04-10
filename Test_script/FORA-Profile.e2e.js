const { expect, browser, $ } = require("@wdio/globals");
const { remote } = require('webdriverio');
const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');

describe("fora", () => {
  

  it.only("Advisor_Profile_TC001", async () => {
    //Check profile name
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
  await browser.pause(1000); 
  const name=profile.getText()
  const P_name = await name;
  await browser.pause(1000); 
  console.log("profile name is :  ",P_name);
  await browser.pause(1000); 

  
  
  profile.click()
  await browser.pause(2000); 
 //fetch name after clicking profile page
 const name2 = await $('//*[@id="main-container"]/main/div/div/div[1]/div/div[1]/h1')
 const profilename=name2.getText()
 const Pro_name = await profilename;
await browser.pause(1000); 

 console.log("profile name after clicking profile is :  ",profilename);
 //remove hello,
 const word_to_remove = "Hello, "
 const profile_name = Pro_name.replace(word_to_remove, "")

 console.log("profile name after removing hello :  ",profile_name);

 //validate name
 assert.strictEqual(P_name, profile_name, `profile name did not match"`);  

})

it.only("Advisor_Profile_TC002", async () => {
//profile screen validation
//check fields
const profilefields1 = await $('//*[@id="main-container"]/main/div/div/div[1]');
const text2 = [
"Fora email",
"Recovery email",
"2-Step Verification",
"Your Fora account is managed and secured by Google email account. ",
];

for (const text of text2) {
const isTextPresent = await profilefields1
  .$(`//*[contains(text(), '${text}')]`)
  .isDisplayed();
if (isTextPresent) {
  console.log(`"${text}" is present `);
} else {
  console.error(`"${text}" is not present `);
}
}

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

})



it.only("Advisor_Profile_TC003", async () => {
    //Check if user can edit profile details on google
    const Edit_Google = await $("//a[normalize-space()='Edit on Google']");
    Edit_Google.click()
    await browser.pause(3000); 
    // Switch to the new tab
    const firstTabHandle = await browser.getWindowHandle();

   const windowHandles = await browser.getWindowHandles();
   await browser.switchToWindow(windowHandles[windowHandles.length - 1]);
   await browser.pause(5000);
   //validate your profile info title 
   const profile_info = await $("//h2[normalize-space()='Your profile info in Google services']").isDisplayed();
   if (profile_info) {
   console.log(`profile_info is present`);
   } 
   else 
   {
   throw new Error(`profile_info is not present`);
   }
   //click back button manually
   await browser.pause(5000);
   await browser.closeWindow();

// Switch back to the first tab using the stored handle
await browser.switchToWindow(firstTabHandle);
})

it("Advisor_Profile_TC004", async () => {
    //edit profile personal info screen validaton
    


    const edit = await $("//button[normalize-space()='Edit']");
    edit.click()
    await browser.pause(2000); 
    //check fields
  //const edit_info = await $('//*[@id="headlessui-dialog-panel-:r5:"]');
const editpersonalInfo = await $("//span[@class='text-header font-bold']");
if(!editpersonalInfo.isDisplayed()) {
  throw new Error("edit personal Info not displayed");
}

const address = await $("//span[@class='font-bold']");
if(!address.isDisplayed()) {
  throw new Error("address not displayed");
}

const country = await $("//label[normalize-space()='Country*']");
if(!country.isDisplayed()) {
 throw new Error("country not displayed");
}

const addresses = await $("//label[normalize-space()='Address*']");
if(!addresses.isDisplayed()) {
 throw new Error("addresses not displayed");
}

const Apartment = await $("//label[normalize-space()='Apartment, suite, etc. (if applicable)']");
if(!Apartment.isDisplayed()) {
 throw new Error("Apartment not displayed");
}

const City = await $("//label[normalize-space()='City*']");
if(!City.isDisplayed()) {
 throw new Error("City not displayed");
}

const State = await $("//label[normalize-space()='State*']");
if(!State.isDisplayed()) {
 throw new Error("State not displayed");
}

const PostalCode = await $("//label[normalize-space()='Postal code*']");
if(!PostalCode.isDisplayed()) {
 throw new Error("PostalCode not displayed");
}

const phoneNo = await $("//label[normalize-space()='Phone number*']");
if(!phoneNo.isDisplayed()) {
 throw new Error("phoneNo not displayed");
}

const Timezone = await $("//label[normalize-space()='Timezone']");
if(!Timezone.isDisplayed()) {
 throw new Error("Timezone not displayed");
}

const cancel = await $("//button[normalize-space()='Cancel']");
if(!cancel.isDisplayed()) {
 throw new Error("cancel not displayed");
}

const save = await $("//button[normalize-space()='Save']");
if(!save.isDisplayed()) {
 throw new Error("save not displayed");
}

console.log("click close btn")
await browser.pause(5000); 


})


it("Advisor_Profile_TC005", async () => {
  //Check if user can edit personal information

  //need to write script = functional validations
  //click country dropdown and change country
 /* const country_dropdwn = await $('//*[@id="country_id"]/div/div[2]');
  country_dropdwn.click()
  await browser.pause(2000); 
  const angola= await $(`//*[contains(text(), 'Angola')]`)
  angola.click()
  await browser.pause(2000); 
  //enter address
  const address= await $("//input[@id='address']")
  address.setValue("")*/
  console.log("*******************************************************************************************")
  //remove address and check error
  const address= await $("//input[@id='address']")
  address.click()
  address.clearValue()
  await browser.pause(10000); 
  //const address_error= await $(`//*[contains(text(), 'Ths required.')]`)
  const address_error= await $("(//div[@class='my-1 text-medium text-error items-start whitespace-pre-wrap flex'])[1]")
  const fetch_error = await address_error.getText();
  console.log("Fetched error : ",fetch_error)
  const expected_error="This field is required."
  //validate
  assert.strictEqual(fetch_error, expected_error, `addresserror not displayed"`);  

  
  /*
  if(!address_error.isDisplayed()) {
    throw new Error("address error msg not displayed");
  }*/
    address.setValue("Mulki")
  await browser.pause(5000); 

  //remove apartment
  const city= await $("//input[@id='city']")
  city.clearValue()
  await browser.pause(5000); 
  const city_error= await $(`//*[contains(text(), 'This field is required.')]`)
  if(!city_error.isDisplayed()) {
    throw new Error("city error msg not displayed");
  }
  city.setValue("Mangalore")
  await browser.pause(5000); 

  //remove state
  const state= await $("//input[@id='state']")
  state.clearValue()
  await browser.pause(5000); 
  const state_error= await $(`//*[contains(text(), 'This field is required.')]`)
  if(!state_error.isDisplayed()) {
    throw new Error("state error msg not displayed");
  }
  state.setValue("Karnataka")
  await browser.pause(5000); 

  //remove postal code
  const postalcode= await $("//input[@id='postal_code']")
  postalcode.clearValue()
  await browser.pause(5000); 
 // const postalcode_error1= await $(`//*[contains(text(), 'This field is required.')]`)
  const postalcode_error1= await $(`//*[contains(text(), 'This fis ruired.')]`)

  if(!postalcode_error1.isDisplayed()) {
    throw new Error("postalcode error msg not displayed");
  }

  //enter postal code with <2 char
  postalcode.setValue("1")
  await browser.pause(5000); 
  const postalcode_error2= await $(`//*[contains(text(), 'Please, enter a valid postal code. Ensure this field has at least 2 characters.')]`)
  if(!postalcode_error2.isDisplayed()) {
    throw new Error("enter >=2 char");
  }
  postalcode.clearValue()
  postalcode.setValue("123")
  await browser.pause(5000); 

  //remove state
  const phoneNo= await $("//input[@id='phoneInput']")
  phoneNo.clearValue()
  await browser.pause(5000); 
  const sphoneNo_error= await $(`//*[contains(text(), 'Please, enter a valid phone number.')]`)
  if(!sphoneNo_error.isDisplayed()) {
    throw new Error("phoneNo_error  msg not displayed");
  }
  phoneNo.setValue("+91 88774 42233")
  await browser.pause(5000); 

  //click save
  const save= await $("//button[normalize-space()='Save']")
  save.click()
  await browser.pause(2000); 
  const confirmmsg= await $(`//*[contains(text(), 'Saved successfully')]`)
  if(!confirmmsg.isDisplayed()) {
    throw new Error("confirmmsg not displayed");
  }
  await browser.pause(5000); 

})




it.only("Advisor_Profile_TC006", async () => {
   // Check if user can view aggrements

    const view_agreement = await $("(//span[contains(text(),'View')])[1]");
    view_agreement.click()
    console.log("go back ")
    await browser.pause(5000); 
    // Locate the downloaded file
  //const fileName = 'Fora+-+Advisor+Agreement+-+Main+Agreement+and+Exhibits+2022_Portal_v1.pdf'; // Replace with the actual filename
 /* const filePath2 = "/storage/emulated/0/Download/Fora+-+Advisor+Agreement+-+Main+Agreement+and+Exhibits+2022_Portal_v1.pdf"; // Assuming it's in the Download directory

  // Verify the file exists
  const fileExists = await isExisting(filePath);
  //const fileExists2 = await filePath.isExisting()

  if (fileExists) {
    console.log('File downloaded successfully');
    // Perform further validation if needed, e.g., verify file contents
  } else {
    console.error('File not found or download failed');
    // Handle the failure accordingly
  }

  await driver.deleteFile(filePath); // Clean up downloaded file
  await browser.pause(3000); 


  const downloadDirectory =  "/storage/emulated/0/Download/";

        // Specify the filename of the downloaded file
  const fileName = 'Fora+-+Advisor+Agreement+-+Main+Agreement+and+Exhibits+2022_Portal_v1.pdf'; 

        // Check if the file exists in the download directory
        const filePath = path.join(downloadDirectory,fileName );
        const fileExists = await browser.execute('mobile:fileExists', { path: filePath });
        if (fileExists) {
          console.log('File downloaded successfully');
          // Perform further validation if needed, e.g., verify file contents
        } else {
          console.error('File not found or download failed');
          // Handle the failure accordingly
        }

*/





    //view annual plan
    const view_anualplan = await $("/html[1]/body[1]/div[1]/div[2]/div[1]/main[1]/div[1]/div[1]/div[2]/div[1]/div[3]/div[2]/div[2]/div[2]/div[3]");
    view_anualplan.click()
    console.log("go back")
    await browser.pause(5000);   
    
    
    //view community guide
    const view_communityPlan = await $("//a[@href='/community-guidelines']//*[name()='svg']");
    view_communityPlan.click()
    await browser.pause(2000); 
    // Switch to the new tab
   const windowHandles = await browser.getWindowHandles();
   await browser.switchToWindow(windowHandles[windowHandles.length - 1]);
   await browser.pause(5000);

   
   const community_guidelines = await $("//h1[normalize-space()='Community Guidelines']")
   if(!community_guidelines.isDisplayed()) {
   throw new Error("community_guidelines not displayed");
   }
   else
   {
     console.log("community_guidelines is present");
   }

   const weare_community = await $("//h3[normalize-space()='We are a community']")
   if(!weare_community.isDisplayed()) {
   throw new Error("weare_community not displayed");
   }
   else
   {
     console.log("weare_community is present");
   }




const professionals = await $("//h3[normalize-space()='We are professionals']")
  if(!professionals.isDisplayed()) {
  throw new Error("professionals not displayed");
  }
  else
  {
    console.log("professionals is present");
  }

  const entrepreneurs = await $("//h3[normalize-space()='We are all travel entrepreneurs']")
  if(!entrepreneurs.isDisplayed()) {
  throw new Error("entrepreneurs not displayed");
  }
  else
  {
    console.log("entrepreneurs is present");
  }

  const purpose = await $("//h3[normalize-space()='We are different on purpose']")
  if(!purpose.isDisplayed()) {
  throw new Error("purpose not displayed");
  }
  else
  {
    console.log("purpose is present");
  }
  console.log("go back");
  await browser.pause(5000);

})




it("Advisor_Profile_TC007", async () => {
  //Check if user can  access billing portal
  const gotoBilling = await $('//*[@id="main-container"]/main/div/div/div[2]/div/div[4]/div[2]/button/a/span');
  gotoBilling.click()
  await browser.pause(2000); 
   // Switch to the new tab
   const windowHandles = await browser.getWindowHandles();
   await browser.switchToWindow(windowHandles[windowHandles.length - 1]);
   await browser.pause(5000);

  //should open subscription page
  const returntoFora = await $("//span[contains(text(),'Return to Fora')]")
  if(!returntoFora.isDisplayed()) {
  throw new Error("returntoFora not displayed");
  }
  //go back 
  returntoFora.click()
  await browser.pause(3000); 

 })


 it("Advisor_Profile_TC008", async () => {
  //Check if user can logout of the portal
  const logout = await $('//*[@id="menu-item-0"]')
  logout.click()
  await browser.pause(2000); 
  const signInButton = await $("//button[normalize-space()='Sign in with your Fora email']")
  if(!signInButton.isDisplayed()) {
    throw new Error("signInButton not displayed");
    }
    else
    {
      console.log("sign in page displayed")
    }
    await browser.pause(5000); 
 })

})

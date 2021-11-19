import SurveyQuestionsData from "../TestData/SurveyQuestionsData"
import {expect} from 'chai'
class CollectResponse{
    get collectResponses(){
        return $('[data-location="collect"],[data-testid="collect--Anchor"]')
    }
    get totalResponse(){
        return $('#total-responses')
    }
    get urlLink(){
        return $('#weblink-url')
    }
    get advancedOptions(){
        return $('.toggle-options')
    }
    get passwordProtection(){
      return $('[target="#panel-password-protection"]')
    }
    get passwordSelectionOpt(){
        return $$('#panel-password-protection > ul > li')
      }
    get userPassword(){
        return  $('[data-model-property="password_plain_text"]')
    }
    get passwordSucessMessage()
        {
           return $('.sm-notification-message-title')
        }
    get typeOfSendSurveySelection()
    {
       return $$('.wds-display--block')
       
    }
    typeOfShareSurveySelection(shareSurveyType)
    {
        return $(`//*[contains(text(),'${shareSurveyType}')]`)
    }
    get pageTitle()
        {
           return $('.wds-type--page-title')
        }

    async validateTotalResponse()
    {   
       await this.totalResponse.waitForExist()
       expect(await this.totalResponse.getText()).to.equal('1')
    }
    
    async selectSendSurveyType()
    {  
        await this.typeOfSendSurveySelection.forEach(async element =>{
        const data=await element.getText()
        if(data===(SurveyQuestionsData.sendSurveyType))
        {
        await element.click()
        }
         })
    }
    
    async selectShareSurveyType()
    {   
        const typeOfShareSurvey=SurveyQuestionsData.shareSurveyType
        const typeOfShareSurveyLink=await this.typeOfShareSurveySelection(typeOfShareSurvey)
        await typeOfShareSurveyLink.click()

    }
    async launchUrlToFillSurvey(){
    const surveyLink=await this.urlLink.getValue()
    const currentWindow=await browser.getWindowHandle()
    await browser.newWindow(surveyLink)
    return currentWindow

    }
    async clickCollectResponses(){
        await this.collectResponses.waitForExist()
        await this.collectResponses.click()
        }
    async clickAdvancedOptions(){
            await this.advancedOptions.waitForExist()
            await this.advancedOptions.click()
            }

    async passwordSelectionOption(){
        await this.passwordSelectionOpt.forEach(async element => {
        const passwordType=SurveyQuestionsData.selectPasswordSelection
        const data=await element.getText() 
        await element.scrollIntoView({block:"center"})
        await browser.pause(3000)
         if(data===passwordType) 
         {
            await element.click()
         }  
        });    
    }
    async enterPassword(){
        const password=SurveyQuestionsData.passwordAuthentication
        await this.userPassword.waitForExist()
        await this.userPassword.setValue(password)
        }
    async validateChangesUpdateMessage()
        {
            await browser.waitUntil(async()=>await this.passwordSucessMessage.getText()==='Your changes have been saved'),
            {
                timeout:5000,
                timeoutMsg:'Expected changes updated confirmation was not displayed'
            }
        }
     async checkPageTitle()
        {
            await browser.waitUntil(async()=>await this.pageTitle.getText()==='How would you like to collect responses to your survey?'),
            {
                timeout:5000,
                timeoutMsg:'Expected page title was not displayed'
            }
        }

    }     
export default new CollectResponse()
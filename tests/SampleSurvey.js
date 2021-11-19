import LoginPage from '../../Pages/LoginPage.js'
import SurveyPage from '../../Pages/CreateSurveyPage.js'
import DesignSurveyPage from '../../Pages/DesignSurvey.js'
import CollectSurveyPage from '../../Pages/CollectSurveyPage.js'
import fillSurvey from '../../Pages/FillSurveyPage.js'
import DialogBoxPage from '../../Pages/DialogBox.js'
const SurveyQuestionsData=require("../../TestData/SurveyQuestionsData.js")
const LoginData=require("../../TestData/LoginData.js")
describe('Creating a sample Survey',async function(){

    it('Login with basic details',async function(){
    await browser.url('/')
    await browser.maximizeWindow();
    await LoginPage.loginuser(LoginData.userName,LoginData.password)

})

it('Selection of Type of Survey',async function(){
    await SurveyPage.clickCreatSurveyButton()
    await SurveyPage.checkPageTitle()
    await SurveyPage.selectTypeofSurvey()
})
it('Selection of Title and Category type for Survey in Dailog Box',async function(){
    await DialogBoxPage.checkPageTitle()
    await DialogBoxPage.selectSurveyCategory()
    await DialogBoxPage.selectSurveyTitle()
    await DialogBoxPage.CreateSurveyButton.click()

})
it('Add multiple Questions to the Survey',async function(){ 
    await DesignSurveyPage.checkPageTitle()
    await DesignSurveyPage.addPageTile()
    await DesignSurveyPage.addMultipleQuesToSurvey()
})

it('Selection of Collect Response ',async function(){ 
    await CollectSurveyPage.clickCollectResponses()
    await CollectSurveyPage.checkPageTitle()
    await CollectSurveyPage.selectSendSurveyType()
    await CollectSurveyPage.selectShareSurveyType()
})
it('Fill the survey by launching SurveyLink and validating the success message',async function(){ 
    await CollectSurveyPage.collectResponses.waitForExist()
    await CollectSurveyPage.urlLink.waitForExist()
    let currentWindow=await CollectSurveyPage.launchUrlToFillSurvey()
    await fillSurvey.fillSurveyWithAnswers()
    await fillSurvey.validateSuccessMessage()
    await browser.switchToWindow(currentWindow)
})
it('Validate the total response after submitting the Survey',async function(){ 
    await CollectSurveyPage.clickCollectResponses()
    await CollectSurveyPage.validateTotalResponse()   
})
})
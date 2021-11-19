const SurveyQuestionsData=require("../TestData/SurveyQuestionsData.js")
class SurveyPage{
    get createSurvey(){
        return  $('.create-survey.alt')
        
    }
    get typeofSurveySelection(){
      return $$(' .wds-button--primary.wds-button--solid')
    }
    get pageTitle()
        {
           return $('.sm-get-started-button-bar__heading')
    
        }

    async selectTypeofSurvey(){
      await this.typeofSurveySelection.forEach(async element =>{
      let data=await element.getText()
      if(data===(SurveyQuestionsData.surveyType))
            {
            await element.click()
            }
         })
    }
    async clickCreatSurveyButton(){
        await this.createSurvey.waitForExist()
        await this.createSurvey.click() 
      }
    async checkPageTitle()
        {
            await browser.waitUntil(async()=>await this.pageTitle.getText()==='Create a new survey'),
            {
                timeout:10000,
                timeoutMsg:'Expected page title was not displayed'
            }
        }
}
export default new SurveyPage() 
const SurveyQuestionsData=require("../TestData/SurveyQuestionsData.js")
class DialogBoxPage{

    get surveyTitle(){
        return  $('#surveyTitle')
    }
    get categoryList(){
        return  $('.wds-select.wds-select')
    }
    get CreateSurveyButton(){
        return  $('#newSurvey')
    }
    get dropDownValues(){
        return $('[data-testid="NewSurveyModal__SurveyCategory"]')
        
    }
    get pageTitle()
        {
           return $('.wds-modal__text')
        }
    async selectSurveyTitle(){
        await this.surveyTitle.waitForExist()
        await this.surveyTitle.setValue(SurveyQuestionsData.surveyTitle)
    
    }
    async selectSurveyCategory(){
        await this.categoryList.click()
        await this.dropDownValues.waitForExist()
        await this.dropDownValues.selectByVisibleText(SurveyQuestionsData.categoryType)
        await this.categoryList.click()
       
    }
    async checkPageTitle()
        {
            await browser.waitUntil(async()=>await this.pageTitle.getText()==='Name your survey'),
            {
                timeout:5000,
                timeoutMsg:'Expected page title was not displayed'
            }
            
        }
    
}
export default new DialogBoxPage() 
import { assert } from "chai"

const SurveyQuestionsData=require("../TestData/SurveyQuestionsData.js")
class fillSurvey{
    get question(){
        return $('.question-body.open-ended-single input')
    }
    get okButton(){
        return $("(//*[@type='submit' and contains(text(),'OK')])[1]")
    }
    get doneButton(){

        return $('.done-button.survey-page-button')
    }
    get sucessMessage()
    {
       return $("//*[contains(text(),'Thank you for taking')]")
    }
    get confirmationText()
    {
       return $('.nowrap')
    }
    questionName(questionNum){
        return (eval('SurveyQuestionsData.'+'questions'+"["+questionNum+"]"+'.question'))
       }
    textData(textBoxOption)
    {   
        return $(`(//*[contains(@class,'wds-input')])[${textBoxOption}]`)
    }
    dropDownSelection(dropDownOption)
    {   
        return $$(`(//*[contains(@class,'select no-touch')])[${dropDownOption}]`)
       
    }
    multipleChoice(questionName,mulChoiceOption)
    {
       return $(`//*[contains(text(),'${questionName}')]/following::span[contains(text(),'${mulChoiceOption}')]`)
    }
    optionsType(questionNum){
        return (eval('SurveyQuestionsData.'+'questions'+"["+questionNum+"]"+'.optionType'))
       }
    answerValue(questionNum){
        return (eval('SurveyQuestionsData.'+'questions'+"["+questionNum+"]"+'.answer'))
       }
    get userPassword(){
        return  $('#password-text')
    }
    get submit(){
        return  $('[type="submit"]')
    }
    async clickDoneButton()
    {   
        await this.doneButton.waitForExist()
        await this.doneButton.doubleClick()
    }
   
    async fillSurveyWithAnswers(){
        const noOfQuestions=parseInt(SurveyQuestionsData.questions.length)
        let s=1
        let d=1
        for(let k=0;k<noOfQuestions;k++)
        {
         let optType=await this.optionsType(k)
         let answer=await this.answerValue(k)
         let question=await this.questionName(k)
         if(optType==='Multiple Choice')
        {   
            const queSelection=await this.multipleChoice(question,answer)
            await queSelection.waitForExist()
            await queSelection.scrollIntoView({block:"center"})
            await browser.pause(2000)//wait for to perform scroll operation
            await queSelection.click() 
            
        }
        else if(optType==='Single Textbox'||optType==='Comment Box')
        {
                const textBoxData=await this.textData(s)
                await textBoxData.waitForExist()
                await textBoxData.scrollIntoView({block:"center"})
                await browser.pause(2000)//wait for to perform scroll operation
                await textBoxData.setValue(answer)
                await this.okButton.waitForExist()
                await this.okButton.click()
                s++
        }
        else if (optType==='Dropdown')
        {  
            const dropDownValues=await this.dropDownSelection(d)
            await dropDownValues.forEach(async element =>{
            let data=await element.getText()
            await element.selectByVisibleText(answer) 
         })
         d++
        }
        
        }
        await this.doneButton.click()
        
}
async validateSuccessMessage()
{
    await this.sucessMessage.waitForExist()
    await browser.waitUntil(async()=>await this.confirmationText.getText()==='this survey.'),
    {
        timeout:5000,
        timeoutMsg:'Expected confirmation text was not displayed'
    }
}

}
    export default new fillSurvey()
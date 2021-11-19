const SurveyQuestionsData=require("../TestData/SurveyQuestionsData.js")
class DesignSurveyPage{
    get question(){
        return  $('#editTitle')
    }
    get option(){
        return  $('#changeQType')
    }
    get saveButton(){
        return $('#editQuestion section.t1 a.save')
    }
    get collectResponses(){
        return $('[data-location="collect"],[data-testid="collect--Anchor"]')
    }
    get clickNextQues(){
        return $('.main-add-question-cta.wds-button')
    }
    get allOptions(){
        return $$('#create > ul span')
    }
    questionName(questionNum){
     return (eval('SurveyQuestionsData.'+'questions'+"["+questionNum+"]"+'.question'))
    }
    optionType(questionNum){
        return (eval('SurveyQuestionsData.'+'questions'+"["+questionNum+"]"+'.optionType'))
       }
    optionsCount(questionNum){
        return (eval(('SurveyQuestionsData.questions'+"["+questionNum+"]"+'.options')))
       }
    mulChoiceOptions(optionNum)
       {   
           return $(`(//*[@data-rte='answer'])[${optionNum}]`)
          
       }
    optionNameSelection(questionNum,optionNum){
        return (eval('SurveyQuestionsData.'+'questions'+"["+questionNum+"]"+'.options'+"["+optionNum+"]"))
       }
       get pageTitle()
        {
           return $('.wds-type--section-title')
        }
        get enterPageTitle()
        {
           return $('#pageTitle')
        }
        get titleSaveButton()
        {
           return $('#pageTitleForm >div a.save')
        }
        get titleButton(){
            return $('.page-title')
        }

async addPageTile(){   
    await this.titleButton.click()
    await this.enterPageTitle.click()   
    await this.enterPageTitle.setValue('Basic Survey') 
    await this.titleSaveButton.click()
}

async addMultipleQuesToSurvey(){
    const noOfQuestions=parseInt(SurveyQuestionsData.questions.length)
    for(let k=0;k<noOfQuestions;k++)
    {
     await this.question.waitForExist()
     await this.option.waitForExist()
     const ques=await this.questionName(k)
     await this.question.setValue(ques)
     await this.option.waitForExist()
     await this.option.click()
     const optType=await this.optionType(k)
     await this.allOptions.forEach (async element =>{
     const data = await element.getText()
     if(data===optType)
     {   
         await element.click()  
     } 
     })
    if(optType==='Multiple Choice' ||optType==='Dropdown'){
    let j=0;
    const count=await this.optionsCount(k)
    let optCount =parseInt(count.length)
    for(let i=3;i<optCount+3;i++)
     {
    const option=await this.mulChoiceOptions(i)
    const optionValue=await this.optionNameSelection(k,j)
    await option.setValue(optionValue)
    j++
     }
    }
    else {
        console.log("Please select the desired option")
    }
    await this.saveButton.waitForExist()
    await this.saveButton.click()
    if(k<parseInt(noOfQuestions-1))
        {
     await this.clickNextQues.scrollIntoView({block:"center"})       
     await browser.pause(3000)
     await this.clickNextQues.waitForExist()
     await this.clickNextQues.click()
    }
}
}
async checkPageTitle()
        {
            await browser.waitUntil(async()=>await this.pageTitle.getText()==='Try out our best features'),
            {
                timeout:7000,
                timeoutMsg:'Expected page title was not displayed'
            }
        }
}
    export default new DesignSurveyPage()
const SurveyQuestionsData=require("../TestData/SurveyQuestionsData.js")
class AuthenticationPage{
get userPassword()
    {
        return  $('#password-text')
    }
get submit()
    {
        return  $('[type="submit"]')
    }
    
async enterPassword(){
    const password=SurveyQuestionsData.passwordAuthentication
    await this.userPassword.waitForExist()
    await this.userPassword.setValue(password)
    }
async clickSubmit(){
        await this.submit.waitForExist()
        await this.submit.click()
        }
    }
export default new AuthenticationPage()
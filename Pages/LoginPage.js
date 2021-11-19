class  LoginPage{

    get userName(){
        return  $('#username')
    }
    get userPassword(){
        return  $('#password')
    }

    get loginButton(){
        return $('.wds-button--stretch')
    }
    get loginButton_StartPage(){
        return $('.wds-button--charcoal')
    }
    
    async loginuser(user,pass)
     { 
     await this.loginButton_StartPage.click()   
     await this.userName.setValue(user)
     await this.userPassword.setValue(pass)
     await this.loginButton.click()
     }
   
 }
    
    
export default new LoginPage()
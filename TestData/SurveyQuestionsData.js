module.exports={
    surveyTitle:'Sample Survey',
    categoryType:'Customer feedback',
    sendSurveyType:'Send surveys your way',
    shareSurveyType:'Share a survey link',
    surveyType:'Start from scratch',
    questions:[
        {   num:0,
            optionType:'Single Textbox',
            question:'Enter your email.',
            options:'Null',
            answer:'abc@gmail.com',

        },
       {   num:1,
            optionType:'Multiple Choice',
            question:'How often do you use SurveyMonkey?',
            options:['Regularly','Sometimes','Never Tried'],
            answer:'Regularly',
        },
        {   num:2,
            optionType:'Dropdown',
            question:'Where do you live?',
            options:['Pune','Indore','Bangalore'],
            answer:'Pune'
        }

    ]
}
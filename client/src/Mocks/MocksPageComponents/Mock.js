import React,{Component} from "react"
import MockSection from "./MockSection";
import OpticalForm from "../../OpticalForm/OpticalForm";
import MockNavigation from "./MockNavigation";
import AllQuestionsData from "../../AllQuestions/AllQuestionsComponent/AllQuestionsData";
import QuestionItem from "../../AllQuestions/AllQuestionsComponent/QuestionItem";
import {axiosPost} from "../../CommonFunctions/axiosPost";
import MockResultPage from "../../MockResult/MockResultPage";
import Loading from "../../Loading/Loading";

class Mock extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            isLoading:true,
            isCompleted:false,
            isResult : false,
            currentSubject :"Türkçe",
            allAnswers : [],
            turkishAnswers:[],
            socialAnswers:[],
            mathAnswers:[],
            fenAnswers:[],
            arrayName : "this.state.turkishAnswers"
        }

        this.subjectChanged = this.subjectChanged.bind(this)
        this.answerChanged = this.answerChanged.bind(this)
        this.setCompleted = this.setCompleted.bind(this)
    }

    createQuestionItems(questions)
    {
        return  new Promise((resolve, reject) => {
            const questionItems = []


            questions.map(question => (
                questionItems.push( <QuestionItem
                    imageLink = {question.imageLink}
                    id = {question.questionId}
                />)

            ))


            const data = {
                questionItems : questionItems
            }
            resolve(questionItems)
        })

    }

    async getQuestionInfo()
    {

        const data = {
            sortField: this.state.sortField,
            sortBy  : this.state.sortBy,
            lecture : this.state.lecture
        }

        const questionEndPoint =`allQuestions`;

        const questionResults = await axiosPost(questionEndPoint,data);
       // console.log("res => " + JSON.stringify(questionResults,null,2))

        const questionItems = questionResults.length > 0 ?  await this.createQuestionItems(questionResults) : `${this.state.lecture} için henüz soru sorulmamış`
        this.setState({
            questionItems : questionItems,
            isLoading:false
        })

    }

    subjectChanged(newSubject)
    {
        this.setState({
            currentSubject : newSubject
        })
    }

    answerChanged(newAnswer)
    {
        let currentArray  =[]
        let arrayName ;

        switch(this.state.currentSubject)
        {
            case "Türkçe":
                currentArray = this.state.turkishAnswers
                arrayName = "turkishAnswers"
                break
            case "Sosyal Bilimler":
                currentArray = this.state.socialAnswers
                arrayName = "socialAnswers"
                break
            case "Temel Matematik":
                currentArray = this.state.mathAnswers
                arrayName = "mathAnswers"
                break
            case "Fen Bilimleri":
                currentArray = this.state.fenAnswers
                arrayName = "fenAnswers"
                break

        }

        let currentAnswer = currentArray.find(currentAnswer => currentAnswer.questionNumber ==newAnswer.questionNumber )

        if(currentAnswer)
        {
            newAnswer.answer == null ? currentArray = currentArray.filter(item => item !== currentAnswer) :currentAnswer.answer = newAnswer.answer

        }
        else
        {
            currentArray.push(newAnswer)

        }
        //currentAnswer ? currentAnswer.answer = newAnswer.answer : currentArray.push(newAnswer)

        this.setState({
            [arrayName]:currentArray,
            arrayName : `this.state.${arrayName}`
        },()=>{
            console.log("state => " + JSON.stringify(this.state,null,2))
        })

    }


    getSelectedButtons ()
    {
        let currentArray  =[]
        let arrayName ;

        switch(this.state.currentSubject)
        {
            case "Türkçe":
                currentArray = this.state.turkishAnswers
                arrayName = "turkishAnswers"
                break
            case "Sosyal Bilimler":
                currentArray = this.state.socialAnswers
                arrayName = "socialAnswers"
                break
            case "Temel Matematik":
                currentArray = this.state.mathAnswers
                arrayName = "mathAnswers"
                break
            case "Fen Bilimleri":
                currentArray = this.state.fenAnswers
                arrayName = "fenAnswers"
                break

        }

        let selectedArray = []
        currentArray.map(currentIndex =>{
         let itemNumber = (currentIndex.questionNumber-1)*5  + (currentIndex.answer)
        selectedArray.push(itemNumber)
        } )

        return selectedArray

    }

   async setCompleted()
    {

        this.setState({
            isLoading:true
        })

        const allAnswers = {
            mockId :1,
            answersData :
                {
                    turkish : this.state.turkishAnswers.length > 0 ? this.state.turkishAnswers : null ,
                    social : this.state.socialAnswers.length > 0 ? this.state.socialAnswers : null ,
                    math : this.state.mathAnswers.length > 0 ? this.state.mathAnswers : null,
                    fen : this.state.fenAnswers.length > 0 ? this.state.fenAnswers : null
                }
        }


        const mockResults = await axiosPost("mockResults",allAnswers)

        console.log("mock results >= " + JSON.stringify(mockResults,null,2))
        this.setState({
            mockResults :mockResults,
            isCompleted : true,
            isLoading:false
        })

        /*
        const mockId = 2;
        const totalQuestion= 10;
        const imageLink = "https://cdn-images-1.medium.com/max/1200/1*pyhfaP6Ix4UtZTBcsSLfiA.jpeg"
        const subjects = ["Türkçe","Temel Matematik","Fen Bilimleri","Sosyal Bilimler"]
        let json ;
        let questions = []

        subjects.map(currentSubject => {


            let tempQuestions = []

            for(let i = 1 ; i <=totalQuestion ; i++)
            {
                let tempQuestion = {
                    questionNumber:i,
                    questionImageLink : imageLink,
                    correctAnswer :Math.floor(Math.random() * (4 - 0 + 1) ) + 0
                }
                tempQuestions.push(tempQuestion)
            }

            let tempJson = {
                subject : currentSubject,
                questions:tempQuestions
            }


            questions.push(tempJson)

        })

        let result = {
            mockId : mockId,
            questions : questions
        }

        console.log(JSON.stringify(result,null,2))
        */

    }

    componentWillMount() {
        this.getQuestionInfo()

    }

    render() {
        return(
            this.state.isLoading ?
                <Loading/>
                :

            this.state.isCompleted ?

                <MockResultPage
                    mockResults ={this.state.mockResults}
                />
                :

            <div
                id={"mockDiv"}
            >
                <div>

                    <MockNavigation
                        subjectChanged = {this.subjectChanged}
                    />

                    <MockSection
                        title={this.state.currentSubject}
                    >
                        <AllQuestionsData
                            data = {this.state.questionItems}
                        />
                    </MockSection>
                </div>



                <OpticalForm
                subject = {this.state.currentSubject}
                totalQuestion = {10}
                answerChanged = {this.answerChanged}
                answeredQuestions = {this.getSelectedButtons()}
                setCompleted ={this.setCompleted}
                />

            </div>
        )
    }
}

export default Mock

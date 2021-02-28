import React,{Component} from "react"
import axios from "axios"
import Header from "../Header/Header";
import Loading from "../Loading/Loading";
import "./QuestionPageStyle.css"
import SimilarQuestion from "./QuestionPageComponents/SimilarQuestions/SimilarQuestion";
import SplitPage from "./SplitPage";
import QuestionComponent from "./QuestionPageComponents/Question/QuestionComponent";
import AnswersComponent from "./QuestionPageComponents/QuestionAnswers/AnswersComponent";
import AnswerItem from "./QuestionPageComponents/QuestionAnswers/AnswerItem";
import SimilarQuestionComponent from "./QuestionPageComponents/SimilarQuestions/SimilarQuestionComponent";
import {axiosGet} from "../CommonFunctions/axiosGet";

class QuestionPage extends Component{

    constructor(props) {
        super(props);
        this.state={
            questionDetails: "",
            isLoaded : false
        }
        this.updateComponent = this.updateComponent.bind(this)
    }


    createAnswerItem(answerData)
    {
        console.log("answer data => " + answerData)
        return <AnswerItem
            answerLink = {answerData.answerLink}
            answerText={answerData.description}
            answerType = {answerData.answerType}


        />
    }


    async getQuestionData()
    {

        const questionId = this.props.match.params.id;
        const endPoint =`questionDetails/${questionId}`;

        const results = await axiosGet(endPoint);

        console.log("results => " + JSON.stringify(results,null,2))

        const questionInfo = {
            questionDetails : results,
            answers : results.answers ? results.answers.map(this.createAnswerItem) : "Henüz Cevap Yok"
        }

        return questionInfo;

    }
    async getUserInfo()
    {
        const endPoint = "getUserInfo"
        const results = await axiosGet(endPoint);
        return results
    }

     async getQuestionInfo()
    {

        const questionId = this.props.match.params.id;
        const questionEndPoint =`questionDetails/${questionId}`;
        const userEndPoint = "getUserInfo"


        const questionResponse = await axiosGet(questionEndPoint);
        const questionResults = questionResponse.questionInfo

        const userResults = await axiosGet(userEndPoint);

        console.log("question response => " + JSON.stringify(questionResponse,null,2))
        this.setState({
            questionDetails : questionResults,
            elapsedTime : questionResponse.elapsedTime,
            answers : questionResults.answers ? questionResults.answers.map(this.createAnswerItem) : "Henüz Cevap Yok",
            userInfo : userResults,
            askedUserInfo : questionResponse.askedByInfo,
            isLoaded:true
        })

    }

    async updateQuestionView()
    {
        const questionId = this.props.match.params.id;
        const updateViewEndPoint =`updateView/${questionId}`;
        await axiosGet(updateViewEndPoint);

    }

     componentWillMount() {

         this.getQuestionInfo()
         this.updateQuestionView()


    }

    updateComponent()
    {
        this.setState({
            isLoaded : false
        })

        this.getQuestionInfo()
    }

    render() {


        return(
            <div>
                {

                    this.state.isLoaded ?
                       <SplitPage
                       center = {
                           <QuestionComponent
                       imageLink = {this.state.questionDetails.imageLink}
                       questionId ={this.state.questionDetails._id}
                       isSaved = {this.state.userInfo.savedQuestions.includes(this.state.questionDetails._id)}
                       updateComponent = {this.updateComponent}
                        totalView = {this.state.questionDetails.totalView}
                       totalAnswer = {this.state.questionDetails.answers.length}
                       askedTime = {this.state.elapsedTime}
                       askedByInfo = {this.state.askedUserInfo}
                       description={this.state.questionDetails.description}
                       lecture = {this.state.questionDetails.lecture}
                           />}

                       right = {

                           <AnswersComponent
                           >
                               {this.state.answers}
                           </AnswersComponent>
                       }

                       showRight = {this.state.answers.length > 0 }

                       />
                        :
                        <Loading/>

                }

            </div>
        )
    }
}

export default QuestionPage

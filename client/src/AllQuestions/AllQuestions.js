import React,{Component} from "react"
import {axiosGet} from "../CommonFunctions/axiosGet";
import Loading from "../Loading/Loading";
import QuestionItem from "./AllQuestionsComponent/QuestionItem";
import "./AllQuestionsStyle.css"
import Filter from "./AllQuestionsComponent/Filter";
import AllQuestionsData from "./AllQuestionsComponent/AllQuestionsData";
import {axiosPost} from "../CommonFunctions/axiosPost";

class AllQuestions extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            questionDetails: "",
            isLoaded : false,
            filter : {},
            sortField:null,
            sortBy : null,
            lecture : null
        }
        this.getQuestionInfo= this.getQuestionInfo.bind(this)
        this.updateLecture = this.updateLecture.bind(this)
        this.updateSort = this.updateSort.bind(this)
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
        console.log("res => " + JSON.stringify(questionResults,null,2))

        const questionItems = questionResults.length > 0 ?  await this.createQuestionItems(questionResults) : `${this.state.lecture} için henüz soru sorulmamış`
        this.setState({
            questionItems : questionItems,
            isLoaded:true
        })

    }

     updateLecture(lecture)
    {
        this.setState({
            lecture : lecture == "Hepsi" ? null : lecture
        },async ()=>{
            await this.getQuestionInfo()

        })

    }

     updateSort(value)
    {
        let sortField ;
        let sortBy ;

        switch (value) {
            case "dateInc":
                sortField = "askedTime"
                sortBy = -1
                break
            case "dateDec":
                sortField = "askedTime"
                sortBy = 1
                break
            case "viewInc":
                sortField = "totalView"
                sortBy = -1
                break
            case "viewDec":
                sortField="totalView"
                sortBy = 1
                break
        }

        this.setState({
            sortBy:sortBy,
            sortField:sortField
        },async()=>{
            await this.getQuestionInfo()

        })
    }

    componentWillMount() {

        this.getQuestionInfo()
       //this.checkBottom()
    }


    render() {
        return(
            this.state.isLoaded ?
                <div
                    id={"allQuestionsPage"}
                >
                  <Filter
                  updateLecture ={this.updateLecture}
                  updateSort = {this.updateSort}
                  />
                  <AllQuestionsData
                  data = {this.state.questionItems}
                  />

                </div>
                : <Loading/>
        )
    }
}
export default AllQuestions

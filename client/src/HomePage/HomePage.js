import React,{Component} from "react"
import "./HomePageStyle.css"
import HomePageComponent from "./HomePageComponents/HomePageComponent";
import HomePageQuestion from "./HomePageComponents/HomePageQuestion/HomePageQuestion";
import Loading from "../Loading/Loading";
import {axiosGet} from "../CommonFunctions/axiosGet";


class HomePage extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            isLoaded : false,
            newQuestions :[],
            topQuestionsToday:[],
            topQuestionsWeek : [],
            recommendedQuestions:[],
            noElementText :"Henüz Soru Sorulmamış.."
        }

        this.getQuestions = this.getQuestions.bind(this)
    }

    async getQuestions()
    {
      const questions =  await axiosGet("getAllData/questions");

      const newQuestionsArray = []
      const topQuestionsTodayArray = []
      const topQuestionsWeekArray = []
      const recommendedQuestions = []

        const elements = {
            newQuestionsArray : newQuestionsArray,
            topQuestionsTodayArray : topQuestionsTodayArray,
            topQuestionsWeekArray : topQuestionsWeekArray,
            recommendedQuestions : recommendedQuestions
        }

        const elementToFunction = {
            newQuestionsArray : "newQuestions",
            topQuestionsTodayArray : "topQuestionsToday",
            topQuestionsWeekArray   :"topQuestionsWeek",
            recommendedQuestions:"recommendedQuestions"
        }

        for(let currentElement in elements)
        {
            const currentClientArray = elements[currentElement]
            const currentServerArray = elementToFunction[currentElement]

            questions[currentServerArray].map(currentResponse => (
                currentClientArray.push(
                    <HomePageQuestion

                        questionImage ={currentResponse.imageLink}
                        questionId = {currentResponse.questionId}
                        lecture = {currentResponse.lecture}
                    />)
            ))


        }
      this.setState({
          newQuestions : newQuestionsArray,
          topQuestionsToday : topQuestionsTodayArray,
          topQuestionsWeek  :topQuestionsWeekArray,
          recommendedQuestions : recommendedQuestions,
          isLoaded:true
      })

    }
    componentWillMount() {
        this.getQuestions()
    }


    render() {

        const titles = ["En Yeniler","Sana Özel","Günün Soruları","Haftanın Soruları"]

        const homePageComponents = []
        const noElementWarning = <h4
        style={{
        marginLeft :"5%",
            color:"red"
        }}
        >{this.state.noElementText}</h4>

        titles.map(currentTitle => {
            let stateArray ;

            switch (currentTitle) {
                case "En Yeniler":
                    stateArray = this.state.newQuestions.length > 0 ? this.state.newQuestions : noElementWarning
                    break
                case "Günün Soruları":
                    stateArray = this.state.topQuestionsToday.length > 0 ? this.state.topQuestionsToday : noElementWarning
                    break
                case "Sana Özel":
                    stateArray = this.state.recommendedQuestions.length > 0 ? this.state.recommendedQuestions : noElementWarning
                    break
                case "Haftanın Soruları":
                    stateArray = this.state.topQuestionsWeek.length > 0 ? this.state.topQuestionsWeek : noElementWarning
                    break
            }

            homePageComponents.push((
                <HomePageComponent
                title = {currentTitle}
                >
                    {stateArray}
                </HomePageComponent>
            ))

        })

        return(
            this.state.isLoaded ?
            <div
            id={"homePageDiv"}
            >
                {homePageComponents}
            </div>
                :
                <Loading/>
        )
    }
}


export default HomePage

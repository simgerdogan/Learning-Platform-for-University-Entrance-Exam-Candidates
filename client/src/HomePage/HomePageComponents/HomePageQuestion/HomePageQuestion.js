import React from "react"
import HomeQuestionBottom from "./HomeQuestionBottom";
import {useHistory} from "react-router-dom"

function HomePageQuestion(props) {

    const history = useHistory();



    return <div
    id={"homeQuestionDiv"}

    >
            <div
            id={"homeQuestionImageDiv"}
            onClick={()=>{history.push(`/question/${props.questionId}`)}}
            >
                <img
                src={props.questionImage}
                />
            </div>


    </div>
}
export default HomePageQuestion

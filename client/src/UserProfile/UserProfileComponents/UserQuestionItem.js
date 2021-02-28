import React from "react"
import {useHistory} from "react-router-dom"

function UserQuestionItem(props) {
    const history = useHistory()
    return <img
        id={"userQuestionItem"}
        onClick={()=>{history.push(`/question/${props.questionId}`)}}
        src={props.questionImage}
    />
}

export default UserQuestionItem

import React from "react"
import {useHistory} from "react-router-dom"

function QuestionItem(props) {
    const history = useHistory()

    return <img


    src={props.imageLink}
    onClick={()=>{history.push(`/question/${props.id}`)}}
    />
}

export default QuestionItem

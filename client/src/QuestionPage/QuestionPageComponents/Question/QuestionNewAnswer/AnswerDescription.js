import React from "react"

function AnswerDescription(props) {
    return(
        <textarea
            placeholder={"Açıklamanı Buraya Yazabilirsin.."}
            id={"newAnswerDescription"}
            name={"answerDescription"}
            onInput={(e)=>{props.setDescription(e.target.value)}}
        />
    )
}

export default AnswerDescription


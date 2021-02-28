import React from "react"

function AnswerAudio(props)
{


    return (
        <audio controls controlsList="nodownload">
            <source src={props.answerLink} />
        </audio>



    )

}
export default AnswerAudio

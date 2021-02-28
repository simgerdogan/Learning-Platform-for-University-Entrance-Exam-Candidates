import React from "react"
import AnswerImage from "./AnswerImage";
import AnswerText from "./AnswerText";
import AnswerAudio from "./AnswerAudio";

function AnswerItem(props)
{
    return (
        <div
            id={"answerItem"}
        >
            {
                props.answerLink &&
                (
                    props.answerType =="png" || props.answerType =="jpg" ?
                        <AnswerImage
                            answerLink = {props.answerLink}
                        />:
                        <AnswerAudio
                            answerLink = {props.answerLink}
                        />

                )

            }

            {
                props.answerText && <AnswerText
                 answerText = {props.answerText}
                />
            }


        </div>
    )

}
export default AnswerItem

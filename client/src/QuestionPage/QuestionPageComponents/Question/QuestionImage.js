import React from "react"

function  QuestionImage(props)
{
    return (
        <>
        <img
            src={props.imageLink}
        />


            {
                props.description != "Açıklama Yapılmamış" &&
                <p>{props.description}</p>

            }

        </>

    )
}

export default QuestionImage

import React from "react"

function AnswersComponent(props)
{
    return(
        <div
        >
            <h3>Cevaplar</h3>
            {props.children}
        </div>
    )
}
export default AnswersComponent

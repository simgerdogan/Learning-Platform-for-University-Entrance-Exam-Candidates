import React from "react"

function SimilarQuestionComponent(props)
{
    return (
        <div
        >
            <h3>Benzer Sorular</h3>
            {props.children}
        </div>
    )

}
export default SimilarQuestionComponent

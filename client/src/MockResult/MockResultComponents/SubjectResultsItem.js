import React from "react"

function SubjectResultsItem(props)
{
    return <div
        id={"subjectResultsItemDiv"}
    >
        <img
        src={props.iconLink}
        />

            <p
            id = { "subjectResultsSubject"}
            >{props.subject}</p>

        <div
        id={"subjectInfosDiv"}
        >
            <p>Soru : <b>{props.totalQuestion} </b> </p>
            <p>Doğru : <b> {props.totalCorrect}</b> </p>
            <p>Yanlış : <b> {props.totalFalse} </b></p>
            <p>Net : <b> {props.totalNet}</b> </p>
        </div>




    </div>

}

export default SubjectResultsItem
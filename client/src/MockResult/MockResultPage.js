import React from "react"
import TotalResults from "./MockResultComponents/TotalResults";
import SubjectResults from "./MockResultComponents/SubjectResults";
import "./MockResultPageStyle.css"

function MockResultPage(props)
{
    return <div
        id={"mockResultsPageDiv"}
    >

        <TotalResults
            totalResults = {props.mockResults.totalResults}
        />
        <SubjectResults
            subjectResults = {props.mockResults.subjectResults}
        />
    </div>
}

export default MockResultPage
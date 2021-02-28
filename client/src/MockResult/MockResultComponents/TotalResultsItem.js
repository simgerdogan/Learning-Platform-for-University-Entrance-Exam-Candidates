import React from "react"

function TotalResultsItem(props)
{
    return <div
    id={"totalResultsItemDiv"}
    >

        <h2>{props.data}</h2>
        <p>{props.title}</p>
    </div>

}
export default TotalResultsItem
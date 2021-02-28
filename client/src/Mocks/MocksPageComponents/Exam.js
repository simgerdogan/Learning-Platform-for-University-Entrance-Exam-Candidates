import React from "react"
import {useHistory} from "react-router-dom"

function Exam (props)
{
    const history = useHistory()

    return <div
        id={"examDiv"}
        onClick={()=>{history.push(`/mock/${props.id}`)}}
    >
        <h4>{props.title}</h4>
    </div>
}
export default Exam

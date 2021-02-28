import React from "react"
import {useHistory} from "react-router-dom"

function SimilarQuestion(props)
{
    const history = useHistory();


    return <div
        onClick={()=>{history.push(`/question/${props._id}`)}}

    >


        <img
            src={props.imageLink}
        />

    </div>
}

export default SimilarQuestion

import React from "react"
import { useHistory } from "react-router-dom";

function HeaderNewQuestion(props)
{
    const history = useHistory();


    return(
        <div
         className={"headerNavigationsDiv"}
        id={"headerNewQuestionDiv"}
         onClick={()=>{history.push("/ask")}}
        >
            <img
            src={props.iconSource}
              />
            <h3>{props.title}</h3>

        </div>
    )
}

export default HeaderNewQuestion

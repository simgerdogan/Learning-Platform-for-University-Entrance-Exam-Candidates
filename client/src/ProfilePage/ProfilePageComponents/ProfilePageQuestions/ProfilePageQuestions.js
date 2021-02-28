import React from "react"
import {useHistory} from "react-router-dom";

//TODO when question is clicked we will route to question with id. This method would be replaced with Link
function questionClicked(id) {
alert("clicked => " + id)
}

function ProfilePageQuestions(props) {
    const history = useHistory();


    return(
        <div
            id={"profilePageQuestionsDiv"}
        >
            <h4>{props.title}</h4>

            {
                props.data.length >0 ?

                    <div id={"profilePageQuestionsDataDiv"}>
                        {
                            props.data.map(currentQuestion => (
                                <img
                                    src={currentQuestion.imageLink}
                                    onClick={()=>{history.push(`/question/${currentQuestion.questionId}`)}}
                                />

                            ))
                        }
                    </div>

                    : <h2
                    style={{marginLeft:"3%"}}>Soru bulunamadı.. </h2>

            }

        </div>
    )
}


export default ProfilePageQuestions

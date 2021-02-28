import React, {useContext} from "react"
import {useHistory} from "react-router-dom"
import {UserContext} from "../../../Contexts/UserProvider";

function HomeQuestionBottom(props)
{
    const userContext = useContext(UserContext);
    const userId = userContext.user.uid
    const history = useHistory()

    return <div
        onClick={()=>{history.push(`/profile/${userId}`)}}
        id={"homeQuestionBottom"}
    >
            <img
                style={{borderRadius:"20px"}}
                src={"../visuals/pp.png"}
            />
            <div>

                <p>{props.name}</p>

                <p>{props.askedTime}</p>
            </div>


    </div>

}
export default HomeQuestionBottom

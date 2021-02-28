import React, {useContext} from "react"
import {useHistory} from "react-router-dom"
import {UserContext} from "../../Contexts/UserProvider";

function UsersPageUser (props)
{
    const history = useHistory()
    const userContext = useContext(UserContext);

    return <div
    id={"usersPageUserDiv"}
    onClick={()=>{ userContext.user.uid == props.user.uid ? history.push(`/profile`) : history.push(`/user/${props.user.uid}`)}}
    >

        <div
        id={"usersPageUserImageDiv"}
        >
            <img
            src={props.user.profilePhotoLink}
            />
        </div>
        <div>
            {props.user.name}

        </div>
    </div>
}
export default UsersPageUser

import React, {useState} from "react"
import {axiosGet} from "../../CommonFunctions/axiosGet";
import {useHistory} from "react-router-dom"

function UserInfoButtons(props)
{
    const history = useHistory()
    const infoIcon = "../visuals/icons/questionIcons/info.png"
    const followIcon =  "../visuals/icons/otherIcons/follower.png"
    const followingIcon = "../visuals/icons/otherIcons/followers.png"
    const messageIcon =  "../visuals/icons/headerIcons/chat.png"
    const [isFollowing,setFollowing] = useState(props.isFollowing)
    console.log("is following button => " + isFollowing)
    return <div
        id={"userInfoButtonsDiv"}
    >
        <img
            onClick={async ()=>{await axiosGet(`followUser/${props.userId}/${isFollowing ? "unfollow" :"follow" }`)
                                setFollowing(!isFollowing)
                               !isFollowing ? props.setFollowers(props.followers+1) : props.setFollowers(props.followers-1)
            }}
            src={ isFollowing ? followingIcon :followIcon}
        />



       <img
           onClick={()=>{history.push('/reach')}}
       src={infoIcon}
       />
    </div>
}
export default UserInfoButtons

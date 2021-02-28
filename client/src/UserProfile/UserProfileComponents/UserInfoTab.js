import React,{useState} from "react"
import UserProfileImage from "./UserProfileImage";
import UserInfoButtons from "./UserInfoButtons";
import UserInfo from "./UserInfo";



function UserInfoTab(props)
{
    console.log("is following => " + props.asd)
    const [followers,setFollowers] = useState(props.followers)
    return <div
        id={"userInfoTabDiv"}
    >

            <UserProfileImage
            name = {props.name}
            profileImage = {props.profileImage}
            />

            <div
            >
                <UserInfoButtons
                userId = {props.userId}
                isFollowing = {props.isFollowing}
                setFollowers = {setFollowers}
                followers = {followers}

                />
                <UserInfo
                    followers = {followers}
                    following = {props.following}
                    asked = {props.questions}
                />
            </div>


    </div>
}
export default UserInfoTab

import React from "react"

function UserProfileImage(props)
{
    return <div
        id={"userProfileImageDiv"}
    >
        <img
        src={props.profileImage}
        />

        <h3>{props.name}</h3>

    </div>
}
export default UserProfileImage

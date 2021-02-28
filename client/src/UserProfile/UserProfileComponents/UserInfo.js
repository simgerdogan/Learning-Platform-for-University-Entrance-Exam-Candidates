import React from "react"

function UserInfo(props)
{
    return <div
        id={"userInfoDiv"}
    >
        <h4>{props.followers} Takipçi</h4>
        <h4>{props.following} Takip</h4>
        <h4>{props.asked} Soru</h4>

    </div>
}
export default UserInfo

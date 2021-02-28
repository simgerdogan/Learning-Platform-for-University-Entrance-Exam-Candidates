import React from "react"

function UsersPageSearch (props)
{
    return <div
        id={"headerSearchDiv"}

    >  <input
        placeholder={"Kullanıcı Adını Girin"}
        id = {"searchValue"}
        autoComplete={"off"}
        onInput={(e)=>{props.searchUsers(e.target.value)} }
    />
        <img
            src={"../visuals/icons/headerIcons/search.png"}
        /></div>
}
export default UsersPageSearch

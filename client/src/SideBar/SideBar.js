import React from "react"
import SideBarItem from "./SideBarItem";
import "./SideBarStyle.css"

const sideBarItems = [
    <SideBarItem
        title={"Profilim"}
        path = {"profile"}
        iconSource = {"./visuals/icons/navIcons/profile.png"}

    />,

    <SideBarItem
        title={"Bize Ulaş"}
        path = {"reach"}
        iconSource = {"./visuals/icons/navIcons/mail.png"}
    />,
    <SideBarItem
        title={"Sorular"}
        path = {"questions"}
        iconSource = {"./visuals/icons/navIcons/writing.png"}

    />,
    <SideBarItem
        title={"Kullanıcılar"}
        path = {"users"}
        iconSource = {"./visuals/icons/navIcons/users.png"}

    />,


    <SideBarItem
        title={"Çıkış Yap"}
        path = {""}
        iconSource = {"./visuals/icons/navIcons/logout.png"}

    />
]

function SideBar(props)
{
    return <div
        id={"sideBarDiv"}
        style = {{
            display: `${props.visibility}`
        }}
    >
        {sideBarItems}
    </div>

}
export default SideBar

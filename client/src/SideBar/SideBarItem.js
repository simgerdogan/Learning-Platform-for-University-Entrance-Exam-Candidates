import React from "react"
import {useHistory} from "react-router-dom"
import {auth} from "../firebase";


async function handleOnClick(path,history) {

    if (path == "") {
        await auth.signOut()
    }
    history.push(`/${path}`)

    document.getElementById("sideBarDiv").style.display ="hidden"

}

function SideBarItem(props)
{
    const history = useHistory()
    return <div
            onClick={()=>{handleOnClick(props.path,history)}}
            id={"sideBarItem"}
    >
        <img
        src={props.iconSource}
        />
        <h3>{props.title}</h3>
    </div>
}

export default SideBarItem

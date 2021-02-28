import React, {useContext, useState} from "react"
import { useHistory } from "react-router-dom";
import SideBar from "../../SideBar/SideBar";

/*
 <SideBar
            visibility={isSideBar ? "block" : "none"}
        />
 */
function HeaderProfilePhoto(props) {
    const history = useHistory();

    console.log("props header profile ??> " + JSON.stringify(props,null,2))
    const [isSideBar,setSideBar] = useState(false);

    return(
    <div
        className={"headerNavigationsDiv"}
        id={"headerProfilePhotoDiv"}
        onClick={()=>{history.push("/profile")}}

    >
        <img
        src={props.profilePhotoUrl}

        />
        <h3
        onClick={()=>{setSideBar(!isSideBar)}}
        >{props.displayName}</h3>



    </div>
)

}
export default HeaderProfilePhoto

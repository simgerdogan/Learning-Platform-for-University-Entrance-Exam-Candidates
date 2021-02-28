import React from "react"
import { useHistory } from "react-router-dom";
import {auth} from "../../firebase";

async function handleOnClick(path,history) {

    if (path == "") {
        await auth.signOut()
        //history.push(`/`)
       // window.location.href("/")
    }
    history.push(`${path}`)


}


function HeaderNavigations(props) {


    const history = useHistory();

    return(
        <div
        className={"headerNavigationsDiv"}
        onClick={()=>{handleOnClick(props.href,history)}}
        >

            <img
            src={props.iconSource}
            />
            <h3>{props.title}</h3>
        </div>
    )
}
export default HeaderNavigations

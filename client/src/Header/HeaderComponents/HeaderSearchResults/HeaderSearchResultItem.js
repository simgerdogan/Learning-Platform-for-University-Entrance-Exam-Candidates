import React from "react"
import Highlighted from "./Highlighted";
import { useHistory } from "react-router-dom";

function handleClick(setSearchInput,resultId,history) {

    history.push(`/question/${resultId}`)
    setSearchInput("")

}


function HeaderSearchResultItem(props)
{
    const history = useHistory();

    return <div
    id={"headerSearchResultItemDiv"}
    onClick={()=>{handleClick(props.setSearchInput,props.result._id,history)}}

    >

        <h5>{props.result.lecture}</h5>
        <br/>

        <Highlighted text={props.result.imageText} highlight={props.inputs}/>




    </div>
}
export default  HeaderSearchResultItem

/*

<h4>
            {props.result.imageText}
            <mark>test</mark>
        </h4>

 */

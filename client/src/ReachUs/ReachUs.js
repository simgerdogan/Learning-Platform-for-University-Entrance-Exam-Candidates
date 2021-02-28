import React from "react"
import SplitPageTwo from "./SplitPageTwo";
import ReachUsLeftVector from "./ReachUsComponents/ReachUsLeftVector";
import Header from "../Header/Header";
import "./ReachUsStyle.css"
import ReachUsRight from "./ReachUsComponents/ReachUsRight";

function ReachUs(props)
{
    //console.log("props => " + JSON.stringify(props,null,2))
    return <SplitPageTwo
            left = {<ReachUsLeftVector/>}
            right = {<ReachUsRight
                questionId = {props.history.location.questionId }
            />}
        />



}
export default ReachUs

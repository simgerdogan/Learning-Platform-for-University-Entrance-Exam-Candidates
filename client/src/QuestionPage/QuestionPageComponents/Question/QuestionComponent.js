import React,{useContext} from "react"
import QuestionImage from "./QuestionImage";
import QuestionBottomTab from "./QuestionBottomTab";
import NewAnswer from "./QuestionNewAnswer/NewAnswer";
import {UserContext} from "../../../Contexts/UserProvider";


function  QuestionComponent(props)
{
    const userContext = useContext(UserContext);


    return (
     <>
         <QuestionImage
         imageLink ={props.imageLink}
         description = {props.description}
         />
         <QuestionBottomTab
         questionId = {props.questionId}
         isSaved = {props.isSaved}
         askedBy = {props.askedByInfo}
         askedTime = {props.askedTime}
         totalView = {props.totalView}
         totalAnswer = {props.totalAnswer}
         lecture = {props.lecture}

         />
         <NewAnswer
         user = {userContext.user}
         questionId = {props.questionId}
         updateComponent = {props.updateComponent}
         />
     </>
 )
}

export default QuestionComponent

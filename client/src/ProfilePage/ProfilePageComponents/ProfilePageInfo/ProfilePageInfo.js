import React,{Component} from "react"
import ProfilePageNumInfo from "../ProfilePageNumInfo/ProfilePageNumInfo";
import ProfilePageQuestions from "../ProfilePageQuestions/ProfilePageQuestions";
import axios from "axios"
import {auth} from "../../../firebase";
import Loading from "../../../Loading/Loading";
import {axiosGet} from "../../../CommonFunctions/axiosGet";

function ProfilePageInfo(props)
{
    return props.data.isLoaded ?    <div
        id={"profilePageInfoDiv"}
    >
        {
            props.data.numData.map(numData => (
                <ProfilePageNumInfo
                    title={numData.title}
                    data ={numData.data}
                />
            ))
        }


        {
            props.data.questionsData.map(questionData => (
                <ProfilePageQuestions
                    title={questionData.title}
                    data ={questionData.data}

                />
            ))
        }

    </div> :
        <div
            id={"profilePageInfoDiv"}
        >
            <Loading/>
        </div>

}
export default  ProfilePageInfo


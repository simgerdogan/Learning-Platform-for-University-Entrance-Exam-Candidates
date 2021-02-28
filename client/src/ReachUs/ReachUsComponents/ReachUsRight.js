import React, {useState} from "react"
import Subject from "./Subject";
import Message from "./Message";
import {axiosPost} from "../../CommonFunctions/axiosPost";


async function sendMessage(subject,message,questionId) {

    const messageData = {
        subject : subject,
        message : message
    }

    if(questionId)
    {
        messageData["questionId"] = questionId
    }

   await axiosPost("reachUs",messageData)
    alert("Mesajınız bize ulaşmıştır. Sizlere en kısa zamanda geri dönüş yapılacaktır")
}

function ReachUsRight(props)
{
    console.log("props => " + JSON.stringify(props,null,2))
    const questionId = props.questionId  ? props.questionId : ""
    const isQuestion = questionId ? true : false

    const[subject,setSubject] = useState(isQuestion ? "Soru Şikayeti Hakkında" : "")
    const[message,setMessage] = useState("")
    const buttonText = "Gönder"

    return <div>
            <Subject
            setSubject={setSubject}
            subject={subject}
            />
            <Message
            setMessage = {setMessage}
            />
            <button
            onClick={()=>{sendMessage(subject,message,questionId)}}
            >{buttonText}</button>
    </div>
}

export default ReachUsRight

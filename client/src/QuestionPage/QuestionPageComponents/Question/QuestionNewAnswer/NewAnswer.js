import React, {useState} from "react"
import axios from "axios"
import AnswerMedia from "./AnswerMedia";
import AnswerDescription from "./AnswerDescription";
import {uploadFile} from "../../../../CommonFunctions/uploadFile";
import {axiosPost} from "../../../../CommonFunctions/axiosPost";


async function shareAnswer(userId,file,fileType,questionId,description,updateComponent) {


    const uploadInfo =   await uploadFile(userId,"answers",file,fileType,questionId)


   let answerData = {
      _id : uploadInfo.fileId,
       answerId : uploadInfo.fileId,
       questionId: questionId,
       answerBy : userId,
       answerType : fileType,
       answerTime : Date.now(),
       description:description ? description : "Açıklama Yapılmamış",
       upVotes : 0,
       downVotes : 0
   }

   if(file)
   {
       answerData["answerLink"] = uploadInfo.fileLink
   }
   await axiosPost("newAnswer",answerData)

    updateComponent()

}

function NewAnswer(props)
{

    const[description,setDescription] = useState("")
    const[file,setFile] = useState(null)
    const[fileType,setFileType] = useState("")

    return(
        <div
        id={"newAnswerDiv"}
        >

            <AnswerMedia
                setFile ={setFile}
            setFileType={setFileType}
            />
            <AnswerDescription
            setDescription ={setDescription}
            />
            <button
            onClick={()=>{shareAnswer(props.user.uid,file,fileType,props.questionId,description,props.updateComponent)}}
            >Paylaş</button>
        </div>
    )

}

export default NewAnswer

import React, {useContext, useState} from "react"
import {useHistory} from "react-router-dom"
import {UserContext} from "../../../Contexts/UserProvider"
import {axiosPost} from "../../../CommonFunctions/axiosPost";

async function saveQuestion(questionId,setSaved) {

    const savedQuestionData = {
        questionId : questionId
    }
    await axiosPost("updateUserInformation",questionId)
    setSaved(true)
}

function QuestionBottomTab(props)
{
    const userContext = useContext(UserContext);
    const history = useHistory();
    const userId = userContext.user.uid
    const askedBy = props.askedBy
    const [isSaved,setSaved] = useState(props.isSaved)

    console.log("user => " + JSON.stringify(props.askedBy,null,2))
    //TODO question bottom infos need to be updated
    return(


        <div
        id={"questionBottomDiv"}
        >

            <div
                title="Kim Sordu ?"
                onClick={()=>{ userId == askedBy.uid ? history.push(`/profile`) : history.push(`/user/${askedBy.uid}`)}}
                style={{
                    cursor:"pointer"
                }}

            >

                <img
                    style={{borderRadius:"20px"}}
                    src={props.askedBy.profilePhotoLink}
                />
                <p>{props.askedBy.name}</p>

            </div>

            <div
                title="Ders"
            >
                <img
                    src={"../visuals/icons/questionIcons/book.png"}
                />
                <p>{props.lecture}</p>
            </div>


            <div
                title="Ne Zaman Soruldu"
            >
                <img
                    src={"../visuals/icons/questionIcons/clock.png"}
                />
                <p>{props.askedTime}</p>
            </div>


            <div
                title="Toplam Cevap"
            >
                <img
                    src={"../visuals/icons/questionIcons/comments.png"}
                />
                <p>{props.totalAnswer > 0 ? props.totalAnswer : "0"}</p>
            </div>

            <div
                title="Toplam Görülme"
            >
                <img
                    src={"../visuals/icons/questionIcons/seen.png"}
                />
                <p>{props.totalView}</p>
            </div>

            <div>
                <img
                src={isSaved ? "../visuals/icons/questionIcons/bookmarked.png" : "../visuals/icons/questionIcons/bookmark.png"}
               onClick={()=>{saveQuestion(props.questionId,setSaved)}}
                />

            <p>Kaydet</p>
            </div>

            <div
            onClick={()=>{history.push({
                pathname:"/reach",
                questionId :props.questionId
            }) }}
            >
                <img
                    src={"../visuals/icons/questionIcons/info.png"}
                />
                <p>Şikayet</p>
            </div>



        </div>
    )
}

export default QuestionBottomTab

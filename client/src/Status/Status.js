import React from "react"
import { useHistory } from "react-router-dom";
import "./StatusStyle.css"

function Status(props)
{
    const history = useHistory();

    const buttonBackColor = props.isFail ? "#E30700" : "#2196F3"

    return <div
        id={"statuesDiv"}
    >



        <div
        >
            {props.isFail ?
                <img

                    src={"./visuals/icons/otherIcons/fail.png"}
                /> :

                <img

                    src={"./visuals/icons/otherIcons/success.png"}
                />
            }

            <h2>{props.title}</h2>

            {
                !props.isFail &&
                <button
                    onClick={()=>{history.push(`/question/${props.questionId}`)}}
                    style={{
                    backgroundColor:buttonBackColor
                    }}>
                    Soruya Git
                </button>
            }



            <button
                onClick={()=>{window.location.reload()}}
                style={{
                    backgroundColor:buttonBackColor
                }}>
                Yeni Soru Sor
            </button>

        </div>


    </div>

}

export default Status

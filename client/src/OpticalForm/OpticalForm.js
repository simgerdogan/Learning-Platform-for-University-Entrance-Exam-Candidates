import React,{useState, useEffect,useRef} from "react"
import OpticalFormRow from "./OpticalFormComponents/OpticalFormRow";
import "./OpticalFormStyle.css"


function OpticalForm (props)
{
    const [rows,setRows] = useState([])

    const isFirstRun = useRef(true);


    useEffect(()=>{
        let tempRows = []
        for(let i = 1 ; i <= props.totalQuestion ; i++)
        {
            let currentRow = <OpticalFormRow
                        questionNumber={i}
                        answerChanged = {props.answerChanged}
                        selectedButton ={null}
            />
            tempRows.push(currentRow)
        }
        setRows(tempRows)
    },[])



    useEffect(()=>{

        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        const selectedItems = document.getElementsByClassName("selectedButton")

        while (selectedItems.length) {
            selectedItems[0].classList.replace("selectedButton","notSelectedButton")

        }

        console.log("sel => " + props.answeredQuestions)
        const notSelectedItems = document.getElementsByClassName("formButton")

        props.answeredQuestions.map(currentSelected => {

            notSelectedItems.item(currentSelected).classList.replace("notSelectedButton","selectedButton")
        })


    },[props.subject])


    return <div
    id={"opticalFormDiv"}
    >
        <h3> {props.subject}</h3>

        {rows}

        <button
        onClick={()=>{props.setCompleted()}}
        id={"opticalFormDoneButton"}
        >Denemeyi Tamamla</button>
    </div>
}

export default OpticalForm

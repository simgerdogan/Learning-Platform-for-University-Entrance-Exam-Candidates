import React,{useState,useEffect,useRef} from "react"


function OpticalFormRow(props)
{

    const [selectedButton,setSelectedButton] = useState(null)
    const isFirstRun = useRef(true);

    useEffect(()=>{

        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        props.answerChanged({
            questionNumber: props.questionNumber,
            answer : selectedButton
        })
    },[selectedButton])


    return <div
            id={"formRowDiv"}
    >

        <div
        id={"formRowNumber"}
        >
            <p>
                {props.questionNumber})
            </p>

        </div>

        <div
        id={"formRowButtons"}
        >
            <button
                className = {`formButton ${selectedButton == 0 ? "selectedButton" : "notSelectedButton"}`}
                 onClick={()=>  setSelectedButton(selectedButton == 0 ? null : 0)}
            >A</button>

            <button
                className = {`formButton ${selectedButton == 1 ? "selectedButton" : "notSelectedButton"}`}
                onClick={()=>  setSelectedButton(selectedButton == 1 ? null : 1)}

            >B</button>
            <button

                className = {`formButton ${selectedButton == 2 ? "selectedButton" : "notSelectedButton"}`}
                onClick={()=>  setSelectedButton(selectedButton == 2 ? null : 2)}

            >C</button>
            <button

                className = {`formButton ${selectedButton == 3 ? "selectedButton" : "notSelectedButton"}`}
                onClick={()=>  setSelectedButton(selectedButton == 3 ? null : 3)}

            >D</button>
            <button

                className = {`formButton ${selectedButton == 4 ? "selectedButton" : "notSelectedButton"}`}
                onClick={()=>  setSelectedButton(selectedButton == 4? null : 4)}
            >E</button>
        </div>



    </div>
}
export default OpticalFormRow

import React, {useEffect, useState} from "react"
import SubjectResultsItem from "./SubjectResultsItem";

function SubjectResults(props) {

    function getIconPath(subject) {

        const iconPath = "../visuals/icons/lectureIcons"

        const iconsUrl = {
            turkish : "/study.png",
            social : "/history.png",
            math : "/calculator.png",
            fen : "/atom.png"

        }

        let iconLink = ""

        switch(subject)
        {
            case "Türkçe":
                iconLink = iconPath + iconsUrl.turkish
                break
            case "Temel Matematik":
                iconLink = iconPath + iconsUrl.math
                break
            case "Sosyal Bilimler":
                iconLink= iconPath+iconsUrl.social
                break
            case "Fen Bilimleri":
                iconLink = iconPath+iconsUrl.fen
                break
        }

        return iconLink
    }
    const[subjectResultItems,setSubjectResultItems] = useState([])


    useEffect(()=>{

        let tempResults = []

        props.subjectResults.map(currentResult=>{


            const currentResultItem = <SubjectResultsItem
            subject={currentResult.subject}
            totalCorrect = {currentResult.totalCorrect}
            totalFalse = {currentResult.totalFalse}
            totalNet = {currentResult.totalNet}
            totalQuestion = {currentResult.totalQuestion}
            iconLink = {getIconPath(currentResult.subject)}
            />
            tempResults.push(currentResultItem)
        })

        setSubjectResultItems(tempResults)
    },[])

    return <div
        className={"resultDiv"}
    id={ "subjectResultsDiv"}
    >
        {subjectResultItems}
    </div>
}

export default SubjectResults
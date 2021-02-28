import React,{useState,useEffect} from "react"
import TotalResultsItem from "./TotalResultsItem";

function TotalResults(props)
{
    const [totalResultItems,setTotalResultItems] = useState([])

    useEffect(()=>{
       let tempResults = []

        Object.entries(props.totalResults).map(currentResult=>{
            const key = currentResult[0]
            const value = currentResult[1]

            const currentResultItem = <TotalResultsItem
            data = {value}
            title = {key}
            />

            tempResults.push(currentResultItem)

        })
        setTotalResultItems(tempResults)
    },[])

    return <div
        className={"resultDiv"}

        id={"totalResultsDiv"}
    >
        {totalResultItems}
    </div>
}

export default TotalResults
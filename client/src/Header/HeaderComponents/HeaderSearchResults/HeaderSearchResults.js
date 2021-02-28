import React from "react"
import "./HeaderSearchResultsStyle.css"
import HeaderSearchResultItem from "./HeaderSearchResultItem";

function HeaderSearchResults(props) {


    //console.log("lebnt >= " + props.results.length)
    return <div
    id={"HeaderSearchResultsDiv"}
    >

        {props.results.length > 0 ?
            props.results.map(currentResult => (
            <HeaderSearchResultItem
                result = {currentResult}
                inputs = {props.inputs}
                setSearchInput={props.setSearchInput}
            />
            )): <h2
            style={{color:"#9f94b3",
            marginTop:"10%"}}
            >Sonuç Bulunamadı</h2> }


    </div>
}

export default HeaderSearchResults

import React from "react"

function SortFilter(props)
{
    return <select
    onChange={event => {props.updateSort(event.target.value)}}
    >
        <option
        value={"dateInc"}
        >Tarih ↑</option>
        <option
            value={"dateDec"}

        >Tarih ↓</option>
        <option
            value={"viewInc"}

        >Görüntülenme ↑</option>
        <option
            value={"viewDec"}

        >Görüntülenme ↓</option>


    </select>
}
export default SortFilter

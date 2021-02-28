import React from "react"
import LectureFilter from "./LectureFilter";
import SortFilter from "./SortFilter";

function Filter(props)
{
    return <div
    id={"filterDiv"}
    >
        <LectureFilter
        updateLecture = {props.updateLecture}
        />
        <SortFilter
            updateSort = {props.updateSort}

        />

    </div>
}
export default Filter

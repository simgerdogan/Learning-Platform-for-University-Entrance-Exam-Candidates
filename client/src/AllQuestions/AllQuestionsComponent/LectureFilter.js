import React from "react"

function LectureFilter(props) {

    return   <select
        onChange={event => {props.updateLecture(event.target.value)}}

    >
        <option
        selected={true}>Hepsi</option>

        <option>Matematik</option>
        <option
        value={"Turkce"}
        >Türkçe</option>
        <option>Fizik</option>
        <option>Kimya</option>
        <option>Biyoloji</option>
        <option>Tarih</option>
        <option>Geometri</option>
        <option
        value={"Cografya"}
        >Coğrafya</option>
    </select>
}

export default LectureFilter

import React from "react"
function Subject(props) {

    return <div
        id={"reachUsSubjectDiv"}
        className={"reachUsInputs"}

    >
        <h3>Konu</h3>
        <input
            defaultValue={props.subject}
            onInput={(e)=>{props.setSubject(e.target.value)}}

        />
    </div>
}

export default Subject

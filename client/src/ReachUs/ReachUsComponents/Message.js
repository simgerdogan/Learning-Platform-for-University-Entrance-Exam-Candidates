import React from "react"
function Message(props) {

    return <div
        id={"reachUsMessageDiv"}
        className={"reachUsInputs"}

    >
            <h3>Mesaj</h3>
        <input
            onInput={(e)=>{props.setMessage(e.target.value)}}
        />
</div>
}

export default Message

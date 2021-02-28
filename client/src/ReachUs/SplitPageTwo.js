import React from "react"

function SplitPageTwo(props)
{
    return <div
    id={"SplitPageTwoDiv"}
    >

        <div
        id={"SplitPageTwoLeft"}
        >
            {props.left}
        </div>
        <div
            id={"SplitPageTwoRight"}

        >
            {props.right}
        </div>

    </div>
}
export default SplitPageTwo

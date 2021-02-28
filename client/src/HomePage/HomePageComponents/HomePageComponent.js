import React from "react"

function HomePageComponent(props)
{
    return <div
    id={"homePageComponentDiv"}
    >
        <h3>{props.title}</h3>


        {props.children}
    </div>

}
export default HomePageComponent

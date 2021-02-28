import React from "react"
import {useHistory} from "react-router-dom"

function HeaderLogo()
{
    const logoSource = "../visuals/icons/headerIcons/logo.png";
    const history = useHistory();

    return <div
        id={"headerLogo"}

        onClick={()=>{history.push("/")}}
    >
        <img
            src={logoSource}
        />

    </div>
}
export default HeaderLogo

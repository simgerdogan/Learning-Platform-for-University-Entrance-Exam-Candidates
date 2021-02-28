import React,{Component} from "react"

class ProfilePageVector extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            vectorSource : "./visuals/LoginPageVector.jpg"
        }
    }

    render() {
        return(
            <div
                id={"profilePageVectorDiv"}
            >
                <img
                    id={"profilePageVectorImage"}
                   src={this.state.vectorSource}
                    />

            </div>
        )
    }
}

export default ProfilePageVector

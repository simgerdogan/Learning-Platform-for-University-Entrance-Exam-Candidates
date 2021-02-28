import React,{Component} from "react"
import "./WelcomePageVectorStyle.css"

class WelcomePageVector extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            vectorSource : "./visuals/WelcomePageVector.png"
        }
    }

    render() {
        return(
            <div
                id={"WelcomePageVector"}
            >
                <img
                    src={this.state.vectorSource}
                />

            </div>
        )
    }
}

export default WelcomePageVector

import React,{Component} from "react"

class ProfilePageNumInfo extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div
            id={"profilePageNumInfoDiv"}
            >
                <h3>{this.props.title}</h3>
                <h4>{this.props.data}</h4>
            </div>
        )
    }
}

export default ProfilePageNumInfo

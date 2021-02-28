import React,{Component} from "react"
import WelcomePageVector from "./WelcomePageComponents/WelcomePageVector/WelcomePageVector";
import LoginPage from "./WelcomePageComponents/WelcomePageRight/Login/LoginPage";
import SignupPage from "./WelcomePageComponents/WelcomePageRight/Signup/SignupPage";
import "./WelcomePageComponents/WelcomePageRight/WelcomPageRightStyle.css"

class WelcomePage extends Component{

    constructor(props) {
        super(props);

        this.state = {
            choice : "login",
            isRefreshed:false
        }

        this.updateChoice = this.updateChoice.bind(this)

    }

    updateChoice(newChoice)
    {
        this.setState({
            choice:newChoice
        })
    }
    render()
    {
        return (
            <div>


                <WelcomePageVector/>

                {this.state.choice == "login" ?
                    <LoginPage
                    updateChoice = {this.updateChoice}
                    /> :
                    <SignupPage
                        updateChoice = {this.updateChoice}

                    /> }
            </div>
        );
    }

}


export default WelcomePage

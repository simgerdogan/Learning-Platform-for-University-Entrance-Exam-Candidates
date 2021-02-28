import React,{Component} from "react"
import firebase from "firebase";
import {auth} from "../../../../firebase";
import axios from "axios"
import {axiosPost} from "../../../../CommonFunctions/axiosPost";

class SignupPage extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            welcomePageTitle:"Hoş Geldin",
            loginUserMailInputPlaceHolder : "E-posta Adresin",
            signUpUserMailInputName:"userMail",
            signUpUserNameInputName :"userName",
            signUpUserSurnameInputName:"userSurname",
            loginUserPasswordInputPlaceHolder : "Şifren",
            signUpUserPasswordInputName:"userPassword",
            userName:"",
            userSurname:"",
            signUpText : "Üye Ol",
            socialMediaLoginText:"Veya",
            signUpLink:"Üye Ol",
            socialMediaIconsPath:"./visuals/icons/socialMediaIcons/",
            googleIconName :"google.png",
            facebookIconName : "facebook.png",
            twitterIconName :"twitter.png",
            lowerInfoText : "Zaten kayıtlı mısın ? Hemen ",
            lowerInfoLink:"Giriş Yap",
            signUpNameText:"İsim",
            signUpSurnameText:"Soyisim",
            userMail :"",
            userPassword:""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.signUp = this.signUp.bind(this);

    }


    handleInputChange(event)
    {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]:value
        })
    }

    async signUp()
    {

        let userName = this.state.userName;
        let userSurname = this.state.userSurname;
        let userMail = this.state.userMail

        try
        {
           auth.createUserWithEmailAndPassword(this.state.userMail,this.state.userPassword).then(async user => {

               let userInformation =
                   {
                       uid:user.user.uid,
                       name : userName,
                       surname:userSurname,
                       email:userMail,
                       profilePhotoLink:"https://firebasestorage.googleapis.com/v0/b/soru-cozum-dc062.appspot.com/o/user.png?alt=media&token=9feadaa7-c06f-4801-92a8-1ea924db4c34"
                   }


               await axiosPost("newUser",userInformation)
               window.location.href= "/"

           })

        }
        catch (e) {
            console.log("error")

        }


    }


    render() {
        return (
            <div
                className={"welcomePageRightDiv"}
            >
                <div
                    className={"welcomePageRightTitleDiv"}
                >

                    <h2>
                        {this.state.welcomePageTitle}
                    </h2>
                </div>

                <div
                    className={"welcomePageRightInputsDiv"}
                >
                    <div
                        id={"signUpPageNameInfoDiv"}
                    >

                        <input
                            placeholder={this.state.signUpNameText}
                            onChange={this.handleInputChange}
                            name={this.state.signUpUserNameInputName}


                        />
                        <input
                            placeholder={this.state.signUpSurnameText}
                            onChange={this.handleInputChange}
                            name={this.state.signUpUserSurnameInputName}

                        />

                    </div>



                    <input
                        name={this.state.signUpUserMailInputName}
                        placeholder={this.state.loginUserMailInputPlaceHolder}
                        onChange={this.handleInputChange}
                    />

                    <input
                        name={this.state.signUpUserPasswordInputName}
                        placeholder={this.state.loginUserPasswordInputPlaceHolder}
                        onChange={this.handleInputChange}
                        type={"password"}

                    />
                    <input
                        placeholder={this.state.loginUserPasswordInputPlaceHolder}
                        type={"password"}

                    />
                    <p>
                        {this.state.forgetPasswordText}
                    </p>

                    <button
                        onClick={()=>{this.signUp()}}
                    >
                        {this.state.signUpText}
                    </button>

                </div>


                <div
                    className={"loginSignUpDiv"}
                >
                    <span>{this.state.lowerInfoText}</span>
                    <span
                        id={"loginSignUpLink"}
                        onClick={()=>{this.props.updateChoice("login")}}
                    >{this.state.lowerInfoLink}</span>
                </div>



            </div>
        );
    }

}

export default SignupPage

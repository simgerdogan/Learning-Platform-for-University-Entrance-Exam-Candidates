
import React,{Component} from "react"
import firebase from "firebase";
import {auth} from "../../../../firebase";
import {axiosGet} from "../../../../CommonFunctions/axiosGet";
import {axiosPost} from "../../../../CommonFunctions/axiosPost";

class LoginPage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            welcomePageTitle:"Hoş Geldin",
            loginUserMailInputPlaceHolder : "E-posta Adresin",
            loginUserMailInputName:"userMail",
            loginUserPasswordInputPlaceHolder : "Şifren",
            loginUserPasswordInputName:"userPassword",
            forgetPasswordText:"Şifremi Unuttum",
            loginText : "Giriş Yap",
            socialMediaLoginText:"Sosyal Medya Hesaplarınla kayıt olmadan Giriş yapabilirsin",
            lowerInfoText : "İlk defa mı geliyorsun ? Kolayca ",
            lowerInfoLink:"Üye Ol",
            socialMediaIconsPath:"./visuals/icons/socialMediaIcons/",
            googleIconName :"google.png",
            facebookIconName : "facebook.png",
            twitterIconName :"twitter.png",
            userMail :"",
            userPassword:"",
            error:"",
            testEmail : "",
            testPassword : ""
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.loginError = this.loginError.bind(this)
    }

    handleInputChange(event)
    {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
        [name]:value
        })
    }

    loginError(error)
    {
        let errorMessage ;
        switch (error) {

            case "auth/invalid-email":
                errorMessage = "Mail Adresini Doğru Biçimlendirilmemiş !"
                break;
            case "auth/user-not-found":
                errorMessage = "Hatalı Mail veya Şifre !"
                break;
            case "auth/user-cancelled":
                errorMessage="";
                 break;
            default:
                errorMessage = error;

        }

        this.setState({
            error:errorMessage
        })

    }

    async login(loginType)
    {
        let provider = null ;
        switch (loginType)
        {
            case "google":
                provider = new firebase.auth.GoogleAuthProvider();
                break;
            case "twitter":
                provider = new firebase.auth.TwitterAuthProvider();
                break;
            case "facebook":
                provider = new firebase.auth.FacebookAuthProvider();
                break;
        }

        try
        {
            let user ;

            //if user decides to use provider check database if user exist or not
           if(provider != null)
           {
               console.log("proivder")
               user = await auth.signInWithPopup(provider)

           }
           else
           {
               user = await auth.signInWithEmailAndPassword(this.state.userMail,this.state.userPassword)
           }

           //console.log("user => " + JSON.stringify(user,null,2 ))
           //await axiosGet(`checkToken/${idToken}`)


            // let user= await auth.signInWithEmailAndPassword(this.state.userMail,this.state.userPassword);
           // let user = await auth.signInWithPopup(provider);
            //console.log("oki giridk" + JSON.stringify(user.user,null,2))
            window.location.href = "/"
        }
        catch (e) {
            //console.log("Error => " + JSON.stringify(e,null,2))

            this.loginError(e.code)

            setTimeout(()=>{
               this.loginError("")
            },3000)
            }
    }

    forgetPassword()
    {
        auth.sendPasswordResetEmail("melihcatal@gmail.com",{url:"http://localhost:3000/login"}).then(function() {
            // Email sent.
            alert("email is sent ! ")
        }).catch(function(error) {
            console.log("error => " + error)
            // An error happened.
        });
    }
    render() {
        return (
            <div
            className={"welcomePageRightDiv"}
            >
                <div
                className={"welcomePageRightTitleDiv"}
                >
                    <h4>
                        {this.state.welcomePageTitle}
                    </h4>
                </div>

                {this.state.error != "" &&

                <div
                    className={"welcomePageRightErrorDiv"}
                >
                    <h2>
                        {this.state.error}
                    </h2>

                </div>

                }


                <div
                    className={"welcomePageRightInputsDiv"}
                >
                    <input
                        name={this.state.loginUserMailInputName}
                         placeholder={this.state.loginUserMailInputPlaceHolder}
                        type="email"
                        onChange={this.handleInputChange}
                        defaultValue={this.state.testEmail}

                    />

                    <input
                        name={this.state.loginUserPasswordInputName}
                        onChange={this.handleInputChange}
                        type="password"
                        defaultValue={this.state.testPassword}
                    placeholder={this.state.loginUserPasswordInputPlaceHolder}
                    />
                    <p
                    onClick={this.forgetPassword}
                    >
                        {this.state.forgetPasswordText}
                    </p>

                    <button
                    onClick={()=>{this.login("regular")}}
                    >
                        {this.state.loginText}
                    </button>

                </div>

                <div
                className={"socialMediaLoginDiv"}
                >
                    <p>{this.state.socialMediaLoginText}</p>

                    <div
                    id={"socialMediaLoginIconsDiv"}
                    >
                        <img
                            src={this.state.socialMediaIconsPath+this.state.googleIconName}
                            onClick={()=>{this.login("google")}}

                        />
                        <img
                            src={this.state.socialMediaIconsPath+this.state.twitterIconName}
                            onClick={()=>{this.login("twitter")}}

                        />
                        <img
                            src={this.state.socialMediaIconsPath+this.state.facebookIconName}
                            onClick={()=>{this.login("facebook")}}

                        />
                    </div>
                </div>

                <div
                className={"loginSignUpDiv"}
                >
                    <span>{this.state.lowerInfoText}</span>
                    <span
                        id={"loginSignUpLink"}
                        onClick={()=>{this.props.updateChoice("signup")}}
                    >{this.state.lowerInfoLink}</span>
                </div>
            </div>
        );
    }

}


export default LoginPage

import React, { Component, createContext } from "react";
import { auth } from "../firebase";
import {axiosGet} from "../CommonFunctions/axiosGet";
import {axiosPost} from "../CommonFunctions/axiosPost";

export const UserContext = createContext();
export const UserConsumer = UserContext.Consumer

class UserProvider extends Component {

    static takeCurrentUser()
    {

        return new Promise((resolve,reject)=> {
            try {

                    resolve(auth.currentUser)

            }
            catch (e) {
                reject(e);
            }

        });
    }

    constructor(props) {
        super(props);
        this.state = {
            user :"",
            isLoaded:false
        }
    }

    componentDidMount() {

    auth.onAuthStateChanged(async (userAuth) => {

        //console.log("user auth => " + JSON.stringify(userAuth,null,2))
        //user is log out
        if(userAuth == null)
        {
            this.setState({
                //user:userAuth,
                user:userAuth,
                isLoaded:true
            })
            await axiosGet("userLogout")
        }
        else
        {
            if(userAuth.providerData)
            {
                const userExist = await axiosGet(`userExist/${userAuth.uid}`)

                if(!userExist)
                {
                    const userInformation = {
                        uid:userAuth.uid,
                        name : userAuth.displayName,
                        surname:"",
                        email:userAuth.email,
                        profilePhotoLink : userAuth.photoURL
                    }
                    await axiosPost("newUser",userInformation)
                }
            }

            const idToken = await auth.currentUser.getIdToken(true)
            await axiosGet(`checkToken/${idToken}`)
            const user = await axiosGet("getUserInfo");
            this.setState({
                user:user.userInfo,
                isLoaded:true
            })

        }




    });

    }


    render()
{
        return (
            <UserContext.Provider value={this.state}>
                {this.state.isLoaded && this.props.children}
            </UserContext.Provider>
        );
    }
}

export  {UserProvider};

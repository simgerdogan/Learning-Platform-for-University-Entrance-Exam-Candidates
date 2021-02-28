import React,{Component} from "react"
import "./HeaderStyle.css"
import {UserContext, userContext} from "../Contexts/UserProvider"
import HeaderSearch from "./HeaderComponents/HeaderSearch";
import HeaderNavigations from "./HeaderComponents/HeaderNavigations";
import HeaderNewQuestion from "./HeaderComponents/HeaderNewQuestion";
import HeaderProfilePhoto from "./HeaderComponents/HeaderProfilePhoto";
import HeaderLogo from "./HeaderComponents/HeaderLogo";

class Header extends Component
{
    static contextType = UserContext

    constructor(props) {
        super(props);


        this.state =
            {

                navigationIconsPath:"../visuals/icons/headerIcons/",
                navigations:
                    [
                        {title:"Soru Sor",
                        iconName:"plus.png",
                            href : "/newQuestion"
                    },
                    {title:"Denemeler",
                        iconName:"exam.png",
                        href:"/mocks"
                    },
                        {title:"Bize Ulaş",
                            iconName:"mail.png",
                            href:"/reach"
                        },
                        {title:" Sorular",
                            iconName:"writing.png",
                            href:"/questions"
                        },
                        {title:" Kullanıcılar",
                            iconName:"users.png",
                            href:"/users"
                        },
                        {title:" Çıkış Yap",
                            iconName:"logout.png",
                            href:""
                        }

                  ],
                user: ""
            }
    }

    //TODO this props of header profile photo need to be taken from context


    componentWillMount() {

        //TODO This method should be updated

        //console.log("context => " + JSON.stringify(this.context,null,2))
        this.setState({
            user:this.context.user,
            isLoaded:this.context.isLoaded
        })

    }

    render() {
        return (
            this.state.user ?
            <div
                id={"headerDiv"}
            >
                <HeaderLogo/>
                <HeaderSearch/>

                {
                    this.state.navigations.map( (navigation,index )=>
                        (
                            index == 0 ?

                                <HeaderNewQuestion
                                    iconSource={this.state.navigationIconsPath+navigation.iconName}
                                    title ={navigation.title}
                                />
                            :
                            <HeaderNavigations
                               iconSource={this.state.navigationIconsPath+navigation.iconName}
                               title ={navigation.title}
                               href = {navigation.href}
                            />
                    ))
                }

                <HeaderProfilePhoto
                displayName = {this.state.user.name}
                profilePhotoUrl = {this.state.user.profilePhotoLink}
                />

            </div> :
                <div></div>
        );
    }

}

export default Header

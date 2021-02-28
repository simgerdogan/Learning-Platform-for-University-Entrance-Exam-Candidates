import React,{Component} from "react"
import ProfilePageInfo from "./ProfilePageComponents/ProfilePageInfo/ProfilePageInfo";
import ProfilePageVector from "./ProfilePageComponents/ProfilePageVector/ProfilePageVector";
import "./ProfilePageStyle.css"
import {axiosGet} from "../CommonFunctions/axiosGet";

class ProfilePage extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            isLoaded:false
        }

        this.getProfileData = this.getProfileData.bind(this)
    }

   async getProfileData()
    {
        const endPoint = "getUserInfo"
        const results = await axiosGet(endPoint)
        console.log("results =>  " + JSON.stringify(results,null,2))

        const numData = [
            {
                title:"Takip",
                data : results.userInfo.following.length
            },
            {
                title:"Takipçi",
                data : results.userInfo.followers.length
            },
            {
                title:"Soru",
                data : results.userInfo.askedQuestions.length
            }

        ]

        const questionsData = [
            {
                title:"Sorduğun Sorular",
                data : results.askedQuestions
            },
            {
                title: "Kaydettiğin Sorular",
                data :results.savedQuestions
            },
            {
                title : "Son Baktıkların",
                data :results.viewedQuestions
            }
        ]

        this.setState({
            numData:numData,
            questionsData:questionsData,
            isLoaded: true
        })
    }

    componentWillMount() {
        this.getProfileData()
    }


    render() {
        return (
            <div
              id={"profilePageDiv"}
            >
                <ProfilePageVector/>
                <ProfilePageInfo
                data = {this.state}
                />
            </div>
        );
    }
}

export default ProfilePage

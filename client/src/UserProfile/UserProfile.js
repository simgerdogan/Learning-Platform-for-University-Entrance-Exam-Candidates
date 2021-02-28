import React,{Component} from "react"
import "./UserProfileStyle.css"
import Loading from "../Loading/Loading";
import UserInfoTab from "./UserProfileComponents/UserInfoTab";
import UserProfileQuestions from "./UserProfileComponents/UserProfileQuestions";
import {axiosGet} from "../CommonFunctions/axiosGet";
import UserQuestionItem from "./UserProfileComponents/UserQuestionItem";
import {UserContext} from "../Contexts/UserProvider";

class UserProfile extends Component{

    static contextType = UserContext

    constructor(props) {
        super(props);
        this.state = {
            isLoaded:false,
            user :null,
            currentUser : ""
        }

        this.getUserInfo = this.getUserInfo.bind(this)
    }

    async getUserInfo()
    {
        const userId = this.props.match.params.id
        const userData = await axiosGet(`getUserProfile/${userId}`)

        const askedQuestions = userData[0].questionInfo

        console.log("asked questions => " + JSON.stringify(askedQuestions,null,2))

        let questionItems = []
        askedQuestions.map(question => (
            questionItems.push(<UserQuestionItem
                questionId = {question.questionId}
                questionImage = {question.imageLink}
            />)
        ))


        this.setState({
            user : userData[0],
            isLoaded:true,
            askedQuestions:questionItems,
            currentUser:this.context.user,

        })
    }

    componentWillMount() {
        this.getUserInfo()
    }

    render() {
        return (
            this.state.isLoaded ?
            <div
            id={"userProfileDiv"}
            >
                <UserInfoTab
                followers = {this.state.user.followers.length}
                following = {this.state.user.following.length}
                isFollowing = {this.state.currentUser.following.includes(this.state.user.uid)}
                name = {this.state.user.name}
                profileImage = {this.state.user.profilePhotoLink}
                questions = {this.state.user.askedQuestions.length}
                userId = {this.state.user.uid}
                />
                <div
                id={"profileQuestionsDiv"}
                >
                    <UserProfileQuestions
                    >
                        {this.state.askedQuestions}
                    </UserProfileQuestions>
                </div>

            </div>
                :
                <Loading/>
        );
    }
}

export default UserProfile

import React, {Component} from "react"
import Header from "../Header/Header";
import NewQuestionComponent from "./NewQuestionComponents/NewQuestionComponent";
import "./NewQuestionStyle.css"
import {UserContext} from "../Contexts/UserProvider";
import firebase from "firebase";
import axios from "axios";
import Loading from "../Loading/Loading";
import {uploadFile} from "../CommonFunctions/uploadFile";
import {axiosPost} from "../CommonFunctions/axiosPost";

class NewQuestion extends Component
{

    static contextType = UserContext

    constructor(props) {
        super(props);

        this.state = {

            questionUploading:false,
            uploadError:false,
            uploadDone  : false,
            imageUploaded : false,
            editUploaded :false,
            lecture :"Turkce"


        }

        this.updateDetails = this.updateDetails.bind(this)
        this.shareQuestion = this.shareQuestion.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
        this.setLoaded = this.setLoaded.bind(this)
    }

    componentWillMount() {

        //TODO This method should be updated


        this.setState({
            user:this.context.user,
            isLoaded:this.context.isLoaded
        })

    }


    async uploadImage()
    {
        //let fileId = this.state.user.uid + Date.now()

       const uploadInfo = await uploadFile(this.state.user.uid,"question",this.state.file,this.state.fileType)

        this.setState({
            imageId : uploadInfo.fileId,
            imageLink : uploadInfo.fileLink
        })


    }

    async uploadQuestionInfo()
    {
        const questionData = {
            imageId : this.state.imageId,
            imageLink : this.state.imageLink,
            imageContent : this.state.imageContent,
            lecture : this.state.lecture,
            subject : "Türev",
            correctAnswer : this.state.correctAnswer != null ? this.state.correctAnswer : "Bilinmiyor",
            description: this.state.questionExplanation != null ? this.state.questionExplanation : "Açıklama Yapılmamış",
            answers:[]
        }

        await axiosPost("newQuestion", questionData)

    }

    //TODO keep track of possible errors
    //TODO make a loading page
   async shareQuestion()
    {

        this.setState({
            questionUploading : true
        })
        try
        {        await this.uploadImage();
                 await this.uploadQuestionInfo();


        }
        catch (e) {

            this.setState({
                uploadError : true,
                uploadDone  : true
            })
        }

        this.setState({
            questionUploading:false,
            uploadDone  : true


        })
    }

    updateDetails(detail)
    {

        detail.forEach(currentDetail => {
            this.setState({
                [currentDetail.title]:currentDetail.data
            })
        })

    }

    setLoaded(isLoaded)
    {
        this.setState({
            isLoaded : isLoaded
        })

    }



    render() {
        return(

            this.state.isLoaded ?

            <div
            >
                <div
                    id={"newQuestionDiv"}
                >
                    <NewQuestionComponent
                        contentType={"uploadImage"}
                        updateDetails = {this.updateDetails}
                        disabled = {this.state.uploadDone || this.state.questionUploading}
                        setLoaded = {this.setLoaded}
                        imageUploaded = {this.state.imageUploaded}

                    />
                    <NewQuestionComponent
                        contentType={"editDetails"}
                        updateDetails = {this.updateDetails}
                        disabled = {!(this.state.imageUploaded || this.state.file)}
                        lecture = {this.state.lecture}


                    />
                    <NewQuestionComponent
                        contentType = {"summary"}
                        details = {this.state}
                        disabled={ !(this.state.file) && !(this.state.correctAnswer  || this.state.questionExplanation)}
                        shareQuestion = {this.shareQuestion}
                        lecture = {this.state.lecture}

                    />


                </div>

            </div> : <Loading/>
        )
    }
}

export default NewQuestion

import React,{Component} from "react"
import axios from "axios"
import Dropzone from "react-dropzone";
import firebase from "../../firebase";
import Loading from "../../Loading/Loading";
import Status from "../../Status/Status";
import {axiosPost} from "../../CommonFunctions/axiosPost";
import * as tf from '@tensorflow/tfjs';

class NewQuestionComponent extends Component
{

    constructor(props) {
        super(props);

        this.state =
            {
                title:"",
                uploadImageIconPath :"./visuals/icons/otherIcons/uploadImageIcon.png",
                uploadImageSuccessIconPath : "./visuals/icons/otherIcons/success.png",
                uploadImageFailIconPath :"./visuals/icons/otherIcons/fail.png",
                dragImageTitle : "Görseli Buraya Sürükle",
                contentType:"uploadMedia",
                photoFile:"",
                photoUploaded:false,
                photoUploadError : false,
                imageToTextLoaded : false,
                lecture : "Matematik",
                subject : "Türev",
                isLoaded:true

            }

            this.fileReceived = this.fileReceived.bind(this)
            this.reloadUpload = this.reloadUpload.bind(this)
            this.insertDetails = this.insertDetails.bind(this)
    }

    componentDidMount() {

        let currentTitle ;


        switch (this.props.contentType) {
            case "uploadImage":
                currentTitle = "Soru Görseli Yükle"
                break
            case "editDetails":
                currentTitle = "Soruyu Düzenle"
                break
            case "summary":
                currentTitle = "Soruyu Önizle"
                break

        }

        this.setState({
            title: currentTitle
        })

    }

    fileReceived(acceptedFile)
    {

        try{
            console.log("file received")

            const reader = new FileReader()
            const fileType = acceptedFile[0].path.split(".")[1]

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')

            reader.onload = async () => {
                // Do whatever you want with the file contents
                const blobUrl = reader.result

             //console.log("blob befo => " + blobUrl)

                const content  = blobUrl.substr(blobUrl.indexOf(',')+1)
               // console.log("blob after => " + )

                this.props.setLoaded(false)
                const imageText = await axiosPost("imageToText",{content})
                console.log("image text => " + imageText)

                const category = await axiosPost("imageCategory",{imageText})


                this.props.setLoaded(true)
                const data = {
                    file:content
                }



            const imageInfos = [{
                title:"imageBlob",
                data:blobUrl
            },
                {
                    title:"imageContent",
                    data:content
                }
,
                {
                    title:"file",
                    data:acceptedFile[0]
                },
                {
                    title: "imageUploaded",
                    data: true
                },
                {
                    title :"fileType",
                    data : fileType
                },
                {
                    title :"lecture",
                    data : category
                }
            ]
                this.props.updateDetails(imageInfos)

                this.setState({
                    file:acceptedFile,
                    photoUploaded : true,
                    photoUploadError : !(acceptedFile.length == 1)
                })
            }

            reader.readAsDataURL(acceptedFile[0])
        }
        catch (e) {

            this.setState({
                photoUploaded : true,
                photoUploadError : !(acceptedFile.length == 1)

            })

        }




    }


    insertDetails(event)
    {
        const value = event.target.value;
        const name = event.target.name;

        this.props.updateDetails([{
            title : name,
            data : value

        }])


    }

    reloadUpload()
    {
        this.setState({
            photoUploaded:false
        })

        this.props.updateDetails([{
            title : "imageUploaded" ,
            data :false

        },
            {
                title : "file",
                data: null
            }])
    }




    render() {


        let contentDiv ;

        switch (this.props.contentType) {
            //TODO should catch error while uploading
            case "uploadImage":
                contentDiv = this.props.imageUploaded ?

                    <div
                        className={"newQuestionUploadImageDiv"}
                        id={"newQuestionUploadedDiv"}


                    >

                        <div
                            className={"newQuestionUploadImageDiv"}
                        >

                            <img
                                src={ this.props.photoUploadError ? this.state.uploadImageFailIconPath : this.state.uploadImageSuccessIconPath}
                            />

                            <h4>{  this.props.photoUploadError ? "Hata ! Lütfen 1 adet resim yüklediğinizden emin olun " : " Başarıyla Yüklendi"}</h4>
                        </div>

                        <div
                            className={"newQuestionUploadImageDiv"}
                            id={"newQuestionUploadSelectFromComputerDiv"}

                        >

                            <button
                            onClick={this.reloadUpload}
                            >Yeniden Yükle </button>
                        </div>



                    </div>

                    :
                    <Dropzone
                        disabled ={this.props.disabled}

                        onDrop={acceptedFiles => this.fileReceived(acceptedFiles)} maxFiles={1}   accept={'image/jpeg, image/png'}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()}   />
                                    <div
                                        className={"newQuestionUploadImageDiv"}
                                    >
                                        <img
                                            src={this.state.uploadImageIconPath}
                                        />

                                        <h4>{this.state.dragImageTitle}</h4>
                                    </div>

                                    <div
                                        className={"newQuestionUploadImageDiv"}
                                        id={"newQuestionUploadSelectFromComputerDiv"}

                                    >
                                        <p>Veya</p>
                                        <button>Bilgisayarından Seç</button>
                                    </div>
                                </div>
                            </section>
                        )}
                    </Dropzone>




                break

            case "editDetails" :

               contentDiv = <div
                className={"newQuestionInfoDiv"}
                disabled ={this.props.disabled}

                >
                 <div className={"newQuestionEditDiv"}>
                    <h4>Açıklama</h4>
                     <textarea
                     name={"questionExplanation"}
                     onChange={this.insertDetails}
                     maxLength={"61"}
                     ></textarea>
                 </div>

                   <div className={"newQuestionEditDiv"}>
                       <h4>Ders</h4>
                        <select
                        id={"lectureSelect"}
                        onChange={(event)=>{{this.props.updateDetails([{
                            title: "lecture",
                            data: event.target.value
                        } ])}}}
                        >
                            <option
                            value={"Matematik"}
                            selected={this.props.lecture == "Matematik" ? true : false}
                            >Matematik</option>
                            <option
                            value={"Fizik"}
                            selected={this.props.lecture == "Fizik" ? true : false}

                            >Fizik</option>
                            <option
                                selected={this.props.lecture == "Kimya" ? true : false}

                                value = {"Kimya"}

                            >Kimya</option>
                            <option
                            value ={"Biyoloji"}
                            selected={this.props.lecture == "Biyoloji" ? true : false}

                            >Biyoloji</option>
                            <option
                            value = {"Türkçe"}
                            selected={this.props.lecture == "Turkce" ? true : false}

                            >Türkçe</option>
                            <option
                            value = {"Geometri"}
                            selected={this.props.lecture == "Geometri" ? true : false}

                            >Geometri</option>
                            <option
                            value = {"Tarih"}
                            selected={this.props.lecture == "Tarih" ? true : false}

                            >Tarih</option>
                            <option
                                selected={this.props.lecture == "Cografya" ? true : false}

                                value ={"Coğrafya"}
                            >Coğrafya</option>

                        </select>
                   </div>


                   <div className={"newQuestionEditDiv"}>
                       <h4>Doğru Cevap</h4>

                       <input
                       name = {"correctAnswer"}
                       onInput={this.insertDetails}
                       />
                   </div>

                </div>
                break

            case "summary":
                contentDiv =
                    <div
                    className={"newQuestionInfoDiv"}

                    >
                        {
                            this.props.details.uploadDone ?
                                <Status
                                    isFail={    this.props.details.uploadError}
                                    title = {this.props.details.uploadError ? "Hata" : "Soru Yüklendi"}
                                    questionId = {this.props.details.imageId}
                                />
                            :
                            this.props.details.questionUploading ?
                                <Loading
                                    loadingTitle={this.props.details.loadingTitle}
                                />
                                :
                                <div>
                                    <div id={"newQuestionInfoImageDiv"}>
                                        {this.props.details.imageBlob ?
                                            <img
                                                src={this.props.details.imageBlob}
                                            />

                                            : <div

                                            >
                                                <img
                                                    style={{
                                                        width:"10%",
                                                        marginBottom:"3%"
                                                    }}
                                                    src={"./visuals/icons/otherIcons/information.png"}
                                                />

                                                <h2>Resim Yüklenmedi</h2>
                                            </div>
                                        }


                                    </div>

                                    <div className={"newQuestionEditDiv"}>
                                        <h4>Açıklama</h4>
                                        <h4>{this.props.details.questionExplanation }</h4>

                                    </div>

                                    <div className={"newQuestionEditDiv"}>
                                        <h4>Ders</h4>
                                        <h4>{this.props.lecture}</h4>
                                    </div>

                                    <div className={"newQuestionEditDiv"}>
                                        <h4>Doğru Cevap</h4>
                                        <h4>{this.props.details.correctAnswer}</h4>


                                    </div>


                                    <div
                                        className={"newQuestionEditButtonDiv"}
                                    >
                                        <button
                                            disabled={this.props.disabled}
                                            onClick={this.props.shareQuestion}
                                        >Paylaş</button>
                                    </div>

                                </div>
                        }
                </div>
                break



        }

        return(

                    <div
                id={"newQuestionComponentDiv"}

            >
                <div
                    id={"newQuestionComponentTitleDiv"}
                >
                    <h3>{this.state.title}</h3>
                    {
                        this.props.contentType == "uploadImage" &&
                        <p
                        onClick={()=>{this.props.updateDetails([{
                        title: "imageUploaded",
                            data: true
                        } ])}}
                        >Atla</p>

                    }
                </div>

                <div
                    id={"newQuestionComponentDataDiv"}
                >


                    {contentDiv}



                </div>
            </div>
        )



    }

}

export default NewQuestionComponent

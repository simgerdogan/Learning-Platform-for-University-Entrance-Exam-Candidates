
import React,{Component,useContext } from "react"
import {UserContext} from "./Contexts/UserProvider";
import {auth} from "./firebase";
import axios from "axios"
import firebase from "firebase";


class Deneme extends Component
{
    static contextType = UserContext

    constructor(props) {
        super(props);
        this.state ={
            user: "",
            isLoaded :false
        }

        this.uploadFile = this.uploadFile.bind(this)
        this.sendPhoto = this.sendPhoto.bind(this)
    }

    componentWillMount() {

        //TODO This method should be updated


        this.setState({
            user:this.context.user,
            isLoaded:this.context.isLoaded
        })

    }

    async logOut()
    {
        await auth.signOut()
        window.location.href = "/"
    }

      checkValidity()

     {

         let idToken;
         auth.currentUser.getIdToken(true).then(res => {
             idToken = res

             console.log("id token => " + idToken)

             axios.get(`http://localhost:161/checkToken/${idToken}`,{withCredentials:true}).then(res => {
                 console.log(res)
             })
             console.log(idToken);
         })

    }

    sendDatabase()
    {
        axios.get("http://localhost:161/deneme",{withCredentials:true}).then(res => {
            console.log(res)
        })
    }

    sendPhoto()
    {
        const storage =firebase.storage()
        const storageRef = storage.ref();

        console.log("state => " + JSON.stringify(this.state.user,null,2))

        let uniqueId = this.state.user.uid + Date.now()

        let imagesRef = storageRef.child(`${uniqueId}/question/${uniqueId}.jpg`);
        const uploadTask =  imagesRef.put(this.state.file)

        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function(error) {
            // Handle unsuccessful uploads
        }, async function() {

            await axios.post(`http://localhost:161/newQuestion/${uniqueId}`,{},{withCredentials:true})
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
            });
        });

    }

    uploadFile()
    {
        const input = document.getElementById("fileId")
        const file = input.files[0]
        console.log("file => " + file);
        this.setState({
            file : file
        })
    }

    render()
    {

        return(
            <div>
                <h2>{"context => " + this.context.isLoaded}</h2>
                <h2>{"state => " + this.state.isLoaded}</h2>
                <h2>{"context => " + this.context.user.email}</h2>
                <h2>{"state => " + this.state.user.email}</h2>
                <p>aq => {JSON.stringify(this.state.user,null,2)}</p>
                <p>{this.state.user.emailVerified ? "true" : "false"}</p>
                <img
                src={this.context.user.photoURL}
                />
                <button
                    onClick={this.logOut}
                >Log Out</button>

                <button
                    onClick={()=>{this.checkValidity()}}
                >
                    Check Validity
                </button>
                <input
                type={"file"}
                id={"fileId"}
                onChange={()=>{this.uploadFile()}}
                />
                <button
                    onClick={this.sendDatabase}
                >
                    database
                </button>

                <button
                onClick={this.sendPhoto}
                >
                    Send photo
                </button>
            </div>
        )

    }
}

export default  Deneme

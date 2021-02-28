import React, {useState} from "react"
import Dropzone from "react-dropzone";


function fileReceived(acceptedFile,setUploaded,setFile,setFileType) {


    try {

        const fileType = acceptedFile[0].path.split(".")[1]
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')

        reader.onload = () => {


        const blobUrl = reader.result

        const content = blobUrl.substr(blobUrl.indexOf(',') + 1)

        const data = {
            file: content
        }
            setUploaded(true)
            setFile(acceptedFile[0])
            setFileType(fileType)

        }

        reader.readAsDataURL(acceptedFile[0])
    }
    catch (e) {
    }




}

function AnswerMedia(props) {
    const uploadImageIconPath ="../visuals/icons/otherIcons/uploadImageIcon.png"

    const[isUploaded,setUploaded] = useState(false);

    return(
        isUploaded ?
        <div>
            <h3>Yüklendi</h3>

        </div>
        :

       <Dropzone

           onDrop={acceptedFiles => fileReceived(acceptedFiles,setUploaded,props.setFile,props.setFileType)} maxFiles={1}   accept={'image/jpeg, .mp3,audio/*, image/png'}>
           {({getRootProps, getInputProps}) => (
               <section>
                   <div {...getRootProps()}
                        id={"newAnswerMedia"}

                   >
                       <input {...getInputProps()}   />
                       <div

                       >
                           <img
                           src={uploadImageIconPath}
                           />

                           <h4>Görselini veya Ses Kaydını Buraya Sürükle</h4>
                       </div>

                   </div>
               </section>
           )}
       </Dropzone>
   )

}
export default  AnswerMedia

import firebase from "firebase";

export function uploadFile(userId , folderName, file, fileType,questionId)
{

    return new Promise((resolve, reject) => {

        let that = this

        const storage =firebase.storage()
        const storageRef = storage.ref();


        let fileId = userId + Date.now()

        let fileRef =  storageRef.child(`/questions/${folderName=="question"? fileId :   questionId}/${folderName}/${fileId}.${fileType}`);
        const uploadTask =  fileRef.put(file)

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
                reject(error)
                // Handle unsuccessful uploads
            }, ()=>{

                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);

                    const uploadInfo = {

                        fileId:fileId,
                        fileLink : downloadURL
                    }

                    resolve(uploadInfo)

                });


            }

        )
    })

}

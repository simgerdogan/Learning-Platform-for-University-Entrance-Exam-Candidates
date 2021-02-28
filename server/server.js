const express = require("express")
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./firebaseServerAccountKey");
const app = express()
const session = require("express-session")
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const { spawn } = require('child_process');
const axios = require("axios")
const vision = require("@google-cloud/vision")
// Imports the Google Cloud AutoML library
const automl = require('@google-cloud/automl').v1;
const mongo = require("mongodb")
const MongoClient = require('mongodb').MongoClient;
const mongoDbUrl = "mongodb://localhost:27017/";

process.env.GOOGLE_APPLICATION_CREDENTIALS = './newServiceAccountKey.json'
//process.env.PROJECT_ID = "third-index-292416"
const projectId = 'third-index-292416';
const location = 'us-central1';



const databaseName ="simel"

app.use(bodyParser.urlencoded({
    extended: true,
    limit:'50mb'
}));

app.use(bodyParser.json({
    limit:'50mb'
}));



//use cors in order to prevent cors errors
app.use(cors({
    credentials: true,
    origin:"http://localhost:3000"
}));


app.use(cookieParser(process.env.SESSIONSECRET)); // any string ex: 'keyboard cat'

app.use(session({
    secret: 'secret-key',
    cookie:{
        maxAge: 100 * 86400000,
        httpOnly:false,
        secure:false // for normal http connection if https is there we have to set it to true
    },
    resave: false,
    saveUninitialized: true
}))

const port = 160

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://soru-cozum-dc062.firebaseio.com"
});

app.listen(port,()=>{
    console.log("server is running")
})


function checkAuthentication(token)
{
    return new Promise((resolve, reject) => {
        admin.auth().verifyIdToken(token)
            .then(user => {
                resolve(user)

            }).catch(e =>{
                reject(e)
        });

    })
}

app.get('/checkToken/:token',async (req,res)=>{

    let token = req.params.token
    const user = await checkAuthentication(token)

    req.session.user = {uid : user.uid}
    res.send("done")
    console.log("session id => " + JSON.stringify(req.session.id,null,2))


})



app.post('/newUser', async (req,res)=>{

    console.log("new user geldik => " + JSON.stringify(req.body,null,2))

    const user = req.body.userInformation ? req.body.userInformation : req.body.data


    const userData = {
        _id:user.uid,
        uid: user.uid,
        email: user.email,
        name: user.name,
        surname:user.surname,
        askedQuestions:[],
        followers:[],
        following:[],
        savedQuestions:[],
        profilePhotoLink:user.profilePhotoLink ? user.profilePhotoLink : "",
        level : 0,
        viewedQuestions:[]

    }

    insertDatabase("users",userData).then(respond => {
        res.send("User Uploaded")
    }).catch(e => {
        res.send("error")
    })


        res.send("oki")


})




//TODO this api will be replaced with getProfileInformation in order to receive profile details
app.get('/getUserInfo',async (req,res)=>{

    console.log("user info req => " + JSON.stringify(req.session,null,2))
    const userInfo = await getInfoDatabase("users",req.session.user.uid);
    const askedQuestions = await getAllData("questions","totalView",-1,0,{questionId:{$in:userInfo.askedQuestions}});
    const viewedQuestions = await getAllData("questions","totalView",-1,0,{questionId:{$in:userInfo.viewedQuestions}});
    const savedQuestions =  await getAllData("questions","totalView",-1,0,{questionId:{$in:userInfo.savedQuestions}});

    const result = {
        userInfo :userInfo,
        askedQuestions:askedQuestions,
        viewedQuestions:viewedQuestions,
        savedQuestions:savedQuestions
    }

    res.send(result)

})

//TODO endpoint will be updated for each possible userdefined profile information
//Endpoint which allows user to update his/her information
app.post('/updateUserInformation',async (req,res)=>{

    const userId = req.session.user.uid
    const data = req.body.data

    //TODO this arrayname is hardcoded now.
    await updateDatabaseArray("users","savedQuestions",userId,data,"push");

    res.send("oki")


})


//TODO this function should be updated accordinly $set
function increaseDatabaseValue(collectionName,id,fieldName,increaseBy)
{
    return new Promise(async (resolve, reject) => {

        try {

            const databaseConnection = await connectDatabase();
            const database = databaseConnection.db("simel");

            database.collection(collectionName).update({_id : id},{
                $inc:{[fieldName]:increaseBy
                }
            })

            resolve("done")

        }
        catch (e) {
            reject(e)
        }


    })
}

app.get('/updateView/:questionId',async (req,res)=>{

    const questionId = req.params.questionId
    const userId = req.session.user.uid

    await increaseDatabaseValue("questions",questionId,"totalView",1);

    await updateDatabaseArray("users","viewedQuestions",userId,questionId,"addToSet")


    res.send("updated")

})


//TODO have to make category prediction
function predictCategory()
{
    return new Promise((resolve, reject) => {

        try{
            const ENDPOINT_ID="7364968687494758400"
           const  PROJECT_ID="384780124508"

            const textData = "antikor nerede olur vücutta."
            const request = {
                "payload": {
                    "textSnippet": {
                        "content": textData,
                        "mime_type": "text/plain"
                    }
                }
            }

            axios.post(`https://us-central1-prediction-aiplatform.googleapis.com/v1alpha1/projects/${PROJECT_ID}/locations/us-central1/endpoints/${ENDPOINT_ID}:predict
`,{
                "instances": [
                    { sample_key: "sample_value "}
        ]
        },{
                headers:{
                    'Authorization':  `Bearer $(gcloud auth application-default print-access-token)`,
                    'Content-Type': "application/json"
                }
            }).then(res => {
                console.log("category => " + JSON.stringify(res.data))
                resolve("oki")
            }).catch(e => {
                console.log(" ml hata => " + e )
                //reject(e)

            })
        }
        catch (e) {
            reject(e)
        }

    })
}
const aiplatform = require('@google-cloud/aiplatform');
const {
    instance,
    params,
    prediction,
} = aiplatform.protos.google.cloud.aiplatform.v1beta1.schema.predict;

// Imports the Google Cloud Prediction Service Client library
const {PredictionServiceClient} = aiplatform;

// Specifies the location of the api endpoint
const clientOptions = {
    apiEndpoint: 'us-central1-prediction-aiplatform.googleapis.com',
};

// Instantiates a client
const predictionServiceClient = new PredictionServiceClient(clientOptions);

 function predict(imageText) {

    return new Promise(async (resolve, reject) => {
        const endpointId = "7364968687494758400"

        const endpoint = `projects/${projectId}/locations/${location}/endpoints/${endpointId}`;


        const instanceObj = new instance.TextClassificationPredictionInstance({
            content :imageText
        })
        const instanceValue = instanceObj.toValue();

        const instances = [instanceValue];
        const request = {
            endpoint,
            instances
        };

        // Predict request
        const [response] = await predictionServiceClient.predict(request);

        console.log('Predict text classification response');
        console.log(`\tDeployed model id : ${response.deployedModelId}`);
        const predictions = response.predictions;

        console.log('\tPredictions :');

        let detectedLecture = "Turkce"
        let confidenceLevel = 0;

        for (const predictionValue of predictions) {
            const predictionResultObj = prediction.ClassificationPredictionResult.fromValue(
                predictionValue
            );
            for (const [i, label] of predictionResultObj.displayNames.entries()) {
                const currentConfidence = predictionResultObj.confidences[i]
                const currentLecture = label
                console.log(`\tDisplay name: ${label}`);
                console.log(`\tConfidences: ${predictionResultObj.confidences[i]}`);


                if(currentConfidence > confidenceLevel)
                {
                    detectedLecture = currentLecture
                    confidenceLevel = currentConfidence
                }
            }
        }

        resolve(detectedLecture)
    })




}

app.post("/imageCategory",async (req,res)=>{

    const imageText = req.body.data.imageText

    const result = await predict(imageText)

    res.send(result)

})

function imageToText(imageData)
{
    return new Promise(async (resolve, reject) => {

        try {
            const data = imageData
            const client = new vision.ImageAnnotatorClient();
            const request = {
                image: {
                    content: data
                }
            };
            // Performs label detection on the image file
            const [result] = await client.textDetection(request);
            const text = result.fullTextAnnotation.text.replace('-','')

            resolve(text)

        }
        catch (e) {
            reject(e)
        }



    })
}

function connectDatabase()
{
    return new Promise((resolve, reject) => {

        //this is hardcoded database name
        const databaseName  = "simel";

        try {
            MongoClient.connect(mongoDbUrl,(err,database)=>
            {
                const databaseObject = database.db(databaseName);
                resolve(database);
            })

        }
        catch (e) {
            reject(e);
        }


    })
}

function insertDatabase(collectionName, data)
{
    return new Promise(async (resolve, reject) =>{
        try {
            const databaseConnection = await connectDatabase();
            const database = databaseConnection.db("simel");

            database.collection(collectionName).insertOne(data,(error,response)=>{
                if(error)
                {
                    console.log("Error during question insertion")
                    reject("error")
                }
                else
                {
                    console.log("inserted")
                    resolve("Uploaded")

                }
            })

        }
        catch (e) {
            reject(e)
        }

    } )
}



function getInfoDatabase(collectionName,id)
{
    return new Promise(async (resolve, reject) => {

        const databaseConnection = await connectDatabase();
        const database = databaseConnection.db("simel");
        database.collection(collectionName).findOne({_id : id},function (err,result){
            if(err) throw reject("error from getting info database");

            databaseConnection.close()
            resolve(result)
        })
    })

}

function getAllData(collectionName,sortField,sortBy,limit,condition,projection={})
{
    return new Promise(async (resolve, reject) => {

        console.log("proje => " + JSON.stringify(projection,null,2))
        const databaseConnection = await connectDatabase();
        const database = databaseConnection.db("simel");



        const result =await database.collection(collectionName).find(condition).project(projection).sort({[sortField]: sortBy}).limit(limit).toArray()
        databaseConnection.close()
        resolve(result)
    })
}

function updateDatabaseArray(collectionName, arrayName,id,data,updateType)
{
    return new Promise(async (resolve, reject) => {

        try {

            const databaseConnection = await connectDatabase();
            const database = databaseConnection.db("simel");
            const updateOperation = '$'+ updateType
            const operation = {

               [updateOperation]:{[arrayName]:data }

            }
            database.collection(collectionName).update({_id : id},
                operation
            )
            resolve("done")
        }
        catch (e) {
            reject(e)
        }
    })
}

app.post("/imageToText",async(req,res)=>{

    const content = req.body.data.content

    const result = await imageToText(content)

    res.send(result)
})

//TODO we have to surrond with try and catches
app.post("/newQuestion", async (req,res)=>{

    try {
        const imageData = req.body.data


        const userId =  req.session.user.uid

        const imageId = imageData.imageId


        //image to text if image is proiveded else description is question text
        const imageText = imageData.imageContent ? await imageToText(imageData.imageContent):imageData.description

        const questionData = {
            _id:imageId,
            questionId : imageId,
            imageText : imageText,
            askedBy : userId,
            askedTime : Date.now(),
            lecture : imageData.lecture,
            subject : imageData.subject  ,
            totalView : 0,
            isAnswered : false,
            correctAnswer :imageData.correctAnswer,
            description:imageData.description,
            imageLink : imageData.imageLink,
            answers:[]
        }

        await insertDatabase("questions",questionData);

        await updateDatabaseArray("users","askedQuestions",userId,imageId,"push");

        res.send("Uploaded")


    }
    catch (e) {
        console.log("hata => " +e)
        res.send("error")
    }


})

app.get("/searchQuestion/:text",async (req,res)=>{

    //connect to database
    const databaseConnection = await connectDatabase();
    //select database
    const database = databaseConnection.db("simel");
    //search ınput
    const text = req.params.text;
    //divide with white spaces because each new word needs to be new regex
    const textArray = text.split(" ");
    let regexArray = [];

    //create regex array for each word
    textArray.map(currentText => {
        regexArray.push( new RegExp(currentText,'i') )
    })

    //search in the imageText and send the results back
    database.collection("questions").find({"imageText" :
            {
                $all:regexArray
            }
    }).toArray(function(err, result) {
        if (err) throw err;
        databaseConnection.close();
        res.send(result)

    })

})

function getElapsedTime(askedTime)
{
    return new Promise((resolve, reject) => {
        const currentTime = Date.now();
        const oneHourMs = 3600000

        const elapsedTime = currentTime - askedTime;
        const elapsedHour = elapsedTime / oneHourMs

        let result  = Math.round(elapsedHour) + " s"
        console.log("elapsed hour => " + elapsedHour)
        if(elapsedHour > 24)
        {
            result = Math.round(elapsedHour % 24)  + " g"
        }
        else if (elapsedHour > 0.016 && elapsedHour < 1)
        {
            result = Math.round(elapsedHour * 60)  + " dk"

        }
        else if (elapsedHour <= 0.016)
        {
            result = Math.round(elapsedHour*3600) + " sn"

        }

        resolve(result)


    })
}

app.get("/timeTest",async (req,res)=>{




    res.send("oki")

})

app.get("/questionDetails/:id",async (req,res)=>{

    const questionId = req.params.id;
    const questionInfo = await getInfoDatabase("questions",questionId);
    const elapsedTime =  await getElapsedTime(questionInfo.askedTime)
    const askedByInfo = await  getInfoDatabase("users",questionInfo.askedBy)


    const results = {
        questionInfo : questionInfo,
        elapsedTime : elapsedTime,
        askedByInfo:askedByInfo
    }
    res.send(results)


})

app.post("/newAnswer",async(req,res)=>{

     const data = req.body.data;
     try
     {
         await updateDatabaseArray("questions","answers",data.questionId,data,"push");

         res.send("uploaded")
     }
     catch (e) {
         res.send("error")
     }

})



app.post("/reachUs", async(req,res)=>{

    const data = req.body.data
    const userId =  req.session.user.uid

    data["sendBy"] = userId;
    data["isResolved"] = false;
    data["sendTime"]= Date.now()

    try
    {
        await insertDatabase("reachUs",data)

    }
    catch (e) {
        res.send("error")
    }

})

app.get("/dataTest",async (req,res)=>{

    const recommendedQuestionsIds = await getDistinctData("users","viewedQuestions",{level:0})

    const results = await getAllData("questions","totalView",-1,20,{questionId:{$in:recommendedQuestionsIds}});


    res.send(results)
})



function getDistinctData(collectionName,distinctField,condition)
{
    return new Promise(async (resolve, reject) => {
        console.log(collectionName,distinctField,condition)
        try
        {
            const databaseConnection = await connectDatabase();
            const database = databaseConnection.db(databaseName);
            const results =await database.collection(collectionName).distinct(distinctField,condition)

            resolve(results)
        }
        catch (e) {
            reject(e)
        }


    })
}



app.get("/getAllData/:collection",async (req,res)=>{

    const collectionName = req.params.collection
    const userId = req.session.user.uid

    const userInfo = await getInfoDatabase("users",userId)

    const userLevel = userInfo.level

    //get newest 20 questions
    const newQuestions = await getAllData(collectionName,"askedTime",-1,20,{});

    //get questions from same cluster
    const recommendedQuestionsIds = await getDistinctData("users","viewedQuestions",{level:userLevel})

    let recommendedQuestions = await getAllData("questions","totalView",-1,20,{$and:[{ questionId:{$in:recommendedQuestionsIds}},{askedBy:{$ne:userId}}]});


    //get top questions of the day
    const nowMs = Date.now()
    const dayMs = 24 * 3600000;
    const weekMs = 7 * dayMs
    const fromDayMs = nowMs - dayMs;
    const fromWeekMs = nowMs - weekMs;

    const topQuestionsToday = await getAllData(collectionName,"totalView",-1,20,{ askedTime: { $gte: fromDayMs } });

    //get top questions of the week
    const topQuestionsWeek = await getAllData(collectionName,"totalView",-1,20,{ askedTime: { $gte: fromWeekMs } });

    const data = {
        newQuestions : newQuestions,
        topQuestionsToday : topQuestionsToday,
        topQuestionsWeek : topQuestionsWeek,
        recommendedQuestions : recommendedQuestions
    }

    res.send(data);
})

app.get("/searchUsers/:userName?", async (req,res)=>{

    const collectionName = "users"

    //search ınput
    const text = req.params.userName;

    if(text == null)
    {
        const users = await getAllData(collectionName,"name",1,20,
            {})

        res.send(users)

    }

    //divide with white spaces because each new word needs to be new regex
    const textArray = text.split(" ");
    let regexArray = [];

    //create regex array for each word
    textArray.map(currentText => {
        regexArray.push( new RegExp(currentText,'i') )

    })

    const users = await getAllData(collectionName,"name",1,0,
        {"name" :
                {
                    $all:regexArray
                }
        })

    res.send(users)
})

app.get("/userExist/:userId",async (req,res)=>{

    const userId = req.params.userId;
    const results = await getInfoDatabase("users",userId);
    console.log("user eist => " + results)

    results ? res.send(true) : res.send(false)


} )

app.get("/userLogout", (req,res)=>{

    req.session.destroy();

    res.send("logout")


} )

function lookUp(collectionName,from,localField,foreignField,as,userId)
{
    return new Promise(async (resolve, reject) => {

        const databaseConnection = await connectDatabase();
        const database = databaseConnection.db("simel");

        database.collection(collectionName).aggregate([
            {
             $match:{uid:userId}
            },
            {
            $lookup:{
                from:from,
                localField:localField,
                foreignField:foreignField,
                as:as
            }
        }]).toArray(function(err, result) {
            if (err) throw err;
            console.log("as => " + as)
            databaseConnection.close();
            resolve(result)
        });
    })

}
app.get("/getUserProfile/:userId", async (req,res)=>{

    const userId = req.params.userId;
    const result = await lookUp("users","questions","askedQuestions","questionId","questionInfo",userId)
    res.send(result)

})

app.get("/followUser/:userId/:followType",async (req,res)=>{

    console.log("geldi")
    const userId = req.params.userId
    const currentUser =  req.session.user.uid
    const followType = req.params.followType
    console.log("follow type => " + followType  )
    if(followType == "follow")
    {


        await updateDatabaseArray("users","following",currentUser,userId,"push")
        await updateDatabaseArray("users","followers",userId,currentUser,"push")
    }
    else
    {
        await updateDatabaseArray("users","following",currentUser,userId,"pull")
        await updateDatabaseArray("users","followers",userId,currentUser,"pull")

    }


    res.send("done")
} )

app.post("/allQuestions",async(req,res)=>{

    const filter = req.body.data
    let sortField = filter.sortField ? filter.sortField : "askedTime"
    let sortBy = filter.sortBy ? filter.sortBy :  -1
    let condition = filter.lecture ? { lecture : `${filter.lecture}`} : {}
    const allQuestions = await getAllData("questions",sortField,sortBy,0,condition);
    res.send(allQuestions)
})

function getAnswersKey(mockId) {
    return new Promise(async (resolve, reject) => {
        try
        {

            let condition = {mockId : mockId}
            const answerKey = await getAllData("mockExams","mockId",-1,0,condition)
            console.log("ans => " + answerKey)
            resolve(answerKey[0])
        }
        catch (e) {
            reject(e)
        }
    })
}

function checkAnswerKey(answersKey,userAnswers)
{
    return new Promise(async (resolve, reject) => {
        try
        {
            const lectures = {
                turkish:"Türkçe",
                social : "Sosyal Bilimler",
                math : "Temel Matematik",
                fen : "Fen Bilimleri"
            }

            const answerKeyQuestions = answersKey.questions

            let subjectResults = []
            let totalCorrect = 0;
            let totalFalse = 0;
            let totalNet = 0;
            let totalQuestion = 0;

            Object.entries(userAnswers).map( item => {
                const key = item[0]
                const value = item[1]
                const currentLecture = lectures[key]

                const lectureAnswerKey = answerKeyQuestions.find(item => item.subject ==currentLecture)

                const lectureAnswerQuestions = lectureAnswerKey.questions
                let subjectCorrect = 0;
                let subjectFalse = 0;
                let subjectQuestion  = lectureAnswerQuestions.length

                if(value)
                {


                       value.map(currentUserAnswer => {
                            const currentUserQuestionNumber = currentUserAnswer.questionNumber
                           const currentUserQuestionAnswer = currentUserAnswer.answer

                           const correctAnswerItem = lectureAnswerQuestions.find(item => item.questionNumber == currentUserQuestionNumber)

                           correctAnswerItem.correctAnswer == currentUserQuestionAnswer ? subjectCorrect ++ : subjectFalse++

                       })
                }

                let subjectNet = subjectCorrect-(0.25*subjectFalse)

                let resultItem = {
                    subject:currentLecture,
                    totalCorrect : subjectCorrect,
                    totalFalse : subjectFalse,
                    totalQuestion:subjectQuestion,
                    totalNet : subjectNet
                }

                totalCorrect = totalCorrect + subjectCorrect
                totalFalse = totalFalse + subjectFalse
                totalQuestion = totalQuestion + subjectQuestion
                totalNet = totalNet + subjectNet

                subjectResults.push(resultItem)
            })

            const totalResults = { totalQuestion: totalQuestion,
                totalCorrect : totalCorrect ,
                totalFalse : totalFalse ,
                totalNet : totalNet
            }
            
            let results =
                {
                    totalResults : totalResults,
                    subjectResults:subjectResults
                }

            resolve(results)

        }
        catch (e) {
            reject(e)
        }

    })
}

function getTytPrediction(data)
{
    return new Promise((resolve, reject) => {

       try
       {
           console.log("prediction data => " + JSON.stringify(data,null,2))
           const turkish = data.turkish
           const math = data.math
           const fen = data.fen
           const social = data.social
           const total = turkish + math + fen + social

           const pythonProcess = spawn('python',["./tytPredict.py", turkish,math,social,fen,total]);

           pythonProcess.stdout.on('data', (predictionResult) => {

               //predictionResult = parseFloat(predictionResult)
               console.log("pred =>" + predictionResult.toString())
                const stringPrediction = predictionResult.toString();
               const split = stringPrediction.split("-");
               const tytPoint = parseFloat(split[0]).toFixed(2)
               const cluster = split[1]
               //const cluster = parseInt(split[1])
               console.log("cluster =<" + cluster)
              // console.log("result => " + predictionResult.toFixed(2))
               const result = {
                   tytPoint:tytPoint,
                   cluster : cluster
               }
               resolve(result)
           });
       }
       catch (e) {
           reject(e)
       }
    })
}

function updateDatabase(collectionName,id, newData, fieldName)
{

    return new Promise(async (resolve, reject) => {

        console.log(collectionName,id,newData,fieldName)
        try {

            const databaseConnection = await connectDatabase();
            const database = databaseConnection.db(databaseName);

            database.collection(collectionName).update({_id : id},{
                 $set:{
                     [fieldName]:newData
                }
            })

            resolve("done")

        }
        catch (e) {
            reject(e)
        }



    })
}

app.post("/mockResults",async(req,res)=>{

    const request = req.body.data
    const mockId = request.mockId
    const userAnswers = request.answersData
    const userId = req.session.user.uid


    const answersKey = await getAnswersKey(mockId)
    const results = await checkAnswerKey(answersKey,userAnswers)

    const predictionData = {
        turkish :results.subjectResults[0].totalNet,
        math : results.subjectResults[2].totalNet,
        social : results.subjectResults[1].totalNet,
        fen : results.subjectResults[3].totalNet
    }

    const tytPredictionResults = await getTytPrediction(predictionData)
    console.log("type => " + JSON.stringify(tytPredictionResults,null,2))
    results.totalResults['tytPrediction'] = tytPredictionResults.tytPoint

    const cluster = parseInt(tytPredictionResults.cluster)
    results.totalResults['cluster']= cluster

    await updateDatabase("users",userId,cluster,"level")

    res.send(results)
})

app.get("/getMocks",async (req,res)=>{

    const mockExams = await getAllData("mockExams","_id",-1,0,{})

    res.send(mockExams.length.toString())


})
import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCsGE7eT3jkQxjQd5mB8DPrsPwR7ThG1wo",
    authDomain: "soru-cozum-dc062.firebaseapp.com",
    databaseURL: "https://soru-cozum-dc062.firebaseio.com",
    projectId: "soru-cozum-dc062",
    storageBucket: "soru-cozum-dc062.appspot.com",
    messagingSenderId: "170971599338",
    appId: "1:170971599338:web:281d7ac39b8834735b6293",
    measurementId: "G-CE8DY5NR38"
};

const app = firebase.initializeApp(firebaseConfig);


export const auth = app.auth();
export default app;
;

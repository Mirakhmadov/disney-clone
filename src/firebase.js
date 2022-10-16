import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAvSpSZL4Ecrd3Wo-amasVfeUpz5ysMeLM",
    authDomain: "disneyplus-ccff4.firebaseapp.com",
    projectId: "disneyplus-ccff4",
    storageBucket: "disneyplus-ccff4.appspot.com",
    messagingSenderId: "5128111253",
    appId: "1:5128111253:web:b0a0f67b74272b74b9479c",
    measurementId: "G-SZNSSBMK74"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseDb = firebase.firestore();
const firebaseAuth = firebase.auth();
const firebaseProvider = new  firebase.auth.GoogleAuthProvider();
const firebaseStorage = firebase.storage();

export {firebaseAuth, firebaseProvider, firebaseStorage};
export default firebaseDb;
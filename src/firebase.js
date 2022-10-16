import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAh3EHwadfNeK-3X1aU2AgBzw3bc-TuvoQ",
    authDomain: "disneyplus-clone-5ccd9.firebaseapp.com",
    projectId: "disneyplus-clone-5ccd9",
    storageBucket: "disneyplus-clone-5ccd9.appspot.com",
    messagingSenderId: "567729651997",
    appId: "1:567729651997:web:899e06903432727c8a61f4"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseDb = firebase.firestore();
const firebaseAuth = firebase.auth();
const firebaseProvider = new  firebase.auth.GoogleAuthProvider();
const firebaseStorage = firebase.storage();

export {firebaseAuth, firebaseProvider, firebaseStorage};
export default firebaseDb;
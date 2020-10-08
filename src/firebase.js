import firebase from "firebase"; 

  const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyBKOoiHjWp9Fm8Njc_pldQgujbWnXPMoTM",
  authDomain: "insta-clone-b356d.firebaseapp.com",
  databaseURL: "https://insta-clone-b356d.firebaseio.com",
  projectId: "insta-clone-b356d",
  storageBucket: "insta-clone-b356d.appspot.com",
  messagingSenderId: "934981637038",
  appId: "1:934981637038:web:7f54d71633473b6b366e3f",
  measurementId: "G-H9LHNVSY7Y"

})  

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth ,storage};
 

 

import firebase from "firebase"; 

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDdfL4z8RT2sFh1phK-xVIB96hYg4uXqho",
authDomain: "insta-clone2-b9b5b.firebaseapp.com",
databaseURL: "https://insta-clone2-b9b5b-default-rtdb.firebaseio.com",
projectId: "insta-clone2-b9b5b",
storageBucket: "insta-clone2-b9b5b.appspot.com",
messagingSenderId: "354899919573",
appId: "1:354899919573:web:48469eda8e1f9095fd985c",
measurementId: "G-LKGG3J748J"

})  

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth ,storage};
 

 

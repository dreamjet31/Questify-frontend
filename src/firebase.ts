import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2aSHrcXulrkePnf1J3qzTmou8SRJ9DzU",
  authDomain: "questify-a7292.firebaseapp.com",
  databaseURL: "https://questify-a7292-default-rtdb.firebaseio.com",
  projectId: "questify-a7292",
  storageBucket: "questify-a7292.appspot.com",
  messagingSenderId: "807523362762",
  appId: "1:807523362762:web:1b285b2595d717858dd133",
};

firebase.initializeApp(firebaseConfig);

export default firebase;

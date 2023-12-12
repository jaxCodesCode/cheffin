// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHxUn4aSFJVNHDfwZoH78ti-Ra9fjXM58",
  authDomain: "cheffin-5774d.firebaseapp.com",
  projectId: "cheffin-5774d",
  storageBucket: "cheffin-5774d.appspot.com",
  messagingSenderId: "973641373382",
  appId: "1:973641373382:web:067d52685d2dba6ab3a9c7",
  measurementId: "G-EC0XEQ14F4",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(app);
export const store = firebase.storage(app);
export const auth = firebase.auth(app);
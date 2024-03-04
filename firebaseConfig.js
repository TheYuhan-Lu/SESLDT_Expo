// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCon3xNml83cpvFwwmUf9iRdYsMKanJ8ns",
  authDomain: "sesldtproject.firebaseapp.com",
  projectId: "sesldtproject",
  storageBucket: "sesldtproject.appspot.com",
  messagingSenderId: "1008786445129",
  appId: "1:1008786445129:web:0cd0fb60bee4ec1d9c8098",
  measurementId: "G-1TBG42QQRB",
  databaseURL: "https://sesldtproject-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export const auth = getAuth(app);
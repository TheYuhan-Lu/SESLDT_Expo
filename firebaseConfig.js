// Import the functions you need from the SDKs you need
import { getDatabase } from "firebase/database";
//import { getAnalytics } from "firebase/analytics";
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
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

// initialize Firebase App
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth, getApp, getAuth };
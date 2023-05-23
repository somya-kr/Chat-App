// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZyUvnHEYGyuZ4150x9bMB1V8buTXyX3k",
  authDomain: "real-time-chat-app-1b391.firebaseapp.com",
  projectId: "real-time-chat-app-1b391",
  storageBucket: "real-time-chat-app-1b391.appspot.com",
  messagingSenderId: "635696604614",
  appId: "1:635696604614:web:7668af3642ed71bbe23ec7",
  measurementId: "G-101VMVL9WF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
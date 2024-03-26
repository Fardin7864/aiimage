// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk-f3e-w-_0fGRaEOKULUH6GBq4Wdsdj0",
  authDomain: "tutorial-6a75f.firebaseapp.com",
  projectId: "tutorial-6a75f",
  storageBucket: "tutorial-6a75f.appspot.com",
  messagingSenderId: "753943941038",
  appId: "1:753943941038:web:121bcf1846d44f638a023f"
};


// Initialize Firebase
//const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)

export const provider = new GoogleAuthProvider()

export const db = getFirestore(app)
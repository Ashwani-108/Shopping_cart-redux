// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfymSxiXFh53SQQB6SbJsOH-5aKVXkNsQ",
  authDomain: "shopping-app-a4855.firebaseapp.com",
  projectId: "shopping-app-a4855",
  storageBucket: "shopping-app-a4855.appspot.com",
  messagingSenderId: "810071143300",
  appId: "1:810071143300:web:9e457ec9914aa6b34163d1"
};


const app = initializeApp(firebaseConfig)
export const auth = getAuth();
export const db = getFirestore(app);
export default app;
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
   apiKey: "AIzaSyByXn1rYWDwTcJHFYT039mNecCaBTV-wyY",
   authDomain: "cabby-c5699.firebaseapp.com",
   projectId: "cabby-c5699",
   storageBucket: "cabby-c5699.appspot.com",
   messagingSenderId: "185274429810",
   appId: "1:185274429810:web:498e3f5d9bcf50c275adeb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDe3EVK4xx3HexyA-5lUF6-0tG4mWqDNNU",
    authDomain: "panellicencia.firebaseapp.com",
    projectId: "panellicencia",
    storageBucket: "panellicencia.appspot.com",
    messagingSenderId: "587480114505",
    appId: "1:587480114505:web:7be7d4d5076092705ee698"
};

export const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
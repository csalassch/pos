import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMu7L2z8vwZ0Yq5hK-gXzTTznQCm_LukY",
  authDomain: "bloona-ef12e.firebaseapp.com",
  databaseURL: "https://bloona-ef12e-default-rtdb.firebaseio.com",
  projectId: "bloona-ef12e",
  storageBucket: "bloona-ef12e.appspot.com",
  messagingSenderId: "571872092295",
  appId: "1:571872092295:web:f4d9a351c67a82d8295822"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSXXXXXXXXXXXXXXXXXXXXXXXXXqqZ56PI",
  authDomain: "XXXXXXXXX.firebaseapp.com",
  projectId: "gifXXXX",
  storageBucket: "XXXXX-XXXXX.appspot.com",
  messagingSenderId: "5XXXXXXXXXXXXX47",
  appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
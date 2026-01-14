import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAj2Eyb3hNZ_ATSgx0KPm9i1GLHhdyB0qM",
  authDomain: "upside-voices.firebaseapp.com",
  projectId: "upside-voices",
  storageBucket: "upside-voices.firebasestorage.app",
  messagingSenderId: "3745953966",
  appId: "1:3745953966:web:f2d486c19e9279aa1a553f",
  measurementId: "G-J00VWDQCP1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

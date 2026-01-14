import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

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

/* =========================
   Firebase Services
   ========================= */
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

/* =========================
   Emulator Connection
   (ONLY on localhost)
   ========================= */
if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectFunctionsEmulator(functions, "localhost", 5001);
}

export { auth, db, functions };

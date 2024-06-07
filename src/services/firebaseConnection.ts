import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBb5lj3ZPbKYjj3xChmzboK8gMhLDJsl0c",
  authDomain: "polygon-1febd.firebaseapp.com",
  projectId: "polygon-1febd",
  storageBucket: "polygon-1febd.appspot.com",
  messagingSenderId: "331584004155",
  appId: "1:331584004155:web:e5e2829f714a5128adfc1e",
  measurementId: "G-QMVWNM2GJ1"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
export { db }
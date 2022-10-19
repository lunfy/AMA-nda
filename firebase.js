// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9i5tAhBQ2tHLyh1XoaniR-Y5SwUkKqzo",
  authDomain: "ama-nda.firebaseapp.com",
  projectId: "ama-nda",
  storageBucket: "ama-nda.appspot.com",
  messagingSenderId: "398915461738",
  appId: "1:398915461738:web:c0db1a9c55be5230386013",
  measurementId: "G-6J1H18RLR0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth };
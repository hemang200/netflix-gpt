// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoi36EvpnuTSlkr9KA13Qu5pi4A8N38AQ",
  authDomain: "netflixgpt2025.firebaseapp.com",
  projectId: "netflixgpt2025",
  storageBucket: "netflixgpt2025.firebasestorage.app",
  messagingSenderId: "317326880964",
  appId: "1:317326880964:web:847e56d0aae89e8a599991",
  measurementId: "G-EY5EW395J8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
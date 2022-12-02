// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5QMYsvMedir87pTYp1bXEO3EhzXEo2SY",
  authDomain: "personal-website-f351d.firebaseapp.com",
  projectId: "personal-website-f351d",
  storageBucket: "personal-website-f351d.appspot.com",
  messagingSenderId: "436428054011",
  appId: "1:436428054011:web:628db4d91ae1d381a7bf5e",
  measurementId: "G-NEEM502GNS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
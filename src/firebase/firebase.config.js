// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeZ-FLhy7d3NQ94WFrab_wn98qGaRj3JI",
  authDomain: "ai-model-inventory-app.firebaseapp.com",
  projectId: "ai-model-inventory-app",
  storageBucket: "ai-model-inventory-app.firebasestorage.app",
  messagingSenderId: "730556247917",
  appId: "1:730556247917:web:a96f9d2e159811d17af464",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1BEpBfHAPVW13BlIuiJAKDpLhN4Cvad8",
  authDomain: "prismatic-petal-356210.firebaseapp.com",
  projectId: "prismatic-petal-356210",
  storageBucket: "prismatic-petal-356210.appspot.com",
  messagingSenderId: "920059647699",
  appId: "1:920059647699:web:528564df5b2ac0fe396626",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

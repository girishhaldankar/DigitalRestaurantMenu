// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVkL-9tQ4GC_Zgy3fWeMR2l4s2n5aGxjM",
  authDomain: "restaurant-orders-2d2fd.firebaseapp.com",
  projectId: "restaurant-orders-2d2fd",
  storageBucket: "restaurant-orders-2d2fd.firebasestorage.app",
  messagingSenderId: "908279639033",
  appId: "1:908279639033:web:eaa5f4e6c53202ea8f2b28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
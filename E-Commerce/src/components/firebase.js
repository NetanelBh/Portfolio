import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQUjp5tAbD9GYrEwciBpeSTFUgeB_o9w8",
  authDomain: "e-commerce-1a4bf.firebaseapp.com",
  projectId: "e-commerce-1a4bf",
  storageBucket: "e-commerce-1a4bf.appspot.com",
  messagingSenderId: "286430672286",
  appId: "1:286430672286:web:a89107598683a9a90e128f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

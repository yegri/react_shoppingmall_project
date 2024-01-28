// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "dotenv/config";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpqFA3Gfuj4UUkQNMURHl7hc2_UHM1PxE",
  authDomain: "feyegri-shop.firebaseapp.com",
  projectId: "feyegri-shop",
  storageBucket: "feyegri-shop.appspot.com",
  messagingSenderId: "486345380517",
  appId: "1:486345380517:web:4e62e68d399ca46093734c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

export const db = getFirestore(app);

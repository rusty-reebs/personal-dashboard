import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRJOYwnz0S5C0CaeHQuwEOD968t-9atZE",
  authDomain: "personal-dash-free.firebaseapp.com",
  projectId: "personal-dash-free",
  storageBucket: "personal-dash-free.appspot.com",
  messagingSenderId: "6096580783",
  appId: "1:6096580783:web:bf1b8f60c345d18e6b645a",
  measurementId: "G-VNZ4JMYH9M",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

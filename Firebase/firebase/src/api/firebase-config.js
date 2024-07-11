// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0Qf2tEkMop2awFsa3DrZMetAIrcjvWhs",
    authDomain: "practice-41e71.firebaseapp.com",
    projectId: "practice-41e71",
    storageBucket: "practice-41e71.appspot.com",
    messagingSenderId: "616984321680",
    appId: "1:616984321680:web:0186d799254c1ff05f0215",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

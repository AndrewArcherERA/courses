import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXvzXQF94vPaleMTgRNJiOKxg8qzidC1I",
    authDomain: "bug-tracker-b00eb.firebaseapp.com",
    projectId: "bug-tracker-b00eb",
    storageBucket: "bug-tracker-b00eb.appspot.com",
    messagingSenderId: "746924110190",
    appId: "1:746924110190:web:13649e67dd5145981d117f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

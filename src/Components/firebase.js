import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";


const firebaseConfig = {
    apiKey: "AIzaSyBLiSWDogxnHgOYW7DC05UmEVv_O-sniFY",
    authDomain: "myapp-fe0a5.firebaseapp.com",
    projectId: "myapp-fe0a5",
    storageBucket: "myapp-fe0a5.appspot.com",
    messagingSenderId: "185797597842",
    appId: "1:185797597842:web:4ed9d8cfd93c0046fc244b"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const imageDb = getFirestore(app);
const storage = getFirestore(app);
export { auth, db, imageDb, storage }
// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
    
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const imgDb = getStorage(app);
const txtDb = db

export { auth, db, imgDb, txtDb };
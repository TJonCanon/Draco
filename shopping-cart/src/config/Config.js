import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyBA-gF8NPCDJYZ9ePKVKCBzpYQfzCUYKNU",
    authDomain: "eccomerce-wesbite-holberton.firebaseapp.com",
    projectId: "eccomerce-wesbite-holberton",
    storageBucket: "eccomerce-wesbite-holberton.appspot.com",
    messagingSenderId: "716944213598",
    appId: "1:716944213598:web:e4d8dca9ce0cf8309cd6cf",
    measurementId: "G-JB94NMQQDN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)


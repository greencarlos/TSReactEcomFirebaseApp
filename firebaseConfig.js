import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseKeys from "./firebaseKeys";
import { getFirestore } from "firebase/firestore";
const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, } = firebaseKeys;
const firebaseConfig = {
    apiKey: apiKey || import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: authDomain || import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: projectId || import.meta.env.VITE_FIREBASE_PROEJCT_ID,
    storageBucket: storageBucket || import.meta.env.STORAGE_BUCKET,
    messagingSenderId: messagingSenderId || import.meta.env.MESSAGING_SENDER_ID,
    appId: appId || import.meta.env.APP_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };

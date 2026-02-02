import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import firebaseKeys from "./firebaseKeys";

const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} = firebaseKeys;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

export { auth };

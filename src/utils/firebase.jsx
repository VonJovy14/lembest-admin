import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwhKhN9ZYb_hi0b1pHl1lDuSSfVd2yvz0",
  authDomain: "lembestadmin.firebaseapp.com",
  projectId: "lembestadmin",
  storageBucket: "lembestadmin.firebasestorage.app",
  messagingSenderId: "66631984542",
  appId: "1:66631984542:web:a8a4679525dd3778c1228f",
  measurementId: "G-FXCNRB7WLS",
};

export const app = initializeApp(firebaseConfig);
export const app2 = initializeApp(firebaseConfig, "Secondary");
export const auth = getAuth(app);
export const auth2 = getAuth(app2);
export const db = getFirestore(app);

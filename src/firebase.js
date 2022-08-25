import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAK6gW7zf9JXhUGFEjbspfz_q6IU84tbE",
  authDomain: "employeedb-eb95b.firebaseapp.com",
  projectId: "employeedb-eb95b",
  storageBucket: "employeedb-eb95b.appspot.com",
  messagingSenderId: "908092535871",
  appId: "1:908092535871:web:ecc43297f0426e8000b48a"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
  export const provider = new GoogleAuthProvider();
 
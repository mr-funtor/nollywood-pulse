// Import the functions you need from the SDKs you need
import { initializeApp,getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, signInWithRedirect,onAuthStateChanged, GoogleAuthProvider,signOut} from 'firebase/auth';
import {getFirestore,collection, getDocs} from 'firebase/firestore';
import { getStorage} from "firebase/storage";





// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
databaseURL:process.env.NEXT_PUBLIC_DATABASEURL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID
};

//console.log(process.env.NEXT_PUBLIC_FIREBASE_APIKEY)

// Initialize Firebase
function initializeAppIfNecessary() {
  try {
    return getApp();
  } catch (any) {
    return initializeApp(firebaseConfig);
  }
}

const app = initializeAppIfNecessary();
const auth= getAuth(app)
const db= getFirestore(app);
const provider= new GoogleAuthProvider();
const storage = getStorage(app);



export {
db,
  auth,
    onAuthStateChanged,
    signOut,
    storage
}


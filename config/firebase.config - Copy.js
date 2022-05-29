// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, signInWithRedirect,onAuthStateChanged, GoogleAuthProvider,signOut} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getDatabase,ref,set,onValue,query,limitToLast  } from "firebase/database";



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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const db= getFirestore(app);
const provider= new GoogleAuthProvider();

// Get a reference to the database service
const database = getDatabase(app);

const reference = ref(database , 'movies/' + 'yummy');
//const newRefrence= push(reference)//if you want unique keys
//set(reference,{
//    ID:'YJLJ0990EM',
//    username:'YU Olufunto',
//    email: 'gNUII',
//})

//onValue(reference, (snapshot) => {
//  const data = snapshot.val();
//    console.log(data)
//});

//onValue(reference, (snapshot) => {
//  snapshot.forEach((childSnapshot)=>{
//      const childKey= childSnapshot.key;
//      const childData= childSnapshot.val();
//  })
//});

//QUERY
async function kiki(){
    const thequeried= await query(reference,limitToLast(1) );
    const data= await thequeried
    console.log(data)
    
}

kiki()


export {
  auth,
    onAuthStateChanged,
    signOut
}


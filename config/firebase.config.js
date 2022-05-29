// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, signInWithRedirect,onAuthStateChanged, GoogleAuthProvider,signOut} from 'firebase/auth';
import {getFirestore, collection, addDoc,getDocs, doc,updateDoc,Timestamp} from 'firebase/firestore';
import { getStorage, ref } from "firebase/storage";





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
export const db= getFirestore(app);
const provider= new GoogleAuthProvider();
const storage = getStorage(app);

const movRef=collection(db, 'movies')
const movie={
    title: 'Ade and Shola',
    year: 2018,
    rating:6,
    totalratings:200,
    numberOfPeopleRating:40,
    description:"Love at a beautifull sight. The hut",
    producer:"",
    Director:"",
    Cast:[],
    image:"https://firebasestorage.googleapis.com/v0/b/web-coding-9a2b4.appspot.com/o/movies%2Fmoan?alt=media&token=591caedd-bf02-42f2-ac8f-3feabd15e866"
}

//const review={
//    author:auth.currentUser,
//    time:Timestamp.now(),
//    text:"I have never watched it. I just wanted to see",
//    rating:4,
//    movie:0000,
//}
async function kiki(){
    //SETTING
  const hut= await addDoc(movRef,movie);
//    console.log(hut.id)
    
    //READING
//    const hut= await getDocs(movRef);
//    console.log(hut.docs[0].data())
//    console.log(hut.docs[0].id)
//    console.log(hut.docs[0].name)
    
//    UPDATING
//    const movieDoc= doc(movRef, 'Healer');
//    const newField= {Year:2020};
//    await updateDoc(movieDoc,newField)
}
//kiki()

async function kaka(){
    
}






export {
  auth,
    onAuthStateChanged,
    signOut,
    storage
}


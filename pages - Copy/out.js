import {getAuth, signInWithRedirect,onAuthStateChanged, GoogleAuthProvider,getRedirectResult,signInWithPopup,signOut} from 'firebase/auth';
import {auth} from '../src/config/firebase.config';

const provider= new GoogleAuthProvider
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});


function goat(){
    return <h1>Yoooy</h1>
}

export default goat
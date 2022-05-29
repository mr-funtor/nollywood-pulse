import {getAuth, signInWithRedirect,onAuthStateChanged, GoogleAuthProvider,getRedirectResult,signInWithPopup} from 'firebase/auth';
import {auth} from '../src/config/firebase.config';

const provider= new GoogleAuthProvider
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });


function goat(){
    return <h1>Yaaay</h1>
}

export default goat
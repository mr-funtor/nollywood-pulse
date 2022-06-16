import {useEffect} from 'react';
import styles from '../styles/signin.module.css';
import {useRouter} from 'next/router'

//firebase
import {getAuth, signInWithRedirect,onAuthStateChanged, GoogleAuthProvider,getRedirectResult,signInWithPopup} from 'firebase/auth';
import {auth} from '../config/firebase.config';

//redux
import { useSelector,useDispatch} from 'react-redux';
import {switcher} from '../features/navState';

function signinPage(){
    const router= useRouter();
    const loginState= useSelector((state)=>state.login);
    
    const provider= new GoogleAuthProvider;
    const dispatch= useDispatch()
    
    useEffect(()=>{
         //this changes the color of the nav items in the side bar
        dispatch(switcher('Login'));
    },[])
    
    //this takes the page they were previuosly on if they are already logged in
//    if(loginState)return router.back();
    
    function siginUser(){
        signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    router.push('/')
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
        
    }
    
    return(
        <section className={styles.siginContainer}>
            <button onClick={()=>siginUser()}>Sign In With Google</button>
        
        </section>
    
    
    ) 
}

export default signinPage
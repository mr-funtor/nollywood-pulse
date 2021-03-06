import {useEffect} from 'react';
import styles from '../styles/signin.module.css';
import {useRouter} from 'next/router';
import Image from 'next/image';
import GoogleLogo from '../assets/images/googlelogo.png'

//firebase
import {getAuth, signInWithRedirect,onAuthStateChanged, GoogleAuthProvider,getRedirectResult,signInWithPopup} from 'firebase/auth';
import {auth} from '../config/firebase.config';

//redux
import { useSelector,useDispatch} from 'react-redux';
import {switcher} from '../features/navState';

function SigninPage(){
    const router= useRouter();
    const loginState= useSelector((state)=>state.login);
    
    const provider= new GoogleAuthProvider;
    const dispatch= useDispatch()
    
    useEffect(()=>{
         //this changes the color of the nav items in the side bar
        dispatch(switcher('Login'));
    },[loginState,dispatch])
    
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
            <button onClick={()=>siginUser()}>
                <div className={styles.imageContainer}>
                    <Image className={styles.theImage}  src={GoogleLogo} alt="the google logo" layout="fill"/>
                </div>
            Sign In With Google</button>
        
        </section>
    
    
    ) 
}

export default SigninPage
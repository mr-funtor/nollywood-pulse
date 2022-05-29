import {useState,useEffect} from 'react'
import styles from '../styles/Sidebar.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserXmark,
    faBars,
    faXmark
}from "@fortawesome/free-solid-svg-icons";
import {useRouter} from 'next/router';

//firebase
import {onAuthStateChanged,signOut,auth} from '../config/firebase.config'

//redux
import { useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {closeSide} from '../features/sideClose';
import {logout,login} from '../features/login';

const theLinks=[
    {
        id:1,
        name:'MENU',
        subs:{
            first:''
        }
    }
]

function Sidebar(){
    const shower= useSelector((state)=>state.sideBar);
    const loginState= useSelector((state)=>state.login);
    const navState= useSelector((state)=>state.nav);
    const dispatch=useDispatch();
    
    const router= useRouter();
    
    const [isHidden, setIsHidden]=useState(styles.stayHidden);
//    const [presentPage,setPresentpage]=useState('Your');
    
    //Detect auth state
    useEffect(()=>{
       onAuthStateChanged(auth, user=>{
    if(user !== null){
        dispatch(login())
        console.log('logged in')
    }else{
        dispatch(logout())
        console.log('no user')
    }
}) 
    },[])
    
//signs out the user form the app
   const  LoginOrOut=()=>{
        console.log('clicked log in button',loginState)
        
        if(loginState){
          return signOut(auth).then(() => {
              // Sign-out successful.
            }).catch((error) => {
              // An error happened.
            });
           }
               //takes the user to the login page
        router.push('/signin')
           console.log('end')
        
        
    }

    
    return(
    <nav className={`${styles.sidebar} ${shower}`}>
            
        <i onClick={()=>dispatch(closeSide())}>
        <FontAwesomeIcon icon={faXmark} />
        </i>
        
        <div className={styles.categoriesBox}>    
            <section>
                <h3>MENU</h3>
                    <div>
                        <i>*</i>
                        <Link href='/'>
                            <a className={navState==='Home' ? styles.active : ''}>Home</a>
                        </Link>
                    </div>

                    <div>
                        <i>*</i>
                        <Link href='/allreviews'>
                            <a
                                className={navState==='Reviews' ? styles.active : ''}>Reviews</a>
                        </Link>
                    </div>

                    <div>
                        <i>*</i>
                        <Link href='/explore-movies'>
                            <a
                                className={navState==='Explore' ? styles.active : ''}>Explore Movies</a>
                        </Link>
                    </div>

            </section>

            <section>
                <h3>DASHBOARD</h3>
                    <div>
                        <i>*</i>
                        <Link href='/personal-reviews'>
                            <a className={navState==='Your' ? styles.active : ''}>Your Reviews</a>
                        </Link>
                    </div>

                    <div>
                        <i>*</i>
                        <Link href='/watchlist'>
                            <a className={navState==='watch' ? styles.active : ''}>Watchlist</a>
                        </Link>
                    </div>

            </section>

            <section >
                <h3>GENERAL</h3>
                    <div>
                        <i>*</i>
                        <Link href='/setting'>
                            <a
                                className={navState==='Setting' ? styles.active : ''}
                                >Setting</a>
                        </Link>
                    </div>

                    <div>
                        <i>*</i>
                        
                            <a onClick={()=>LoginOrOut()} className={navState==='Login' ? styles.active : ''}>{loginState ? 'Logout' : 'Login'}</a>
                        
                    </div>

            </section>    
        </div>    
         
        
       
        
    </nav>
    
    )
}

export default Sidebar;
import {useState} from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserGear,
    faBars,
    faXmark
} from "@fortawesome/free-solid-svg-icons";

//redux
import {useDispatch} from 'react-redux';
import {openSide} from '../features/sideClose';

//firebase
import { collection, getDocs,query,limit } from "firebase/firestore"; 
import {db} from '../config/firebase.config';

function Navbar(){
    const [isSearchOpen, setIsSearchOpen]=useState(false);
    const [searchText, setSearchText]=useState('')
    const dispatch= useDispatch();
    
    const searchForMovie=async(e)=>{
        if(e.key==='Enter'){
            if(searchText.length===0)return //stops the code since the user typed nothing
            
           let newText = searchText.replaceAll(/[<*>]/g,"")//this would make the users input safer preventing an injection
            
           const movRef = collection(db, "movies");
//           const q= query(movRef, where() )
        }
    }
    
    return(
 
    <div className={styles.navContainer}>
        <nav className={styles.navbar}>
            <h3>
                <Link href="/">
                    <a>Nollywood Pulse</a>
                </Link>
            </h3>



            <ul>
                <li onClick={()=>setIsSearchOpen(!isSearchOpen)}>
                    <i><FontAwesomeIcon
                    icon={faSearch}/></i>
                </li>    
                <li onClick={()=>{
            dispatch(openSide())}}>
                    <i ><FontAwesomeIcon
                    icon={faBars}/></i>
                </li> 
            </ul>

        </nav>
            
        {isSearchOpen &&
            <div className={styles.searchBox}>   
                <input type="text" 
                       placeholder="Search for a movie..."
                       value={searchText}
                        onChange={(e)=>setSearchText(e.target.value)}
                        onKeyPress={(e)=>searchForMovie(e)}/>  
                    
                <i onClick={()=>setIsSearchOpen(false)}><FontAwesomeIcon
                    icon={faXmark}/></i> 
            </div>
        }
        
        
    </div>
    
    
    )
}

export default Navbar;
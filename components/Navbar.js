import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import {useDispatch} from 'react-redux';
import {openSide} from '../features/sideClose';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserGear,
    faBars
} from "@fortawesome/free-solid-svg-icons";


function Navbar(){
    const dispatch= useDispatch();
    
    return(
    <nav className={styles.navbar}>
        <h3>
            <Link href="/">
                <a>Nollywood Pulse</a>
            </Link>
        </h3>
        
        
            
        <ul>
            <li>
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
    
    )
}

export default Navbar;
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import {useDispatch} from 'react-redux';
import {openSide} from '../features/sideClose';


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
            <li><i>x</i></li>    
            <li onClick={()=>{
        dispatch(openSide())}}><i >0</i></li> 
        </ul>
        
    </nav>
    
    )
}

export default Navbar;
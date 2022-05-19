import {useState} from 'react'
import styles from '../styles/Sidebar.module.css';
import Link from 'next/link';

function Sidebar(){
    const [isHidden, setIsHidden]=useState(styles.show)
    
    return(
    <nav className={`${styles.sidebar} ${isHidden}`}>    
         <Link href='/'>
            <a>Home</a>
          </Link>
        <button onClick={()=>setIsHidden(styles.stayHidden)}>Click</button>
        <br/>
        <Link href='/watchlist'>
            <a>Watchlist</a>
          </Link>
        <br/>
        <Link href='/personal-reviews'>
            <a>Your Reviews/Ratings</a>
          </Link>
        
    </nav>
    
    )
}

export default Sidebar;
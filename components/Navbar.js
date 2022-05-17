import styles from '../styles/Navbar.module.css';

function Navbar(){
    return(
    <nav className={styles.navbar}>
        <h3>Nollywood Pulse</h3>    
            
        <ul>
            <li><i>x</i></li>    
            <li><i>0</i></li> 
        </ul>
        
    </nav>
    
    )
}

export default Navbar;
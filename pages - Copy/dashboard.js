import {useState} from 'react';
import styles from '../styles/Dashboard.module.css';
import UpdateArea from '../components/UpdateArea';

function Dashboard(){
    const [onPost, setOnPost]=useState(false)
    
    
    return(
    <section className={styles.dashContainer}>
       <nav>
         <h3 className={`${ onPost ? styles.active : styles.notact }`}
             onClick={()=>setOnPost(true)}
             >Post Movies</h3>   
         <h3 className={`${ !onPost ? styles.active : styles.notact }`}
             onClick={()=>setOnPost(false)}
             >Update Movie</h3>   
        </nav> 
       
        {onPost && <UpdateArea/>}
        
         {!onPost && <input type="text" placeholder="search for the movie"/>}   
        
        
    </section>
    
    )
}

export default Dashboard;
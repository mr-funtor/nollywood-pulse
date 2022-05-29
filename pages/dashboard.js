import {useState} from 'react';
import styles from '../styles/Dashboard.module.css';
import UpdateArea from '../components/UpdateArea';

//firebase
import { getStorage, ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
import {storage} from '../config/firebase.config';
const imagesRef = ref(storage, 'movies/bulb');



function Dashboard(){
    const [onPost, setOnPost]=useState(true)
    const [theImage,setTheImage]=useState(null);
    
    
    
    const takeHoldOfImage=(theFile)=>{
        setTheImage(theFile);
        console.log(theImage)
    }
    
    const uploadMovieDetails=()=>{
        const uploadTask = uploadBytesResumable(imagesRef, theImage);
        
        
        uploadTask.on('state_changed', 
   () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
            
            
  },
  (error) => {
    console.log(error)
  }
);
        
    }
        
        
        
       
    
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
       
        {onPost && <UpdateArea takeHoldOfImage={takeHoldOfImage}
                       uploadMovieDetails={uploadMovieDetails}
                       />}
        
         {!onPost && <input type="text" placeholder="search for the movie"/>}   
        
        
    </section>
    
    )
}

export default Dashboard;
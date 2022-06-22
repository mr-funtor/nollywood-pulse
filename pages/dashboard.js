import {useState,useEffect} from 'react';
import {useRouter} from 'next/router';
import styles from '../styles/Dashboard.module.css';
import UpdateArea from '../components/UpdateArea';
import { v4 as uuidv4 } from 'uuid';

//redux
import {useSelector,useDispatch} from 'react-redux';
import {showing, notShowing} from '../features/popUpState';


//firebase
import { getStorage, ref,uploadBytesResumable,getDownloadURL,uploadBytes } from "firebase/storage";
import {storage} from '../config/firebase.config';
import {db,auth} from '../config/firebase.config';
import {collection, doc, addDoc,Timestamp,increment,updateDoc,getDoc,query,getDocs,where } from "firebase/firestore"; 

function Dashboard(){
    const [onPost, setOnPost]=useState(true);
    const [theMovieTitle, setTheMovieTitle]=useState('');
    const [synopsis, setSynopsis]=useState('');
    const [releaseYear, setReleaseYear]= useState(0);
    const [theImage,setTheImage]=useState(null);
    const [youtubeUrl,setYoutubeUrl]=useState('');
    const dispatch=useDispatch();
    const router= useRouter();
    
    const uploadMovieDetails=()=>{
        const imagesRef = ref(storage, `${uuidv4()}`);
        // 'theImage' comes from the File API
    uploadBytes(imagesRef, theImage).then((snapshot) => {
      const theU=getDownloadURL(snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
          return downloadURL
    })
      return theU
        
    }).then(async(downloadURL)=>{
        const movieRef=collection(db,'movies');
        
        const movie={
             title: theMovieTitle,
    year: releaseYear,
    rating:0,
    totalratings:0,
    numberOfReviews:0,
    description:synopsis,
    producer:"",
    Director:"",
    Cast:[],
    youtubeUrl,
    image:downloadURL
        }
        
        await addDoc(movieRef,movie);  
          
        setTheMovieTitle('');
        setSynopsis('');
        setReleaseYear(0);
        setTheImage(null)
        
        //This tells the user that the movie was upload
        dispatch(showing('Movie uploaded'));
        
        setTimeout(()=>{
            dispatch(notShowing());
        },2000)
        
      });
        
        
    }
        
    useEffect(()=>{
        return router.push('/');
    })  
        
       
    
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
       
        {onPost && <UpdateArea
                       uploadMovieDetails={uploadMovieDetails}
                       theMovieTitle={theMovieTitle} setTheMovieTitle={setTheMovieTitle}
                       synopsis={synopsis} setSynopsis={setSynopsis}
                       releaseYear={releaseYear} setReleaseYear={setReleaseYear}
                       theImage={theImage} setTheImage={setTheImage} youtubeUrl={youtubeUrl}
                        setYoutubeUrl={setYoutubeUrl}
                       />}
        
         {!onPost && <input type="text" placeholder="search for the movie"/>}   
        
        
    </section>
    
    )
}

export default Dashboard;
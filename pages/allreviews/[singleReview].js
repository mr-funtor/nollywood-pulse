import styles from '../../styles/SingleReview.module.css';
import Image from 'next/image';
import tempBlood from '../../assets/images/blood.jpg';
import {useState,useEffect} from 'react'
import {useRouter} from 'next/router';
import Loader from '../../components/LoadingModal';

//firebase
import { collection, doc, getDoc } from "firebase/firestore"; 
import {db} from '../../config/firebase.config';

function singleReview(){
    const [movieReview,setMovieReview]=useState(null);
    const router=useRouter();
    
    
    useEffect(()=>{
        const fetchMovie=async()=>{
            const singleReview= router.query.singleReview;
            const docRef = doc(db, "reviews", singleReview);
           const docSnap = await getDoc(docRef); 
            setMovieReview(docSnap.data())
        
        }
        fetchMovie()
        },[])
    
    if(movieReview===null)return <Loader/>
    
    return(
    <section className={styles.reviewContainer}>
        <aside className={styles.reviewAside}>
            <div className={styles.imageContainer}>
                <Image className={styles.theImage}   src={movieReview.authorImage} alt="a picture for the movie" layout="fill"/>
              </div>
                <p>{movieReview.author}</p>
                <p>Rated this movie</p>
                <i>*****</i>
        </aside>
            
        <article className={styles.reviewBody}>
            <h1>{movieReview.movieTitle}</h1>
            
            <p>{movieReview.text}</p>
            
            {/*<button> Check Another Review</button>*/}
            
        </article>
    </section>
    ) 
}

export default singleReview;
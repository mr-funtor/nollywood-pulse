import Image from 'next/image';
import heroPic from '../assets/images/oct.jpg';
import styles from '../styles/RecentCard.module.css';
import Link from 'next/link';
import {useRouter} from 'next/router';

//redux
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {fillMovieId} from '../features/ratingState';
import {openModal} from '../features/modalState';
import {showing, notShowing} from '../features/popUpState';

//firebase
import {collection, doc, addDoc,updateDoc,getDoc,query,getDocs,where } from "firebase/firestore"; 
import {db,auth} from '../config/firebase.config';


function recentCards({movie}){
    const router =useRouter()
    const dispatch =useDispatch();
    const {title,rating,image,id}=movie;
    
    const watchlistRef=collection(db, 'watchlist');
    const user=auth.currentUser;
   
    const switchToSingleMovie=(e)=>{ if(e.target.dataset.type==='overlay')router.push(`/explore-movies/${id}`)
       
    }
    const callers=()=>{
        dispatch(openModal());
        dispatch(fillMovieId({id,title}))
    }
    
    const showThePopUp=async()=>{
        //check if the user is signed in
        if(user===null)return dispatch(showing('Please sign in'));
        
        //check if the movie has been saved by the user before
            const q= query(watchlistRef, where('userId','==',user.uid),where('id','==',id))
        const querySnapshot = await getDocs(q);
        if(querySnapshot?.docs[0]?.data()){
            dispatch(showing('Movie already in watchlist'));
            return setTimeout(()=>{
            dispatch(notShowing());
        },2000)
        }
        
        const watchDetails={
            userId:user.uid,
            id,
            image,
            title,
            rating
        }
        
        const docRef= await addDoc(watchlistRef, watchDetails)
        
        dispatch(showing('Movie added to watchlist'));
        
        setTimeout(()=>{
            dispatch(notShowing());
        },2000)
    }
    
    
    return(
        <article  className={styles.singleCard} onClick={(e)=>switchToSingleMovie(e)}>
            <div className={styles.imageContainer}>
                <Image className={styles.theImage} src={image}
        alt="a picture for the movie" layout="fill"/>
            </div>
        
            <div className={styles.ratingsBox}>
                
                <i onClick={()=>showThePopUp()}>+</i>
            </div>
            
      
            <div data-type="overlay" className={styles.overlay}>
                <footer className={styles.overlayFooter}>
                    <p data-type="see">{title}</p>
                    <div>
                        <i className={`${rating/2>=1 ? styles.active : ''}`}>*</i>

                        <i className={`${rating/2>=2 ? styles.active : ''}`}>*</i>
                        <i className={`${rating/2>=3 ? styles.active : ''}`}>*</i>
                        <i className={`${rating/2>=4 ? styles.active : ''}`}>*</i>
                        <i className={`${rating/2>=5 ? styles.active : ''}`}>*</i>
                        <p>{rating}</p>
                    </div>
                    <button onClick={()=>callers()}
                
>Give Rating/Review</button>
                </footer>
            </div>
        </article>
    )
}

export default recentCards;
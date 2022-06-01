import Link from 'next/link';
import styles from '../styles/Modal.module.css';
import {useState,useEffect} from 'react';
import {useRouter} from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserXmark,
    faCaretRight,
    faStar
}from "@fortawesome/free-solid-svg-icons";

//redux
import {useSelector,useDispatch} from 'react-redux';
import {fillMovieId,unfill} from '../features/ratingState';
import {closeModal,makeRated,notRated} from '../features/modalState';

//firebase
import {collection, doc, addDoc,Timestamp,increment,updateDoc,getDoc,query,getDocs,where } from "firebase/firestore"; 
import {db,auth} from '../config/firebase.config';

function Modal(){
    const [theText,setTheText]=useState('');
    const [personalRating, setPersonalRating]=useState(0);
    const [isEditing, setIsEditing]=useState(false);
    const [reviewId,setReviewId]=useState('');
    
    const router=useRouter();
    const dispatch= useDispatch();
    const {isOpen,hasRated}=useSelector((state)=>state.modal);
//    const modalState= useSelector((state)=>state.modal);
    const {title,id,rating}= useSelector((state)=>state.rating);
     const reviewsRef=collection(db, 'reviews');
    const user=auth.currentUser;
    
   
    async function kiki(){
        
        if(isEditing)return updateReview()
         //check if the person is logged in
        
        if(user===null)return router.push('/signin')
        
        const review={
            author:user.displayName,
            authorId:user.uid,
            authorImage:user.photoURL,
            time:Timestamp.now(),
            text:theText,
            rating:personalRating,
            movieId:id,
            movieTitle:title,
        }
        try{
            
            const movRef=collection(db, 'movies');
            const movieDoc= doc(movRef, id);
            const hut= await addDoc(reviewsRef,review); 
            
        
            const newField= {totalratings:increment(personalRating),
                            numberOfPeopleRating:increment(1)
//                            rating:increment(1)
                            };
            //this updates the number of people that have reviewed the movie
            await updateDoc(movieDoc,newField)
            
            closeAndStopRated()
        }catch(error){
            console.log(error)
        }
        
    
    }
    
    const updateReview=async()=>{
        const reviewDoc= doc(reviewsRef, reviewId);
        const newField= {text:theText};
        await updateDoc(reviewDoc,newField);
        setIsEditing(false);
        closeAndStopRated();
    }
    
    useEffect(()=>{
        
        async function lala(){
            const reviewsRef=collection(db, 'reviews');
    const user=auth.currentUser;
            if(user===null)return
            
        //Checks if the user has put up a review before
       
        const q= query(reviewsRef, where('authorId','==',user.uid),where('movieId','==',id))
        const querySnapshot = await getDocs(q);
        if(querySnapshot?.docs[0]?.data()){
            setTheText(querySnapshot.docs[0].data().text);
            setPersonalRating(querySnapshot.docs[0].data().rating);
            setReviewId(querySnapshot.docs[0].id)
            
            setIsEditing(true);
        }
            
        }
        lala()
        
        
        //this closes the modal when the page changes
        const handleRouteChange = (url, { shallow }) => {
    
            if(isOpen)dispatch(closeModal())
            
    }
        //this watches for when the page route changes
        router.events.on('routeChangeStart', handleRouteChange)
        
        
         // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
    },[isOpen])
    
    const closeAndStopRated=()=>{
           setIsEditing(false);
           setTheText('');
           setPersonalRating(0);
           setReviewId('')
        dispatch(closeModal())
        dispatch(notRated())//this makes the post button inactive
        dispatch(unfill())//makes the modal plain
           
    }
    
    return(
        <>
        {isOpen && (<section className={styles.modal}>
            <button onClick={()=>closeAndStopRated()}>Close</button>
        <div>
            <h1 onClick={()=>dispatch(makeRated())}>
            <i className={isEditing && personalRating >=1 ? styles.active:''}><FontAwesomeIcon icon={faStar} /></i>
                    <i className={rating >=2?styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                    <i className={rating >=3?styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                    <i className={rating >=4?styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                    <i className={rating >=5?styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
           </h1>
            <textarea onChange={(e)=>setTheText(e.target.value)}
            value={theText}
placeholder="What's your review? (optional)" maxLength="500">
            
            </textarea>
            
            <footer>
                <button className={!hasRated&&!isEditing ? `${styles.inactive}` :''}
                    onClick={()=>kiki()}
                    >{isEditing ? 'Edit' : 'Post'}</button>
            </footer>
            
            
        </div>
        
    </section>)}
    </>
    )
}

export default Modal;

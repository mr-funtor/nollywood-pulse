import Link from 'next/link';
import styles from '../styles/Modal.module.css';
import {useState,useEffect} from 'react';
import {useRouter} from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
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
    
   
    const rateTheMovie=async()=>{
        
        if(isEditing)return updateReview()//calls this if the person has reviewed the movie before
         
        
        if(user===null)return router.push('/signin')//check if the person is logged in
        
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
            
            const docRef = doc(db, "movies", id);
            const docSnap = await getDoc(docRef); 
//            console.log(docSnap.data().totalratings)
            const newRating=docSnap.data().totalratings/docSnap.data().numberOfPeopleRating;
        await updateDoc(movieDoc,{rating:newRating})
            
         
            
            closeAndStopRated()
        }catch(error){
            console.log(error)
        }
        
    
    }
    
    const updateReview=async()=>{
        const reviewDoc= doc(reviewsRef, reviewId);
        const newField= {text:theText,rating:personalRating};
        await updateDoc(reviewDoc,newField);
        setIsEditing(false);
        closeAndStopRated();
    }
    
    useEffect(()=>{
        
        async function CheckForUserReview(){
            const reviewsRef=collection(db, 'reviews');
            const user=auth.currentUser;
            if(user===null)return //this prevents any review if the user is not logged in
            
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
        CheckForUserReview()
        
        
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
        {isOpen && (<form onSubmit={(e)=>{e.preventDefault(),rateTheMovie()}} className={styles.modal}>
            <i className={styles.closingButton} onClick={()=>closeAndStopRated()}><FontAwesomeIcon icon={faXmark} /></i>
        <div>
            <h1 onClick={()=>dispatch(makeRated())}>
           
                <i onClick={()=>setPersonalRating(1)} className={personalRating >=1 ? styles.active:''}><FontAwesomeIcon icon={faStar} /></i>
                 <i onClick={()=>setPersonalRating(2)} className={personalRating >=2  ? styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                 <i onClick={()=>setPersonalRating(3)} className={personalRating >=3 ? styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                <i onClick={()=>setPersonalRating(4)} className={personalRating >=4 ? styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                <i onClick={()=>setPersonalRating(5)} className={personalRating >=5 ? styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
           </h1>
        
            <textarea onChange={(e)=>setTheText(e.target.value)}
            value={theText}
placeholder="What's your review? (optional)" maxLength="300" required>
            
            </textarea>
            
            <footer>
                <button type="submit" className={!hasRated&&!isEditing ? `${styles.inactive}` :''}
                    
                    >{isEditing ? 'Edit' : 'Post'}</button>
            </footer>
            
            
        </div>
        
    </form>)}
    </>
    )
}

export default Modal;

import {useState,useEffect} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import tempBlood from '../../assets/images/blood.jpg';
import styles from '../../styles/SingleMovie.module.css';
import ReviewCard from '../../components/ReviewCard';
import Loader from '../../components/LoadingModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserXmark,
    faCaretRight,
    faStar
}from "@fortawesome/free-solid-svg-icons";

//redux
import {useSelector,useDispatch} from 'react-redux';
import {fillMovieId} from '../../features/ratingState';
import {openModal} from '../../features/modalState';
import {showing, notShowing} from '../../features/popUpState';


//firebase
import { collection, doc, getDoc,addDoc,query,getDocs,where } from "firebase/firestore"; 
import {auth,db} from '../../config/firebase.config';

function Movie(){
    const [movieData,setMovieData]=useState(null);
    const [reviewsData,setReviewsData]=useState(null);
     const dispatch =useDispatch();
    const router=useRouter();
    
    
    const callers=()=>{
        dispatch(openModal()); dispatch(fillMovieId({id:movieData.id,title:movieData.title}))
    }
    
        const showThePopUp=async()=>{
        //check if the user is signed in
            const user=auth.currentUser
        if(user===null)return dispatch(showing('Please sign in'));
        
        //check if the movie has been saved by the user before
            const watchlistRef=collection(db, 'watchlist');
            const q= query(watchlistRef, where('userId','==',user.uid),where('id','==',movieData.id))
        const querySnapshot = await getDocs(q);
            
        if(querySnapshot?.docs[0]?.data()){
            dispatch(showing('Movie already in watchlist'));
            return setTimeout(()=>{
            dispatch(notShowing());
        },2000)
        }
        
           //save movie into database
        const watchDetails={
            userId:user.uid,
            id:movieData.id,
            image:movieData.image,
            title:movieData.title,
            rating:movieData.rating
        }
        
        const docRef= await addDoc(watchlistRef, watchDetails)
        
        dispatch(showing('Movie added to watchlist'));
        
        setTimeout(()=>{
            dispatch(notShowing());
        },2000)
    }
    
    
    useEffect(()=>{
        const fetchMovie=async()=>{
            
            try{
                //fetch the data for the single movie
               const singleMovie= router.query.singleMovie;
            const docRef = doc(db, "movies", singleMovie);
           const docSnap = await getDoc(docRef); 
                
                //fetch the reviews for this movie
                const reviewsRef= collection(db,"reviews");
                
                const q = query(reviewsRef, where("movieId", "==", `${singleMovie}`));
                
                const data= await getDocs(q)
//                console.log(data.docs[0].data())
                const movieReviews=data.docs.map((doc)=>{
                    return{id:doc.id,...doc.data()}
                })
                
            setMovieData({...docSnap.data(),id:docSnap.id}) 
            setReviewsData(movieReviews)
//                console.log(movieReviews)
            }catch(error){
                console.log(error)
            }
            
        }
        
        fetchMovie()
//        console.log(movieData)
    },[router.query.singleMovie])
    
    if(movieData===null || reviewsData===null)return <Loader/>
    
    return(
        <main>
            <section className={styles.topSection}>
                <div className={styles.imageContainer}>
                 <Image className={styles.theImage}  src={movieData.image} alt="a picture for the movie" layout="fill"/>
              </div>
        
                 <section className={styles.heroCover}>
                    <div>
                        <div>
                            <i className={movieData.rating >=1?styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                            <i className={movieData.rating >=2?styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                            <i className={movieData.rating >=3?styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                            <i className={movieData.rating >=4?styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                            <i className={movieData.rating >=5?styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                        </div>
                        <p><span>{movieData.numberOfPeopleRating.toString() ||movieData.numberOfReviews.toString()} </span> review(s)</p>
                     </div>
                </section>
        
        
            </section>
            
            <section className={styles.movieBody}>
                <div className={styles.movieBodyTop}>
                    <h1>{movieData.title.toUpperCase()}</h1>
                    <div className={styles.actionArea}>
                        <a href="https://www.youtube.com/watch?v=r9sSydb5ec8" target="_blank" rel="noreferrer"><button>Watch Trailer <i>&gt;</i></button></a>
                        
                        <b onClick={()=>callers()}>Give Review/Rating</b>
                        
                        <i onClick={()=>showThePopUp()}>+</i>
                    </div>
                    
                    <section className={styles.synopsis}>
                        <h1>Synopsis</h1>
                    
                        <p>{movieData.description}</p>
                    </section>
                    
                    <section className={styles.reviewContainer}>
                        <h1>Reviews</h1>
                        
                        <div>
                    {
                        reviewsData.map((review)=>{
                        return <ReviewCard key={review.id} review={review}/>
                    })
                    }
                        
                        
                        </div>
                    
                    </section>
                </div>
            
            </section>
        
        </main>
    )
}

export default Movie;


  



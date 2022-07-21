import {useState,useEffect} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import tempBlood from '../../assets/images/blood.jpg';
import styles from '../../styles/SingleMovie.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserXmark,
    faCaretRight,
    faStar
}from "@fortawesome/free-solid-svg-icons";
import useSWR from 'swr'

//components
import ReviewCard from '../../components/ReviewCard';
import Loader from '../../components/LoadingModal';

//redux
import {useSelector,useDispatch} from 'react-redux';
import {fillMovieId} from '../../features/ratingState';
import {openModal} from '../../features/modalState';
import {showing, notShowing} from '../../features/popUpState';


//firebase
import { collection, doc, getDoc,addDoc,query,getDocs,where } from "firebase/firestore"; 
import {auth,db} from '../../config/firebase.config';

function Movie(){
//    const [movieData,setMovieData]=useState(null);
//    const [reviewsData,setReviewsData]=useState(null);
     const dispatch =useDispatch();
    const router=useRouter();
    
    
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
                
//            setMovieData() 
//            setReviewsData(movieReviews)
                return [{...docSnap.data(),id:docSnap.id},movieReviews]
//                console.log(movieReviews)
            }catch(error){
                console.log(error)
            }
            
        }
    const{data, error}=useSWR('singleMovie',fetchMovie);
    const [movieData,reviewsData]=data;
    
    const callers=()=>{
        dispatch(openModal()); //this opens the modal that opens the modal for giving a review
        dispatch(fillMovieId({id:movieData.id,title:movieData.title}))//thsi gives the state details of the movie to know if the user has reviewed the movie before
    }
    
    const showThePopUp=async()=>{
        //checks if the user is signed in
        const user=auth.currentUser
        if(user===null)return dispatch(showing('Please sign in'));
        
        //checks if the movie has been saved by the user before
        try{
            const watchlistRef=collection(db, 'watchlist');
            const q= query(watchlistRef, where('userId','==',user.uid),where('id','==',movieData.id))
            const querySnapshot = await getDocs(q);

            if(querySnapshot?.docs[0]?.data()){
                dispatch(showing('Movie already in watchlist'));
                    return setTimeout(()=>{
                    dispatch(notShowing());
                },2000)
            }
        }catch(e){
            console.log(e)
        }
        
        
        //save movie into database
        const watchDetails={
            userId:user.uid,
            id:movieData.id,
            image:movieData.image,
            title:movieData.title,
            rating:movieData.rating
        }
               
        try{
            const docRef= await addDoc(watchlistRef, watchDetails)
        
            dispatch(showing('Movie added to watchlist'));

            setTimeout(()=>{
                dispatch(notShowing());
            },2000)   
        }catch(e){
              console.log(e)  
        }
        
        
    }
    
    
    
    
    //shows the loading screen when movies and reviews are being fetched
    if(!data)return <Loader/>
        return console.log(movieData);
    
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
                        <p><span>{movieData.numberOfReviews.toString()} </span> review(s)</p>
                     </div>
                </section>
        
        
            </section>
            
            <section className={styles.movieBody}>
                <div className={styles.movieBodyTop}>
                    <section className={styles.movieBodyName}>
                        <h1>{movieData.title.toUpperCase()}</h1>
                        <i onClick={()=>showThePopUp()}>+</i>
                    </section>
                    
                    
                    
                    <div className={styles.actionArea}>
                        <div className={styles.actionAreaRight}>
                            <b onClick={()=>callers()}>Give Review/Rating</b>
                        
                        
                            <a href={movieData.youtubeUrl} target="_blank" rel="noreferrer">
                                <button>Watch Trailer <i></i></button>
                            </a>  
                        </div>
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


  



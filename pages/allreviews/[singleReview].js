import styles from '../../styles/SingleReview.module.css';
import Image from 'next/image';
import tempBlood from '../../assets/images/blood.jpg';
import {useState,useEffect} from 'react'
import {useRouter} from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar,
    faEllipsisV
}from "@fortawesome/free-solid-svg-icons";
import useSWR from 'swr'

//components
import Loader from '../../components/LoadingModal';
import DeleteModal from '../../components/DeleteModal';

//redux
import {useSelector,useDispatch} from 'react-redux';
import {fillMovieId} from '../../features/ratingState';
import {openModal} from '../../features/modalState';

//firebase
import { collection, doc, getDoc,deleteDoc } from "firebase/firestore"; 
import {db,auth} from '../../config/firebase.config';



function SingleReview(){
//    const [movieReview,setMovieReview]=useState(null);
    const [seeOptions, setSeeOptions]=useState(false);
    const [showModal, setShowModal]= useState(false);
    const router=useRouter();
    const dispatch= useDispatch();
    
    //fetch data from database to be cached
    const fetchMovie=async()=>{
            const singleReview= router.query.singleReview;
            const docRef = doc(db, "reviews", singleReview);
           const docSnap = await getDoc(docRef); 
    
            return {id:docSnap.id,...docSnap.data()}
        }
    const{data, error}=useSWR('singleMovie',fetchMovie);
    let movieReview;
    
    
    //this closes the options popup when you click on the body of the screen
    const dismissTheOptions=(e)=>{
        if(e.target.dataset.type!=='options')setSeeOptions(false)
    }
    
    const openTheReviewModal=()=>{
        dispatch(openModal());//opens the modal
        dispatch(fillMovieId({id:movieReview.movieId,title:movieReview.movieTitle})) //this puts the id of the movie into state , for reveiw 
    }
    
    const deleteThisReview=async()=>{
//    console.log(movieReview.id)
        try{
                  await deleteDoc(doc(db, "reviews", movieReview.id));
            router.back()
        }catch(error){
           console.log(error) 
        }
    }
    
    if(error)return console.log(error)
    if(!data)return <Loader/>
    if(data) movieReview=data;
    
    return(
    <section onClick={(e)=>dismissTheOptions(e)}className={styles.reviewContainer}>
            
       { showModal && <DeleteModal deleteThisReview={deleteThisReview} setShowModal={setShowModal}/>}
        
       {auth?.currentUser?.uid===movieReview.authorId  && 
        <section className={styles.optionsContainer}>
            <div className={`${!seeOptions ? styles.inactive : styles.active}`}>
                <button onClick={()=>openTheReviewModal()}>Edit Review</button>
                <button onClick={()=>setShowModal(true)}>Delete Review</button>
            </div>
            
            <p  data-type="options" onClick={()=>setSeeOptions(!seeOptions)} className={styles.ellips}>:</p>
        </section>
       }
        
        <div className={styles.contentContainer}>
            <aside className={styles.reviewAside}>
                <div className={styles.imageContainer}>
                    <Image className={styles.theImage}   src={movieReview.authorImage} alt="a picture for the movie" layout="fill"/>
                </div>
                <p>{movieReview.author}</p>
                <p>Rated this movie</p>
                <div>
                    <i className={`${movieReview.rating>=1 ? styles.active : ''}`}><FontAwesomeIcon icon={faStar} /></i>
                    <i className={`${movieReview.rating>=2 ? styles.active : ''}`}><FontAwesomeIcon icon={faStar} /></i>
                    <i className={`${movieReview.rating>=3 ? styles.active : ''}`}><FontAwesomeIcon icon={faStar} /></i>
                    <i className={`${movieReview.rating>=4 ? styles.active : ''}`}><FontAwesomeIcon icon={faStar} /></i>
                    <i className={`${movieReview.rating>=5 ? styles.active : ''}`}><FontAwesomeIcon icon={faStar} /></i>
                </div>
            </aside>

            <article className={styles.reviewBody}>
                <h1>{movieReview.movieTitle}</h1>

                <p>{movieReview.text}</p>

                {/*<button> Check Another Review</button>*/}

            </article>
        </div>
    </section>
    ) 
}

export default SingleReview;
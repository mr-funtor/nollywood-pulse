import {useState, useEffect} from 'react';
import styles from '../../styles/PersonalReviews.module.css';
import useSWR from 'swr'

//components
import ReviewCard from '../../components/ReviewCard';
import Loader from '../../components/LoadingModal';

//redux
import {useDispatch} from 'react-redux';
import {switcher} from '../../features/navState';

//firebase
import { collection, getDocs } from "firebase/firestore"; 
import {db} from '../../config/firebase.config';


function AllReviewsPage(){
//    const [allreviews, setAllReviews]=useState([]);
    const dispatch= useDispatch();
    
    
    //fetch the data and cache it
    const getMovies=async()=>{
            
            try{
            
            //get the reviews
            const reviewRef=collection(db, "reviews");
            const packedReviews= await getDocs(reviewRef);
            const reviewsData=packedReviews.docs.map((doc) => {
              
              return  {id:doc.id,...doc.data()}
            })
         
    
            return reviewsData
                
            }catch(error){
                console.log(error)
            }
        
        }
    const{data, error}=useSWR('allReviews',getMovies);
    let allreviews;
    
    useEffect(()=>{
        //this changes the color of the nav items in the side bar
        dispatch(switcher('Reviews'))
        
    },[dispatch]) 
    
    if(!data)return <Loader/>
    if(data) allreviews=data;
        
        
    return(
       <section className={styles.pageContainer}>
            <section>
                <h1>Reviews</h1>
                
                <div className={styles.reviewsContainer}>
            {
                allreviews.map((review)=>{
                return <ReviewCard key={review.id} review={review} />
                
            })
            }
                   
                </div>
                
            </section>
        
        </section>
    
    )
}

export default AllReviewsPage;
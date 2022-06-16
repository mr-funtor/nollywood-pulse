import {useState,useEffect} from 'react';
import styles from '../styles/PersonalReviews.module.css';
import ReviewCard from '../components/ReviewCard';
import {useRouter} from 'next/router';
import Loader from '../components/LoadingModal';

//redux
import {useDispatch,useSelector} from 'react-redux';
import {switcher} from '../features/navState';

//firebase
import { collection, getDocs,query,where } from "firebase/firestore"; 
import {db,auth} from '../config/firebase.config';

function PersonalReviewsPage(){
    const [reviewsData,setReviewsData]=useState(null);
    const router= useRouter();
    const dispatch= useDispatch();
    const loginState= useSelector((state)=>state.login);
    
    
    useEffect(()=>{
        //this changes the color of the nav items in the side bar
        dispatch(switcher('Your'));
        
        //this redirects the user to a signin page if they are not signed in
        if(!loginState){
            console.log('not here')
            router.push('/signin')
            return
        }
        
         const getMovies=async()=>{
            const user= auth.currentUser;
           
            try{
            
            //get the reviews
            const reviewsRef=collection(db, "reviews");
            const q = query(reviewsRef, where("authorId", "==", user.uid));
                
            const packedReviews= await getDocs(q);
            const reviewsData=packedReviews.docs.map((doc) => {
            
              return  {id:doc.id,...doc.data()}
            })
            
         
        setReviewsData(reviewsData)   
                
            }catch(error){
                console.log(error)
            }
        
        }
         
         getMovies()
        
    },[reviewsData,dispatch,loginState,router])
    
    
    if(reviewsData===null)return <Loader/>;
    
    
  
    
    return(
        <section className={styles.pageContainer}>
            <section>
                <h1>Your Reviews</h1>
                
                <div className={styles.reviewsContainer}>
            {
                  reviewsData.map((review)=>{
                    return <ReviewCard key={review.id} review={review}
        personal={true}/>
                })
                    }
                </div>
                
            </section>
        
        </section>
    
    )
}

export default PersonalReviewsPage;
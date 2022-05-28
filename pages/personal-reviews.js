import {useEffect} from 'react';
import styles from '../styles/PersonalReviews.module.css';
import ReviewCard from '../components/ReviewCard';
import {useRouter} from 'next/router'

//redux
//import { useSelector} from 'react-redux';
import {useDispatch,useSelector} from 'react-redux';
import {switcher} from '../features/navState';

function PersonalReviewsPage(){
    const router= useRouter()
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
    },[])
    
    
    
    
    
  
    
    return(
        <section className={styles.pageContainer}>
            <section>
                <h1>Your Reviews</h1>
                
                <div className={styles.reviewsContainer}>
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                </div>
                
            </section>
        
        </section>
    
    )
}

export default PersonalReviewsPage;
import styles from '../styles/PersonalReviews.module.css';
import RecentCard from '../components/RecentCard';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

//redux
import {useSelector} from 'react-redux';
import {switcher} from '../features/navState';


function WatchListPage(){
    const router= useRouter();
    const loginState= useSelector((state)=>state.login);
    
    useEffect(()=>{
        
        //if the user is not logged in, the user is redirected to a signin page
        if(!loginState){
        router.push('/signin')
        return
    }
    },[])
    
    
    
    
    return(
        <section className={styles.pageContainer}>
            <section id={styles.pageSection}>
                <h1>Your Watchlist</h1>
                
                <div className={styles.reviewsContainer}>
                    <RecentCard />
                    <RecentCard />
                    <RecentCard />
                    <RecentCard />
                </div>
                
            </section>
        
        </section>
    
    )
}

export default WatchListPage;
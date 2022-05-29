import {useState,useEffect} from 'react';
import styles from '../styles/PersonalReviews.module.css';
import RecentCard from '../components/RecentCard';
import {useRouter} from 'next/router';
import Loader from '../components/LoadingModal';

//redux
import {useSelector} from 'react-redux';
import {switcher} from '../features/navState';

//firebase
import {collection, doc, addDoc,updateDoc,getDoc,query,getDocs,where } from "firebase/firestore"; 
import {db,auth} from '../config/firebase.config';

function WatchListPage(){
    const [theWatchList, setTheWatchList]=useState(null);
    const router= useRouter();
    const loginState= useSelector((state)=>state.login);
    
    useEffect(()=>{
        
        //if the user is not logged in, the user is redirected to a signin page
        if(!loginState){
            router.push('/signin')
            return
        }
        
        const getWatchlist=async()=>{
            const user= auth.currentUser;
           
            try{
            
            //get all the watchlist for the user
            const watchlistRef=collection(db, "watchlist");
            const q = query(watchlistRef, where("userId", "==", user.uid));
                
            const packedwatch= await getDocs(q);
            const watchData=packedwatch.docs.map((doc) => {
            
              return  {id:doc.id,...doc.data()}
            })
            
         
        setTheWatchList(watchData)
                
            }catch(error){
                console.log(error)
            }
        
        }
        
        getWatchlist()
    },[])
    
    
     if(theWatchList===null)return <Loader/>;
    
    return(
        <section className={styles.pageContainer}>
            <section id={styles.pageSection}>
                <h1>Your Watchlist</h1>
                
                <div className={styles.reviewsContainer}>
        {
            theWatchList.map((list)=>{
        return <RecentCard key={list.id} movie={list}/>
    })
        }
                    {/*<RecentCard />
                    <RecentCard />
                    <RecentCard />
                    <RecentCard />*/}
                </div>
                
            </section>
        
        </section>
    
    )
}

export default WatchListPage;
import {useState,useEffect} from 'react';
import styles from '../styles/PersonalReviews.module.css';
import {useRouter} from 'next/router';

//components
import RecentCard from '../components/RecentCard';
import Loader from '../components/LoadingModal';
import DeleteModal from '../components/DeleteModal';

//redux
import {useSelector,useDispatch} from 'react-redux';
import {switcher} from '../features/navState';


//firebase
import {collection, doc, addDoc,updateDoc,getDoc,query,getDocs,where,deleteDoc,onSnapshot } from "firebase/firestore"; 
import {db,auth} from '../config/firebase.config';


function WatchListPage(){
    const [theWatchList, setTheWatchList]=useState(null);
    const router= useRouter();
    const loginState= useSelector((state)=>state.login);
    const [showModal, setShowModal]= useState(false);
    const [pendingDeleteId, setPendingDeleteId]=useState('');
    const dispatch=useDispatch();
    
    useEffect(()=>{
        //this changes the color of the nav items in the side bar
        dispatch(switcher('watch'))
        
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

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                  const watchData = [];
                  querySnapshot.forEach((doc) => {
                      watchData.push({id:doc.id,...doc.data()});
                  });
                    setTheWatchList(watchData)
                });

                
            }catch(error){
                console.log(error)
            }
        
        }
        
        getWatchlist()
    },[])
    
    const deleteAWatchlist=async()=>{
//    console.log(movieReview.id)
        console.log(pendingDeleteId)

        try{
                  await deleteDoc(doc(db, "watchlist", pendingDeleteId));
                setShowModal(false);
        }catch(error){
           console.log(error) 
        }
    }
    
    const settingDeleteId=(id)=>{
        setPendingDeleteId(id)
    }
    
    
     if(theWatchList===null)return <Loader/>;
    
    return(
        <section className={styles.pageContainer}>
        { showModal && <DeleteModal deleteThisReview={deleteAWatchlist} setShowModal={setShowModal}/>}
        
            <section id={styles.pageSection}>
                <h1>Your Watchlist</h1>
                
                <div className={styles.reviewsContainer}>
                {
                    theWatchList.map((list)=>{
                        return <RecentCard 
                                   key={`${list.id}${Math.random().toString()}`} 
                                   watchId={list.id} 
                                   movie={list} 
                                   personal={true} 
                                   settingDeleteId={settingDeleteId}
                                   setShowModal={setShowModal}/>
                    })
                }
                
                </div>
                
            </section>
        
        </section>
    
    )
}

export default WatchListPage;
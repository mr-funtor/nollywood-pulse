import styles from '../../styles/PersonalReviews.module.css';
import RecentCard from '../../components/RecentCard';
import {useState, useEffect} from 'react';

//components
import Modal from "../../components/Modal";
import Loader from '../../components/LoadingModal';

//redux
import {useSelector,useDispatch} from 'react-redux';
import {switcher} from '../../features/navState';

//firebase
import { collection, getDocs } from "firebase/firestore"; 
import {db} from '../../config/firebase.config';

function AllMoviesPage(){
    const [allmovies, setAllMovies]=useState([])
     const modalState= useSelector((state)=>state.modal)
    const dispatch=useDispatch()
    
     useEffect(()=>{
        const getMovies=async()=>{
            
            //this changes the color of the nav items in the side bar
        dispatch(switcher('Explore'))
            
            try{
                //gets movie data for the second sectionfrom firebase
            const movRef = collection(db, "movies");
             const hut= await getDocs(movRef);
            const moviesData=hut.docs.map((doc) => {
              return  {id:doc.id,...doc.data()}
            })
            
        setAllMovies(moviesData)  
                
            }catch(error){
                console.log(error)
            }
        
        }

        getMovies()
        
    },[]) 
    
     
     if(allmovies.length===0)return <Loader/>
    
    return(
        <section className={styles.pageContainer}>
        
            <section id={styles.pageSection}>
                <h1>Movies To Review</h1>
                
                <div className={styles.reviewsContainer}>
                    {
                allmovies.map((movie)=>{

                    return <RecentCard key={movie.id} movie={movie}/>
          })
      }
                   
                </div>
                
            </section>
        
        </section>
    
    )
}

export default AllMoviesPage;
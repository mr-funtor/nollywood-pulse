import styles from '../../styles/PersonalReviews.module.css';
import RecentCard from '../../components/RecentCard';
import Modal from "../../components/Modal";
import {useState, useEffect} from 'react';

//redux
import {useSelector} from 'react-redux';

//firebase
import { collection, getDocs } from "firebase/firestore"; 
import {db} from '../../config/firebase.config';

function allMoviesPage(){
    const [allmovies, setAllMovies]=useState([])
     const modalState= useSelector((state)=>state.modal)
    
    
     useEffect(()=>{
        const getMovies=async()=>{
            
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

export default allMoviesPage;
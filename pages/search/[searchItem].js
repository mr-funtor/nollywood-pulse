import {useState,useEffect} from 'react';
import styles from '../../styles/PersonalReviews.module.css';
import {useRouter} from 'next/router';

//components
import RecentCard from '../../components/RecentCard';
import Loader from '../../components/LoadingModal';

//firebase
import { collection, doc,query,getDocs,where } from "firebase/firestore"; 
import {db} from '../../config/firebase.config';

function SearchPage(){
    const [theSearchedList, setTheSearchedList]=useState(null);
    const router= useRouter();
    
    
    //this changes words to sentence Case since all movie titles are in sentence case
    function titleCase(str) {
        return str.toLowerCase().split(' ').map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
              }).join(' ');
    }
    
    useEffect(()=>{
        const searchForMovie=async()=>{
            try{
                //fetch the data for the single movie
                const searchItem= router.query.searchItem;
                const searchingWord= titleCase(searchItem);
                const docRef = collection(db, "movies");
                const q = query(docRef, where("title", "==", searchingWord));
//                console.log(searchItem,'uyt')
                const data= await getDocs(q);
                const movieSearched=data.docs.map((doc)=>{
                    return{id:doc.id,...doc.data()}
                })

                setTheSearchedList(movieSearched)
//                console.log(theSearchedList)
            }catch(error){
                console.log(error)
            }
        }
        
        searchForMovie()
    },[router.query.searchItem])
    
    
    //shows the loading screen when movies and reviews are being fetched
    if(theSearchedList===null)return <Loader/>
    
    
    return(
    <section className={styles.pageContainer} >
        
        <section id={styles.pageSection}>
            <h1>Search Result</h1>
                
            <div className={styles.reviewsContainer}>
            {
                theSearchedList.length===0 ? <h3>No Movies Found</h3> : theSearchedList.map((movie)=>{
                    return <RecentCard key={movie.id} movie={movie}/>
                })
            }
            </div>
                
        </section>
        
    </section>
    )
}

export default SearchPage;
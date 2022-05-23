import Image from 'next/image';
import heroPic from '../assets/images/oct.jpg';
import styles from '../styles/RecentCard.module.css';
import {useDispatch} from 'react-redux';
import {openModal} from '../features/modalState';
import Link from 'next/link';
//import {useRef} from 'react';
import {useRouter} from 'next/router';

function recentCards(){
    const router =useRouter()
    const dispatch =useDispatch();
    
    const switchToSingleMovie=(e)=>{ if(e.target.dataset.type==='overlay')router.push("/explore-movies/one-movie")
       
    }
    return(
        <article  className={styles.singleCard} onClick={(e)=>switchToSingleMovie(e)}>
            <div className={styles.imageContainer}>
                <Image className={styles.theImage} src={heroPic}
        alt="a picture for the movie" layout="fill"/>
            </div>
        
            <div className={styles.ratingsBox}>
                
                <i >+</i>
            </div>
            
      
            <div data-type="overlay" className={styles.overlay}>
                <footer className={styles.overlayFooter}>
                    <p data-type="see">October 1</p>
                    <div>
                        <i>****</i>
                        <p>4.5</p>
                    </div>
                    <button onClick={()=>dispatch(openModal())}>Give Rating/Review</button>
                </footer>
            </div>
        </article>
    )
}

export default recentCards;
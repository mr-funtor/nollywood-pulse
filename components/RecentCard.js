import Image from 'next/image';
import heroPic from '../assets/images/oct.jpg';
import styles from '../styles/RecentCard.module.css';

function recentCards(){
    return(
        <article className={styles.singleCard}>
            <div className={styles.imageContainer}>
                <Image className={styles.theImage} src={heroPic}
        alt="a picture for the movie" layout="fill"/>
            </div>
        
            <div className={styles.ratingsBox}>
                
                <i>+</i>
            </div>
            
      
            <div className={styles.overlay}>
                <footer className={styles.overlayFooter}>
                    <p>October 1</p>
                    <div>
                        <i>****</i>
                        <p>4.5</p>
                    </div>
                    <button>Give Rating/Review</button>
                </footer>
            </div>
        </article>
    )
}

export default recentCards;
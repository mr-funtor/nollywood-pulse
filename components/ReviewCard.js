import Image from 'next/image';
import heroPic from '../assets/images/oct.jpg';
import styles from '../styles/ReviewCard.module.css';
import Link from 'next/link'

function ReviewCard(){
    return(
        <Link href="/allreviews/sull">
        <article className={styles.singleCard}>
            <header className={styles.singleCardHeader}>
                
                <div className={styles.personInfo}>
                    <div className={styles.imageContainer}>
                                <Image className={styles.theImage} src={heroPic}
                        alt="a picture for the movie" layout="fill"/>


                    </div>
                
                    <div className={styles.namebox}>
                       <p>Review by</p> 
                       <p>Tosin Ojo</p>
                        <i>****</i>
                    </div>
                </div>
                
                <div>
                    <h3 className={styles.movieTitle}>Wedding Party</h3>
                </div>
               
            </header>
        
            <footer>
                <p>ljljljd hjdk hdkh hdhjlj to kndj the ldljal ljljljd hjdk hdkh hdhjlj to kndj the ldljal
        ljljljd hjdk hdkh hdhjlj to kndj the ldljal ljljljd hjdk hdkh hdhjlj to kndj the ldljal
        <span> Read more</span></p>
            </footer>

        
        </article>
        </Link>
    )
}

export default ReviewCard;
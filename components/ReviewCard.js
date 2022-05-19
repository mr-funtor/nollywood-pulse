import Image from 'next/image';
import heroPic from '../assets/images/oct.jpg';
import styles from '../styles/ReviewCard.module.css';

function ReviewCard(){
    return(
        <article className={styles.singleCard}>
            <header className={styles.singleCardHeader}>
                
                <div className={styles.imageContainer}>
                            <Image className={styles.theImage} src={heroPic}
                    alt="a picture for the movie" layout="fill"/>
                </div>
                
                <h3>Wedding Party</h3>
                
                <div className={styles.namebox}>
                   <p>by</p> 
                   <p>Tosin Ojo</p> 
                        
                </div>
        
                <i>****</i>
                
                
            </header>
        
            <footer>
                <p>ljljljd hjdk hdkh hdhjlj to kndj the ldljal ljljljd hjdk hdkh hdhjlj to kndj the ldljal
        ljljljd hjdk hdkh hdhjlj to kndj the ldljal ljljljd hjdk hdkh hdhjlj to kndj the ldljal
        <span> Read more</span></p>
            </footer>

        
        </article>
    )
}

export default ReviewCard;
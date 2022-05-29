import Image from 'next/image';
import heroPic from '../assets/images/oct.jpg';
import styles from '../styles/ReviewCard.module.css';
import Link from 'next/link'

function ReviewCard({review}){
    const {author,authorImage, movieId, movieTitle,rating,text,id}=review
    return(
        <Link href={`/allreviews/${id}`}>
        <article className={styles.singleCard}>
            <header className={styles.singleCardHeader}>
                
                <div className={styles.personInfo}>
                    <div className={styles.imageContainer}>
                                <Image className={styles.theImage} src={authorImage}
                        alt="a picture for the movie" layout="fill"/>


                    </div>
                
                    <div className={styles.namebox}>
                       <p>Review by</p> 
                       <p>{author}</p>
                        <i>****</i>
                    </div>
                </div>
                
                <div>
                    <h3 className={styles.movieTitle}>{movieTitle}</h3>
                </div>
               
            </header>
        
            <footer>
                <p>{text.slice(0,70)}
        <span> ...</span></p>
            </footer>

        
        </article>
        </Link>
    )
}

export default ReviewCard;
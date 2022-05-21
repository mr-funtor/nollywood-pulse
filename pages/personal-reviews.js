import styles from '../styles/PersonalReviews.module.css';
import ReviewCard from '../components/ReviewCard';

function PersonalReviewsPage(){
    return(
        <section className={styles.pageContainer}>
            <section>
                <h1>Your Reviews</h1>
                
                <div className={styles.reviewsContainer}>
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                </div>
                
            </section>
        
        </section>
    
    )
}

export default PersonalReviewsPage;
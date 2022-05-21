import styles from '../../styles/PersonalReviews.module.css';
import RecentCard from '../../components/RecentCard';

function allMoviesPage(){
    return(
        <section className={styles.pageContainer}>
            <section id={styles.pageSection}>
                <h1>Movies To Review</h1>
                
                <div className={styles.reviewsContainer}>
                    <RecentCard />
                    <RecentCard />
                    <RecentCard />
                    <RecentCard />
                </div>
                
            </section>
        
        </section>
    
    )
}

export default allMoviesPage;
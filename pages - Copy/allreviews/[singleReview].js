import styles from '../../styles/SingleReview.module.css';
import Image from 'next/image';
import tempBlood from '../../assets/images/blood.jpg';

function singleReview(){
    
    
    return(
    <section className={styles.reviewContainer}>
        <aside className={styles.reviewAside}>
            <div className={styles.imageContainer}>
                <Image className={styles.theImage} placeholder="blur"  src={tempBlood} alt="a picture for the movie" layout="fill"/>
              </div>
                <p>Tope Alabi</p>
                <p>Rated this movie</p>
                <i>*****</i>
        </aside>
            
        <article className={styles.reviewBody}>
            <h1>Wedding Party</h1>
            
            <p>lorem_s3 hsjkjf skfkh sakhkdhk akkdjk
            shkjhskjkij skjkdj sjkj jksjis dfd jiajk skjkdkjkj lorem_s3 hsjkjf skfkh sakhkdhk akkdjk
            shkjhskjkij skjkdj sjkj jksjis d jiajk skjkdkjkj lorem_s3 hsjkjf skfkh sakhkdhk akkdjk
            shkjhskjkij skjkdj sjkj jksjis dfd jiajk skjkdkjkj lorem_s3 hsjkjf skfkh sakhkdhk akkdjk
            shkjhskjkij skjkdj sjkj jksjis jiajk skjkdkjkj lorem_s3 hsjkjf skfkh sakhkdhk akkdjk
            shkjhskjkij skjkdj sjkj jksjis jiajk skjkdkjkj</p>
            
            {/*<button> Check Another Review</button>*/}
            
        </article>
    </section>
    ) 
}

export default singleReview;
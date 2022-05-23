import {useRouter} from 'next/router';
import Image from 'next/image';
import tempBlood from '../../assets/images/blood.jpg';
import styles from '../../styles/SingleMovie.module.css';
import ReviewCard from '../../components/ReviewCard';

function Movie(){
    const router=useRouter();
    const singleMovie= router.query.singleMovie;
    
    return(
        <main>
            <section className={styles.topSection}>
                <div className={styles.imageContainer}>
                 <Image className={styles.theImage} placeholder="blur"  src={tempBlood} alt="a picture for the movie" layout="fill"/>
              </div>
        
                 <section className={styles.heroCover}>
                    <h1>* * * * </h1>
                </section>
        
        
            </section>
            
            <section className={styles.movieBody}>
                <div className={styles.movieBodyTop}>
                    <h1>WEDDING PARTY</h1>
                    <div className={styles.actionArea}>
                        <a href="https://www.youtube.com/watch?v=r9sSydb5ec8" target="_blank"><button>Watch Trailer <i>></i></button></a>
                        
                        <b>Give Review/Rating</b>
                        
                        <i>+</i>
                    </div>
                    
                    <section className={styles.synopsis}>
                        <h1>Synopsis</h1>
                    
                        <p>jldjljsl ljdljls ljsljd
                        shhd ndiid sdksoj sjdkh shkdhsk shkdh sihksos skdkhs sndkhis dhshsa skhd skdhks shdid shdhiosn sikhdo</p>
                    </section>
                    
                    <section className={styles.reviewContainer}>
                        <h1>Reviews</h1>
                        
                        <div>
                            <ReviewCard/>
                            <ReviewCard/>
                        
                        </div>
                    
                    </section>
                </div>
            
            </section>
        
        </main>
    )
}

export default Movie;

export async function getServerSideProps(context){
    const {params, query}= context;
    const {singleMovie}=params;
//    const response= await fetch(
//    `http://localhost:4000/news?category=${category}`
//    )
//    const data= await response.json();
    
    return{
        props:{
            
        }
    }
}

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import heroPic from '../assets/images/40.png'
import tempBlood from '../assets/images/blood.jpg'
import RecentCard from '../components/RecentCard'
import ReviewCard from '../components/ReviewCard'

export default function Home() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.imageContainer}>
        <Image className={styles.theImage} placeholder="blur"  src={tempBlood} alt="a picture for the movie" layout="fill"/>
      </div>
      
      <section className={styles.heroCover}>
        <div className={styles.heroCoverBox}>
            <div className={styles.coverTop}>
                <h1>Blood Sisters</h1>
                <div>
                    <i>*****</i>
                    <p><span>3.4</span>/5</p>
                </div>
            </div>

            <p>jdouf dkljlfdjld dljlfjdojl jdojojfodjf
          ndnlkn sndnl dnlfdnlsjdouf dkljlfdjld dljlfjdojl jdojojfodjf
          ndnlkn sndnl dnlfdnlsjdouf dkljlfdjld dljlfjdojl jdojojfodjf
          ndnlkn sndnl dnlfdnlsjdouf dkljlfdjld dljlfjdojl jdojojfodjf
          ndnlkn sndnl dnlfdnls</p>

            <button>Watch Trailer <i>></i></button>
        </div>
      
        <div className={styles.floater}>
            <ul>
                <li className={styles.active}></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
      
        </div>
      </section>
      
      <section className={styles.secondSection}>
      
        <section className={styles.recentContainer}>
            <div className={styles.recentHeader}>
                <h1>Recent Movies</h1>
                <p>See More</p>
            </div>
            
            <div className={styles.cardsContainer}>
                <RecentCard />
                <RecentCard />
                <RecentCard />
                <RecentCard />
            </div>
        </section>
      
        <section className={styles.recentContainer2}>
            <div className={styles.recentHeader}>
                <h1>Recent Reviews</h1>
                <p>See More</p>
            </div>
            
            <div className={styles.cardsContainer}>
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
            </div>
        </section>
      
      
      </section>
      
    </section>
  )
}

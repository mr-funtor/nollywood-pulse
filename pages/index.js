import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import heroPic from '../assets/images/40.png'
import tempBlood from '../assets/images/blood.jpg'
import RecentCard from '../components/RecentCard'

export default function Home() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.imageContainer}>
        <Image className={styles.theImage} placeholder="blur"  src={tempBlood} alt="a picture for the movie" layout="fill"/>
      </div>
      
      <section className={styles.heroCover}>
        <div className={styles.coverTop}>
            <h1>Blood Sisters</h1>
            <div>
                <i>*****</i>
                <p><span>3.4</span>/5</p>
            </div>
        </div>
      
        <p>jdouf dkljlfdjld dljlfjdojl jdojojfodjf
      ndnlkn sndnl dnlfdnls</p>
      
        <button>Watch Trailer</button>
      
      </section>
      
      <section className={styles.secondSection}>
      
        <section className={styles.recentContainer}>
            <h1>Recent Movies</h1>
            <div className={styles.cardsContainer}>
                <RecentCard />
                <RecentCard />
                <RecentCard />
                <RecentCard />
            </div>
        </section>
      
      
      </section>
    </section>
  )
}

import React from 'react'
import {useEffect} from 'react';
import Head from 'next/head'
import Image from 'next/image';
import styles from '../styles/Home.module.css'
import heroPic from '../assets/images/40.png'
import tempBlood from '../assets/images/blood.jpg'
import RecentCard from '../components/RecentCard'
import ReviewCard from '../components/ReviewCard';
import Modal from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserXmark,
    faCaretRight,
    faStar
}from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

//redux
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {switcher} from '../features/navState';


export default function Home() {
    const dispatch= useDispatch();
    const modalState= useSelector((state)=>state.modal)

//this changes the color of the nav items in the side bar
    useEffect(()=>{
        dispatch(switcher('Home'))
    },[])    
    
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
                    <i>
                        <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
                    </i>
                    <p><span>3.4</span>/5</p>
                </div>
            </div>

            <p>jdouf dkljlfdjld dljlfjdojl jdojojfodjf
          ndnlkn sndnl dnlfdnlsjdouf dkljlfdjld dljlfjdojl jdojojfodjf
          ndnlkn sndnl dnlfdnlsjdouf dkljlfdjld dljlfjdojl jdojojfodjf
          ndnlkn sndnl dnlfdnlsjdouf dkljlfdjld dljlfjdojl jdojojfodjf
          ndnlkn sndnl dnlfdnls</p>

            <a href="https://www.youtube.com/watch?v=r9sSydb5ec8" target="_blank"><button>Watch Trailer <i>
            <FontAwesomeIcon icon={faCaretRight} />
      </i></button></a>
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
                <Link href="/explore-movies"><p>See More</p></Link>
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
                <Link href="/allreviews"><p>See More</p></Link>
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
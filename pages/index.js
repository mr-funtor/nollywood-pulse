import React from 'react'
import {useState,useEffect} from 'react';
import Head from 'next/head'
import Image from 'next/image';
import styles from '../styles/Home.module.css'
import heroPic from '../assets/images/40.png'
import tempBlood from '../assets/images/blood.jpg'
import RecentCard from '../components/RecentCard'
import ReviewCard from '../components/ReviewCard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserXmark,
    faCaretRight,
    faStar
}from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import Loader from '../components/LoadingModal';

//redux
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {switcher} from '../features/navState';


//firebase
import { collection, getDocs,query,limit } from "firebase/firestore"; 
import {db} from '../config/firebase.config';

export default function Home() {
    const [allmovies, setAllMovies]=useState([])
    const [allreviews, setAllReviews]=useState([])
    const dispatch= useDispatch();
    const modalState= useSelector((state)=>state.modal)
    
    

    useEffect(()=>{
        //this changes the color of the nav items in the side bar
        dispatch(switcher('Home'))
        
        
        const getMovies=async()=>{
            
            try{
                //gets movie data for the second sectionfrom firebase
            const movRef = collection(db, "movies");
            const q= query(movRef, limit(8) )
             const hut= await getDocs(q);
            const moviesData=hut.docs.map((doc) => {
              return  {id:doc.id,...doc.data()}
            })
            
            //get the reviews
            const reviewRef=collection(db, "reviews");
            const q2= query(reviewRef, limit(6) )
            const packedReviews= await getDocs(q2);
            const reviewsData=packedReviews.docs.map((doc) => {
                console.log({...doc.data()})
              return  {id:doc.id,...doc.data()}
            })
            
        setAllMovies(moviesData)   
        setAllReviews(reviewsData)   
                
            }catch(error){
                console.log(error)
            }
        
        }

        getMovies()
        
    },[]) 
    
    if(allmovies.length===0)return <Loader/>
    
  return (
    <section className={styles.heroSection}>
      
      
      <div className={styles.imageContainer}>
        <Image className={styles.theImage}  src={allmovies[0].image} alt="a picture for the movie" layout="fill"/>
      </div>
      
      <section className={styles.heroCover}>
        <div className={styles.heroCoverBox}>
            <div className={styles.coverTop}>
                <h1>{allmovies[0].title}</h1>
                <div>
                    <i className={allmovies[0].rating >=1?styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                    <i className={allmovies[0].rating >=2?styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                    <i className={allmovies[0].rating >=3?styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                    <i className={allmovies[0].rating >=4?styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                    <i className={allmovies[0].rating >=5?styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                    <p><span>{allmovies[0].rating}</span>/5</p>
                </div>
            </div>

            <p>{allmovies[0].description}
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
            {
            allmovies.map((movie)=>{
      
            return <RecentCard key={movie.id} movie={movie}/>
  })
      }
                
            </div>
        </section>
      
        <section className={styles.recentContainer2}>
            <div className={styles.recentHeader}>
                <h1>Recent Reviews</h1>
                <Link href="/allreviews"><p>See More</p></Link>
            </div>
            
            <div className={styles.cardsContainer}>
                {
                allreviews.map((review)=>{
                return <ReviewCard key={review.id} review={review} />
                
            })
            }
                
            </div>
        </section>
      
      
      </section>
      
    </section>
  )
}

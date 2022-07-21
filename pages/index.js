import React from 'react'
import {useState,useEffect} from 'react';
import Head from 'next/head'
import Image from 'next/image';
import styles from '../styles/Home.module.css'
import heroPic from '../assets/images/40.png'
import tempBlood from '../assets/images/blood.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserXmark,
    faCaretRight,
    faStar
}from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import useSWR from 'swr'

//component
import RecentCard from '../components/RecentCard'
import ReviewCard from '../components/ReviewCard';
import Loader from '../components/LoadingModal';

//redux
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {switcher} from '../features/navState';


//firebase
import { collection, getDocs,query,limit } from "firebase/firestore"; 
import {db} from '../config/firebase.config';


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
                
              return  {id:doc.id,...doc.data()}
            })
            
            
            return [moviesData,reviewsData]
   
                
            }catch(error){
                console.log(error)
            }
        
        }
console.log('can')
export default function Home() {
    const [inMount,setInMount]=useState(false)
    const{data, error}=useSWR('indexPage',getMovies);
    
//    const [allmovies, setAllMovies]=useState(data[0])
//    const [allreviews, setAllReviews]=useState(data[1])
    const dispatch= useDispatch();
    const modalState= useSelector((state)=>state.modal)
    
    
//    const [allmovies, allreviews]=data;

    useEffect(()=>{
        //this changes the color of the nav items in the side bar
        dispatch(switcher('Home'))
//        setAllMovies(d)
    },[dispatch]) 
    
    
   if(!data)return <Loader/>
//    return console.log(data)
    
  return (
    <main>

        <section className={styles.heroSection}>
          <div className={styles.imageContainer}>
            <Image className={styles.theImage}  src={data[0][0].image} alt="a picture for the movie" layout="fill"/>
          </div>

          <section className={styles.heroCover}>
            <div className={styles.heroCoverBox}>
                <div className={styles.coverTop}>
                    <h1>{data[0][0].title}</h1>
                    <div>
                        <i className={data[0][0].rating >=1?styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                        <i className={data[0][0].rating >=2?styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                        <i className={data[0][0].rating >=3?styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                        <i className={data[0][0].rating >=4?styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                        <i className={data[0][0].rating >=5?styles.active :''}><FontAwesomeIcon icon={faStar} /></i>
                        <p><span>{data[0][0].rating}</span>/5</p>
                    </div>
                </div>

                <p>{data[0][0].description}</p>

                <a href={data[0][0].youtubeUrl} target="_blank" rel="noreferrer">
                    <button>
                    Watch Trailer <i>
                        <FontAwesomeIcon icon={faCaretRight} />
                  </i>
                    </button>
                </a>
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
        </section>
            
      <section className={styles.secondSection}>
      
        <section className={styles.recentContainer}>
            <div className={styles.recentHeader}>
                <h1>Recent Movies</h1>
                <Link href="/explore-movies"><p>See More</p></Link>
            </div>
            
            <div className={styles.cardsContainer}>
            {
            data[0].map((movie)=>{
      
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
                data[1].map((review)=>{
                return <ReviewCard key={review.id} review={review} />
                
            })
            }
                
            </div>
        </section>
      
      
      </section>
      
    </main>
  )
}

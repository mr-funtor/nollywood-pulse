import Link from 'next/link';
import styles from '../styles/Modal.module.css';
import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {closeModal} from '../features/modalState';
import {useEffect} from 'react';
import {useRouter} from 'next/router';

function Modal(){
    const router=useRouter();
    const dispatch= useDispatch();
    const [hasRated, setHasRated]=useState(false);
    const modalState= useSelector((state)=>state.modal)
    
    useEffect(()=>{
        //this closes the modal when the page changes
        const handleRouteChange = (url, { shallow }) => {
    
            if(modalState)dispatch(closeModal())
    }
        //this watches for when the page route changes
        router.events.on('routeChangeStart', handleRouteChange)
        
        
         // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
    },[])
    
    
    
    return(
        <>
        {modalState && (<section className={styles.modal}>
            <button onClick={()=>dispatch(closeModal())}>Close</button>
        <div>
            <h1 onClick={()=>setHasRated(true)}>* * * * *</h1>
            <textarea placeholder="What's your review? (optional)" maxLength="500">
            
            </textarea>
            
            <footer>
                <button className={!hasRated ? `${styles.inactive}` :''}
                    onClick={()=>dispatch(closeModal())}
                    >Post</button>
            </footer>
            
            
        </div>
        
    </section>)}
    </>
    )
}

export default Modal;
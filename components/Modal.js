import Link from 'next/link';
import styles from '../styles/Modal.module.css';
import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {closeModal} from '../features/modalState'

function Modal(){
    const dispatch= useDispatch();
    const [hasRated, setHasRated]=useState(false);
    const modalState= useSelector((state)=>state.modal)
    
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
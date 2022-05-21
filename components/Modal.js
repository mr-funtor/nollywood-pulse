import Link from 'next/link';
import styles from '../styles/Modal.module.css';
import {useDispatch} from 'react-redux';
import {closeModal} from '../features/modalState'

function Modal(){
    const dispatch= useDispatch()
    
    return(
    <section className={styles.modal}>
            <button onClick={()=>dispatch(closeModal())}>Close</button>
        <div>
            <h1>* * * * *</h1>
            <input type="textarea" placeholder="What's your review? (optional)"/> 
            
        </div>
        
    </section>
    
    )
}

export default Modal;
import Link from 'next/link';
import styles from './DeleteModal.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse
} from "@fortawesome/free-solid-svg-icons";

function Modal({deleteThisReview, setShowModal}){
    
    return(
        <section className={styles.modalContainer}>
           
               <h2>Are you sure you want to delete?</h2>
                
                <div className={styles.actionsBox}>
                    <button onClick={()=>setShowModal(false)}>Cancel</button>
                    <button onClick={()=>deleteThisReview()}>Delete</button>
                </div>
           
        </section>
    
    )
}

export default Modal;
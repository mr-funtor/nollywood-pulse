import Link from 'next/link';
import styles from './LoadingModal.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse
} from "@fortawesome/free-solid-svg-icons";

function Modal(){
    
    return(
<section className={styles.spinnerContainer}>
        
       <div className={styles.lds_facebook}><div></div><div></div><div></div></div> 
</section>
    
    )
}

export default Modal;
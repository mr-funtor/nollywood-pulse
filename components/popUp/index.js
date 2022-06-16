import {useState,useEffect} from 'react';
import styles from './popUp.module.css'

//redux
import {useSelector,useDispatch} from 'react-redux';
import {showing,notShowing} from '../../features/popUpState';


function PopUp(){
//    const [message,setMessage]=useState('Movie added to watchlist')
    const {isPoped,message}=useSelector((state)=>state.popUp);
    
    useEffect(()=>{
        
    },[isPoped])
    
   return(
    <>
        {isPoped && <div className={styles.container}>
           {message}
        </div>}
    </>
    ) 
}

export default PopUp;
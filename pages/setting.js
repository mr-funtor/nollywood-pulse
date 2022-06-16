import {useState,useEffect} from 'react';
import styles from '../styles/Setting.module.css';
import {useRouter} from 'next/router';

//redux
import {useDispatch,useSelector} from 'react-redux';
import {switcher} from '../features/navState';

//firebase
import {db,auth} from '../config/firebase.config';


function Setting(){
    const user=auth.currentUser;
    const [name, setName]=useState(user.providerData[0].displayName)
    const [email, setEmail]=useState(user.providerData[0].email);
    const  dispatch= useDispatch();
    const router= useRouter();
    
    //if the user is not logged in, the user is redirected to a signin page
    const loginState= useSelector((state)=>state.login);
    
    
   
    useEffect(()=>{
         //this changes the color of the nav items in the side bar
        dispatch(switcher('Setting'));
        
        //check if the user is logged in
        if(!loginState){
            router.push('/signin')
            return
        }
        
        
        if(user === null)return router.push('/signin');
        
        
    },[dispatch,router,loginState,user])
    
    
    return(
        <section className={styles.pageContainer}>
            <h1>Account</h1>
            
            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={name}
                       onChange={(e)=>setName(e.target.value)} />
                </div>
                
                <div>
                    <label htmlFor="name">Email</label>
                    <input type="text" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                
                {false && <div className={styles.actionsBox}>
                    <button>Cancel</button>
                    <button>Save</button>
                </div>}
                
                
        
            </form>
        
        </section>
    
    )
}

export default Setting;

    

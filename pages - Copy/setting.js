import {useState,useEffect} from 'react';
import styles from '../styles/Setting.module.css';
import {useRouter} from 'next/router';

//redux
import {useDispatch,useSelector} from 'react-redux';
import {switcher} from '../features/navState';

function Setting(){
    const [name, setName]=useState('Charles')
    const [email, setEmail]=useState('guan@gmail');
    const  dispatch= useDispatch();
    const router= useRouter()
    
    //if the user is not logged in, the user is redirected to a signin page
    const loginState= useSelector((state)=>state.login);
    
    //this changes the color of the nav items in the side bar
    useEffect(()=>{
        dispatch(switcher('Setting'));
        if(!loginState){
        router.push('/signin')
        return
    }
    },[])
    
    
    return(
        <section className={styles.pageContainer}>
            <h1>Account</h1>
            
            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={name}
                        onChange={(e)=>setName(e.target.value)}/>
                </div>
                
                <div>
                    <label htmlFor="name">Email</label>
                    <input type="text" id="email" value={email}
                        onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                
                <div>
                    <button>Cancel</button>
                    <button>Save</button>
                </div>
                
                
        
            </form>
        
        </section>
    
    )
}

export default Setting;

    

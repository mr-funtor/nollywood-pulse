import {useState} from 'react';
import styles from '../styles/Setting.module.css';


function Setting(){
    const [name, setName]=useState('Charles')
    const [email, setEmail]=useState('guan@gmail')
    
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
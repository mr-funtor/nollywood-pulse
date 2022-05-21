import {useState} from 'react'
import styles from '../styles/Sidebar.module.css';
import Link from 'next/link';
import { useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {closeSide} from '../features/sideClose';

const theLinks=[
    {
        id:1,
        name:'MENU',
        subs:{
            first:''
        }
    }
]

function Sidebar(){
    const shower= useSelector((state)=>state.sideBar);
    const dispatch=useDispatch()
    
    const [isHidden, setIsHidden]=useState(styles.stayHidden);
    const [presentPage,setPresentpage]=useState('Your')
    
    return(
    <nav className={`${styles.sidebar} ${shower}`}>
            <button onClick={()=>dispatch(closeSide())}>Click</button>
        
        <div className={styles.categoriesBox}>    
            <section>
                <h3>MENU</h3>
                    <div>
                        <i>*</i>
                        <Link href='/'>
                            <a className={presentPage==='Home' ? styles.active : ''}>Home</a>
                        </Link>
                    </div>

                    <div>
                        <i>*</i>
                        <Link href='/allreviews'>
                            <a
                                className={presentPage==='Reviews' ? styles.active : ''}>Reviews</a>
                        </Link>
                    </div>

                    <div>
                        <i>*</i>
                        <Link href='/explore-movies'>
                            <a
                                className={presentPage==='Explore' ? styles.active : ''}>Explore Movies</a>
                        </Link>
                    </div>

            </section>

            <section>
                <h3>DASHBOARD</h3>
                    <div>
                        <i>*</i>
                        <Link href='/personal-reviews'>
                            <a className={presentPage==='Your' ? styles.active : ''}>Your Reviews</a>
                        </Link>
                    </div>

                    <div>
                        <i>*</i>
                        <Link href='/watchlist'>
                            <a className={presentPage==='watch' ? styles.active : ''}>Watchlist</a>
                        </Link>
                    </div>

            </section>

            <section>
                <h3>GENERAL</h3>
                    <div>
                        <i>*</i>
                        <Link href='/setting'>
                            <a
                                className={presentPage==='Setting' ? styles.active : ''}
                                >Setting</a>
                        </Link>
                    </div>

                    <div>
                        <i>*</i>
                        <Link href='/'>
                            <a className={presentPage==='Login' ? styles.active : ''}>Login</a>
                        </Link>
                    </div>

            </section>    
        </div>    
         
        
       
        
    </nav>
    
    )
}

export default Sidebar;
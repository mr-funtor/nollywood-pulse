import {useState} from 'react';
import styles from '../styles/Dashboard.module.css';

function UpdateComponent({uploadMovieDetails,synopsis, setSynopsis,releaseYear, setReleaseYear,theImage,setTheImage,theMovieTitle, setTheMovieTitle}){
//    const [theMovieTitle, setTheMovieTitle]=useState('');
//    const [synopsis, setSynopsis]=useState('');
//    const [releaseYear, setReleaseYear]= useState(0);
//    const [theImage,setTheImage]=useState(null);
    
    const takeHoldOfImage=(theFile)=>{
        setTheImage(theFile);
    }
    
    return(
    <form onSubmit={(e)=>{e.preventDefault(),uploadMovieDetails(theMovieTitle,synopsis,releaseYear,theImage)}
        }>
        <section>
            <div>
                <label htmlFor="movie">Movie Title</label>
                <input id="movie" type="text" value={theMovieTitle} onChange={(e)=>setTheMovieTitle(e.target.value)} required/>
            </div>
            
            <div>
                <label htmlFor="poster">Upload Poster Image</label>
                <input id="poster" type="file" name="poster" accept="image/png, image/jpeg" 
                
                onChange={(e)=>takeHoldOfImage(e.target.files[0])}
        required/>
            </div>
            
            <div>
                <label htmlFor="plot">Synopsis/Plot</label>
                <textarea id="plot" 
                    placeholder="write a brief summary of the movie"
                    value={synopsis} 
                    onChange={(e)=>setSynopsis(e.target.value)}></textarea>
            </div>
            
            <div>
                <label htmlFor="year">Release Year</label>
                 <input id="year" 
                     type="number"
                     value={releaseYear}
                     onChange={(e)=>setReleaseYear(e.target.value)}
                     required/>
            </div>
            
        </section>
    
            <div className={styles.actionArea}>
                <button>Cancel</button>
                <button type="submit" >Save</button>
            </div>
        
        
        
    </form>
    
    )
}

export default UpdateComponent;
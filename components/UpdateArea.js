import styles from '../styles/Dashboard.module.css';

function UpdateComponent(){
    return(
    <section >
        <section>
            <div>
                <label htmlFor="movie">Movie Title</label>
                <input id="movie" type="text" required/>
            </div>
            
            <div>
                <label htmlFor="poster">Upload Poster Image</label>
                <input id="poster" type="file" required/>
            </div>
            
            <div>
                <label htmlFor="plot">Synopsis/Plot</label>
                <textarea id="plot" placeholder="write a brief summary of the movie"></textarea>
            </div>
            
            <div>
                <label htmlFor="year">Release Year</label>
                 <input id="year" type="text" required/>
            </div>
            
        </section>
    
            <div className={styles.actionArea}>
                <button>Cancel</button>
                <button>Save</button>
            </div>
        
        
        
    </section>
    
    )
}

export default UpdateComponent;
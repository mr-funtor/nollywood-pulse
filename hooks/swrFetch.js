
const fetcher= async (...args)=>{
    const response= await fetch(...args);
    
    return response;
}

export default fetcher;
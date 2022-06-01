import {createSlice} from '@reduxjs/toolkit';

const initialStateValue={
    id:'',
    title:'',
//    rating:0
};

export const ratingSlice= createSlice({
    name:'rating',
    initialState:initialStateValue
    ,
    reducers:{
        fillMovieId:(state,action)=>{
            console.log('click',action.payload)
            return state= {...action.payload};
        },
        unfill:(state,action)=>{
            
            return state= initialStateValue;
        }
     },
})

//the actions
export const {fillMovieId,unfill}=ratingSlice.actions;

export default ratingSlice.reducer;
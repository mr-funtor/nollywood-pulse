import {createSlice} from '@reduxjs/toolkit';

const initialStateValue={
    id:'',
    title:''
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
     },
})

//the actions
export const {fillMovieId}=ratingSlice.actions;

export default ratingSlice.reducer;
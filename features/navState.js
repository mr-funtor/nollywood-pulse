import {createSlice} from '@reduxjs/toolkit';

const initialStateValue='Home';

export const navSlice= createSlice({
    name:'nav',
    initialState:initialStateValue
    ,
    reducers:{
        switcher:(state,action)=>{
           
            return state= action.payload;
        },
     },
})

//the actions
export const {switcher}=navSlice.actions;

export default navSlice.reducer;
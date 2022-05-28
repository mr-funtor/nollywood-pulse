import {createSlice} from '@reduxjs/toolkit';

const initialStateValue=false;

export const loginSlice= createSlice({
    name:'login',
    initialState:initialStateValue
    ,
    reducers:{
        login:(state,action)=>{
            console.log('logged IN redus')
            return state= true;
        },
        logout:(state,action)=>{
          console.log('logging out redus')
           return state= false;
        },
     },
})

//the actions
export const {login,logout}=loginSlice.actions;

export default loginSlice.reducer;
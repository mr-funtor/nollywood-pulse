import {createSlice} from '@reduxjs/toolkit';
import styles from '../styles/Sidebar.module.css';

const initialStateValue=styles.stayHidden;

export const sideSlice= createSlice({
    name:'sideboard',
    initialState:initialStateValue
    ,
    reducers:{
        openSide:(state,action)=>{
            
            return state= styles.show;
        },
        closeSide:(state,action)=>{
           return state= styles.stayHidden;
        },
     },
})

//the actions
export const {openSide,closeSide}=sideSlice.actions;

export default sideSlice.reducer;
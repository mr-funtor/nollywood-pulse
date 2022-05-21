import {createSlice} from '@reduxjs/toolkit';
import styles from '../styles/Sidebar.module.css';

const initialStateValue=true;

export const modalSlice= createSlice({
    name:'modal',
    initialState:initialStateValue
    ,
    reducers:{
        openModal:(state,action)=>{
            
            return state= true;
        },
        closeModal:(state,action)=>{
           return state= false;
        },
     },
})

//the actions
export const {openModal,closeModal}=modalSlice.actions;

export default modalSlice.reducer;
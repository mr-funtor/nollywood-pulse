import {createSlice} from '@reduxjs/toolkit';

const initialStateValue={
    isOpen:false,
    hasRated:false,
};

export const modalSlice= createSlice({
    name:'modal',
    initialState:initialStateValue
    ,
    reducers:{
        openModal:(state,action)=>{
            
            return state= {...state,isOpen:true};
        },
        closeModal:(state,action)=>{
            
           return state= {...state,isOpen:false};
        },
        makeRated:(state,action)=>{
            return state= {...state,hasRated:true};
        },
        notRated:(state,action)=>{
            return state= {...state,hasRated:false};
        }
     },
})

//the actions
export const {openModal,closeModal,makeRated,notRated}=modalSlice.actions;

export default modalSlice.reducer;
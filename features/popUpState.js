import {createSlice} from '@reduxjs/toolkit';

const initialStateValue={
    isPoped:false,
    message:'',
};

export const popUpSlice= createSlice({
    name:'popUp',
    initialState:initialStateValue
    ,
    reducers:{
        showing:(state,action)=>{
            
            return state= {isPoped:true, message:action.payload};
        },
        notShowing:(state,action)=>{
         
           return state= initialStateValue;
        },
     },
})

//the actions
export const {showing,notShowing}=popUpSlice.actions;

export default popUpSlice.reducer;
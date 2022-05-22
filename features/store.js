import {configureStore} from '@reduxjs/toolkit';
import sideReducer from './sideClose';
import ModalReducer from './modalState';


const store=configureStore({
    reducer:{
        sideBar:sideReducer,
        modal:ModalReducer
    }
})

export default store;
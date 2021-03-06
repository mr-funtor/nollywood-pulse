import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import '../styles/globals.css';
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Modal from "../components/Modal";
import PopUp from "../components/popUp";

//swr
import { SWRConfig } from 'swr'
import fetcher from '../hooks/swrFetch'

//redux
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux'; 
import sideReducer from '../features/sideClose';
import ModalReducer from '../features/modalState';
import LoginReducer from '../features/login';
import NavReducer from '../features/navState';
import RatingReducer from '../features/ratingState';
import popUpReducer from '../features/popUpState';


const store=configureStore({
    reducer:{
        sideBar:sideReducer,
        modal:ModalReducer,
        login:LoginReducer,
        nav:NavReducer,
        rating:RatingReducer,
        popUp:popUpReducer,
    }
})

function MyApp({ Component, pageProps }) {    
    
  return( 
    <>
      <SWRConfig value={{fetcher}}>
      <Provider store={store}>
          <Navbar />
          <Sidebar/>
            <Modal/>    
            <PopUp/>    
          <Component {...pageProps} />
      </Provider >
      </SWRConfig>
    </>
      )
}

export default MyApp


import '../styles/globals.css';
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Modal from "../components/Modal";

//redux
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux'; 
import sideReducer from '../features/sideClose';
import ModalReducer from '../features/modalState';

const store=configureStore({
    reducer:{
        sideBar:sideReducer,
        modal:ModalReducer
    }
})

function MyApp({ Component, pageProps }) {
  return( 
    <>
      <Provider store={store}>
          <Navbar />
          <Sidebar/>
            <Modal/>    
          <Component {...pageProps} />
      </Provider >
    </>
      )
}

export default MyApp

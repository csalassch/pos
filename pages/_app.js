// import '@/styles/globals.css'
// import "./assets/scss/_variables.scss"
// import "./assets/scss/layout/_container.module.scss"
// import CustomizerReducer from './store/customizer/CustomizerSlice';
// import { configureStore } from '@reduxjs/toolkit';
import { Provider } from "react-redux"
import { AuthProvider } from "@/Context/AuthContext"

import "./assets/css/styles.css"
import "./assets/scss/style.scss"
import "./assets/scss/steps.scss"
import store from '@/store/Store'
import IndexPage from "../";
import Router from "next/router";
import Loader from "@/components/Loader/loader";
import { useEffect, useState } from "react";



export default function App({ Component, pageProps }) {
  
    
  const [loading, setLoading] = useState(false);

  Router.events.on('routeChangeStart', (url) => {
    console.log('Router s chnaging');
    setLoading(true);
  });
  Router.events.on('routeChangeComplete', (url) => {
    console.log('Router completeeeed!');
    setLoading(false);
  });
  return (
    <Provider store={store}>
      {loading && <Loader />}

      <AuthProvider>
        <IndexPage Component={Component} pageProps={pageProps} />
      </AuthProvider>

      {/* <div className="d-flex justify-content-between"> */}
      {/* <div className="pageWrapper d-md-block d-lg-flex">
        <aside><Sidebar /></aside>
        <div className="contentArea">

          <Component {...pageProps} />
        </div>
      </div> */}

      {/* </div> */}



    </Provider>
  )
}

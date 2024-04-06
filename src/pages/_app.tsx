import '../../styles/globals.scss'
import { Provider, useDispatch } from "react-redux";
import { createContext, useContext, useState } from 'react';
import type { AppProps } from 'next/app'
import { useService } from "../_app_service";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import c from "clsx";
import s from "./_app.module.scss";
import Header from '../components/templates/Header';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.min.css";
import Footer from '../components/templates/Footer';
// Amplify.configure(awsExports);


function App({ Component,
  pageProps }: AppProps) {
  const { store } = useService();
  const UserContext = createContext(null);
  const persistor = persistStore(store)
  const [user, setUser] = useState(null)
  return (
    <div className={s.App}>
      <div className={c(s.main, "bg-backgr2 bg-no-repeat bg-cover bg-center")}>
          <Provider store={store}>
            
              <PersistGate loading={null} persistor={persistor}>
              
                <Header />

                <div className={c(s.App_Container, "relative h-full max-h-screen overflow-hidden bg-gray-100 dark:bg-gray-800") }>
                <ToastContainer
                  position={toast.POSITION.TOP_RIGHT}
                  autoClose={5000}
                />
                  <Component className={s.Container} {...pageProps} />
                  {/* <Component style={s.Container} {...pageProps} /> */}
                </div>
                <Footer /> 
              </PersistGate>

          </Provider>
      </div>
    </div>
  );
}
export default App
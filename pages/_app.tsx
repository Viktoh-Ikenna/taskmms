import '../styles/global.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from "next-auth/react"
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers } from 'redux';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import { actions } from '../components/actions';

function MyApp({ Component, pageProps }: AppProps) {
  
interface stateProp{
  images:any[],
  videos:any[]
}

  const SubmitPostReducer = (state:stateProp={images:[],videos:[]}, action:{payload:any,type:String}):any => {
    switch (action.type) {
      case actions.storeImage:
        return {...state,images:[...state.images,action.payload ]};
      case actions.storeVideo:
          return {...state,videos: [...state.videos,action.payload ] };
      default:
        return state;
    }
  };



  const store = createStore(
    combineReducers({ SubmitPostReducer}),
    {},
    applyMiddleware(thunk)
  );
  // console.log(store.getState())
  return (
  <SessionProvider>
    <Provider store={store}>
  <Component {...pageProps} />
  </Provider>
  </SessionProvider>
  )
}

export default MyApp

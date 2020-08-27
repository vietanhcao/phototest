import React, { Suspense, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Switch, Route, Redirect, Router } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import productApi from 'api/productApi';
import { useDispatch } from 'react-redux';
import { fetchUserById } from './features/Photo/photoSlice';
import { unwrapResult } from '@reduxjs/toolkit';

import { getMe } from './app/userSlice';
import firebase from 'firebase';
import { Spinner } from 'reactstrap';


// lazy load
const Photo = React.lazy(() => import('./features/Photo/Photo'))
const Signin = React.lazy(() => import('./features/Auth/pages/Signin/Signin'))



// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // ...
};
firebase.initializeApp(config);


function App() {

  const [productList, setProductList] = useState([]);
      // The component's Local state.
  const [isSignIn, setIsSignIn] = useState(false)// Local signed-in state.

  const dispatch = useDispatch()
 

  useEffect(() => {
    // Listen to the Firebase Auth state and set the local state.
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      async (user) => {
        if(!user) return;
        try {
          const actionResult = await dispatch(getMe())
          const currentUser = unwrapResult(actionResult);
          console.log("App -> currentUser", currentUser)
        } catch (error) {
          console.log("App -> error", error)
          
        }
       

        
        // setIsSignIn(!!user);

        // const token = await user.getIdToken()
        // console.log("App -> token", token)
      }
    );
    return () => {
      // Make sure we un-register Firebase observers when the component unmounts.
      unregisterAuthObserver()
  }
  }, [])

  useEffect(() => {
    const fetchProductList = async () => {
      try {
  
        // await dispatch(fetchUserById(25010620))
        // const BBB = await unwrapResult(aaa)
        // console.log("fetchProductList -> aaa", aaa, BBB)
        
        const params = { _limit: 10, _page: 1  }; //sort_by: `desc(createdDate)`, [`code[contains]`]: "023" 
        const response = await productApi.getAll(params);
        // console.log('Fetch products successfully: ', response);
        // setProductList(response.data);
      } catch (error) {
      console.log('Failed to fetch product list: ', error);
      }
    }
    fetchProductList();
    }, [dispatch]);

  return (
    <div className="photo-app">
      <Suspense fallback={<Spinner size="sm" />} >
        <BrowserRouter>
          <Header />
          <ul>
            <li><Link to='/photos'> Go to photo page</Link></li>
            <li><Link to='/photos/add'> Go to add new photo page</Link></li>
            <li><Link to='/photos/123'> Go to Edit photo page</Link></li>
          </ul>
          
          <Switch>
            <Redirect exact from='/' to='/photos' />

            <Route path='/photos' component={Photo} />
            <Route path='/sign-in' component={Signin} />

            <Route component={NotFound} />

          </Switch>



        </BrowserRouter>

      </Suspense>
    </div>
  );
}

export default App;

import React, { Suspense, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Switch, Route, Redirect } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import productApi from 'api/productApi';
import { useDispatch } from 'react-redux';
import { fetchUserById } from './features/Photo/photoSlice';
import { unwrapResult } from '@reduxjs/toolkit';

// lazy load
const Photo = React.lazy(() => import('./features/Photo/Photo'))

function App() {

  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch()
  useEffect(() => {
  const fetchProductList = async () => {
    try {

      await dispatch(fetchUserById(25010620))
      await dispatch(fetchUserById(18808865))
      // const BBB = await unwrapResult(aaa)
      // console.log("fetchProductList -> aaa", aaa, BBB)
      
      // const params = { limit: 12, offset: 0, sort_by: `desc(createdDate)`, [`code[contains]`]: "023"   };
      // const response = await productApi.getAllTest(params);
      // console.log('Fetch products successfully: ', response);
      // setProductList(response.data);
    } catch (error) {
    console.log('Failed to fetch product list: ', error);
    }
  }
  fetchProductList();
  }, []);

  return (
    <div className="photo-app">
      <Suspense fallback={<div>... loading</div>} >
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
            <Route component={NotFound} />

          </Switch>



        </BrowserRouter>

      </Suspense>
    </div>
  );
}

export default App;

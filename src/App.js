import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Switch, Route, Redirect } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

// lazy load
const Photo = React.lazy(() => import('./features/Photo/Photo'))

function App() {
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

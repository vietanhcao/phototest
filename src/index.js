import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
// import i18n (needs to be bundled ;)) 
import './i18n';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './app/store'
import { Spinner } from 'reactstrap';

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Spinner size="sm" />} >
        <App />
      </PersistGate>
      
    </Provider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

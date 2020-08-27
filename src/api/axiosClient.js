import axios from 'axios';
import queryString from 'query-string';
import i18n from '../i18n';
import { createBrowserHistory } from 'history';
import firebase from 'firebase'

const getFirebaseToken = async () => {
  const currentUser = firebase.auth().currentUser
  if(currentUser) return currentUser.getToken();

  //not login user
  const hasRememberedAccount = localStorage.getItem('firebaseui::rememberedAccounts')
  if(!hasRememberedAccount) return null;

  //login but current user is not fetched -> wait for 10 seconds
  return new Promise((resolve, reject) =>{

    const idTimeout =  setTimeout(() => {
      reject(null)
    }, 10000);

    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      async (user) => {
        if(!user) reject(null);
        
        const token = await user.getIdToken()

        resolve(token);
        unregisterAuthObserver();
        clearTimeout(idTimeout);
      }
    );
  })


}


// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  async (config) => {
    // Handle token here ...
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers['Authorization'] = `Token ${token}`
    // }
    // const currentUser = firebase.auth().currentUser
    // if (currentUser) {
    //   const token = await currentUser.getIdToken()
    //   config.headers = {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   };
    // }

    const token = await getFirebaseToken()

    if(token){
      config.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }

    
    return config;
  },
  (error) => {
    //Do some thing 
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response) => {
    //response within the range of 2xx
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors


    const {status, data, config } = error.response;
    if (status === 401) {
      createBrowserHistory().push('/');
      // window.location.reload();
    }
    


    alert(i18n.t('Welcome to React'));
    throw error;
  },
);

export default axiosClient;

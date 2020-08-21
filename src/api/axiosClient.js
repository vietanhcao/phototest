import axios from 'axios';
import queryString from 'query-string';
import i18n from '../i18n';
import { createBrowserHistory } from 'history';


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
    config.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJteHZBZG1pbjMiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XSwiaWF0IjoxNTk2NjkyNzEyLCJleHAiOjE1OTY3MzU5MTJ9.oHl5EO-WhZ-o_qDfWoJ9Y1cqzIcN1xNKPB57QWM3tF4`,
    };
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

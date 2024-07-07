// src/axios.js
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

// Create an Axios instance
const axiosInstance = axios.create({
//   baseURL: '', // Replace with your API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent, like adding an auth token
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`
    }
    // Record start time
    config.metadata = { startTime: new Date() }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Calculate response time
    const endTime = new Date();
    const responseTime = endTime - response.config.metadata.startTime
       console.log('responseTime in AXIOS INTERCEPTOR>> ',responseTime)
    // Optionally add responseTime to the response object:
    response.headers.responseTime = responseTime;
    return response;
  },
  (error) => {
    // Do something with response error, like handling error globally
    if (error?.response?.status === 401) {
      // Handle unauthorized error
      console.log('Unauthorized, logging out...');
      // Handle Rate Limit Error
      Swal.fire({
        title: 'Error!',
        text: 'Your Login Session has ended, you will now be redirected to login page!',
        icon: 'error',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/'
        }
      })
    }
    if (error?.response?.status === 429 ) {
      // Handle Rate Limit Error
      Swal.fire({
        title: 'Error!',
        text: error?.response?.data?.error || 'Too many requests please try again later after sometime!',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

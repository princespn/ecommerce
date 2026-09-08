import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:5000/api', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem('glowbtech_token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn('Session expired or unauthorized node access. Purging token...');
      
      localStorage.removeItem('glowbtech_token');
      
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
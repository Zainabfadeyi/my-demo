import axios from "axios";
const instance = axios.create({
    baseURL:"https://demo-app-0-0-1.onrender.com"
    // baseURL:"https://final-ugy3.onrender.com"
})

instance.interceptors.request.use(
    (config) => {
      const authToken = localStorage.getItem('authToken');
  
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
  
      return config;
    },
    (error) => {
  
      return Promise.reject(error);
    }
  );
  
  export default instance;
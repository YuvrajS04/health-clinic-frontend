import axios from 'axios';

const api = axios.create({
  baseURL: 'https://health-clinic-backend-ebf2b59f77c8.herokuapp.com/', 
});

export default api;

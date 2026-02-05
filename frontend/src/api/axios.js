import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://127.0.0.1:8000',
    baseURL: 'http://78.13.206.17/api',
});

export default api;

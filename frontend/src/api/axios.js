import axios from 'axios';

const api = axios.create({
    baseURL: 'http://78.13.206.17/api',
});

export default api;

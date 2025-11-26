import axios from 'axios';
const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const userSess = JSON.parse(localStorage.getItem('user_sess'));
    
    if (userSess && userSess.token) {
        config.headers.Authorization = `Bearer ${userSess.token}`;
    } else {
        config.headers.Authorization = `Bearer token_palsu`;
    }
    return config;
});

export default api;
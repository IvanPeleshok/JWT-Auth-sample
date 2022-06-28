import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

export const API_URL = `http://localhost:5000/api`;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use(confing => {
    confing.headers!['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return confing;
});

$api.interceptors.response.use((config => config), async error => {
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        const originalRequest = error.config;
        try {
            originalRequest._isRetry = true;
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (error) {
            console.log('Не авторизован');
        }
    }
    
    throw error;
});

export default $api;
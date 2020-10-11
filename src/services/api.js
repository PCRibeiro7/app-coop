import axios from 'axios';

const api = axios.create({
    baseURL: 'https://united-coop-292120.ue.r.appspot.com',
});

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (!error.response) return error;
        if (error.response.status === 401) {
            localStorage.removeItem('persist:+vendas');
            if (window.location.pathname !== '/') {
                window.location = '/';
            }
            return error;
        }
        return Promise.reject(error);
    }
);

export default api;

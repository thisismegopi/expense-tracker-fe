import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers['Authorization'] = 'Bearer '.concat(token);
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        error.response.data.message.map((m: string, i: number) =>
            toast.error(m, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                delay: 100 * i,
            }),
        );
        return Promise.reject(error);
    },
);

export default axiosInstance;

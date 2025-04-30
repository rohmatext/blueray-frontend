import Axios from 'axios';

const axios = Axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true,
    withXSRFToken: true,
});

export default axios;

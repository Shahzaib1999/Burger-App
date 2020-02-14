import axios from 'axios';

const instance = axios.create({
    baseURL: 'YOUR_FIREBASE_API'
});

export default instance;
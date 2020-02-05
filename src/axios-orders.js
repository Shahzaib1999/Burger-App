import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://myburger1999.firebaseio.com/'
});

export default instance;
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});
export {api}
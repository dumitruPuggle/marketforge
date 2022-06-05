import axios, { Axios } from "axios";

class ApiService {
    public baseURL = 'http://127.0.0.1:5000';
    public api: Axios;
    constructor(){
        this.api = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export default ApiService;
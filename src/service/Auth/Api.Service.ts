import axios, { Axios } from "axios";

class ApiService {
    public baseURL = 'http://0.0.0.0:5000';
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
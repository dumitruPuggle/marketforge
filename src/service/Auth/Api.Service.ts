import axios, { Axios } from "axios";

class ApiService {
  public baseURL = process.env.REACT_APP_BASE_URL;
  public api: Axios;
  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default ApiService;

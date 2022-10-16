import axios, { Axios } from "axios";
import ApiService from "../../Api.Service";

class SignUpService extends ApiService {
  public api: Axios;
  constructor() {
    super();
    this.api = axios.create({
      baseURL: `${this.getApiURL()}/api/`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default SignUpService;

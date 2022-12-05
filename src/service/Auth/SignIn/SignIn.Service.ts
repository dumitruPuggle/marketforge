import axios, { Axios } from "axios";
import ApiService from "../../Api.Service";

class SignInService extends ApiService {
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

export default SignInService;

import axios, { AxiosResponse } from "axios";

class InstagramAPIBase {
  private BASE_URL;
  private PATH;
  private QUERY;
  private api;
  constructor() {
    this.BASE_URL = "https://www.instagram.com";
    this.PATH = "/web/search/topsearch";
    this.QUERY = "?query=";

    this.api = axios.create({
      baseURL: this.BASE_URL,
      timeout: 1000
    });
  }
  
  public getProfileInfo(name: string): Promise<AxiosResponse>{
    return this.api.get(`${this.PATH}/${this.QUERY}${name}`)
  }
}

export default InstagramAPIBase;
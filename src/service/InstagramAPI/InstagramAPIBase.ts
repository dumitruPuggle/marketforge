import axios, { AxiosResponse } from "axios";

class InstagramAPIBase {
  private BASE_URL;
  private api;
  constructor() {
    this.BASE_URL = "https://instagram39.p.rapidapi.com/";

    this.api = axios.create({
      baseURL: this.BASE_URL,
    });
  }

  public getProfileInfo(name: string): Promise<AxiosResponse> {
    return this.api.get(`getProfileByUsername`, {
      params: { username: name },
      headers: {
        "X-RapidAPI-Key": "b58eae33c8msha3089bbae27fc26p1f7b02jsn6114081af613",
        "X-RapidAPI-Host": "instagram39.p.rapidapi.com",
      },
    }).then((response) => response.data);
  }
}

export default InstagramAPIBase;

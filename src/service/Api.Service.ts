import axios, { Axios } from "axios";

class ApiService {
  public baseURL = process.env.REACT_APP_BASE_URL;
  // public backupURL = process.env.REACT_APP_BACKUP_URL;
  public backupURL = "http://0.0.0.0:8000";
  public api: Axios;
  constructor() {
    this.api = axios.create({
      baseURL: this.getApiURL(),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  protected getApiURL(): string {
    const useBackup = localStorage.getItem("useBackupApi") === "true";
    if (useBackup && this.backupURL) {
      return this.backupURL;
    }
    return this.baseURL ? this.baseURL : "";
  }
}

export default ApiService;

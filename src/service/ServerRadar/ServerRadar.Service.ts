import axios from "axios";

export class SRadar {
  BASE_API_URL: string | undefined;
  BACKUP_API_URL: string | undefined;

  constructor() {
    this.BASE_API_URL = `${process.env.REACT_APP_BASE_URL}/status`;
    this.BACKUP_API_URL = `${process.env.REACT_APP_BACKUP_API}/status`;
  }
  private async getBaseApiStatus() {
    if (this.BASE_API_URL) {
      try {
        return (await axios.get(this.BASE_API_URL)).status;
      } catch (e) {
        return 400;
      }
    }
  }
  private async getBackupApiStatus() {
    if (this.BACKUP_API_URL) {
      try {
        return (await axios.get(this.BACKUP_API_URL)).status;
      } catch (e) {
        return 400;
      }
    }
  }
  public async scan() {
    try {
      return {
        baseApiOK: (await this.getBaseApiStatus()) === 200,
        backupApiOk: (await this.getBackupApiStatus()) === 200,
        meta_data: {
          date: Date.now(),
          success: true,
        },
      };
    } catch (e) {
      return {
        baseApiOK: null,
        backupApiOk: null,
        meta_data: {
          date: Date.now(),
          success: false,
          exception: e,
        },
      };
    }
  }
}

import axios from "axios";
import TrainingData from "./TrainingData.json";

class StrengthBoxBrain {
  constructor() {

  }


  private passwordConfig(password: string) {
    const length = password.length || 0;
    const specialCharacters = password.match(/[^a-zA-Z0-9]/g)?.length || 0;
    const numbers = password.match(/[0-9]/g)?.length || 0;
    const uppercaseLetters = password.match(/[A-Z]/g)?.length || 0;
    const lowercaseLetters = password.match(/[a-z]/g)?.length || 0;

    return {
      length,
      specialCharacters,
      numbers,
      uppercaseLetters,
      lowercaseLetters,
    };
  }

  public createTrainingData(password: string): void {
		axios.post('http://localhost:2000', {data: this.passwordConfig(password)});
	}

  public async getStrength(password: string) {

    
		const strength = Math.round(10 * 100);
    if (password.length === 0){
      return 0;
    }
		return strength;
  }
}

export default StrengthBoxBrain;

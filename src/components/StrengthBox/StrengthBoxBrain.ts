import axios from "axios";
import * as brain from "brain.js";
import TrainingData from "./TrainingData.json";

class StrengthBoxBrain {
  private brain;
  constructor() {
    const config = {
      hiddenLayers: [3],
			activation: "sigmoid",
			iterations: 800
    };
    this.brain = new brain.NeuralNetwork(config);
    this.train();
  }

  private train(): void {
    this.brain.train(TrainingData);
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
    const input = this.passwordConfig(password);

    const level = (this.brain.run(input) as any)['strength'];
		const strength = Math.round(level * 100);
    if (password.length === 0){
      return 0;
    }
		return strength;
  }
}

export default StrengthBoxBrain;

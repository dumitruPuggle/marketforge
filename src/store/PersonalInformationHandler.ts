import { makeAutoObservable } from "mobx";

interface IPersonInformation {
  firstName: string;
  lastName: string;
  email: string;
}

interface IErrors extends IPersonInformation {
  "*": string;
}

const defFields = {
  firstName: "",
  lastName: "",
  email: ""
};

const defErrorFields = {
  firstName: "",
  lastName: "",
  email: "",
  "*": ""
};

class PersonalInformationHandler {
  fields: IPersonInformation = defFields;
  errors: IErrors = defErrorFields;

  constructor() {
    makeAutoObservable(this);
  }

  public hasErrors(key?: string): boolean {
    if (!key) {
      //If there's no key provided then return true if there's any error
      // @ts-ignore
      return Object.keys(this.errors).some((key) => this.errors[key] !== "");
    }
    // @ts-ignore
    return this.errors[key] !== "";
  }

  public listErrors(): string[] {
    // @ts-ignore
    return Object.keys(this.errors).map((key) => {
      if (this.hasErrors(key)) {
        // @ts-ignore
        return this.errors[key];
      }
    }).filter((error) => error !== undefined);
  }

  public setError(key: string, value: string): void {
    // @ts-ignore
    this.errors[key] = value;
  }

  public resetAllErrors(): void {
    // @ts-ignore
    this.errors = defErrorFields;
  }
}

export default new PersonalInformationHandler();

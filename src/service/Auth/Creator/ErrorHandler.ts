class Error {
  protected errors;
  protected setErrors;
  protected initialErrors;

  constructor(errors: object, setErrors: Function, initialErrors: object) {
    this.errors = errors;
    this.setErrors = setErrors;
    this.initialErrors = initialErrors;
  }
  setFieldError(field: string, error: string) {
    this.setErrors({ ...this.errors, [field]: error });
  }

  hasErrors(key?: string) {
    if (!key) {
      //IF theres no key, check if there are any errors
      return Object.values(this.errors).some((key) => key !== "");
    }
    return (this.errors as any)[key] !== "";
  }

  resetAllErrors() {
    this.setErrors(this.initialErrors);
  }

  listErrors() {
    return Object.values(this.errors).filter((key) => key !== "");
  }
}

export default Error;
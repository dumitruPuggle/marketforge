import { Dispatch, SetStateAction } from "react";

/**
 * @author Dumitru Cucu
 * @date 2022-05-20
 */

export type errorTypeItem = {
  message: string;
  id: number;
};

class Error<T extends object> {
  protected errors;
  protected setErrors;
  protected initialErrors;

  constructor(
    errors: T,
    setErrors: Dispatch<SetStateAction<any>>,
    initialErrors: T
  ) {
    this.errors = errors;
    this.setErrors = setErrors;
    this.initialErrors = initialErrors;
  }

  public setFieldError(field: keyof T, error: string): void {
    this.setErrors({ ...this.errors, [field]: error });
  }

  public hasErrors(key?: keyof T): boolean {
    if (!key) {
      //IF theres no key, check if there are any errors
      return Object.values(this.errors).some((key) => key !== "");
    }
    return (this.errors as any)[key] !== "";
  }

  public resetAllErrors(): void {
    this.setErrors(this.initialErrors);
  }

  public listErrors(): errorTypeItem[] {
    const errors = Object.values(this.errors).filter((key) => key !== "");
    const errorOrder = errors.map((error: string, index) => {
      return {
        id: Date.now() * 1000 + index,
        message: error,
      };
    });
    return errorOrder;
  }
}

export default Error;

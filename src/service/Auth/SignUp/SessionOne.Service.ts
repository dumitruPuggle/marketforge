import SignUpService from "./SignUp.Service";

interface SessionOneSubmitProps {
  lang: string;
  verifyExistingAccount: boolean;
  email: string;
  firstName: string;
  lastName: string;
}

class SessionOne extends SignUpService {
  constructor() {
    super();
  }
  public submit = async (body: SessionOneSubmitProps) => {
    return this.api.post("verify/1", body).then(({ data }) => data);
  };
}

export { SessionOne };

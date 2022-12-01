import SignUpService from "./SignUp.Service";

interface SessionOneSubmitProps {
  lang: string;
  userType: string;
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
    return this.api.post("signup/1", body).then(({ data }) => data);
  };
}

export { SessionOne };

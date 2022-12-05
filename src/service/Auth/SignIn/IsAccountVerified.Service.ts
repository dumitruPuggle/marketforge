import SignInService from "./SignIn.Service";

interface SessionOneSubmitProps {
  email: string;
}

class IsAccountVerifiedService extends SignInService {
  constructor() {
    super();
  }
  public submit = async (body: SessionOneSubmitProps) => {
    return this.api.post("is-user-verified", body).then(({ data }) => data);
  };
}

export { IsAccountVerifiedService };

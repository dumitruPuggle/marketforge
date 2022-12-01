import { requireToken, AuthPhoneProvider } from "../../../translation/utils";
import SignUpService from "./SignUp.Service";

interface SessionTwoSubmitProps {
  provider: AuthPhoneProvider;
  phoneNumber: string;
}

class SessionTwo extends SignUpService {
  constructor() {
    super();
  }
  public submit = async (
    body: SessionTwoSubmitProps,
    { _temptoken }: requireToken
  ) => {
    return this.api
      .post("signup/2", body, { headers: { _temptoken } })
      .then(({ data }) => data);
  };
}

export { SessionTwo };

import { requireToken, AuthEmailProvider } from "../../../translation/utils";
import SignUpService from "./SignUp.Service";

interface SessionTwoSubmitProps {
  provider: AuthEmailProvider;
  email: string;
}

class SessionTwoEmail extends SignUpService {
  constructor() {
    super();
  }
  public submit = async (
    body: SessionTwoSubmitProps,
    { _temptoken }: requireToken
  ) => {
    return this.api
      .post("verify/2", body, { headers: { _temptoken } })
      .then(({ data }) => data);
  };
}

export { SessionTwoEmail };

import { requireToken, useLang } from "../../../translation/utils";
import SignUpService from "./SignUp.Service";

interface SessionFourSubmitProps {
    password: string;
}

class SessionFour extends SignUpService {
  constructor() {
    super();
  }
  public submit = async (body: SessionFourSubmitProps,
    { _temptoken }: requireToken) => {
    return this.api
    .post("signup/4", body, { headers: { _temptoken, lang: useLang() } })
    .then(({ data }) => data);
  };
}

export { SessionFour };
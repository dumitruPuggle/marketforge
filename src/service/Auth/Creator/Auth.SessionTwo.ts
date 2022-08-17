import { lang, requireToken, useLang } from "../../../translation/utils";
import SignUpService from "./SignUp.Service";

interface SessionTwoSubmitProps {
  phoneNumber: string;
  lang: lang;
}

class SessionTwo extends SignUpService {
  constructor() {
    super();
  }
  public submit = async (body: SessionTwoSubmitProps, { _temptoken }: requireToken) => {
    return this.api
      .post("signup/2", body, { headers: { _temptoken, lang: useLang() } })
      .then(({ data }) => data);
  };
}

export { SessionTwo };

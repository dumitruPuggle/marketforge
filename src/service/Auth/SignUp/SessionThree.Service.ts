import { requireToken, useLang } from "../../../translation/utils";
import SignUpService from "./SignUp.Service";

interface SessionThreeSubmitProps {
    code: string;
}

class SessionThree extends SignUpService {
  constructor() {
    super();
  }
  public submit = async (body: SessionThreeSubmitProps,
    { _temptoken }: requireToken) => {
    return this.api
    .post("signup/3", body, { headers: { _temptoken, lang: useLang() } })
    .then(({ data }) => data);
  };
}

export { SessionThree };

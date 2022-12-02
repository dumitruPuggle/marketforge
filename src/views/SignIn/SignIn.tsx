import AppIcon from "../../assets/app-icon.png";
import SignInRoot from "./views/SignInRoot";

function SignIn() {
  return (
    <div>
      <div className="form-center mt-5 fade-in-image">
        <img
          draggable={false}
          alt=""
          src={AppIcon}
          style={{ width: 100, height: 100 }}
        />
        <SignInRoot />
      </div>
    </div>
  );
}

export default SignIn;

import jwt_decode from "jwt-decode";
class SignUpTempTokenSession {
    token: string;
    constructor(token: string) {
        this.token = token;
    }
    isTokenValid(): boolean {
        try{
            const isValid = Boolean(jwt_decode(this.token))
            return isValid
        }catch(e){
            return false;
        }
    }
    setToken(){
        if(this.isTokenValid()){
            localStorage.setItem('_temptoken', this.token);
        }
    }
}

export default SignUpTempTokenSession;
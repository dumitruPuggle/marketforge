import jwtDecode, { JwtPayload } from "jwt-decode";

class TokenExpiration {
    private token;
    constructor(token: string){
        this.token = token;
    }
    public getExpirationDate() {
        if (!this.token){
            return null;
        }
        const decodedToken: JwtPayload = jwtDecode(this.token);
        const expirationDate = decodedToken.exp;
        return (expirationDate as number) * 1000;
    }
}

export default TokenExpiration;
import { NavLink } from "react-router-dom";
import { routes } from "../../service/internal-routes";
import "./NavBar.css"

function NavBar(){
    return(
        <div className="nav-bar">
            <NavLink href="/users" className="active-link" to="/users">Brands</NavLink>
            <NavLink href="/troubleshoot" className="active-link" to="/troubleshoot">Creators</NavLink>
            <a className="active-link" onClick={() => window.location.href = routes.SignUp}>Sign Up</a>
        </div>
    )
}
export default NavBar;
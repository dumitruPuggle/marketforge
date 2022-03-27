import { NavLink } from "react-router-dom";
import "./NavBar.css"

function NavBar(){
    return(
        <div className="nav-bar">
            <NavLink className="active-link" to="/users">Brands</NavLink>
            <NavLink className="active-link" to="/troubleshoot">Creators</NavLink>
            <NavLink className="active-link" to="/sign-up">Sign Up</NavLink>
        </div>
    )
}
export default NavBar;
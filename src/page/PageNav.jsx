import { NavLink } from "react-router";
import Logo from "./../components/Logo";

export default function PageNav() {
  return (
    <div className="nav">
      <Logo />
      <ul className="navBar">
        <li className="navItem">
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li className="navItem">
          <NavLink to="/product">Product</NavLink>
        </li>
        <li className="navItem">
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </div>
  );
}

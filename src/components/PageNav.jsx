import { Link, NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      
      <Link to="/">
      <img
        style={{ height: "5.2rem" }}
        src="/logo.png"
        alt="WorldWise logo"
        className={styles.logo}
      />
      </Link>

      <ul>
        <li>
          <NavLink to="/">Home </NavLink>
        </li>
        <li>
          <NavLink to="/Pricing">Pricing </NavLink>
        </li>
        <li>
          <NavLink to="/Product">Product </NavLink>
        </li>
        <li>
          <Link to="/Login" className="cta">Login </Link>
        </li>
      </ul>
    </nav>
  );
}

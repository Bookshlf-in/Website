import { Link } from "react-router-dom";
import "./links.css";

const NavLink = ({ path, name, active = false }) => {
  return (
    <Link to={path}>
      <div className={active ? "navlink navlink-active" : "navlink"}>
        {name}
      </div>
    </Link>
  );
};

export default NavLink;

import {Link} from "react-router-dom";
import {closeNav} from "./Sidenav";

const SideNavLink = ({to, label, iconClass, isProfile}) => {
  return (
    <Link
      className={isProfile ? "sidenav-link Profile" : "sidenav-link"}
      to={to}
      onClick={closeNav}
    >
      <i className={iconClass} />
      <span>{label}</span>
    </Link>
  );
};

export default SideNavLink;

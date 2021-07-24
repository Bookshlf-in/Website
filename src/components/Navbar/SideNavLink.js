import { Link } from "react-router-dom";
import { closeNav } from "./Sidenav";

const SideNavLink = ({ to, label, iconClass, isProfile }) => {
  const isSearch = to.substring(1, 7);
  return (
    <Link
      className={isProfile ? "sidenav-link Profile" : "sidenav-link"}
      to={to}
      onClick={closeNav}>
      <i className={iconClass}></i>
      {isSearch === "Search" || <span>{label || to.substring(1)}</span>}
    </Link>
  );
};

export default SideNavLink;

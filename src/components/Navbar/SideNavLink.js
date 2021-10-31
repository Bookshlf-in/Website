import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { closeNav } from "./Sidenav";
import { UserContext } from "../../Context/userContext";
import { AddFormContext } from "../../Context/formContext";
import axios from "../../axios.js";

const SideNavLink = ({ to, label, iconClass, isProfile }) => {
  const [, setUser] = useContext(UserContext);
  const [, setAddForm] = useContext(AddFormContext);

  const logout = () => {
    label = "Logging Out...";
    axios
      .get("/signOut")
      .then((response) => {
        localStorage.removeItem("bookshlf_user");
        localStorage.removeItem("bookshlf_user_AddBook");
        delete axios.defaults.headers.common["Authorization"];
        setUser(null);
        setAddForm(null);
        label = "Logout";
        closeNav();
      })
      .catch((error) => {
        console.log("Logout error", error);
        label = "Logout error";
        setTimeout(() => {
          label = "Logout";
        }, 2000);
      });
  };

  return (
    <Link
      className={isProfile ? "sidenav-link Profile" : "sidenav-link"}
      to={
        label === "Contribute"
          ? { pathname: "https://github.com/Bookshlf-in/Website" }
          : to
      }
      target={label === "Contribute" ? "_blank" : ""}
      onClick={label === "Logout" ? logout : closeNav}
    >
      <i className={iconClass} />
      <span>{label}</span>
    </Link>
  );
};

export default SideNavLink;

import { React, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { closeNav } from "./Sidenav";
import axios from "../../axios.js";
import { UserContext } from "../../Context/userContext";
import { AddFormContext } from "../../Context/formContext";
const SideNavLink = ({ to, label, iconClass, isProfile }) => {
  const [user, setUser] = useContext(UserContext);
  const [addForm, setAddForm] = useContext(AddFormContext);
  const logout = () => {
    label = "Logging Out...";
    axios
      .get("/signOut")
      .then((response) => {
        localStorage.removeItem("bookshlf_user");
        localStorage.removeItem("bookshlf_user_AddBook");
        delete axios.defaults.headers.common["Authorization"];
        // console.log("Signed Out");
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
      to={to}
      onClick={label === "Logout" ? logout : closeNav}
    >
      <i className={iconClass} />
      <span>{label}</span>
    </Link>
  );
};

export default SideNavLink;

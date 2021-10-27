import { React, useState, useContext, useEffect } from "react";
import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SideNav from "./Sidenav.js";
import { UserContext } from "../../Context/userContext";
import { AddFormContext } from "../../Context/formContext";
import axios from "../../axios.js";

const NavbarMenu = () => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const [addForm, setAddForm] = useContext(AddFormContext);
  const [Search, setSearch] = useState("");
  const [Logged, setLogged] = useState(user ? true : false);
  const [alert, setalert] = useState({
    show: false,
    msg: "Unsubscribe",
    color: "black",
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    if (e === "0") {
      setAnchorEl(null);
    }
    if (e === "5") {
      setalert({
        show: true,
        msg: "Unsubscribing...",
        color: "blue",
      });
      axios
        .post("/newsletterUnsubscribe", {
          email: user.email,
        })
        .then(() => {
          setalert({
            show: false,
            msg: "Unsubscribed!",
            color: "green",
          });
          setTimeout(() => {
            setalert({
              show: false,
              msg: "Unsubscribe",
              color: "black",
            });
            setAnchorEl(null);
          }, 5000);
        })
        .catch(() => {
          setalert({
            show: false,
            msg: "Error Not Subscribed!",
            color: "red",
          });
          setTimeout(() => {
            setalert({
              show: false,
              msg: "Unsubscribe",
              color: "black",
            });
            setAnchorEl(null);
          }, 5000);
        });
    }
  };
  const logout = () => {
    setLogged(false);
    axios
      .get("/signOut")
      .then((response) => {
        localStorage.removeItem("bookshlf_user");
        localStorage.removeItem("bookshlf_user_AddBook");
        delete axios.defaults.headers.common["Authorization"];
        // console.log("Signed Out");
        setUser(null);
        setAddForm(null);
        setAnchorEl(null);
        history.push("/");
      })
      .catch((error) => {
        console.log("Logout error", error);
      });
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <img
          src="/images/user.png"
          alt="My Account"
          height="25px"
          width="25px"
        />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClick={() => {
          handleClose("0");
        }}
      >
        <MenuItem
          style={{
            fontFamily: "PT Sans",
            fontWeight: "bold",
          }}
        >
          <i className="fas fa-times-circle" />
        </MenuItem>
        <MenuItem
          style={{
            fontFamily: "PT Sans",
            fontWeight: "bold",
          }}
          onClick={() => {
            history.push("/UserProfile/1");
          }}
        >
          <i className="fas fa-user-alt" />
          &nbsp;Profile Panel
        </MenuItem>
        {user ? (
          user.roles.includes("admin") ? (
            <MenuItem
              style={{
                fontFamily: "PT Sans",
                fontWeight: "bold",
              }}
              onClick={() => {
                setAnchorEl(null);
                history.push("/Admin/1");
              }}
            >
              <i className="fas fa-user-cog" />
              &nbsp;Admin Panel
            </MenuItem>
          ) : (
            <div></div>
          )
        ) : (
          <div></div>
        )}
        <MenuItem
          style={{
            fontFamily: "PT Sans",
            fontWeight: "bold",
          }}
          onClick={() => {
            history.push("/Cart");
          }}
        >
          <i className="fas fa-cart-arrow-down" />
          &nbsp;Cart
        </MenuItem>
        <MenuItem
          style={{
            fontFamily: "PT Sans",
            fontWeight: "bold",
          }}
          onClick={() => {
            history.push("/Wishlist");
          }}
        >
          <i className="fas fa-heart" />
          &nbsp;Wishlist
        </MenuItem>
        <MenuItem
          style={{
            fontFamily: "PT Sans",
            fontWeight: "bold",
          }}
          onClick={() => {
            history.push("/SellerPanel/4");
          }}
        >
          <i className="fas fa-book" />
          &nbsp;Sell Books
        </MenuItem>
        <MenuItem
          style={{
            fontFamily: "PT Sans",
            fontWeight: "bold",
            color: alert.color,
          }}
          onClick={() => {
            handleClose("5");
          }}
        >
          <i className="fas fa-minus-circle" />
          &nbsp;
          {alert.msg}&nbsp;
          <i
            className="fas fa-circle-notch"
            style={{
              display: alert.show ? "inline-block" : "none",
              animation: "spin 2s linear infinite",
            }}
          />
        </MenuItem>
        <MenuItem
          style={{
            fontFamily: "PT Sans",
            fontWeight: "bold",
          }}
          onClick={logout}
        >
          Logout&nbsp;
          <i className="fas fa-sign-out-alt" />
          <i
            className="fas fa-circle-notch"
            style={{
              display: Logged ? "none" : "inline-block",
              animation: "spin 2s linear infinite",
            }}
          />
        </MenuItem>
      </Menu>
    </div>
  );
};
export default NavbarMenu;

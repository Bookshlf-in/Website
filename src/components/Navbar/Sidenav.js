import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

// Components
import { Stack, Divider, Chip } from "@mui/material";

// Icons
import HomeIcon from "@mui/icons-material/HomeRounded";
import AllBookIcon from "@mui/icons-material/Language";
import BookIcon from "@mui/icons-material/MenuBookRounded";
import InfoIcon from "@mui/icons-material/InfoRounded";
import SupportIcon from "@mui/icons-material/SupportAgentRounded";
import CartIcon from "@mui/icons-material/ShoppingCart";
import WishlistIcon from "@mui/icons-material/Favorite";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import GitHubIcon from "@mui/icons-material/GitHub";
import SellBookIcon from "@mui/icons-material/ShoppingBag";

// Custom Menu Item Stack
const MenuStack = (props) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        background: props.title
          ? "linear-gradient(90deg, rgb(17, 16, 16) 0%, rgb(63, 62, 62) 100%)"
          : "white",
        padding: "10px 16px",
        width: "100%",
        "& svg": {
          height: 16,
          width: 16,
        },
        "& img": {
          height: 20,
        },
        "& div": {
          fontFamily: "Roboto",
          fontSize: "12px",
          color: "rgba(0,0,0,0.8)",
        },
      }}
    >
      <Stack justifyContent="center" alignItems="center">
        {props.title ? <img src={props.icon} /> : props.icon}
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="row"
        spacing={1}
      >
        <span>{props.label}</span>
        {props.badge ? (
          <Chip
            label={props.Count}
            size="small"
            color="warning"
            variant="outlined"
            sx={{
              height: "auto",
              "& span": {
                fontSize: "10px",
                fontWeight: "bolder",
                letterSpacing: "0.1em",
              },
            }}
          />
        ) : null}
      </Stack>
    </Stack>
  );
};

const Sidenav = () => {
  const [user] = useContext(UserContext);

  return (
    <Stack className="main-sidenav" spacing={0} sx={{ minWidth: 200 }}>
      <Link to="/">
        <MenuStack
          title={true}
          icon={"/images/bookshlf-2022-independence.gif"}
          label=""
        />
      </Link>
      <Link to="/">
        <MenuStack icon={<HomeIcon color="primary" />} label="Home" />
      </Link>
      <Divider orientation="horizontal" flexItem={true} />
      <Link to="/SearchResult/tag:ALL">
        <MenuStack icon={<AllBookIcon color="primary" />} label="All Books" />
      </Link>
      <Divider orientation="horizontal" flexItem={true} />
      <Link to="/SellerPanel/2">
        <MenuStack icon={<BookIcon color="success" />} label="Your Books" />
      </Link>
      <Divider orientation="horizontal" flexItem={true} />
      <Link to="/SellerPanel/5">
        <MenuStack icon={<SellBookIcon color="success" />} label="Sell Books" />
      </Link>
      <Divider orientation="horizontal" flexItem={true} />
      <Link to="/Cart">
        <MenuStack
          icon={<CartIcon color="secondary" />}
          label="Cart"
          badge={true}
          Count={user?.cartitems}
        />
      </Link>
      <Divider orientation="horizontal" flexItem={true} />
      <Link to="/Wishlist">
        <MenuStack
          icon={<WishlistIcon color="secondary" />}
          label="Wishlist"
          badge={true}
          Count={user?.wishlist}
        />
      </Link>
      <Divider orientation="horizontal" flexItem={true} />
      <Link to="/Wallet">
        <MenuStack
          icon={<WalletIcon color="secondary" />}
          label="Wallet"
          badge={true}
          Count={user?.balance}
        />
      </Link>
      <Divider orientation="horizontal" flexItem={true} />
      <Link
        to={{
          pathname: "https://github.com/Bookshlf-in",
        }}
        target="_blank"
      >
        <MenuStack icon={<GitHubIcon color="default" />} label="Contribute" />
      </Link>
      <Divider orientation="horizontal" flexItem={true} />
      <Link to="/About">
        <MenuStack icon={<InfoIcon color="info" />} label="About Us" />
      </Link>
      <Divider orientation="horizontal" flexItem={true} />
      <Link to="/Contact">
        <MenuStack icon={<SupportIcon color="warning" />} label="Contact Us" />
      </Link>
    </Stack>
  );
};

export default Sidenav;

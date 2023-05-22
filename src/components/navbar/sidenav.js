import { React, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

// Components
import { Stack, Divider } from "@mui/material";
import { IconButton, Badge, Drawer } from "@mui/material";

// Icons
import HomeIcon from "@mui/icons-material/HomeRounded";
import AllBookIcon from "@mui/icons-material/Language";
import BookIcon from "@mui/icons-material/MenuBookRounded";
import InfoIcon from "@mui/icons-material/InfoRounded";
import SupportIcon from "@mui/icons-material/SupportAgentRounded";
import CartIcon from "@mui/icons-material/ShoppingCart";
import WishlistIcon from "@mui/icons-material/Favorite";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MenuIcon from "@mui/icons-material/Menu";

// Custom Menu Item Stack
const SideNavLink = ({ path, Icon, label, count = 0, setOpen }) => {
  return (
    <Link to={path} onClick={() => setOpen((prev) => !prev)}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-start"
        alignItems="center"
        className="sidenav-link"
      >
        <Badge badgeContent={count} color="primary">
          {Icon}
        </Badge>
        <span className="sidenav-label">{label}</span>
      </Stack>
      <Divider orientation="horizontal" flexItem={true} />
    </Link>
  );
};

const SideNavLinks = ({ user, setOpen }) => {
  return (
    <Stack className="sidenav-links" spacing={0} sx={{ minWidth: 200 }}>
      <div className="sidenav-logo">
        <img src="/images/logo.png" width="145px" alt="Bookshlf" />
      </div>
      <SideNavLink
        path="/"
        Icon={<HomeIcon />}
        label="Home"
        setOpen={setOpen}
      />
      <SideNavLink
        path="/SearchResult/tag:ALL"
        Icon={<AllBookIcon />}
        label="All Books"
        setOpen={setOpen}
      />
      <SideNavLink
        path="/SellerPanel/2"
        Icon={<BookIcon />}
        label="Your Books"
        setOpen={setOpen}
      />
      <SideNavLink
        path="/cart"
        Icon={<CartIcon />}
        label="Cart"
        count={user?.cartitems}
        setOpen={setOpen}
      />
      <SideNavLink
        path="/wishlist"
        Icon={<WishlistIcon />}
        label="Wishlist"
        count={user?.wishlist}
        setOpen={setOpen}
      />
      <SideNavLink
        path="/wallet"
        Icon={<WalletIcon />}
        label="Wallet"
        count={user?.balance}
        setOpen={setOpen}
      />
      <SideNavLink
        path="/contact"
        Icon={<SupportIcon />}
        label="Contact"
        setOpen={setOpen}
      />
      <SideNavLink
        path="/about"
        Icon={<InfoIcon />}
        label="About Us"
        setOpen={setOpen}
      />
    </Stack>
  );
};

const SideNavDrawer = ({ user, open, setOpen }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => setOpen((prev) => !prev)}
      transitionDuration={500}
    >
      <SideNavLinks user={user} setOpen={setOpen} />
    </Drawer>
  );
};

const Sidenav = () => {
  const [user] = useContext(UserContext);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 1 }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Badge
          variant="dot"
          badgeContent={user?.cartitems + user?.wishlist > 0 ? 1 : 0}
          color="warning"
        >
          <MenuIcon />
        </Badge>
      </IconButton>
      <SideNavDrawer user={user} open={open} setOpen={setOpen} />
    </div>
  );
};

export default Sidenav;

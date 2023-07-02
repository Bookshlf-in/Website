import { useNavigate } from "react-router-dom";

// Components
import { Stack, Paper, Divider } from "@mui/material";
import { Typography } from "@mui/material";

// icons
import BookIcon from "@mui/icons-material/Book";
import OrderIcon from "@mui/icons-material/LocalShipping";
import ChatIcon from "@mui/icons-material/ChatRounded";
import ProfileIcon from "@mui/icons-material/AccountCircleRounded";
import SellersIcon from "@mui/icons-material/ContactMailRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";
import WalletIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import AnalyticsIcon from "@mui/icons-material/Analytics";

// Custom Admin Sidebar Navbutton
const AdminNavButton = ({
  Panel,
  setPanel,
  btnText,
  btnIcon,
  value,
  openSideBar,
  setOpenSideBar,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    setPanel(value);
    navigate(`/admin/${value}`);
    setOpenSideBar(false);
  };

  const activeClass = "adminPanel-navButton adminPanel-navButton-active";
  const nonActiveClass = "adminPanel-navButton";

  return (
    <Stack
      alignItems="center"
      direction="row"
      spacing={2}
      className={Panel === value ? activeClass : nonActiveClass}
      onClick={handleClick}
    >
      {btnIcon}
      <Typography variant="body1">{btnText}</Typography>
    </Stack>
  );
};

// Admin Left Sidebar for Navigation
const AdminSideBar = ({ Panel, setPanel, openSideBar, setOpenSideBar }) => {
  return (
    <Paper className="adminPanel-sidebar">
      <Stack
        justifyContent="center"
        alignItems="center"
        divider={
          <Divider
            className="adminPanel-sidebar-divider"
            orientation="horizontal"
            flexItem
          />
        }
      >
        <Stack
          className="adminPanel-sidebar-logo"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src="/images/logo.png"
            alt="bookshlf"
            height="100%"
            width="auto"
          />
        </Stack>
        <Stack className="adminPanel-sidebar-Nav" spacing={1}>
          <AdminNavButton
            btnIcon={<BookIcon sx={{ fontSize: "1em" }} />}
            btnText="Books"
            Panel={Panel}
            setPanel={setPanel}
            value={0}
            openSideBar={openSideBar}
            setOpenSideBar={setOpenSideBar}
          />

          <AdminNavButton
            btnIcon={<OrderIcon sx={{ fontSize: "1em" }} />}
            btnText="Orders"
            Panel={Panel}
            setPanel={setPanel}
            value={1}
            openSideBar={openSideBar}
            setOpenSideBar={setOpenSideBar}
          />
          <AdminNavButton
            btnIcon={<ChatIcon sx={{ fontSize: "1em" }} />}
            btnText="Messages"
            Panel={Panel}
            setPanel={setPanel}
            value={2}
            openSideBar={openSideBar}
            setOpenSideBar={setOpenSideBar}
          />
          <AdminNavButton
            btnIcon={<SellersIcon sx={{ fontSize: "1em" }} />}
            btnText="Seller"
            Panel={Panel}
            setPanel={setPanel}
            value={3}
            openSideBar={openSideBar}
            setOpenSideBar={setOpenSideBar}
          />
          <AdminNavButton
            btnIcon={<ProfileIcon sx={{ fontSize: "1em" }} />}
            btnText="User"
            Panel={Panel}
            setPanel={setPanel}
            value={4}
            openSideBar={openSideBar}
            setOpenSideBar={setOpenSideBar}
          />
          <AdminNavButton
            btnIcon={<WalletIcon sx={{ fontSize: "1em" }} />}
            btnText="Billing"
            Panel={Panel}
            setPanel={setPanel}
            value={5}
            openSideBar={openSideBar}
            setOpenSideBar={setOpenSideBar}
          />
          <AdminNavButton
            btnIcon={<AnalyticsIcon sx={{ fontSize: "1em" }} />}
            btnText="Analytics"
            Panel={Panel}
            setPanel={setPanel}
            value={6}
            openSideBar={openSideBar}
            setOpenSideBar={setOpenSideBar}
          />
          <AdminNavButton
            btnIcon={<HomeIcon sx={{ fontSize: "1em" }} />}
            btnText="Home"
            Panel={Panel}
            setPanel={setPanel}
            value={7}
            openSideBar={openSideBar}
            setOpenSideBar={setOpenSideBar}
          />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default AdminSideBar;

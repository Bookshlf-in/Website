import { useHistory } from "react-router-dom";

// Components
import { AppBar, Toolbar } from "@mui/material";
import { Typography, IconButton } from "@mui/material";

// icons
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";

// Custom Admin AppBar
const AdminAppBar = ({ openSideBar, setOpenSideBar }) => {
  const history = useHistory();
  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setOpenSideBar(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Admin Panel | Bookshlf
        </Typography>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => history.push("/")}
        >
          <HomeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AdminAppBar;

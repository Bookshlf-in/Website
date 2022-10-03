// Components
import { AppBar, Toolbar } from "@mui/material";
import { Typography, IconButton } from "@mui/material";

// icons
import MenuIcon from "@mui/icons-material/Menu";

// Custom Admin AppBar
const AdminAppBar = ({ openSideBar, setOpenSideBar }) => {
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
        <Typography variant="h6" color="inherit" component="div">
          Admin Panel | Bookshlf
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AdminAppBar;

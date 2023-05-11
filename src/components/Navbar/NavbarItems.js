import { useLocation } from "react-router-dom";
import { Stack } from "@mui/material";
import NavLink from "../../assets/components/links/navlink";

const NavbarItems = () => {
  const location = useLocation();
  const activePath = location.pathname;
  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{ height: "100%" }}
      justifyContent="center"
      alignItems="center"
    >
      <NavLink path="/" name="Home" active={activePath.length === 1} />
      <NavLink
        path="/SearchResult/tag:ALL"
        name="All Books"
        active={activePath.startsWith("/SearchResult")}
      />
      <NavLink
        path="/SellerPanel/2"
        name="Your Books"
        active={activePath.startsWith("/SellerPanel")}
      />
    </Stack>
  );
};

export default NavbarItems;

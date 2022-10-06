// Components
import { Stack } from "@mui/material";

// Other Components
import Books from "../Book/Book";
import Seller from "../Sellers";
import Orders from "../Order/Orders";
import Messages from "../Messages";
import Profile from "../FindProfile";
import Users from "../Users";
import Wallet from "../Billing/Wallet";

const AdminContentPanel = ({ Panel, setPanel, history }) => {
  if (Panel === 7) history.push("/");
  return (
    <Stack className="adminPanel-content">
      <Stack className="adminPanel-content-float">
        {Panel === 0 ? (
          <Books />
        ) : Panel === 1 ? (
          <Orders />
        ) : Panel === 2 ? (
          <Profile />
        ) : Panel === 3 ? (
          <Messages />
        ) : Panel === 4 ? (
          <Seller />
        ) : Panel === 5 ? (
          <Users />
        ) : Panel === 6 ? (
          <Wallet />
        ) : null}
      </Stack>
    </Stack>
  );
};

export default AdminContentPanel;

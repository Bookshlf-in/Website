// Components
import { Stack } from "@mui/material";

// Other Components
import Seller from "../Sellers";
import Orders from "../Orders";
import Messages from "../Messages";
import Profile from "../FindProfile";
import Users from "../Users";
import Wallet from "../Billing/Wallet";

const AdminContentPanel = ({ Panel, setPanel, history }) => {
  if (Panel === 6) history.push("/");
  return (
    <Stack className="adminPanel-content">
      <Stack className="adminPanel-content-float">
        {Panel === 5 ? (
          <Wallet />
        ) : Panel === 1 ? (
          <Profile />
        ) : Panel === 2 ? (
          <Messages />
        ) : Panel === 3 ? (
          <Seller />
        ) : Panel === 4 ? (
          <Users />
        ) : (
          <Orders />
        )}
      </Stack>
    </Stack>
  );
};

export default AdminContentPanel;

import { useContext } from "react";
import { UserContext } from "../../../Context/userContext";

// Components
import { Stack, Alert } from "@mui/material";

// Other Components
import Books from "../Book/Book";
import Seller from "../Sellers";
import Orders from "../Order/Orders";
import Support from "../Support/Support";
import Profile from "../FindProfile";
import Users from "../Users";
import Wallet from "../Billing/Wallet";
import Analytics from "../Analytics/Analytics";

const PermissionAlert = ({ user, permission, content }) => {
  return user.adminPermissions?.includes(permission) ? (
    content
  ) : (
    <Alert severity="error">
      You Don't have permission to access the given content. Contact super admin
      for permission.
    </Alert>
  );
};

const AdminContentPanel = ({ Panel, setPanel, history }) => {
  const [user] = useContext(UserContext);

  console.log(user);
  console.log(user.adminPermissions?.includes("BOOKS"));
  if (Panel === 8) history.push("/");
  return (
    <Stack className="adminPanel-content">
      <Stack className="adminPanel-content-float">
        {Panel === 0 ? (
          <PermissionAlert user={user} permission="BOOKS" content={<Books />} />
        ) : Panel === 1 ? (
          <PermissionAlert
            user={user}
            permission="ORDERS"
            content={<Orders />}
          />
        ) : Panel === 2 ? (
          <PermissionAlert
            user={user}
            permission="MESSAGES"
            content={<Profile />}
          />
        ) : Panel === 3 ? (
          <PermissionAlert
            user={user}
            permission="MESSAGES"
            content={<Support />}
          />
        ) : Panel === 4 ? (
          <PermissionAlert
            user={user}
            permission="SELLERS"
            content={<Seller />}
          />
        ) : Panel === 5 ? (
          <PermissionAlert user={user} permission="USERS" content={<Users />} />
        ) : Panel === 6 ? (
          <PermissionAlert
            user={user}
            permission="WALLET"
            content={<Wallet />}
          />
        ) : Panel === 7 ? (
          <PermissionAlert
            user={user}
            permission="ANALYTICS"
            content={<Analytics />}
          />
        ) : null}
      </Stack>
    </Stack>
  );
};

export default AdminContentPanel;

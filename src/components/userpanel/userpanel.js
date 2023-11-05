import { useState, useEffect, useContext, useCallback, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import "./userpanel.css";

// API
import { GetRequest } from "../../api/requests/getAPI";
import { userProfile, addressList, orderList } from "../../api/endpoints";

// Components
import { Stack } from "@mui/material";
import Container from "../../assets/components/container";
import Profile from "./profile";
import UserNav from "./usernav";
import Address from "../AddressBook/Address";

// Services
import { Sort } from "../../assets/utils/commons";

const Panels = {
  profile: "profile",
  orders: "orders",
  address: "address",
};

const UserPanel = () => {
  const navigate = useNavigate();
  const { panel } = useParams();
  const [user] = useContext(UserContext);
  const [account, setAccount] = useState({});
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!panel) navigate(`/user/${Panels.profile}`);
  }, [panel, navigate]);

  const FetchData = async () => {
    const profile = await GetRequest(userProfile);
    const addressBook = await GetRequest(addressList);
    const ordersList = await GetRequest(orderList);
    setOrders(ordersList.data);
    setAddress(Sort(addressBook.data, "updatedAt"));
    setAccount(profile.data);
    setLoading(false);
  };

  useEffect(() => {
    FetchData();
  }, []);

  const PanelSelector = () => {
    return (
      <Fragment>
        {Panels.profile === panel ? (
          <Stack sx={{ flexGrow: 1, width: "100%" }} spacing={2}>
            <Profile user={account} />
            <UserNav />
          </Stack>
        ) : Panels.address === panel ? (
          <Address address={address} />
        ) : (
          <h1>Orders to be made</h1>
        )}
      </Fragment>
    );
  };
  return (
    <Container title="Bookshlf | User" isAutherized={user} loading={loading}>
      <PanelSelector />
    </Container>
  );
};

export default UserPanel;

import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { useParams } from "react-router-dom";

import { GetRequest } from "../../../api/requests/getAPI";
import { orderDetails } from "../../../api/endpoints";

import "./tracking.css";

import { Stack } from "@mui/material";

import Container from "../../../assets/components/container";
import Details from "./details";
import OrderProgress from "./trackprogress";

const Tracking = () => {
  const [user] = useContext(UserContext);
  const { orderId } = useParams();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});

  const getOrderDetails = () => {
    GetRequest(orderDetails, { orderId: orderId }).then((response) => {
      setOrder(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getOrderDetails();
  }, [orderId]);

  return (
    <Container title="Tracking | Bookshlf" isAutherized={user}>
      <Stack
        direction={{
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
        }}
        spacing={2}
        sx={{ width: "100%", flexGrow: 1 }}
      >
        <OrderProgress order={order} loading={loading} />
        <Details order={order} loading={loading} />
      </Stack>
    </Container>
  );
};

export default Tracking;

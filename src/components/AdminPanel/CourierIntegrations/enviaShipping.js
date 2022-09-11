import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../axios";

//
import { Radio, RadioGroup, FormControlLabel, Divider } from "@mui/material";
import { TextField, Button, Alert, AlertTitle, Stack } from "@mui/material";
import { Typography, Tooltip, FormLabel, FormControl } from "@mui/material";
import { Grid, Chip, CircularProgress } from "@mui/material";

// MUi Icons
import LoginIcon from "@mui/icons-material/Login";
import RupeeIcon from "@mui/icons-material/CurrencyRupee";

const EnviaShipping = () => {
  const params = useParams();

  const enviaURL = {
    rate: "/proxy/https://api.envia.com/ship/rate/",
    courierList: "https://queries.envia.com/carrier/",
    tracking: "https://api.envia.com/ship/generaltrack/",
    cancel: "https://api.envia.com/ship/cancel/",
    create: "https://api.envia.com/ship/generate/",
    addresses: "https://queries.envia.com/all-addresses",
    shipmentDetails: "http://queries.envia.com/guide/",
  };

  const [order, setOrder] = useState({});
  const [token, setToken] = useState(process.env.REACT_APP_ENVIA_TOKEN);
  const [weight, setWeight] = useState(order.weightInGrams);
  const [length, setLength] = useState(30);
  const [breadth, setBreadth] = useState(20);
  const [height, setHeight] = useState(2);

  useEffect(() => {
    axios
      .get("/admin-getOrderDetails", {
        params: { orderId: params.orderId },
      })
      .then((res) => {
        console.log(res);
        setOrder(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [params.orderId]);

  return (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{
        border: "1px solid rgba(0,0,0,0.2)",
        padding: "20px",
        borderRadius: "5px",
        margin: "10px 24px",
      }}
      divider={<Divider orientation="horizontal" flexItem />}
    >
      <Stack
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <img src="/images/smallLogo.png" height="43px" alt="Bookshlf" />
        <img
          src="https://s3.us-east-2.amazonaws.com/enviapaqueteria/uploads/landing/images/countries/USA/EnviaShipping_Logo-Color.svg"
          height="43px"
          alt="Nimbus Post"
        />
      </Stack>
    </Stack>
  );
};

export default EnviaShipping;

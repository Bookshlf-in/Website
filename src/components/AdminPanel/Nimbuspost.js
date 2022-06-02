import { React, useState, useEffect } from "react";
import axios from "../../axios";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import {
  TextField,
  Button,
  Alert,
  AlertTitle,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";

const Nimbuspost = ({ order }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState("");
  const [weight, setWeight] = useState(order.weightInGrams);
  const [length, setLength] = useState(30);
  const [breadth, setBreadth] = useState(20);
  const [height, setHeight] = useState(2);
  const [courierList, setCourierList] = useState([]);
  const [courierId, setCourierId] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  useEffect(() => {
    const nimbuspostToken = sessionStorage.getItem("nimbuspost_token");
    if (nimbuspostToken) {
      setToken(nimbuspostToken);
      setShowLogin(false);
    }
  }, [order, setShowLogin]);

  const login = () => {
    axios
      .post("/proxy/https://api.nimbuspost.com/v1/users/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.status) {
          setToken(response.data.data);
          sessionStorage.setItem("nimbuspost_token", response.data.data);
          setShowLogin(false);
          setErrorMsg("");
        } else {
          setErrorMsg(response.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg("Some error occurred");
        console.log("Error occurred in nimbuspost", error);
      });
  };

  const logout = () => {
    sessionStorage.removeItem("nimbuspost_token");
    setToken("");
    setShowLogin(true);
    setErrorMsg("");
  };

  const fetchServices = () => {
    setCourierList([]);
    setErrorMsg("");
    const obj = {
      weight,
      length,
      breadth,
      height,
      origin: order.sellerAddress.zipCode,
      destination: order.customerAddress.zipCode,
      payment_type: "cod",
      order_amount: order.orderTotal,
    };
    axios
      .post(
        "/proxy/https://api.nimbuspost.com/v1/courier/serviceability",
        obj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          response.data.data.sort(function (a, b) {
            return a.total_charges - b.total_charges;
          });
          setCourierList(response.data.data);
        } else {
          setErrorMsg(response.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg("Some error occurred");
        console.log("Error occurred in nimbuspost", error);
      });
  };

  const handleRadioChange = (e) => {
    setCourierId(e.target.value);
  };

  const createShipment = () => {
    const obj = {
      order_number: order._id.substr(0, 20),
      shipping_charges: order.shippingCharges,
      discount: 0,
      cod_charges: 0,
      payment_type: "cod",
      order_amount: order.orderTotal,
      package_weight: weight,
      package_length: length,
      package_breadth: breadth,
      package_height: height,
      request_auto_pickup: "yes",
      consignee: {
        name: order.customerName,
        address: order.customerAddress.address,
        city: order.customerAddress.city,
        state: order.customerAddress.state,
        pincode: order.customerAddress.zipCode,
        phone: order.customerAddress.phoneNo,
      },
      pickup: {
        warehouse_name: order.sellerName,
        name: order.sellerName,
        address: order.sellerAddress.address,
        city: order.sellerAddress.city,
        state: order.sellerAddress.state,
        pincode: order.sellerAddress.zipCode,
        phone: order.sellerAddress.phoneNo,
      },
      order_items: [
        {
          name: order.title,
          qty: order.purchaseQty,
          price: order.price,
        },
      ],
      courier_id: courierId,
      is_insurance: "0",
    };
    axios
      .post("/proxy/https://api.nimbuspost.com/v1/shipments", obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          const data = response.data.data;
          setSuccessMsg("Order Placed");
          updateOrder(data);
        } else {
          setErrorMsg(response.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg("Some error occurred");
        console.log("Error occurred in nimbuspost", error);
      });
  };

  const updateOrder = (shipmentData) => {
    const externalTrackingLink = `https://ship.nimbuspost.com/shipping/tracking/${shipmentData.awb_number}`;
    const externalTrackingDetails = `${shipmentData.courier_name}, Label: ${shipmentData.label}`;
    const courierId = shipmentData.courier_id;
    const adminDeliveryExpense = courierList.find(
      (e) => e.id === courierId
    ).total_charges;

    axios
      .post("/admin-updateOrder", {
        orderId: order._id,
        externalTrackingLink,
        externalTrackingDetails,
        adminDeliveryExpense,
      })
      .then((response) => {
        axios
          .post("/admin-markOrderAsPacked", { orderId: order._id })
          .then(() => {
            setSuccessMsg("Order Updated");
            window.location.reload();
          });
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg("Some error occurred while updating order");
      });
  };

  return (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100%",
        border: "1px solid rgba(0,0,0,0.2)",
        padding: "20px",
        borderRadius: "5px",
      }}
    >
      <Typography variant="caption">Nimbuspost</Typography>
      {showLogin ? (
        <Stack direction="row" spacing={2}>
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            type="email"
            sx={{ maxWidth: 200 }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            label="Password"
            variant="outlined"
            size="small"
            fullWidth
            type="password"
            sx={{ maxWidth: 200 }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button variant="outlined" onClick={login}>
            Login
          </Button>
        </Stack>
      ) : (
        <>
          <Button variant="filled" onClick={logout}>
            Logout
          </Button>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Weight in grams"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ maxWidth: 200 }}
              onChange={(e) => setWeight(e.target.value)}
              value={weight}
            />
            <TextField
              label="Length in cm"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ maxWidth: 200 }}
              onChange={(e) => setLength(e.target.value)}
              value={length}
            />
            <TextField
              label="Breadth in cm"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ maxWidth: 200 }}
              onChange={(e) => setBreadth(e.target.value)}
              value={breadth}
            />
            <TextField
              label="Height in cm"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ maxWidth: 200 }}
              onChange={(e) => setHeight(e.target.value)}
              value={height}
            />
          </Stack>
          <Button variant="outlined" onClick={fetchServices}>
            Fetch Services
          </Button>

          {courierList.length > 0 && (
            <FormControl>
              <FormLabel id="shipment-services">Available services</FormLabel>
              <RadioGroup
                aria-labelledby="shipment-services"
                name="radio-buttons-group"
                default="1"
              >
                {courierList.map((e) => (
                  <Tooltip
                    key={e.id}
                    title={
                      "MinWeight: " +
                      e.min_weight +
                      " --- ChargeableWeight: " +
                      e.chargeable_weight
                    }
                  >
                    <FormControlLabel
                      value={e.id}
                      control={<Radio />}
                      onClick={handleRadioChange}
                      label={e.total_charges + " --- " + e.name}
                    />
                  </Tooltip>
                ))}
              </RadioGroup>
            </FormControl>
          )}

          {courierId > 0 && (
            <Button variant="outlined" onClick={createShipment}>
              Create Shipment
            </Button>
          )}
        </>
      )}
      {errorMsg !== "" && (
        <Alert severity="error">
          <AlertTitle>
            <strong>Error</strong>
          </AlertTitle>
          <Typography variant="caption">{errorMsg}</Typography>
        </Alert>
      )}
      {successMsg !== "" && (
        <Alert severity="success">
          <AlertTitle>
            <strong>Success</strong>
          </AlertTitle>
          <Typography variant="caption">{successMsg}</Typography>
        </Alert>
      )}
    </Stack>
  );
};

export default Nimbuspost;

import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../api/axios";

import { Radio, RadioGroup, FormControlLabel, Divider } from "@mui/material";
import { TextField, Button, Alert, AlertTitle, Stack } from "@mui/material";
import { Typography, Tooltip, FormLabel, FormControl } from "@mui/material";
import { Grid, Chip, CircularProgress } from "@mui/material";

// MUi Icons
import LoginIcon from "@mui/icons-material/Login";
import RupeeIcon from "@mui/icons-material/CurrencyRupee";

const Nimbuspost = () => {
  const params = useParams();
  const NimbusURL = "/proxy/https://api.nimbuspost.com/v1/users/login";

  const [order, setOrder] = useState({});
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

  // Loaders
  const [loginLoad, setLoginLoad] = useState(false);
  const [servicesLoad, setServicesLoad] = useState(false);
  const [shipmentLoad, setShipmentLoad] = useState(false);

  useEffect(() => {
    const nimbuspostToken = sessionStorage.getItem("nimbuspost_token");
    if (nimbuspostToken) {
      setToken(nimbuspostToken);
      setShowLogin(false);
    }
  }, [order, setShowLogin]);

  useEffect(() => {
    axios
      .get("/admin-getOrderDetails", {
        params: { orderId: params.orderId },
      })
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [params.orderId, setShowLogin]);

  const login = () => {
    setLoginLoad(true);
    setWeight(order.weightInGrams);
    axios
      .post(NimbusURL, {
        email,
        password,
      })
      .then((response) => {
        if (response.data.status) {
          setToken(response.data.data);
          sessionStorage.setItem("nimbuspost_token", response.data.data);
          setShowLogin(false);
          setErrorMsg("");
          setWeight(order.weightInGrams);
          console.log("logged In");
        } else {
          setErrorMsg(response.data.message);
        }
        setLoginLoad(false);
      })
      .catch((error) => {
        setLoginLoad(false);
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
    setServicesLoad(true);
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
        setServicesLoad(false);
        console.log(response.data);
        if (response.data.status) {
          response.data.data.sort((a, b) => {
            return a.total_charges - b.total_charges;
          });
          setCourierList(response.data.data);
        } else {
          setErrorMsg(response.data.message);
        }
      })
      .catch((error) => {
        setServicesLoad(false);
        setErrorMsg("Some error occurred");
        console.log("Error occurred in nimbuspost", error);
      });
  };

  const handleRadioChange = (e) => {
    setCourierId(e.target.value);
  };

  const createShipment = () => {
    setShipmentLoad(true);
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
        warehouse_name: order.sellerName.substr(0, 20),
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
    console.log(obj);
    axios
      .post("/proxy/https://api.nimbuspost.com/v1/shipments", obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setShipmentLoad(false);
        console.log(response.data);
        if (response.data.status) {
          const data = response.data.data;
          setSuccessMsg("Order Placed Successfully!");
          updateOrder(data);
        } else {
          setErrorMsg(response.data.message);
        }
      })
      .catch((error) => {
        setShipmentLoad(false);
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
          src="https://nimbuspost.com/wp-content/uploads/2020/10/Logo.jpg"
          height="43px"
          alt="Nimbus Post"
        />
      </Stack>

      {!showLogin ? (
        <Stack direction="row" justifyContent="space-between">
          <Button variant="contained" onClick={logout} color="error">
            Logout
          </Button>
        </Stack>
      ) : null}

      {showLogin ? (
        <Stack
          spacing={2}
          sx={{
            padding: "10px",
            border: "1px solid rgba(0,0,0,0.2)",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h4" sx={{ fontFamily: "Staatliches" }}>
            Login
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            sx={{ minWidth: 400 }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            sx={{ minWidth: 400 }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button
            disabled={loginLoad}
            variant="contained"
            sx={{ maxWidth: 200 }}
            onClick={login}
            color="success"
            endIcon={
              loginLoad ? (
                <CircularProgress size={15} color="inherit" />
              ) : (
                <LoginIcon />
              )
            }
          >
            Login
          </Button>
        </Stack>
      ) : (
        <>
          <Stack
            spacing={2}
            sx={{
              padding: "10px",
              border: "1px solid rgba(0,0,0,0.2)",
              borderRadius: "10px",
            }}
          >
            <Typography variant="h6" sx={{ fontFamily: "Staatliches" }}>
              Courier Dimensions
            </Typography>
            <TextField
              label="Weight in grams"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ maxWidth: 150 }}
              onChange={(e) => setWeight(e.target.value)}
              value={weight}
            />
            <TextField
              label="Length in cm"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ maxWidth: 150 }}
              onChange={(e) => setLength(e.target.value)}
              value={length}
            />
            <TextField
              label="Breadth in cm"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ maxWidth: 150 }}
              onChange={(e) => setBreadth(e.target.value)}
              value={breadth}
            />
            <TextField
              label="Height in cm"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ maxWidth: 150 }}
              onChange={(e) => setHeight(e.target.value)}
              value={height}
            />
          </Stack>
          <Button
            variant="contained"
            color="secondary"
            onClick={fetchServices}
            disabled={servicesLoad}
            endIcon={
              servicesLoad ? (
                <CircularProgress color="inherit" size={15} />
              ) : null
            }
          >
            Fetch Services
          </Button>

          {courierList.length > 0 && (
            <FormControl>
              <FormLabel id="shipment-services" sx={{ marginBottom: "10px" }}>
                <Typography
                  variant="h6"
                  sx={{ fontFamily: "staatliches" }}
                  textAlign="center"
                >
                  Available services
                </Typography>
              </FormLabel>
              <RadioGroup
                aria-labelledby="shipment-services"
                name="radio-buttons-group"
                default="1"
              >
                <Grid container spacing={2}>
                  {courierList.map((e) => (
                    <Grid item xs={6} sm={4} md={4} lg={3}>
                      <Tooltip
                        key={e.id}
                        title={
                          "MinWeight: " +
                          e.min_weight +
                          " --- ChargeableWeight: " +
                          e.chargeable_weight
                        }
                        sx={{
                          padding: "10px",
                          border: "1px solid rgba(0,0,0,0.2)",
                          borderRadius: "10px",
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <FormControlLabel
                          value={e.id}
                          control={<Radio size="small" />}
                          onClick={handleRadioChange}
                          label={
                            <Stack
                              direction="row"
                              spacing={1}
                              divider={
                                <Divider orientation="vertical" flexItem />
                              }
                            >
                              <Chip
                                size="small"
                                variant="outlined"
                                color="success"
                                icon={<RupeeIcon sx={{ height: 12 }} />}
                                label={e.total_charges}
                                sx={{ minWidth: 100 }}
                              />
                              <Typography
                                variant="caption"
                                sx={{ fontSize: "11px" }}
                              >
                                {e.name}
                              </Typography>
                            </Stack>
                          }
                        />
                      </Tooltip>
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>
          )}

          {courierId > 0 && (
            <Button
              variant="contained"
              onClick={createShipment}
              disabled={shipmentLoad}
              endIcon={
                shipmentLoad ? (
                  <CircularProgress color="inherit" size={15} />
                ) : null
              }
              color="info"
            >
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
          <Typography variant="caption">
            {"Order Placed Successfully!"}
          </Typography>
        </Alert>
      )}
    </Stack>
  );
};

export default Nimbuspost;

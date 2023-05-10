import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";

import { Radio, RadioGroup, FormControlLabel, Divider } from "@mui/material";
import { TextField, Button, Alert, AlertTitle, Stack } from "@mui/material";
import { Typography, Tooltip, FormLabel, FormControl } from "@mui/material";
import { Grid, Chip, CircularProgress } from "@mui/material";

// MUi Icons
import LoginIcon from "@mui/icons-material/Login";
import RupeeIcon from "@mui/icons-material/CurrencyRupee";

const statesData = [
  { zoneId: 1475, state: "Andaman and Nicobar Islands", stateCode: "AN" },
  { zoneId: 1476, state: "Andhra Pradesh", stateCode: "AP" },
  { zoneId: 1477, state: "Arunachal Pradesh", stateCode: "AR" },
  { zoneId: 1478, state: "Assam", stateCode: "AS" },
  { zoneId: 1479, state: "Bihar", stateCode: "BI" },
  { zoneId: 1480, state: "Chandigarh", stateCode: "CH" },
  { zoneId: 1481, state: "Dadra and Nagar Haveli", stateCode: "DA" },
  { zoneId: 1482, state: "Daman and Diu", stateCode: "DM" },
  { zoneId: 1483, state: "Delhi", stateCode: "DE" },
  { zoneId: 1484, state: "Goa", stateCode: "GO" },
  { zoneId: 1485, state: "Gujarat", stateCode: "GU" },
  { zoneId: 1486, state: "Haryana", stateCode: "HA" },
  { zoneId: 1487, state: "Himachal Pradesh", stateCode: "HP" },
  { zoneId: 1488, state: "Jammu and Kashmir", stateCode: "JA" },
  { zoneId: 1489, state: "Karnataka", stateCode: "KA" },
  { zoneId: 1490, state: "Kerala", stateCode: "KE" },
  { zoneId: 1491, state: "Lakshadweep Islands", stateCode: "LI" },
  { zoneId: 1492, state: "Madhya Pradesh", stateCode: "MP" },
  { zoneId: 1493, state: "Maharashtra", stateCode: "MA" },
  { zoneId: 1494, state: "Manipur", stateCode: "MN" },
  { zoneId: 1495, state: "Meghalaya", stateCode: "ME" },
  { zoneId: 1496, state: "Mizoram", stateCode: "MI" },
  { zoneId: 1497, state: "Nagaland", stateCode: "NA" },
  { zoneId: 1498, state: "Odisha", stateCode: "OD" },
  { zoneId: 1499, state: "Puducherry", stateCode: "PO" },
  { zoneId: 1500, state: "Punjab", stateCode: "PU" },
  { zoneId: 1501, state: "Rajasthan", stateCode: "RA" },
  { zoneId: 1502, state: "Sikkim", stateCode: "SI" },
  { zoneId: 1503, state: "Tamil Nadu", stateCode: "TN" },
  { zoneId: 1504, state: "Tripura", stateCode: "TR" },
  { zoneId: 1505, state: "Uttar Pradesh", stateCode: "UP" },
  { zoneId: 1506, state: "West Bengal", stateCode: "WB" },
  { zoneId: 4231, state: "Telangana", stateCode: "TS" },
  { zoneId: 4239, state: "Jharkhand", stateCode: "JH" },
  { zoneId: 4240, state: "Uttarakhand", stateCode: "UK" },
  { zoneId: 4241, state: "Chattisgarh", stateCode: "CG" },
  { zoneId: 4242, state: "Ladakh", stateCode: "LA" },
];

const ICarry = () => {
  const params = useParams();
  const ICarryURL = "/proxy/https://www.icarry.in/api_login";

  const [order, setOrder] = useState({});
  const [username, setUsername] = useState(
    process.env.REACT_APP_ICARRY_USERNAME
  );
  const [key, setKey] = useState(process.env.REACT_APP_ICARRY_KEY);
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState("");
  const [weight, setWeight] = useState(0);
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
    const icarryToken = sessionStorage.getItem("icarry_token");
    if (icarryToken) {
      setToken(icarryToken);
      setShowLogin(false);
    }
  }, [order, setShowLogin]);

  useEffect(() => {
    axios
      .get("/admin-getOrderDetails", {
        params: { orderId: params.orderId },
      })
      .then((res) => {
        console.log(res.data);
        setOrder(res.data);
        setWeight(res.data.weightInGrams);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [params.orderId, setShowLogin]);

  const login = () => {
    setLoginLoad(true);
    setWeight(order.weightInGrams);
    axios
      .post(ICarryURL, {
        username,
        key,
      })
      .then((response) => {
        if (response.data.success) {
          setToken(response.data.api_token);
          sessionStorage.setItem("icarry_token", response.data.api_token);
          setShowLogin(false);
          setErrorMsg("");
          console.log(response.data.success);
        } else {
          console.log(response.data);
          setErrorMsg("Invalid API Key or Username");
        }
        setLoginLoad(false);
      })
      .catch((error) => {
        console.log(error);
        setLoginLoad(false);
        setErrorMsg("Some error occurred");
        console.log("Error occurred in Icarry", error.response);
      });
  };

  const logout = () => {
    sessionStorage.removeItem("icarry_token");
    setToken("");
    setShowLogin(true);
    setErrorMsg("");
  };

  const fetchServices = () => {
    setServicesLoad(true);
    setCourierList([]);
    setErrorMsg("");
    const bodyParams = {
      length: Number(length),
      breadth: Number(breadth),
      height: Number(height),
      weight: Number(weight),
      origin_pincode: order.customerAddress.zipCode,
      destination_pincode: order.sellerAddress.zipCode,
      destination_country_code: "IN",
      origin_country_code: "IN",
      shipment_mode: "S",
      shipment_type: "C",
      shipment_value: Number(order.orderTotal),
    };
    console.log(bodyParams);
    axios
      .post(
        `/proxy/https://www.icarry.in/api_get_estimate&api_token=${token}`,
        bodyParams
      )
      .then((res) => {
        setServicesLoad(false);
        console.log(res.data);
        if (res.data.success === 1) {
          res.data.estimate.sort((a, b) => {
            return a.courier_cost - b.courier_cost;
          });
          setCourierList(res.data.estimate);
        } else {
          setErrorMsg(res.data.error);
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

  const getStateId = (stateName) => {
    return statesData.find((s) => s.state === stateName).zoneId;
  };

  const getStateCode = (stateName) => {
    return statesData.find((s) => s.state === stateName).stateCode;
  };

  const createAddress = async (address, name) => {
    const bodyParams = {
      nickname: name,
      name: name,
      email: "bookshlf.in@gmail.com",
      phone: address.phoneNo.toString(),
      street1: address.address,
      city: address.city,
      pincode: address.zipCode.toString(),
      zone_id: getStateId(address.state),
      country_id: "99",
    };
    console.log(bodyParams);
    const res = await axios
      .post(
        `/proxy/https://www.icarry.in/api_add_pickup_address&api_token=${token}`,
        bodyParams
      )
      .then((res) => {
        console.log(res);
        if (res.data.success === 1) return res.data.warehouse_id;
      })
      .catch((err) => {
        console.log(err.response);
      });
    return res;
  };

  const addAllAddresses = async (addresses) => {
    return await Promise.all(
      addresses.map(async (address) => {
        const addressId = await createAddress(address.address, address.name);
        return addressId;
      })
    );
  };
  const createShipment = async () => {
    setShipmentLoad(false);
    const addresses = [
      { address: order.customerAddress, name: order.customerName },
    ];
    const addressIds = await addAllAddresses(addresses);
    console.log(addressIds);
    const shipmentBody = {
      pickup_address_id: addressIds[0],
      client_order_id: params.orderId,
      consignee: {
        name: order.customerName,
        mobile: order.customerAddress.phoneNo.toString(),
        address: order.customerAddress.address,
        city: order.customerAddress.city,
        pincode: order.customerAddress.zipCode.toString(),
        state: getStateCode(order.customerAddress.state),
        country_code: "IN",
      },
      parcel: {
        type: ["COD"],
        value: order.orderTotal,
        currency: "INR",
        contents: order.title.substring(0, Math.max(order.title.length, 255)),
        dimensions: [length, breadth, height, "cm"],
        weight: [weight, "gm"],
      },
      courier_id: courierId,
    };

    axios
      .post(
        `/proxy/https://www.icarry.in/api_add_ shipment_surface&api_token=${token}`,
        shipmentBody
      )
      .then((response) => {
        setShipmentLoad(false);
        console.log(response.data);
        if (response.data.status) {
          const data = response.data.data;
          setSuccessMsg("Order Placed Successfully!");
          // updateOrder(data);
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

  // const updateOrder = (shipmentData) => {
  //   const externalTrackingLink = `https://ship.nimbuspost.com/shipping/tracking/${shipmentData.awb_number}`;
  //   const externalTrackingDetails = `${shipmentData.courier_name}, Label: ${shipmentData.label}`;
  //   const courierId = shipmentData.courier_id;
  //   const adminDeliveryExpense = courierList.find(
  //     (e) => e.id === courierId
  //   ).total_charges;

  //   axios
  //     .post("/admin-updateOrder", {
  //       orderId: order._id,
  //       externalTrackingLink,
  //       externalTrackingDetails,
  //       adminDeliveryExpense,
  //     })
  //     .then((response) => {
  //       axios
  //         .post("/admin-markOrderAsPacked", { orderId: order._id })
  //         .then(() => {
  //           setSuccessMsg("Order Updated");
  //           window.location.reload();
  //         });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setErrorMsg("Some error occurred while updating order");
  //     });
  // };

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
          src="https://www.icarry.in/image/cache/catalog/icarry-logo-manifest-146x146.png.webp"
          height="60px"
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
            label="Username"
            variant="outlined"
            fullWidth
            type="text"
            sx={{ minWidth: 400 }}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <TextField
            label="Key"
            variant="outlined"
            fullWidth
            type="password"
            sx={{ minWidth: 400 }}
            onChange={(e) => setKey(e.target.value)}
            value={key}
          />
          <Stack direction="row" spacing={2}>
            {/* <Link
              to={{ pathname: "https://www.icarry.in/api" }}
              target="_blank"
            >
              <Button variant="outlined" size="small">
                Get New Key
              </Button>
            </Link> */}
            <Button
              size="small"
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
                    <Grid item xs={6} sm={4} md={4} lg={3} key={e.courier_id}>
                      <Tooltip
                        key={e.courier_id}
                        title={e.courier_group_name}
                        sx={{
                          padding: "10px",
                          border: "1px solid rgba(0,0,0,0.2)",
                          borderRadius: "10px",
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <FormControlLabel
                          value={e.courier_id}
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
                                label={e.courier_cost}
                                sx={{ minWidth: 100 }}
                              />
                              <Typography
                                variant="caption"
                                sx={{ fontSize: "11px" }}
                              >
                                {e.courier_name}
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

export default ICarry;

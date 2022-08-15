import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../axios";

// Components
import { Stack } from "@mui/material";
import { TextField, Button, CircularProgress } from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import { Typography, Chip } from "@mui/material";
// Icons
import IDIcon from "@mui/icons-material/Notes";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PendingIcon from "@mui/icons-material/Pending";
import SearchIcon from "@mui/icons-material/Search";

const GetOrderDetails = () => {
  const history = useHistory();

  // Data States
  const [order, setOrder] = useState(null);
  const [orderId, setOrderId] = useState("");

  // Updating States
  const [Loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // handeling order id field change
  const handleChange = (orderid) => {
    orderid = orderid.replace(/\s+/g, "");
    setOrderId(orderid);
    if (orderid.length > 24) setIsError(true);
    else setIsError(false);

    if (orderid.length === 24) setIsValid(true);
    else setIsValid(false);
  };

  const handleClick = () => {
    setLoading(true);
    axios
      .get("/admin-getOrderDetails", {
        params: { orderId: orderId },
      })
      .then((response) => {
        setLoading(false);
        setOrder(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        setIsError(true);
        setLoading(false);
      });
  };

  return (
    <Stack
      sx={{ padding: "24px" }}
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <Stack spacing={2} sx={{ width: "400px" }}>
        <TextField
          label="Order ID"
          type="text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IDIcon size="small" color={isError ? "error" : "primary"} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small">
                  {isError ? (
                    <CloseIcon color="error" />
                  ) : isValid ? (
                    <CheckIcon color="success" />
                  ) : (
                    <PendingIcon color="warning" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={
            isError
              ? "Enter Valid Order ID"
              : isValid
              ? "Valid Order ID Found"
              : "Enter 24 digit Order ID"
          }
          variant="outlined"
          error={isError}
          color={isValid ? "success" : "primary"}
          fullWidth
          value={orderId}
          onChange={(e) => handleChange(e.target.value)}
          size="small"
          focused={isValid}
        />
        <Button
          size="small"
          variant="outlined"
          onClick={handleClick}
          disabled={Loading || isError || !isValid}
          endIcon={
            Loading ? (
              <CircularProgress color="inherit" size={15} />
            ) : (
              <SearchIcon />
            )
          }
        >
          Get Order Details
        </Button>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          spacing={1}
          sx={{
            width: "400px",
            border: "1px solid black",
            borderRadius: "10px",
            padding: "10px",
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h6">Order</Typography>
          <Typography>{order?.title}</Typography>
          <Typography>{order?.orderTotal}</Typography>
          <Typography>
            Seller Payment Status :
            {order?.isSellerPaid ? (
              <Chip label="Paid" size="small" />
            ) : (
              <Chip label="Pending" size="small" />
            )}
          </Typography>
          <Chip label={order?.status[order?.status.length - 1]} />
          <Button
            onClick={() => history.push(`/AdminTrack/${orderId}`)}
            variant="contained"
          >
            Get Full Order Details
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default GetOrderDetails;

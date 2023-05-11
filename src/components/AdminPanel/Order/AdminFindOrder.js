import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

// Components
import { Stack, Typography, Chip, Divider } from "@mui/material";
import { TextField, Button, CircularProgress } from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
// Icons
import IDIcon from "@mui/icons-material/Notes";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PendingIcon from "@mui/icons-material/Pending";
import SearchIcon from "@mui/icons-material/Search";

const ListItem = ({ head, body, orderId }) => {
  const navigate = useNavigate();
  return (
    <Stack
      spacing={1}
      sx={{
        padding: "10px",
        border: "1px solid rgba(0,0,0,0.2)",
        borderRadius: "5px",
        width: "100%",
      }}
    >
      <Typography variant="body2">{head}</Typography>
      <Typography variant="caption">{body}</Typography>
      {orderId.length === 24 ? (
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate(`/AdminTrack/${orderId}`)}
          sx={{ maxWidth: 250 }}
        >
          Get Full Order Details
        </Button>
      ) : null}
    </Stack>
  );
};

const AdminFindOrder = () => {
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
      })
      .catch((err) => {
        console.log(err.response.data);
        setIsError(true);
        setLoading(false);
      });
  };

  return (
    <Stack
      sx={{ padding: "0px 10px" }}
      spacing={2}
      justifyContent="center"
      direction="row"
      divider={<Divider flexItem orientation="vertical" />}
    >
      <Stack spacing={2} sx={{ width: "300px" }}>
        <Typography>Find Order</Typography>
        <TextField
          label="Order ID"
          type="text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IDIcon
                  sx={{ fontSize: "12px" }}
                  color={isError ? "error" : "primary"}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small">
                  {isError ? (
                    <CloseIcon sx={{ fontSize: "12px" }} color="error" />
                  ) : isValid ? (
                    <CheckIcon sx={{ fontSize: "12px" }} color="success" />
                  ) : (
                    <PendingIcon sx={{ fontSize: "12px" }} color="warning" />
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
          error={isError}
          color={isValid ? "success" : "primary"}
          fullWidth
          value={orderId}
          onChange={(e) => handleChange(e.target.value)}
          size="small"
          focused={isValid}
          sx={{ "& div": { "& input": { fontSize: "12px !important" } } }}
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
          Find Order
        </Button>
      </Stack>

      <Stack spacing={1} sx={{ flexGrow: 1 }}>
        <Typography>Found Results</Typography>
        {order ? (
          <ListItem
            head={order.title}
            body={order.orderTotal}
            orderId={orderId}
          />
        ) : (
          <ListItem head={"Nothing to show here"} body={""} orderId={""} />
        )}
      </Stack>
    </Stack>
  );
};

export default AdminFindOrder;

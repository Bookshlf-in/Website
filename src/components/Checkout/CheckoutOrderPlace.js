import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Divider, Chip, Button, CircularProgress } from "@mui/material";
import { Alert, Typography, Checkbox, Collapse } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CheckoutOrderPlace = ({ orderLoad, orderPlaced, handlePlaceOrder }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleClick = () => {
    handlePlaceOrder();
  };
  return (
    <Stack
      spacing={2}
      divider={<Divider orientation="horizontal" flexItem />}
      sx={{ width: "100%", maxWidth: 600 }}
    >
      <Alert
        severity={orderPlaced ? "success" : "info"}
        color={orderPlaced ? "success" : "warning"}
      >
        <Typography variant="body1">
          {orderPlaced
            ? "Order Placed Successfully!"
            : "Your Order Ready for Final Confirmation"}
        </Typography>
      </Alert>

      {!orderPlaced && (
        <Stack direction="row" spacing={1} alignItems="center">
          <Checkbox
            color="success"
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            disabled={orderLoad}
          />
          {!checked && (
            <Stack direction="row" spacing={1} alignItems="center">
              <ArrowBackIcon />
              <Typography variant="caption">Please Confirm Here</Typography>
            </Stack>
          )}
          <Chip
            size="small"
            label={checked ? "Confirmed" : "Confirmation Pending"}
            color={checked ? "success" : "warning"}
            variant={checked ? "filled" : "outlined"}
          />
        </Stack>
      )}
      {!orderPlaced && (
        <Collapse in={checked}>
          <Stack spacing={1}>
            <Alert severity="info" size="small">
              Click on PLACE ORDER to place your order
            </Alert>
            <Button
              variant="outlined"
              disabled={!checked || orderLoad}
              startIcon={
                orderLoad ? (
                  <CircularProgress size={15} />
                ) : (
                  <LocalShippingIcon />
                )
              }
              color="success"
              onClick={handleClick}
            >
              {orderLoad ? "Placing Order..." : "Place Order"}
            </Button>
          </Stack>
        </Collapse>
      )}
      <Collapse in={orderPlaced}>
        <Stack spacing={1} justifyContent="center" alignItems="center">
          <CheckCircleIcon sx={{ height: 50, width: 50 }} color="success" />
          <Button
            onClick={() => {
              navigate("/userpanel/2");
            }}
            variant="outlined"
          >
            View Order
          </Button>
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default CheckoutOrderPlace;

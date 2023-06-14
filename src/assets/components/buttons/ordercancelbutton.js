import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteRequest } from "../../../api/requests/deleteAPI";
import { orderCancel } from "../../../api/endpoints";

import { Button, CircularProgress, Alert } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const OrderCancelButton = ({ orderId, className, props }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const handelCancelOrder = () => {
    setLoading(true);
    DeleteRequest(orderCancel, { orderId: orderId })
      .then((response) => {
        setLoading(false);
        navigate(0);
      })
      .catch((error) => {
        setLoading(false);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 5000);
      });
  };

  return (
    <>
      <Button
        {...props}
        className={className}
        disabled={loading}
        endIcon={
          loading ? (
            <CircularProgress size={15} color="inherit" />
          ) : (
            <CancelIcon />
          )
        }
        onClick={handelCancelOrder}
      >
        Cancel Order
      </Button>
      {alert && <Alert severity="error">Order Cancellation Failed!</Alert>}
    </>
  );
};

export default OrderCancelButton;

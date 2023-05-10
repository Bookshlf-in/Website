// hooks
import { useState } from "react";

// MUI Components
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { TextField, Alert, CircularProgress } from "@mui/material";

// micro components
import CopyableText from "../MicroComponents/customCopyText";

// Methods
import {
  handleOpen,
  handleClose,
  adminBookPurchase,
} from "../../service/Book/AdminBookPurchase/purchaseOrder";

const BookPurchaseAdmin = ({ bookId }) => {
  // states
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderLoad, setOrderLoad] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // utitility function to call admin purchase
  const purchaseBook = (orderId) => {
    adminBookPurchase(
      orderId,
      setOrderId,
      setOrderLoad,
      bookId,
      setSuccess,
      setOpen,
      setError
    );
  };

  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        onClick={() => handleOpen(setOpen)}
      >
        Purchase Book (Admin)
      </Button>
      <Dialog open={open} onClose={() => handleClose(setOpen)}>
        <Stack spacing={1} sx={{ padding: "15px 24px", minWidth: 500 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>Book ID</Typography>
            <CopyableText text={bookId} fontSize="12px" />
          </Stack>
          <TextField
            label="Order Id"
            size="small"
            helperText="Enter Order Id of the previous order that was cancelled"
            value={orderId}
            onChange={(e) => purchaseBook(e.target.value.trim())}
          />
          <Button
            onClick={() => purchaseBook(orderId)}
            size="small"
            variant="outlined"
            endIcon={
              orderLoad ? <CircularProgress size={15} color="inherit" /> : null
            }
            disabled={orderLoad}
          >
            Place New Order
          </Button>
          {error && (
            <Alert severity="error">
              Error Occured. Check Order Id and Try Again!
            </Alert>
          )}
          {success && <Alert severity="success">Order Placed!</Alert>}
        </Stack>
      </Dialog>
    </div>
  );
};

export default BookPurchaseAdmin;

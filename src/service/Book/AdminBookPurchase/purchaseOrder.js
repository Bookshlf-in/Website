// API
import axios from "../../../api/axios";

// Open Dialog
export const handleOpen = (setOpen) => {
  setOpen(true);
};

// Close Dialog
export const handleClose = (setOpen) => {
  setOpen(false);
};

// on Error
export const handleError = (setError) => {
  setError(true);
  setTimeout(() => {
    setError(false);
  }, 3000);
};

// Purchase Order
export const adminBookPurchase = (
  orderId,
  setOrderId,
  setOrderLoad,
  bookId,
  setSuccess,
  setOpen,
  setError
) => {
  console.log(orderId);
  setOrderId(orderId);
  setOrderLoad(true);
  axios
    .get("/admin-getOrderDetails", {
      params: { orderId: orderId },
    })
    .then((response) => {
      axios
        .post("/admin-purchaseBook", {
          bookId: bookId,
          customerId: response.data.customerId,
          customerAddressId: response.data.customerAddress._id,
          purchaseQty: 1,
        })
        .then((res) => {
          console.log("Order Placed!");
          setOrderLoad(false);
          setSuccess(true);
          setTimeout(() => {
            setOpen(false);
          }, 3000);
        })
        .catch((err) => {
          console.log(err.response.data);
          setOrderLoad(false);
          handleError(setError);
        });
      return response;
    })
    .catch((err) => {
      console.log(err);
      setOrderLoad(false);
      handleError(setError);
    });
};

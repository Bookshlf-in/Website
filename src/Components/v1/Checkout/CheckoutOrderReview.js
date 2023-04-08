import { useState, useEffect } from "react";
import { Stack, Typography, Divider, Chip } from "@mui/material";
import RupeeIcon from "@mui/icons-material/CurrencyRupee";

const CurrentAddress = ({ address, addressId }) => {
  const [currentAddress, setCurrentAddress] = useState(
    address.filter((adr) => adr._id === addressId)
  );

  useEffect(() => {
    setCurrentAddress(address.filter((adr) => adr._id === addressId));
  }, [address, addressId]);
  return (
    <Stack
      sx={{
        padding: "10px",
        border: "1px solid rgba(0,255,0,0.5)",
        borderRadius: "5px",
        width: "100%",
      }}
      spacing={1}
    >
      <Chip label={currentAddress[0]?.label} size="small" color="info" />
      <Divider flexItem orientation="horizontal" />
      <Stack>
        <Typography variant="caption">{currentAddress[0]?.address}</Typography>
        <Typography variant="caption">{currentAddress[0]?.city}</Typography>
        <Typography variant="caption">{currentAddress[0]?.state}</Typography>
        <Typography variant="caption">{currentAddress[0]?.zipCode}</Typography>
        <Typography variant="caption">{currentAddress[0]?.phoneNo}</Typography>
      </Stack>
    </Stack>
  );
};

const CheckoutOrderReview = ({ address, addressId, checkout }) => {
  return (
    <Stack direction="column" sx={{ paddingTop: "20px" }} spacing={2}>
      <Typography variant="h5">Shipping Address</Typography>
      <CurrentAddress address={address} addressId={addressId} />
      <Typography variant="h5">Payment Details</Typography>
      <Stack
        sx={{
          border: "1px solid rgba(0,0,0,0.1)",
          padding: "10px",
          borderRadius: "5px",
        }}
        spacing={2}
      >
        <Typography variant="body2">Total Items :</Typography>
        <Chip label={checkout.totalItems} size="small" sx={{ width: 100 }} />
        <Typography variant="body2">Order Total :</Typography>
        <Chip
          icon={<RupeeIcon sx={{ width: 12, height: 12 }} />}
          label={checkout.orderTotal}
          size="small"
          color="info"
          sx={{ width: 100 }}
        />
      </Stack>
    </Stack>
  );
};

export default CheckoutOrderReview;

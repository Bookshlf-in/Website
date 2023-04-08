import { Stack, Divider, Typography, Chip } from "@mui/material";

import RupeeIcon from "@mui/icons-material/CurrencyRupee";

const ContractString = (str) => {
  return str.length > 30 ? str.substr(0, 29) + "..." : str;
};
const CheckoutPayment = ({ checkout, checkoutType }) => {
  return (
    <Stack
      direction="column"
      spacing={2}
      divider={<Divider orientation="horizontal" flexItem />}
      sx={{ width: "100%", maxWidth: 600 }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Item ({checkout.totalItems})</Typography>
        <Typography align="right" variant="h6">
          Price (<RupeeIcon sx={{ height: 15, width: 15 }} />)
        </Typography>
      </Stack>
      {checkoutType !== "cart" ? (
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="caption">
            {ContractString(checkout.item.title)}
          </Typography>
          <Typography align="right" variant="caption">
            (<RupeeIcon sx={{ height: 10, width: 10 }} />) {checkout.item.price}
            /-
          </Typography>
        </Stack>
      ) : (
        checkout.items.map((item) => (
          <Stack direction="row" justifyContent="space-between" key={item._id}>
            <Typography variant="caption">
              {ContractString(item.title)}
            </Typography>
            <Typography align="right" variant="caption">
              (<RupeeIcon sx={{ height: 10, width: 10 }} />) {item.price}
            </Typography>
          </Stack>
        ))
      )}
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Typography variant="caption">Items Subtotal</Typography>
        <Chip
          icon={<RupeeIcon sx={{ height: 12, width: 12 }} />}
          label={checkout.itemsSubtotal}
          size="small"
          sx={{ width: 100 }}
        />
      </Stack>
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Typography variant="caption">Shipping Charges</Typography>
        <Chip
          icon={<RupeeIcon sx={{ height: 12, width: 12 }} />}
          label={checkout.shippingCharges}
          size="small"
          sx={{ width: 100 }}
        />
      </Stack>
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Typography variant="caption">Order Total</Typography>
        <Chip
          icon={<RupeeIcon sx={{ height: 12, width: 12 }} />}
          label={checkout.orderTotal}
          size="small"
          color="success"
          sx={{ width: 100 }}
        />
      </Stack>
    </Stack>
  );
};

export default CheckoutPayment;

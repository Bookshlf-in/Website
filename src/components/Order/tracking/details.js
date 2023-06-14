import { Stack, Typography, Divider } from "@mui/material";

import OrderIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import PaymentIcon from "@mui/icons-material/Payment";

import CopyableText from "../../MicroComponents/customCopyText";

import { AddressFormat } from "../../../assets/utils/commons";
import { TimestampToDate } from "../../../assets/utils/date";

const Details = ({ order = {}, loading }) => {
  const { date, dayName, monthName, year } = TimestampToDate(order.createdAt);

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Stack className="track-box">
        <Stack sx={{ padding: "16px", width: "100%" }} spacing={2}>
          <Stack spacing={2} alignItems="center" direction="row">
            <OrderIcon fontSize="small" color="warning" />
            <Typography variant="body2">Order Details</Typography>
          </Stack>
          <Divider />
          <Stack
            direction={{
              xs: "column",
              sm: "column",
              md: "row",
            }}
            spacing={2}
            sx={{ width: "100%" }}
          >
            <img
              src={order.photo}
              alt={order.title}
              className="track-order-image"
            />
            <Stack spacing={2} sx={{ width: "100%" }}>
              <div>
                <Typography className="track-detail-title">Order Id</Typography>
                <CopyableText text={order._id} fontSize={9} />
              </div>
              <div>
                <Typography className="track-detail-title">Book Id</Typography>
                <CopyableText text={order.bookId} fontSize={9} />
              </div>
              <div>
                <Typography className="track-detail-title">
                  Order Placed On
                </Typography>
                <Typography className="track-detail-text">
                  {date + " " + monthName + ", " + year + " (" + dayName + ")"}
                </Typography>
              </div>
              <div>
                <Typography className="track-detail-title">
                  Order Title
                </Typography>
                <Typography className="track-detail-text">
                  {order.title}
                </Typography>
              </div>
              <div>
                <Typography className="track-detail-title">
                  Book Seller
                </Typography>
                <Typography className="track-detail-text">
                  {order.sellerName}
                </Typography>
              </div>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction={{
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
        }}
        sx={{ width: "100%" }}
        spacing={2}
      >
        <Stack className="track-box">
          <Stack sx={{ padding: "16px", width: "100%" }} spacing={2}>
            <Stack spacing={2} alignItems="center" direction="row">
              <PersonIcon fontSize="small" color="warning" />
              <Typography variant="body2">Customer Details</Typography>
            </Stack>
            <Divider />
            <Stack spacing={2} sx={{ width: "100%" }}>
              <div>
                <Typography className="track-detail-title">
                  Customer Id
                </Typography>
                <CopyableText text={order.customerId} fontSize={9} />
              </div>
              <div>
                <Typography className="track-detail-title">
                  Customer Name
                </Typography>
                <Typography className="track-detail-text">
                  {order.customerName}
                </Typography>
              </div>
              <div>
                <Typography className="track-detail-title">Address</Typography>
                <Typography className="track-detail-text">
                  {AddressFormat(order.customerAddress)}
                </Typography>
              </div>
              <div>
                <Typography className="track-detail-title">Contact</Typography>
                <Typography className="track-detail-text">
                  {"+91 " + order?.customerAddress?.phoneNo}
                </Typography>
              </div>
            </Stack>
          </Stack>
        </Stack>
        <Stack className="track-box">
          <Stack sx={{ padding: "16px", width: "100%" }} spacing={2}>
            <Stack spacing={2} alignItems="center" direction="row">
              <PaymentIcon fontSize="small" color="warning" />
              <Typography variant="body2">Payment Details</Typography>
            </Stack>
            <Divider />
            <Stack spacing={2} sx={{ width: "100%" }}>
              <div>
                <Typography className="track-detail-title">
                  Order Value
                </Typography>
                <Typography className="track-detail-text">
                  {"Rs. " + order.price}
                </Typography>
              </div>
              <div>
                <Typography className="track-detail-title">
                  Shipping Charges
                </Typography>
                <Typography className="track-detail-text">
                  {"Rs. " + order.shippingCharges}
                </Typography>
              </div>
              <div>
                <Typography className="track-detail-title">
                  Order Total Amount
                </Typography>
                <Typography className="track-detail-text">
                  {"Rs. " + order.orderTotal}
                </Typography>
              </div>
              <div>
                <Typography className="track-detail-title">
                  Payment Mode
                </Typography>
                <Typography className="track-detail-text">
                  {order.paymentMode}
                </Typography>
              </div>
              <div>
                <Typography className="track-detail-title">
                  Payment Status
                </Typography>
                <Typography className="track-detail-text">
                  {order.paymentStatus}
                </Typography>
              </div>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Details;

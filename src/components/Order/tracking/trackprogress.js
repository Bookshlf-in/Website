import { Stack, Typography, Skeleton, Divider } from "@mui/material";

import { TimestampToDate } from "../../../assets/utils/date";
import OrderCancelButton from "../../../assets/components/buttons/ordercancelbutton";
import TrackingStepper from "./trackingstepper";

const TrackProgress = ({ order = {}, loading }) => {
  const { date, dayName, monthName, year } = TimestampToDate(
    order.expectedDeliveryDate
  );

  const orderCurrentStatus = order.status
    ? order.status[order.status.length - 1]
    : "UnKnown";

  return (
    <Stack className="track-box">
      {loading && (
        <Skeleton
          variant="rounded"
          width="100%"
          height="100%"
          animation="wave"
        />
      )}
      {!loading && (
        <Stack sx={{ width: "100%", padding: "16px" }} spacing={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body-2">Estimated Delivery Date</Typography>
            {orderCurrentStatus === "Order placed" && (
              <OrderCancelButton
                orderId={order._id}
                className="order-cancel-btn"
              />
            )}
          </Stack>
          <Stack>
            <Typography className="tracking-dayname">{dayName}</Typography>
            <Typography className="tracking-monthyear">
              {monthName + ", " + year}
            </Typography>
            <Typography className="tracking-date">{date}</Typography>
          </Stack>
          <Typography className="order-current-status">
            {orderCurrentStatus}
          </Typography>
          <Divider />
          <TrackingStepper status={order.status} />
        </Stack>
      )}
    </Stack>
  );
};

export default TrackProgress;

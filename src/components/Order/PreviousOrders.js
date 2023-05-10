import { React, useState } from "react";
import axios from "../../api/axios";

// Components
import { Stack, Chip, Avatar, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// Icon
import RupeeIcon from "@mui/icons-material/CurrencyRupeeRounded";
import CancelIcon from "@mui/icons-material/CancelRounded";
import CheckIcon from "@mui/icons-material/CheckCircleRounded";
import ReviewIcon from "@mui/icons-material/RateReviewRounded";
import TrackIcon from "@mui/icons-material/BarChartRounded";

const PreviousOrders = (props) => {
  const [deleteId, setdeleteId] = useState("");
  const [previousOrders, setpreviousOrders] = useState(props.orders);
  // cancel Order
  const handelCancelOrder = (orderId) => {
    setdeleteId(orderId);
    axios
      .delete("/cancelOrder", {
        data: {
          orderId: orderId,
        },
      })
      .then((response) => {
        setdeleteId("");
        setpreviousOrders(
          previousOrders.filter((order) => order._id !== orderId)
        );
      })
      .catch((error) => {
        setdeleteId("");
      });
  };

  const columns = [
    {
      field: "orderPhoto",
      headerName: "Book Id",
      minWidth: 200,
      flex: 2,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "10px" }}
            spacing={2}
          >
            <Avatar src={cellValue.value[0]} alt="" variant="rounded" />
            <Chip
              label={cellValue.value[1]}
              size="small"
              sx={{ fontSize: "9px" }}
            />
          </Stack>
        );
      },
    },
    {
      field: "orderTotal",
      headerName: "Order Total",
      minWidth: 120,
      flex: 1,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Chip
            icon={<RupeeIcon />}
            label={cellValue.value}
            size="small"
            color="primary"
            variant="outlined"
          />
        );
      },
    },
    {
      field: "orderTitle",
      headerName: "Book",
      minWidth: 200,
      flex: 2,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Typography
            variant="body1"
            sx={{ fontSize: "12px", whiteSpace: "pre-wrap" }}
          >
            {cellValue.value}
          </Typography>
        );
      },
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      minWidth: 150,
      flex: 2,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Chip
            icon={
              cellValue.value === "Cancelled" ? <CancelIcon /> : <CheckIcon />
            }
            label={cellValue.value}
            size="small"
            color={cellValue.value === "Cancelled" ? "error" : "success"}
            variant="outlined"
          />
        );
      },
    },
    {
      field: "trackOrder",
      headerName: "Details",
      minWidth: 120,
      flex: 1,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Button
            startIcon={<TrackIcon />}
            href={`/Track/${cellValue.value}`}
            size="small"
            variant="outlined"
          >
            Details
          </Button>
        );
      },
    },
    {
      field: "reviewOrder",
      headerName: "Review",
      minWidth: 120,
      flex: 1,
      sortable: false,
      renderCell: (cellValue) => {
        return cellValue.value[0] === "Cancelled" ? (
          <div></div>
        ) : (
          <Button
            startIcon={<ReviewIcon />}
            href={`/AddReview/${cellValue.value[1]}`}
            size="small"
            variant="contained"
            color="success"
          >
            Review
          </Button>
        );
      },
    },
  ];
  const rows = previousOrders.map((order) => {
    return {
      id: order._id,
      orderPhoto: [order.photo, order._id],
      orderTotal: order.orderTotal,
      orderTitle: order.title,
      orderStatus: order.status[order.status.length - 1],
      trackOrder: order._id,
      reviewOrder: [order.status[order.status.length - 1], order._id],
    };
  });

  return (
    <Stack sx={{ minHeight: "calc(100vh - 100px)", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={3}
        rowBuffer={3}
        loading={previousOrders === null}
        rowHeight={100}
        rowsPerPageOptions={[3]}
        disableColumnFilter
        disableSelectionOnClick
        disableColumnMenu
      />
    </Stack>
  );
};
export default PreviousOrders;

import { React, useState } from "react";
import { makeStyles } from "@mui/styles";

// Components
import { Stack, Chip, Avatar, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// Icon
import RupeeIcon from "@mui/icons-material/CurrencyRupeeRounded";
import PackedIcon from "@mui/icons-material/Inventory2Rounded";
import ShippedIcon from "@mui/icons-material/LocalShippingRounded";
import PlacedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import TrackIcon from "@mui/icons-material/BarChartRounded";

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "Roboto !important",
    "& p": {
      fontFamily: "Roboto !important",
    },
  },
  stack: {
    minHeight: "calc(100vh - 100px)",
    width: "100%",
  },
}));

const CurrentOrders = (props) => {
  const classes = useStyles();

  // const [deleteId, setdeleteId] = useState("");
  const [activeOrders, setactiveOrders] = useState(props.orders);
  // // cancel Order
  // const handelCancelOrder = (orderId) => {
  //   setdeleteId(orderId);
  //   axios
  //     .delete("/cancelOrder", {
  //       data: {
  //         orderId: orderId,
  //       },
  //     })
  //     .then((response) => {
  //       setdeleteId("");
  //       setactiveOrders(activeOrders.filter((order) => order._id !== orderId));
  //     })
  //     .catch((error) => {
  //       setdeleteId("");
  //     });
  // };

  const columns = [
    {
      field: "orderPhoto",
      headerName: "Book Id",
      minWidth: 190,
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
              className={classes.root}
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
            className={classes.root}
            color="primary"
            variant="outlined"
          />
        );
      },
    },
    {
      field: "orderTitle",
      headerName: "Book Details",
      minWidth: 200,
      flex: 2,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Typography
            className={classes.root}
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
              cellValue.value === "Order placed" ? (
                <PlacedIcon />
              ) : cellValue.value === "Packed" ? (
                <PackedIcon sx={{ height: 15, width: 15 }} />
              ) : (
                <ShippedIcon sx={{ height: 15, width: 15 }} />
              )
            }
            label={cellValue.value}
            size="small"
            className={classes.root}
            color={
              cellValue.value === "Order placed"
                ? "warning"
                : cellValue.value === "Packed"
                ? "secondary"
                : "success"
            }
            variant="outlined"
          />
        );
      },
    },
    {
      field: "trackOrder",
      headerName: "Tracking",
      minWidth: 150,
      flex: 2,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Button
            startIcon={<TrackIcon />}
            href={`/Track/${cellValue.value}`}
            size="small"
            className={classes.root}
            variant="contained"
            target="_blank"
          >
            Track Order
          </Button>
        );
      },
    },
    // {
    //   field: "deleteOrder",
    //   headerName: "Cancel",
    //   minWidth: 100,
    //   flex: 1,
    //   sortable: false,
    //   renderCell: (cellValue) => {
    //     return (
    //       <IconButton
    //         className={classes.root}
    //         color="error"
    //         onClick={() => handelCancelOrder(cellValue.value)}
    //       >
    //         {deleteId === cellValue.value ? (
    //           <CircularProgress color="inherit" size={20} />
    //         ) : (
    //           <DeleteIcon />
    //         )}
    //       </IconButton>
    //     );
    //   },
    // },
  ];
  const rows = activeOrders.map((order) => {
    return {
      id: order._id,
      orderPhoto: [order.photo, order._id],
      orderTotal: order.orderTotal,
      orderTitle: order.title,
      orderStatus: order.status[order.status.length - 1],
      trackOrder: order._id,
      deleteOrder: order._id,
    };
  });

  return (
    <Stack className={classes.stack}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={3}
        rowBuffer={3}
        className={classes.root}
        loading={activeOrders === null}
        rowHeight={100}
        rowsPerPageOptions={[3]}
        disableColumnFilter
        disableSelectionOnClick
        disableColumnMenu
      />
    </Stack>
  );
};
export default CurrentOrders;

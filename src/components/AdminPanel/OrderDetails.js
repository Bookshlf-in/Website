import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../../axios";

// components
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import LoadingButton from "@mui/lab/LoadingButton";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";

// icons
import LoadIcon from "@material-ui/icons/AutorenewRounded";
import CheckIcon from "@material-ui/icons/CheckCircleRounded";
import PendingIcon from "@material-ui/icons/AccessTimeRounded";
import CallIcon from "@material-ui/icons/CallRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "PT sans !important",
    "& p": {
      fontFamily: "PT sans !important",
    },
    "& ul": {
      "& li": {
        "& button": {
          fontFamily: "PT sans !important",
        },
      },
    },
  },
}));

const GetOrderDetails = () => {
  const classes = useStyles();

  // functionality States
  const [orderLoad, setorderLoad] = useState(false);

  // data States
  const [orderList, setorderList] = useState([]);
  const [page, setpage] = useState(1);
  const [totalPages, settotalPages] = useState(0);

  const GetOrderList = (pageNo) => {
    setorderLoad(true);
    setpage(pageNo);
    axios
      .get(`/admin-getOrderList?page=${pageNo}`)
      .then((response) => {
        setorderLoad(false);
        setorderList(response.data.data);
        settotalPages(response.data.totalPages);
        console.log(response.data);
      })
      .catch((error) => {});
  };

  const columns = [
    {
      field: "orderId",
      headerName: "Order ID",
      width: 180,
      sortable: false,
    },
    {
      field: "orderTotal",
      headerName: "Order Total",
      width: 100,
      sortable: false,
      renderCell: (price) => {
        return (
          <Chip
            icon={<i className="fas fa-rupee-sign" />}
            label={price.value}
            size="small"
            variant="filled"
            color="default"
          />
        );
      },
    },
    {
      field: "payMode",
      headerName: "Payment Mode",
      maxWidth: 200,
      minWidth: 170,
      sortable: false,
    },
    {
      field: "status",
      headerName: "Payment Status",
      width: 150,
      sortable: false,
      renderCell: (status) => {
        return (
          <Chip
            label={status.value}
            size="small"
            icon={status.value === "Paid" ? <CheckIcon /> : <PendingIcon />}
            color={status.value === "Paid" ? "success" : "warning"}
          />
        );
      },
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 150,
      sortable: false,
      renderCell: (status) => {
        return (
          <Chip
            label={status.value[status.value.length - 1]}
            size="small"
            variant="outlined"
            color="secondary"
          />
        );
      },
    },
    {
      field: "customerContact",
      headerName: "Customer Contact",
      width: 150,
      sortable: false,
      renderCell: (phone) => {
        return (
          <Chip
            label={phone.value}
            size="small"
            icon={<CallIcon />}
            color="primary"
          />
        );
      },
    },
    {
      field: "sellerContact",
      headerName: "Seller Contact",
      width: 150,
      sortable: false,
      renderCell: (phone) => {
        return (
          <Chip
            label={phone.value}
            size="small"
            icon={<CallIcon />}
            color="primary"
          />
        );
      },
    },
    {
      field: "trackOrder",
      headerName: "Track & Update Order",
      width: 200,
      sortable: false,
      renderCell: (link) => {
        return (
          <Button
            className={classes.root}
            size="small"
            href={`/AdminTrack/${link.value}`}
            variant="outlined"
          >
            Update & Track
          </Button>
        );
      },
    },
  ];

  const rows = orderList.map((order) => {
    return {
      id: order._id,
      orderId: order._id,
      orderTotal: order.orderTotal,
      payMode: order.paymentMode,
      status: order.paymentStatus,
      orderStatus: order.status,
      customerContact: order.customerAddress.phoneNo,
      sellerContact: order.sellerAddress.phoneNo,
      trackOrder: order._id,
    };
  });

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        height: "123vh",
        width: "100%",
        padding: "10px",
      }}
      justifyContent="center"
      alignItems="center"
      className="admin-orders"
    >
      <LoadingButton
        loading={orderLoad}
        loadingPosition="start"
        startIcon={<LoadIcon />}
        variant="contained"
        className={classes.root}
        color="success"
        onClick={() => GetOrderList(1)}
      >
        Fetch Order List
      </LoadingButton>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, pageNo) => {
          GetOrderList(pageNo);
        }}
        color="primary"
        className={classes.root}
      />
      <DataGrid
        style={{
          fontFamily: "PT Sans",
          width: "100%",
          padding: "10px",
        }}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowBuffer={4}
        hideFooterPagination
        className={classes.root}
        loading={orderLoad}
      />
    </Stack>
  );
};

export default GetOrderDetails;

import { React, useState, useContext } from "react";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { AdminContext } from "../../Context/adminContext";
import axios from "../../axios";

// components
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import LoadingButton from "@mui/lab/LoadingButton";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";

// icons
import LoadIcon from "@mui/icons-material/AutorenewRounded";
import CheckIcon from "@mui/icons-material/CheckCircleRounded";
import PendingIcon from "@mui/icons-material/AccessTimeRounded";
import CallIcon from "@mui/icons-material/CallRounded";
import RupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Typography } from "@mui/material";

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
  const history = useHistory();

  const [admin, setAdmin] = useContext(AdminContext);
  // functionality States
  const [orderLoad, setorderLoad] = useState(false);

  // data States
  const [orderList, setorderList] = useState(admin.orderDetails.data);
  const [page, setpage] = useState(admin.orderDetails.page);
  const [totalPages, settotalPages] = useState(admin.orderDetails.totalPages);

  const GetOrderList = (pageNo) => {
    setorderLoad(true);
    setpage(pageNo);
    axios
      .get("/admin-getOrderList", {
        params: {
          page: pageNo,
        },
      })
      .then((response) => {
        setAdmin({
          ...admin,
          orderDetails: {
            data: response.data.data,
            page: pageNo,
            totalPages: response.data.totalPages,
          },
        });
        setorderLoad(false);
        setorderList(response.data.data);
        settotalPages(response.data.totalPages);
      })
      .catch((error) => {});
  };

  const columns = [
    {
      field: "orderId",
      headerName: "Order Detail",
      width: 180,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Stack sx={{ whiteSpace: "normal" }}>
            <Typography sx={{ fontSize: "10px", fontFamily: "PT sans" }}>
              {cellValue.value[0]}
            </Typography>
            <Typography sx={{ fontSize: "10px", fontFamily: "PT sans" }}>
              {cellValue.value[1]}
            </Typography>
            <Chip
              sx={{ fontSize: "9px", fontFamily: "PT sans", height: "auto" }}
              label={cellValue.value[2]}
            />
          </Stack>
        );
      },
    },
    {
      field: "orderTotal",
      headerName: "Order Total",
      width: 100,
      sortable: false,
      renderCell: (price) => {
        return (
          <Chip
            icon={<RupeeIcon />}
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
            onClick={() => history.push(`/AdminTrack/${link.value}`)}
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
      orderId: [order.title, order.customerName, order._id],
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
        height: "1000px",
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
        size="small"
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
        rowHeight={80}
        hideFooter
        hideFooterPagination
        className={classes.root}
        loading={orderLoad}
      />
    </Stack>
  );
};

export default GetOrderDetails;

import { React, useState, useContext } from "react";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { AdminContext } from "../../Context/adminContext";
import axios from "../../axios";

// components
import { Stack, Button, Pagination, Chip } from "@mui/material";
import { Typography, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import LoadingButton from "@mui/lab/LoadingButton";

// icons
import LoadIcon from "@mui/icons-material/AutorenewRounded";
import CheckIcon from "@mui/icons-material/CheckCircleRounded";
import PendingIcon from "@mui/icons-material/AccessTimeRounded";
import RupeeIcon from "@mui/icons-material/CurrencyRupee";
import CopyIcon from "@mui/icons-material/ContentCopy";
import CopiedIcon from "@mui/icons-material/FileCopy";

const useStyles = makeStyles(() => ({
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
      field: "orderDetail",
      headerName: "Order Detail",
      width: 220,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Stack sx={{ whiteSpace: "normal", width: "100%" }} spacing={1}>
            <Typography sx={{ fontSize: "11px" }} align="justify">
              {cellValue.value[0]}
            </Typography>
            <CopyableText text={cellValue.value[1]} />
            <Typography sx={{ fontSize: "11px" }} align="justify">
              {"Weight : " + cellValue.value[2] + " g"}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "orderTotal",
      headerName: "Order Total",
      width: 180,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Stack sx={{ width: "100%" }} spacing={1}>
            <Stack>
              <Typography sx={{ fontSize: "11px" }}>Item Price</Typography>
              <Chip
                icon={<RupeeIcon sx={{ height: 12, width: 12 }} />}
                label={cellValue.value[0]}
                size="small"
                variant="filled"
                color="info"
                sx={{ height: "20px", fontSize: "9px" }}
              />
            </Stack>
            <Stack>
              <Typography sx={{ fontSize: "11px" }}>
                Shipping Charges
              </Typography>
              <Chip
                icon={<RupeeIcon sx={{ height: 12, width: 12 }} />}
                label={cellValue.value[1]}
                size="small"
                variant="outlined"
                color="default"
                sx={{ height: "20px", fontSize: "9px" }}
              />
            </Stack>
            <Stack>
              <Typography sx={{ fontSize: "11px" }}>Order Total</Typography>
              <Chip
                icon={<RupeeIcon sx={{ height: 12, width: 12 }} />}
                label={cellValue.value[2]}
                size="small"
                variant="filled"
                color="success"
                sx={{ height: "20px", fontSize: "9px" }}
              />
            </Stack>
          </Stack>
        );
      },
    },
    {
      field: "payment",
      headerName: "Payment",
      width: 180,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Stack sx={{ width: "100%" }} spacing={1}>
            <Stack>
              <Typography sx={{ fontSize: "11px" }}>Payment Mode</Typography>
              <Chip
                sx={{ height: "20px", fontSize: "9px" }}
                label={cellValue.value[0]}
                size="small"
                color="default"
              />
            </Stack>
            <Stack>
              <Typography sx={{ fontSize: "11px" }}>
                Customer Payment
              </Typography>
              <Chip
                sx={{ height: "20px", fontSize: "9px" }}
                label={cellValue.value[1]}
                size="small"
                icon={
                  cellValue.value[1] === "Paid" ? (
                    <CheckIcon sx={{ height: 12, width: 12 }} />
                  ) : (
                    <PendingIcon sx={{ height: 12, width: 12 }} />
                  )
                }
                color={cellValue.value[1] === "Paid" ? "success" : "warning"}
              />
            </Stack>
            <Stack>
              <Typography sx={{ fontSize: "11px" }}>Seller Payment</Typography>
              <Chip
                sx={{ height: "20px", fontSize: "9px" }}
                label={
                  cellValue.value[2]
                    ? "Paid to Seller"
                    : "Pending Seller Payment"
                }
                size="small"
                icon={
                  cellValue.value[2] ? (
                    <CheckIcon sx={{ height: 12, width: 12 }} />
                  ) : (
                    <PendingIcon sx={{ height: 12, width: 12 }} />
                  )
                }
                color={cellValue.value[2] ? "success" : "warning"}
              />
            </Stack>
          </Stack>
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
            variant={
              status.value[status.value.length - 1] === "Cancelled" ||
              status.value[status.value.length - 1] === "Delivered"
                ? "filled"
                : "outlined"
            }
            color={
              status.value[status.value.length - 1] === "Cancelled"
                ? "error"
                : status.value[status.value.length - 1] === "Delivered"
                ? "success"
                : "secondary"
            }
          />
        );
      },
    },
    {
      field: "customerContact",
      headerName: "Customer Contact",
      width: 210,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Stack sx={{ width: "100%" }} spacing={1}>
            <Typography sx={{ fontSize: "11px" }}>
              {cellValue.value[0]}
            </Typography>
            <CopyableText text={cellValue.value[1]} />
            <CopyableText text={cellValue.value[2]} />
          </Stack>
        );
      },
    },
    {
      field: "sellerContact",
      headerName: "Seller Contact",
      width: 210,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Stack sx={{ width: "100%" }} spacing={1}>
            <Typography sx={{ fontSize: "11px" }}>
              {cellValue.value[0]}
            </Typography>
            <CopyableText text={cellValue.value[1]} />
            <CopyableText text={cellValue.value[2]} />
          </Stack>
        );
      },
    },
    {
      field: "trackOrder",
      headerName: "Update",
      width: 120,
      sortable: false,
      renderCell: (link) => {
        return (
          <Stack spacing={2}>
            <Button
              className={classes.root}
              size="small"
              onClick={() => history.push(`/AdminTrack/${link.value[0]}`)}
              variant="contained"
              sx={{ fontSize: "10px" }}
            >
              {`Update & Track`}
            </Button>
            <Button
              className={classes.root}
              size="small"
              href={link.value[1]}
              target="_blank"
              variant="outlined"
              sx={{ fontSize: "10px" }}
              color="secondary"
            >
              {`External Track`}
            </Button>
          </Stack>
        );
      },
    },
  ];

  const rows = orderList.map((order) => {
    return {
      id: order._id,
      orderDetail: [order.title, order._id, order.weightInGrams],
      orderTotal: [order.price, order.shippingCharges, order.orderTotal],
      payment: [order.paymentMode, order.paymentStatus, order.isSellerPaid],
      orderStatus: order.status,
      customerContact: [
        order.customerName,
        order.customerId,
        order.customerAddress.phoneNo,
      ],
      sellerContact: [
        order.sellerName,
        order.sellerId,
        order.sellerAddress.phoneNo,
      ],
      trackOrder: [order._id, order?.externalTrackingLink],
    };
  });

  // Custom Copy Component
  const CopyableText = (props) => {
    const [copied, setcopied] = useState(false);

    const CopyText = () => {
      navigator.clipboard.writeText(props.text);
      setcopied(true);
      setTimeout(() => {
        setcopied(false);
      }, 3000);
    };

    return (
      <Stack
        direction="row"
        spacing={1}
        sx={{
          cursor: "pointer",
          padding: "5px",
          borderRadius: "5px",
          border: "1px solid rgba(0,0,0,0.2)",
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          className={classes.root}
          color={copied ? "primary" : "default"}
          sx={{ fontSize: "9px" }}
        >
          {props.text}
        </Typography>
        <Tooltip
          arrow
          title="Click to Copy"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="caption" onClick={CopyText}>
            {!copied ? (
              <CopyIcon color="inhert" sx={{ height: 12, width: 12 }} />
            ) : (
              <CopiedIcon color="inhert" sx={{ height: 12, width: 12 }} />
            )}
          </Typography>
        </Tooltip>

        {copied ? (
          <Typography
            sx={{ fontSize: "8px" }}
            className={classes.root}
            color="primary"
          >
            Copied!
          </Typography>
        ) : null}
      </Stack>
    );
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        height: "1700px",
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
        rowHeight={150}
        className={classes.root}
        loading={orderLoad}
        hideFooter
        hideFooterPagination
        disableColumnFilter
        disableColumnMenu
        disableColumnSelection
      />
    </Stack>
  );
};

export default GetOrderDetails;

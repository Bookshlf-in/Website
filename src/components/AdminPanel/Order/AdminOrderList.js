import { React, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AdminContext } from "../../../Context/adminContext";
import axios from "../../../axios";

// components
import { Stack, Button, Pagination, Chip } from "@mui/material";
import { Typography, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// icons
import LoadIcon from "@mui/icons-material/AutorenewRounded";
import CheckIcon from "@mui/icons-material/CheckCircleRounded";
import PendingIcon from "@mui/icons-material/AccessTimeRounded";
import RupeeIcon from "@mui/icons-material/CurrencyRupee";

// micro components
import CopyableText from "../../MicroComponents/customCopyText";

const AdminOrderList = () => {
  const history = useHistory();

  const [admin, setAdmin] = useContext(AdminContext);

  // functionality States
  const [orderLoad, setorderLoad] = useState(false);

  // data States
  const [orderList, setorderList] = useState(admin.order.orderDetails.data);
  const [page, setpage] = useState(admin.order.orderDetails.page);
  const [totalPages, settotalPages] = useState(
    admin.order.orderDetails.totalPages
  );
  const [orderstatus, setOrderStatus] = useState("Order placed");

  const [orderRevenue, setOrderRevenue] = useState(0);
  const [orderProfit, setOrderProfit] = useState(0);
  const [statsLoad, setStatsLoad] = useState(false);

  const getOneSellerEarning = async (orderPrice) => {
    const result = axios
      .get("/getSellerEarning", {
        params: {
          price: orderPrice,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    return result;
  };

  const getAllSellerEarnings = async (orders) => {
    return await Promise.all(
      orders.map(async (order) => {
        const sellerEarning = await getOneSellerEarning(Number(order.price));
        return sellerEarning;
      })
    );
  };

  // Calculating Stats for each page
  const CalculateStats = async (orders) => {
    setStatsLoad(true);
    setOrderProfit(0);
    setOrderRevenue(0);
    const earnings = await getAllSellerEarnings(orders);
    for (let i = 0; i < earnings.length; i++) {
      setOrderRevenue((prev) => {
        return prev + orders[i].orderTotal;
      });
      setOrderProfit((prev) => {
        return (
          prev +
          orders[i].orderTotal -
          (earnings[i].sellerEarning +
            (orders[i].adminDeliveryExpense
              ? orders[i].adminDeliveryExpense
              : 0))
        );
      });
    }
    setStatsLoad(false);
  };

  const GetOrderList = (pageNo, orderStatus) => {
    setorderLoad(true);
    setpage(pageNo);
    axios
      .get("/admin-getOrderList", {
        params: {
          page: pageNo,
          status: orderStatus,
        },
      })
      .then((response) => {
        setAdmin({
          ...admin,
          order: {
            ...admin.order,
            orderDetails: {
              data: response.data.data,
              page: pageNo,
              totalPages: response.data.totalPages,
              status: orderstatus,
            },
          },
        });
        localStorage.setItem(
          "bookshlf_admin",
          JSON.stringify({
            ...admin,
            order: {
              ...admin.order,
              orderDetails: {
                data: response.data.data,
                page: pageNo,
                totalPages: response.data.totalPages,
                status: orderstatus,
              },
            },
          })
        );
        setorderLoad(false);
        setorderList(response.data.data);
        settotalPages(response.data.totalPages);
        setOrderStatus(orderStatus);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  // Date Converter
  const handleDate = (date) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const d = new Date(date);
    const newdate = d.getDate();
    const day = d.getDay();
    const month = d.getMonth();
    const year = d.getFullYear();
    const newDate =
      newdate +
      " " +
      monthNames[month] +
      ", " +
      year +
      " (" +
      dayNames[day] +
      ")";
    return newDate;
  };

  const ColTxt = ({ txt }) => {
    return (
      <Typography sx={{ fontSize: "11px" }} align="justify">
        {txt}
      </Typography>
    );
  };

  const columns = [
    {
      field: "orderDetail",
      headerName: "Order Detail",
      width: 200,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Stack sx={{ whiteSpace: "normal", width: "100%" }} spacing={1}>
            <ColTxt txt={cellValue.value[0]} />
            <CopyableText text={cellValue.value[1]} />
            <ColTxt txt={"Weight : " + cellValue.value[2] + " g"} />
            <ColTxt txt={"Date : " + handleDate(cellValue.value[3])} />
          </Stack>
        );
      },
    },
    {
      field: "orderTotal",
      headerName: "Order Total",
      width: 150,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Stack sx={{ width: "100%" }} spacing={1}>
            <Stack>
              <ColTxt txt="Item Price" />
              <Chip
                icon={<RupeeIcon sx={{ height: 10, width: 10 }} />}
                label={cellValue.value[0]}
                size="small"
                variant="filled"
                color="info"
                sx={{ height: "auto", fontSize: "10px", padding: "2px 0px" }}
              />
            </Stack>
            <Stack>
              <ColTxt txt="Shipping Charges" />
              <Chip
                icon={<RupeeIcon sx={{ height: 10, width: 10 }} />}
                label={cellValue.value[1]}
                size="small"
                variant="outlined"
                color="default"
                sx={{ height: "auto", fontSize: "10px", padding: "2px 0px" }}
              />
            </Stack>
            <Stack>
              <ColTxt txt="Order Total" />
              <Chip
                icon={<RupeeIcon sx={{ height: 10, width: 10 }} />}
                label={cellValue.value[2]}
                size="small"
                variant="filled"
                color="success"
                sx={{ height: "auto", fontSize: "10px", padding: "2px 0px" }}
              />
            </Stack>
          </Stack>
        );
      },
    },
    {
      field: "payment",
      headerName: "Payment",
      width: 160,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Stack sx={{ width: "100%" }} spacing={1}>
            <Stack>
              <ColTxt txt="Payment Mode" />
              <Chip
                sx={{ height: "auto", fontSize: "10px", padding: "2px 0px" }}
                label={cellValue.value[0]}
                size="small"
                color="default"
              />
            </Stack>
            <Stack>
              <ColTxt txt="Customer Payment" />
              <Chip
                sx={{ height: "auto", fontSize: "10px", padding: "2px 0px" }}
                label={cellValue.value[1]}
                size="small"
                icon={
                  cellValue.value[1] === "Paid" ? (
                    <CheckIcon sx={{ height: 10, width: 10 }} />
                  ) : (
                    <PendingIcon sx={{ height: 10, width: 10 }} />
                  )
                }
                color={cellValue.value[1] === "Paid" ? "success" : "warning"}
              />
            </Stack>
            <Stack>
              <ColTxt txt="Seller Payment" />
              <Chip
                sx={{ height: "auto", fontSize: "10px", padding: "2px 0px" }}
                label={cellValue.value[2] ? "Paid" : "Pending"}
                size="small"
                icon={
                  cellValue.value[2] ? (
                    <CheckIcon sx={{ height: 10, width: 10 }} />
                  ) : (
                    <PendingIcon sx={{ height: 10, width: 10 }} />
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
      width: 180,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Stack sx={{ width: "100%" }} spacing={1}>
            <ColTxt txt={cellValue.value[0]} />
            <CopyableText text={cellValue.value[1]} />
            <CopyableText text={cellValue.value[2]} />
          </Stack>
        );
      },
    },
    {
      field: "sellerContact",
      headerName: "Seller Contact",
      width: 180,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Stack sx={{ width: "100%" }} spacing={1}>
            <ColTxt txt={cellValue.value[0]} />
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
              size="small"
              onClick={() => history.push(`/AdminTrack/${link.value[0]}`)}
              variant="contained"
              sx={{ fontSize: "10px" }}
            >
              {`Update & Track`}
            </Button>
            <Button
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
      orderDetail: [
        order.title,
        order._id,
        order.weightInGrams,
        order.createdAt,
      ],
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
        order.sellerAddress?.altPhoneNo,
      ],
      trackOrder: [order._id, order?.externalTrackingLink],
    };
  });

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        height: "1660px",
        width: "100%",
        padding: "0px 10px",
      }}
      className="admin-orders"
      divider={<Divider flexItem orientation="vertical" />}
    >
      <Stack spacing={2} sx={{ maxWidth: 150 }}>
        <LoadingButton
          loading={orderLoad}
          loadingPosition="start"
          startIcon={<LoadIcon />}
          variant="outlined"
          size="small"
          color="primary"
          onClick={() => GetOrderList(1, orderstatus)}
        >
          Order List
        </LoadingButton>
        <FormControl
          variant="outlined"
          sx={{ m: 1, minWidth: 150 }}
          size="small"
        >
          <InputLabel id="order-status" sx={{ fontSize: "12px" }}>
            Order Status
          </InputLabel>
          <Select
            labelId="order-status"
            value={orderstatus}
            onChange={(e) => {
              GetOrderList(page, e.target.value);
            }}
            label="Order Status"
            size="small"
            sx={{ fontSize: "12px" }}
          >
            <MenuItem value="Order placed" sx={{ fontSize: "12px" }}>
              Placed
            </MenuItem>
            <MenuItem value="Order Confirmed" sx={{ fontSize: "12px" }}>
              Confirmed
            </MenuItem>
            <MenuItem value="Packed" sx={{ fontSize: "12px" }}>
              Packed
            </MenuItem>
            <MenuItem value="Shipped" sx={{ fontSize: "12px" }}>
              Shipped
            </MenuItem>
            <MenuItem value="Delivered" sx={{ fontSize: "12px" }}>
              Delivered
            </MenuItem>
            <MenuItem value="RTO" sx={{ fontSize: "12px" }}>
              RTO
            </MenuItem>
            <MenuItem value="Returned" sx={{ fontSize: "12px" }}>
              Returned
            </MenuItem>
            <MenuItem value="Cancelled" sx={{ fontSize: "12px" }}>
              Cancelled
            </MenuItem>
          </Select>
        </FormControl>
        {/* ======================= Stats ====================== */}
        <LoadingButton
          loading={statsLoad}
          loadingPosition="start"
          startIcon={<LoadIcon />}
          variant="contained"
          size="small"
          color="primary"
          onClick={() => CalculateStats(orderList)}
          sx={{ textTransform: "none" }}
          disabled={orderstatus !== "Delivered"}
        >
          Get Stats
        </LoadingButton>
        <Stack
          sx={{
            border: "1px solid rgba(0,0,0,0.2)",
            borderRadius: "5px",
            padding: "5px 10px",
          }}
        >
          <Typography sx={{ fontSize: "11px" }}>
            Revenue : {Math.round(orderRevenue, 2)}
          </Typography>
          <Typography sx={{ fontSize: "11px" }}>
            Profits : {Math.round(orderProfit, 2)}
          </Typography>
        </Stack>
        {/* ====================================================== */}
      </Stack>
      <Stack
        sx={{ flexGrow: 1 }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, pageNo) => {
            GetOrderList(pageNo, orderstatus);
          }}
          color="primary"
          size="small"
          shape="rounded"
        />
        <DataGrid
          sx={{
            width: "100%",
            padding: 0,
          }}
          rows={rows}
          columns={columns}
          pageSize={10}
          rowBuffer={4}
          rowHeight={145}
          loading={orderLoad}
          hideFooter
          hideFooterPagination
          disableColumnFilter
          disableColumnMenu
          disableColumnSelection
        />
      </Stack>
    </Stack>
  );
};

export default AdminOrderList;

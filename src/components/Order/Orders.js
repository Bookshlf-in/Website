import { React, useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import axios from "../../axios";

// Components
import { Stack, Chip, Avatar, Typography, Popover } from "@mui/material";
import { Button, IconButton, CircularProgress } from "@mui/material";
import { InputLabel, FormControl, MenuItem, Select } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// Icon
import RupeeIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ShippedIcon from "@mui/icons-material/LocalShippingRounded";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import PendingIcon from "@mui/icons-material/AccessTimeRounded";
import ApprovedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelIcon from "@mui/icons-material/CancelRounded";
import UpdateIcon from "@mui/icons-material/CachedRounded";

const useStyles = makeStyles(() => ({
  stack: {
    minHeight: "calc(100vh - 50px)",
    width: "100%",
  },
}));

const Orders = () => {
  //Calling Hooks
  const classes = useStyles();

  // Functionality States
  const [Loading, setLoading] = useState(true);
  const [openPop, setOpenPop] = useState(null);
  const [deleteId, setdeleteId] = useState("");

  // Data States
  const [filteredItems, setFilteredItems] = useState([]);
  const [books, setbooks] = useState([]);
  const [filter, setFilter] = useState(1);
  const [popmsg, setPopmsg] = useState("");

  useEffect(() => {
    axios.get("/getBookList").then((response) => {
      setbooks(response.data);
      setFilteredItems(
        response.data.filter((book) => book.status === "Approval Pending")
      );
      setLoading(false);
    });
  }, [books.length]);

  // changing Filter
  const handelFilterChange = (e) => {
    setFilter(e.target.value);
    switch (e.target.value) {
      case 1:
        setFilteredItems(
          books.filter((book) => book.status === "Approval Pending")
        );
        break;
      case 2:
        setFilteredItems(books.filter((book) => book.status === "Approved"));
        break;
      case 3:
        setFilteredItems(books.filter((book) => book.status === "Sold"));
        break;
      case 4:
        setFilteredItems(
          books.filter((book) => book.status === "Approval rejected")
        );
        break;
    }
  };

  // Delete Book
  const handelDeleteBook = async (bookId) => {
    setdeleteId(bookId);
    const request = await axios
      .delete("/deleteBook", {
        data: {
          bookId: bookId,
        },
      })
      .then((response) => {
        setdeleteId("");
        setbooks(books.filter((book) => book._id !== bookId));
      })
      .catch((error) => {
        setdeleteId("");
      });
    return request;
  };

  const columns = [
    {
      field: "orderPhoto",
      headerName: "Book Id",
      minWidth: 180,
      flex: 1,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "10px" }}
            spacing={2}
          >
            <Avatar
              src={cellValue.value[0]}
              alt=""
              variant="rounded"
              sx={{ height: 56, width: 56 }}
            />
            <Chip
              label={cellValue.value[1]}
              size="small"
              sx={{ fontSize: "10px" }}
            />
          </Stack>
        );
      },
    },
    {
      field: "bookTotal",
      headerName: "Pricing",
      minWidth: 120,
      flex: 1,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Stack spacing={2}>
            <Stack direction="column" spacing={1} alignItems="center">
              <Typography
                sx={{
                  fontSize: "10px",
                  whiteSpace: "pre-wrap",
                  fontWeight: "bold",
                }}
              >
                Book Selling Price
              </Typography>
              <Chip
                icon={<RupeeIcon sx={{ height: 16, width: 16 }} />}
                label={cellValue.value[0]}
                size="small"
                color="primary"
                variant="outlined"
                sx={{
                  fontSize: "10px",
                  whiteSpace: "pre-wrap",
                  height: "auto",
                }}
              />
            </Stack>
            <Stack direction="column" spacing={1} alignItems="center">
              <Typography
                sx={{
                  fontSize: "10px",
                  whiteSpace: "pre-wrap",
                  fontWeight: "bold",
                }}
              >
                Your Earnings
              </Typography>
              <Chip
                icon={<RupeeIcon sx={{ height: 12, width: 12 }} />}
                label={cellValue.value[1] > 0 ? cellValue.value[1] : 0}
                size="small"
                sx={{
                  fontSize: "10px",
                  whiteSpace: "pre-wrap",
                  height: "auto",
                }}
                color="success"
              />
            </Stack>
          </Stack>
        );
      },
    },
    {
      field: "bookDetails",
      headerName: "Book Details",
      minWidth: 220,
      flex: 3,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Stack sx={{ height: 100, overflowY: "auto" }}>
            <Typography sx={{ fontSize: "12px", whiteSpace: "pre-wrap" }}>
              <strong>{cellValue.value[0]}</strong>
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: "10px", whiteSpace: "pre-wrap", height: 80 }}
            >
              {cellValue.value[1]}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "bookStatus",
      headerName: "Book Status",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Stack spacing={2}>
            <Chip
              icon={
                cellValue.value[1] === "Approval Pending" ? (
                  <PendingIcon />
                ) : cellValue.value[1] === "Approved" ? (
                  <ApprovedIcon />
                ) : cellValue.value[1] === "Approval rejected" ? (
                  <CancelIcon />
                ) : (
                  <ShippedIcon sx={{ height: 15, width: 15 }} />
                )
              }
              label={cellValue.value[1]}
              size="small"
              color={
                cellValue.value[1] === "Approval Pending"
                  ? "warning"
                  : cellValue.value[1] === "Approved"
                  ? "success"
                  : cellValue.value[1] === "Approval rejected"
                  ? "error"
                  : "primary"
              }
              variant="outlined"
            />
            {cellValue.value[1] === "Approved" ? (
              <Link to={`/Bookdetails/${cellValue.value[0]}`}>View Book</Link>
            ) : null}
          </Stack>
        );
      },
    },
    {
      field: "bookUpdate",
      headerName: "Update Book",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (cellValue) => {
        return filter === 1 ? (
          <Button
            startIcon={<UpdateIcon />}
            size="small"
            variant="contained"
            href={`/SellerBookUpdate/${cellValue.value[0]}`}
            target="_blank"
          >
            Update Book
          </Button>
        ) : filter === 4 ? (
          <Button
            startIcon={<UpdateIcon />}
            size="small"
            variant="contained"
            onClick={(e) => {
              setOpenPop(e.currentTarget);
              setPopmsg(cellValue.value[1]);
            }}
          >
            Admin Message
          </Button>
        ) : (
          <Typography
            variant="caption"
            sx={{ whiteSpace: "normal" }}
            color="warning"
          >
            To Update Book Details, Contact Admin
            <Link to={{ pathname: "tel:97926 66122" }} target="_blank">
              <Chip
                label="+91 97926 66122"
                size="small"
                sx={{ fontSize: "10px" }}
              />
            </Link>
            <Link
              to={{ pathname: "mailto:bookshlf.in@gmail.com" }}
              target="_blank"
            >
              bookshlf.in@gmail.com
            </Link>
          </Typography>
        );
      },
    },
    {
      field: "bookDelete",
      headerName: "Delete",
      minWidth: 90,
      flex: 1,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <IconButton
            color="error"
            onClick={() => handelDeleteBook(cellValue.value)}
          >
            {deleteId === cellValue.value ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <DeleteIcon />
            )}
          </IconButton>
        );
      },
    },
  ];
  const rows = filteredItems.map((order) => {
    return {
      id: order._id,
      orderPhoto: [order.photos[0], order._id],
      bookTotal: [order.price, order.sellerEarning],
      bookDetails: [order.title, order.description],
      bookStatus: [order._id, order.status],
      bookUpdate: [order._id, order.adminMessage],
      bookDelete: order._id,
    };
  });

  return (
    <>
      <Helmet>
        <title>Your Books | Bookshlf</title>
      </Helmet>
      <Stack className={classes.stack} spacing={2}>
        <FormControl fullWidth color="success" size="small">
          <InputLabel id="demo-simple-select-label">Filter Books</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={filter}
            label="Filter Books"
            onChange={handelFilterChange}
          >
            <MenuItem value={1}>Books Pending For Approval</MenuItem>
            <MenuItem value={2}>Books Approved</MenuItem>
            <MenuItem value={3}>Books Sold</MenuItem>
            <MenuItem value={4}>Books Rejected</MenuItem>
          </Select>
        </FormControl>
        <Popover
          open={Boolean(openPop)}
          anchorEl={openPop}
          onClose={() => setOpenPop(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          sx={{ width: "100%", backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <Stack sx={{ padding: "10px" }} spacing={3}>
            <Typography
              color="error"
              variant="h6"
              sx={{ fontFamily: "PT sans" }}
            >
              Book Rejected!
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "PT sans" }}>
              {popmsg}
            </Typography>
          </Stack>
        </Popover>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={3}
          rowBuffer={3}
          loading={Loading}
          rowHeight={120}
          rowsPerPageOptions={[3]}
          disableColumnFilter
          disableSelectionOnClick
          disableColumnMenu
        />
      </Stack>
    </>
  );
};
export default Orders;

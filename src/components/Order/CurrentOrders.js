import { React, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import axios from "../../axios";

// Components
import { Stack, Chip, Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "PT sans !important",
    "& p": {
      fontFamily: "PT sans !important",
    },
  },
  stack: {
    minHeight: "calc(100vh - 100px)",
    width: "100%",
  },
}));

const CurrentOrders = (props) => {
  const classes = useStyles();
  console.log(props.orders);
  const [activeOrders, setactiveOrders] = useState(props.orders);

  const columns = [
    {
      field: "orderPhoto",
      headerName: "Book",
      width: 200,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "10px" }}
            spacing={2}
          >
            <Avatar src={cellValue.value[0]} alt="" />
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
  ];
  const rows = props.orders.map((order) => {
    return {
      id: order._id,
      orderPhoto: [order.photo, order._id],
      orderTotal: order.orderTotal,
      orderTitle: order.title,
      seller: order.sellerName,
      orderStatus: order.status,
      trackOrder: order._id,
    };
  });

  return (
    <Stack className={classes.stack}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowBuffer={5}
        className={classes.root}
        loading={!props.orders}
        rowHeight={100}
        rowsPerPageOptions={[5]}
      />
    </Stack>
  );
};
export default CurrentOrders;

/*
author: "National Council of Educational"
bookId: "60f09d533a24d100229196af"
orderTotal: 240
photo: "https://firebasestorage.googleapis.com/v0/b/bookshlf.appspot.com/o/books%2Fr4jc_SnZJj12thphysicsNCERTpart1(1).jpg?alt=media&token=08c02bc0-06fc-4d20-8db5-3c2c464f33a9"
price: 200
purchaseQty: 1
sellerName: "Awesome Sellers"
status: ['Order placed']
title: "Physics N.C.E.R.T class 12th"
_id: "61db304b3bd15e0023ff79c5"
*/

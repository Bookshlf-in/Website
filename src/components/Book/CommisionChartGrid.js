import { React, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const CommisionChartGrid = (props) => {
  const columns = [
    {
      field: "priceLimit",
      headerName: "Price Limit",
      width: 100,
      sortable: false,
    },
    {
      field: "percentageCommission",
      headerName: "Commission (%)",
      width: 120,
      sortable: false,
    },
    {
      field: "fixedCommission",
      headerName: "Commission (Fixed)",
      width: 130,
      sortable: false,
    },
  ];
  const rows = props.grid.map((row) => {
    return {
      id: row._id,
      priceLimit: row.priceLimit,
      percentageCommission: row.percentCommission,
      fixedCommission: row.fixedCommission,
    };
  });

  return (
    <DataGrid
      style={{ fontFamily: "PT Sans", fontSize: "11px", width: "360px" }}
      rows={rows}
      columns={columns}
      pageSize={10}
      disableSelectionOnClick
      disableColumnMenu
      rowBuffer={4}
    />
  );
};
export default CommisionChartGrid;

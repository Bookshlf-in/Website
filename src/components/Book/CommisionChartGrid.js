import { React } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "PT sans",
    width: 240,
    "& p": {
      fontFamily: "PT sans !important",
      fontSize: "10px",
    },
    "& div": {
      fontFamily: "PT sans !important",
      fontSize: "9px",
    },
    "& .MuiDataGrid-columnHeader": {
      padding: " 0px 6px",
    },
    "& .MuiDataGrid-columnHeaderTitleContainer": {
      padding: "0px",
    },
    "& .MuiDataGrid-footerContainer": {
      minHeight: 0,
    },
    "& .MuiTablePagination-toolbar": {
      minHeight: 0,
    },
  },
}));
const CommisionChartGrid = (props) => {
  const classes = useStyles();
  const columns = [
    {
      field: "priceLimit",
      headerName: "Price Limit",
      width: 62,
      sortable: false,
    },
    {
      field: "percentageCommission",
      headerName: "Commission (%)",
      width: 78,
      sortable: false,
    },
    {
      field: "fixedCommission",
      headerName: "Commission (Fixed)",
      width: 90,
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
      className={classes.root}
      rows={rows}
      columns={columns}
      pageSize={10}
      disableSelectionOnClick
      disableColumnMenu
      density="compact"
      rowsPerPageOptions={[10]}
    />
  );
};
export default CommisionChartGrid;

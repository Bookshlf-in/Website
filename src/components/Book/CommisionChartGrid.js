import { React } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "PT sans",
    width: 320,
    "& p": {
      fontFamily: "PT sans !important",
      fontSize: "10px",
    },
    "& div": {
      fontFamily: "PT sans !important",
      fontSize: "9px",
    },
  },
}));
const CommisionChartGrid = (props) => {
  const classes = useStyles();
  const columns = [
    {
      field: "priceLimit",
      headerName: "Price Limit",
      minWidth: 60,
      flex: 1,
      sortable: false,
    },
    {
      field: "percentageCommission",
      headerName: "Commission (%)",
      minWidth: 80,
      flex: 3,
      sortable: false,
    },
    {
      field: "fixedCommission",
      headerName: "Commission (Fixed)",
      minWidth: 80,
      flex: 3,
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
    />
  );
};
export default CommisionChartGrid;

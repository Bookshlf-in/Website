import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// components
import Stack from "@mui/material/Stack";
import Alert from "@material-ui/lab/Alert";
import Chip from "@mui/material/Chip";
import LoadingButton from "@mui/lab/LoadingButton";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DataGrid } from "@mui/x-data-grid";

// icons
import LoadIcon from "@material-ui/icons/AutorenewRounded";
import SearchIcon from "@material-ui/icons/Search";
import IDIcon from "@material-ui/icons/AssignmentIndRounded";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import SendIcon from "@material-ui/icons/Send";
import CreditIcon from "@material-ui/icons/CallMadeRounded";
import DebitIcon from "@material-ui/icons/CallReceivedRounded";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PlusIcon from "@material-ui/icons/AddCircleOutlineRounded";
import MinusIcon from "@material-ui/icons/RemoveRounded";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    fontFamily: "PT sans !important",
    "& span": {
      fontFamily: "PT sans !important",
      fontSize: "16px",
    },
    "& input": {
      fontFamily: "PT sans !important",
    },
    "& label": {
      fontFamily: "PT sans !important",
    },
  },
});

const Wallet = () => {
  const classes = useStyles();

  // functional Components
  const [withdrawLoad, setwithdrawLoad] = useState(false);
  const [withdrawDetailLoad, setwithdrawDetailLoad] = useState(false);
  const [sellerLoad, setsellerLoad] = useState(false);

  // data components
  const [withdrawRequests, setwithdrawRequests] = useState([]);
  const [withdrawRequest, setwithdrawRequest] = useState({});
  const [sellerTransactionList, setsellerTransactionList] = useState([]);
  const [Page, setPage] = useState(0);
  const [totalPages, settotalPages] = useState(0);
  const [itemsPerpage, setitemsPerpage] = useState(3);

  // getwithdraw Requests
  const getwithdrawRequest = (page, itemsPerPage, status) => {
    axios
      .get("/admin-getWithdrawRequests", {
        params: {
          page: page,
          itemsPerPage: itemsPerPage,
          status: status,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {});
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        width: "100%",
        padding: "10px",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          width: "100%",
          padding: "10px",
        }}
        justifyContent="center"
        alignItems="center"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <LoadingButton
              className={classes.root}
              loading={withdrawLoad}
              loadingPosition="start"
              startIcon={<LoadIcon />}
              variant="contained"
              color="secondary"
            >
              Fetch Withdraw Requests
            </LoadingButton>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="items-perPage" className={classes.root}>
                Items Per Page
              </InputLabel>
              <Select
                labelId="items-perPage"
                value={itemsPerpage}
                onChange={(e) => setitemsPerpage(e.target.value)}
                label="Items Per Page"
                className={classes.root}
              >
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          {/* <DataGrid
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
          /> */}
        </Stack>
        <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
          <TextField
            className={classes.root}
            label="Enter Withdraw Request ID"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IDIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            variant="standard"
          />
          <LoadingButton
            className={classes.root}
            loading={withdrawDetailLoad}
            loadingPosition="end"
            endIcon={<SearchIcon />}
            variant="contained"
            color="primary"
            size="small"
          >
            Get Withdraw Request Details
          </LoadingButton>
        </Stack>
      </Stack>
      <TextField
        className={classes.root}
        label="Enter Seller ID"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IDIcon />
            </InputAdornment>
          ),
        }}
        fullWidth
        variant="standard"
      />
      <LoadingButton
        className={classes.root}
        loading={sellerLoad}
        loadingPosition="end"
        endIcon={<LoadIcon />}
        variant="contained"
        color="primary"
        size="small"
      >
        Get Seller Transaction List
      </LoadingButton>
    </Stack>
  );
};
export default Wallet;

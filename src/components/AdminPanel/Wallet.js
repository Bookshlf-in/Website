import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../../axios";

// components
import Stack from "@mui/material/Stack";
import Alert from "@material-ui/lab/Alert";
import Chip from "@mui/material/Chip";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid } from "@mui/x-data-grid";

// icons
import LoadIcon from "@material-ui/icons/AutorenewRounded";
import SearchIcon from "@material-ui/icons/Search";
import IDIcon from "@material-ui/icons/AssignmentIndRounded";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import SendIcon from "@material-ui/icons/Send";
import CreditIcon from "@material-ui/icons/CallMadeRounded";
import DebitIcon from "@material-ui/icons/CallReceivedRounded";
import CancelIcon from "@material-ui/icons/CancelRounded";
import CompleteIcon from "@material-ui/icons/CheckCircleRounded";
import PendingIcon from "@material-ui/icons/AccessTimeRounded";

const useStyles = makeStyles({
  root: {
    fontFamily: "PT sans !important",
    "& span": {
      fontFamily: "PT sans !important",
      fontSize: "12px",
    },
    "& input": {
      fontFamily: "PT sans !important",
    },
    "& p": {
      fontFamily: "PT sans !important",
    },
    "& label": {
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
  gridP: {
    fontSize: "10px",
  },
});

const Wallet = () => {
  const classes = useStyles();

  // functional Components
  const [withdrawLoad, setwithdrawLoad] = useState(false);
  const [withdrawDetailLoad, setwithdrawDetailLoad] = useState(false);
  const [sellerLoad, setsellerLoad] = useState(false);
  const [markLoad, setmarkLoad] = useState(false);
  const [cancelLoad, setcancelLoad] = useState(false);
  const [openDialog, setopenDialog] = useState(false);

  // data components
  const [withdrawRequests, setwithdrawRequests] = useState([]);
  const [withdrawRequestId, setwithdrawRequestId] = useState("");
  const [withdrawRequest, setwithdrawRequest] = useState({});
  const [sellerId, setsellerId] = useState("");
  const [sellerTransactionList, setsellerTransactionList] = useState([]);
  const [Page, setPage] = useState(1);
  const [totalPages, settotalPages] = useState(0);
  const [itemsPerpage, setitemsPerpage] = useState(3);
  const [withdrawStatus, setwithdrawStatus] = useState("INITIATED");
  const [rejectMsg, setrejectMsg] = useState("");
  const [txnNumber, settxnNumber] = useState("");
  const [rejectDialog, setrejectDialog] = useState({
    title: "",
    txt: "",
    id: "",
  });
  const [alert, setalert] = useState({
    show: false,
    type: "info",
    msg: "",
  });

  const columns = [
    {
      field: "requestId",
      headerName: "Request ID",
      width: 200,
      sortable: false,
      renderCell: (id) => {
        return (
          <Chip
            label={id.value}
            size="small"
            variant="filled"
            color="default"
          />
        );
      },
    },
    {
      field: "amount",
      headerName: "Withdraw Amount",
      width: 150,
      sortable: false,
      renderCell: (price) => {
        return (
          <Chip
            icon={
              withdrawStatus === "INITIATED" ? (
                <PendingIcon />
              ) : withdrawStatus === "COMPLETED" ? (
                <CompleteIcon />
              ) : (
                <CancelIcon />
              )
            }
            label={price.value}
            size="small"
            variant="filled"
            color={
              withdrawStatus === "INITIATED"
                ? "warning"
                : withdrawStatus === "COMPLETED"
                ? "success"
                : "error"
            }
          />
        );
      },
    },
    {
      field: "accountDetails",
      headerName: "Account Details",
      width: 400,
      sortable: false,
      renderCell: (account) => {
        return (
          <Chip
            label={account.value}
            size="small"
            variant="outlined"
            color="default"
          />
        );
      },
    },
    {
      field: "balance",
      headerName: "Account Balance",
      width: 180,
      sortable: false,
      renderCell: (balance) => {
        return (
          <Chip
            label={balance.value}
            size="small"
            variant="outlined"
            color="primary"
          />
        );
      },
    },
    {
      field: "sellerId",
      headerName: "Seller ID",
      width: 200,
      sortable: false,
      renderCell: (id) => {
        return (
          <Chip
            label={id.value}
            size="small"
            variant="filled"
            color="default"
          />
        );
      },
    },
  ];

  const rows = withdrawRequests.map((request) => {
    return {
      id: request._id,
      requestId: request._id,
      amount: request.amount,
      accountDetails: request.bankAccountDetails,
      balance: request.currentBalance,
      sellerId: request.sellerId,
    };
  });

  const Tcols = [
    {
      field: "trId",
      headerName: "Transaction ID",
      width: 200,
      sortable: false,
      renderCell: (id) => {
        return (
          <Chip
            label={id.value}
            size="small"
            variant="filled"
            color="default"
          />
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      sortable: false,
      renderCell: (amt) => {
        return (
          <Chip
            label={amt.value}
            size="small"
            variant="filled"
            color="primary"
          />
        );
      },
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
      sortable: false,
      renderCell: (type) => {
        return (
          <Chip
            icon={type.value === "DEBIT" ? <DebitIcon /> : <CreditIcon />}
            label={type.value}
            size="small"
            variant="filled"
            color={type.value === "DEBIT" ? "error" : "success"}
          />
        );
      },
    },
    {
      field: "txn",
      headerName: "Txn Number",
      width: 200,
      sortable: false,
      renderCell: (num) => {
        return (
          <Chip
            label={num.value}
            size="small"
            variant="filled"
            color="default"
          />
        );
      },
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      sortable: false,
      renderCell: (t) => {
        return <p className={classes.gridP}>{t.value}</p>;
      },
    },
    {
      field: "desc",
      headerName: "Description",
      width: 300,
      sortable: false,
      renderCell: (t) => {
        return <p className={classes.gridP}>{t.value}</p>;
      },
    },
  ];
  const Trows = sellerTransactionList.map((transaction) => {
    return {
      id: transaction._id,
      trId: transaction._id,
      amount: transaction.amount,
      type: transaction.type,
      txn: transaction.txnNumber,
      title: transaction.title,
      desc: transaction.description,
    };
  });
  // getwithdraw Requests
  const getWithdrawRequests = (page, itemsPerPage, status) => {
    setPage(page);
    setwithdrawLoad(true);
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
        setwithdrawLoad(false);
        setwithdrawRequests(response.data.data);
        settotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.log(error.response.data);
        setwithdrawLoad(false);
      });
  };

  // getwithdraw Request
  const getWithdrawRequest = () => {
    setwithdrawDetailLoad(true);
    axios
      .get("/admin-getWithdrawRequest", {
        params: {
          requestId: withdrawRequestId,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setwithdrawDetailLoad(false);
        setwithdrawRequest(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        setwithdrawDetailLoad(false);
      });
  };

  // Marking withdraw Request as Complete
  const markAsComplete = () => {
    setmarkLoad(true);
    setopenDialog(true);
    setrejectDialog({
      title: "Mark Request As Completed",
      txt: "Marking The Request As Completed Will Mean That The Amount Has Been Transfered to the Requested Person",
      id: withdrawRequestId,
    });
  };

  // Marking Withdraw Request As Cancelled
  const markAsCancelled = () => {
    setcancelLoad(true);
    setopenDialog(true);
    setrejectDialog({
      title: "Mark Request As Cancelled",
      txt: "Marking The Request As Cancelled means that the request is no more. No amount is Credited or Debited to Person",
      id: withdrawRequestId,
    });
  };

  const MakeMarkRequest = () => {
    setopenDialog(false);
    if (markLoad) {
      console.log(rejectDialog.id);
      console.log(txnNumber);
      console.log(rejectMsg);
      axios
        .post("/admin-withdrawRequestMarkComplete", {
          requestId: rejectDialog.id,
          txnNumber: txnNumber,
          description: rejectMsg,
        })
        .then((response) => {
          setmarkLoad(false);
          setalert({
            show: true,
            msg: "Request Marked As Complete",
            type: "success",
          });
          setTimeout(() => {
            setwithdrawRequest({});
            setalert({
              show: false,
              msg: "",
              type: "info",
            });
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response.data);
          setmarkLoad(false);
        });
    } else {
      axios
        .post("/admin-cancelWithdrawRequest", {
          requestId: rejectDialog.id,
          message: rejectMsg,
        })
        .then((response) => {
          setcancelLoad(true);
          setalert({
            show: true,
            msg: "Request Marked As Cancelled",
            type: "error",
          });
          setTimeout(() => {
            setwithdrawRequest({});
            setalert({
              show: false,
              msg: "",
              type: "info",
            });
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response.data);
          setcancelLoad(true);
        });
    }
  };

  // get seller Transactions
  const getSellerTransactions = () => {
    setsellerLoad(true);
    axios
      .get("/admin-getSellerTransactionList", {
        params: {
          sellerId: sellerId,
        },
      })
      .then((response) => {
        setsellerLoad(false);
        setsellerTransactionList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setsellerLoad(false);
      });
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
        direction="column"
        spacing={2}
        sx={{ width: "100%" }}
        justifyContent="center"
        alignItems="center"
      >
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
            onClick={() =>
              getWithdrawRequests(Page, itemsPerpage, withdrawStatus)
            }
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
              onChange={(e) => {
                setitemsPerpage(e.target.value);
                getWithdrawRequests(Page, e.target.value, withdrawStatus);
              }}
              label="Items Per Page"
              className={classes.root}
            >
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="items-status" className={classes.root}>
              Status
            </InputLabel>
            <Select
              labelId="items-status"
              value={withdrawStatus}
              onChange={(e) => {
                setwithdrawStatus(e.target.value);
                getWithdrawRequests(Page, itemsPerpage, e.target.value);
              }}
              label="Status"
              className={classes.root}
            >
              <MenuItem value="INITIATED">INITIATED</MenuItem>
              <MenuItem value="CANCELLED">CANCELLED</MenuItem>
              <MenuItem value="COMPLETED">COMPLETED</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Pagination
          count={totalPages}
          page={Page}
          onChange={(e, pageNo) => {
            getWithdrawRequests(pageNo, itemsPerpage, withdrawStatus);
          }}
          color="primary"
          className={classes.root}
        />
        <Stack
          sx={{ height: 500, width: "100%" }}
          className="datagrid-stack-wallet"
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowBuffer={4}
            hideFooter
            className={classes.root}
            loading={withdrawLoad}
          />
        </Stack>
      </Stack>
      <Divider sx={{ border: "1px solid rgba(0,0,0,0.3)", width: "100%" }} />
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
          sx={{ maxWidth: 500 }}
          variant="standard"
          value={withdrawRequestId}
          onChange={(e) => setwithdrawRequestId(e.target.value)}
        />
        <LoadingButton
          className={classes.root}
          loading={withdrawDetailLoad}
          loadingPosition="end"
          endIcon={<SearchIcon />}
          variant="contained"
          color="primary"
          size="small"
          onClick={getWithdrawRequest}
          sx={{ maxWidth: 500 }}
        >
          Get Withdraw Request Details
        </LoadingButton>
        <List
          subheader={
            <ListSubheader className={classes.root}>
              Withdraw Request Details
            </ListSubheader>
          }
          sx={{ maxWidth: 500 }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <IDIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.root}
                primary="Request ID"
                secondary={<Chip label={withdrawRequest?._id} size="small" />}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <IDIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.root}
                primary="Seller ID"
                secondary={
                  <Chip label={withdrawRequest?.sellerId} size="small" />
                }
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.root}
                primary="Account Balance"
                secondary={
                  <Chip
                    label={withdrawRequest?.currentBalance}
                    color="primary"
                    variant="filled"
                    size="small"
                  />
                }
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.root}
                primary="Account Details"
                secondary={
                  <Chip
                    label={withdrawRequest?.bankAccountDetails}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                }
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {withdrawRequest?.status === "INITIATED" ? (
                  <PendingIcon />
                ) : withdrawRequest?.status === "COMPLETED" ? (
                  <CompleteIcon />
                ) : (
                  <CancelIcon />
                )}
              </ListItemIcon>
              <ListItemText
                className={classes.root}
                primary="Withdraw Amount Requested"
                secondary={
                  <Chip
                    label={withdrawRequest?.amount}
                    color={
                      withdrawRequest.status === "INITIATED"
                        ? "warning"
                        : withdrawStatus === "COMPLETED"
                        ? "success"
                        : "error"
                    }
                    variant="outlined"
                    size="small"
                  />
                }
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {withdrawRequest?.status === "INITIATED" ? (
                  <PendingIcon />
                ) : withdrawRequest?.status === "COMPLETED" ? (
                  <CompleteIcon />
                ) : (
                  <CancelIcon />
                )}
              </ListItemIcon>
              <ListItemText
                className={classes.root}
                primary="Withdraw Request Status"
                secondary={
                  <Chip
                    label={withdrawRequest?.status}
                    color={
                      withdrawRequest?.status === "INITIATED"
                        ? "warning"
                        : withdrawRequest?.status === "COMPLETED"
                        ? "success"
                        : "error"
                    }
                    icon={
                      withdrawRequest?.status === "INITIATED" ? (
                        <PendingIcon />
                      ) : withdrawRequest?.status === "COMPLETED" ? (
                        <CompleteIcon />
                      ) : (
                        <CancelIcon />
                      )
                    }
                    variant="outlined"
                    size="small"
                  />
                }
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          {withdrawRequest?.status === "INITIATED" ? (
            <ListItem disablePadding>
              <ListItemButton disableTouchRipple>
                <ListItemIcon>
                  <CreditIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.root}
                  primary="Mark Request as Complete"
                  secondary={
                    <LoadingButton
                      className={classes.root}
                      loading={markLoad}
                      loadingPosition="end"
                      endIcon={<SendIcon />}
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={markAsComplete}
                    >
                      Mark As COMPLETED
                    </LoadingButton>
                  }
                />
              </ListItemButton>
            </ListItem>
          ) : null}
          <Divider />
          {withdrawRequest?.status === "INITIATED" ? (
            <ListItem disablePadding>
              <ListItemButton disableTouchRipple>
                <ListItemIcon>
                  <CreditIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.root}
                  primary="Cancel Withdraw Request"
                  secondary={
                    <LoadingButton
                      className={classes.root}
                      loading={cancelLoad}
                      loadingPosition="end"
                      endIcon={<CancelIcon />}
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={markAsCancelled}
                    >
                      Mark As CANCELLED
                    </LoadingButton>
                  }
                />
              </ListItemButton>
            </ListItem>
          ) : null}
        </List>
      </Stack>
      {alert.show ? (
        <Alert color={alert.type} className={classes.root}>
          {alert.msg}
        </Alert>
      ) : null}
      <Divider sx={{ border: "1px solid rgba(0,0,0,0.3)", width: "100%" }} />
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
        value={sellerId}
        onChange={(e) => setsellerId(e.target.value)}
      />
      <LoadingButton
        className={classes.root}
        loading={sellerLoad}
        loadingPosition="end"
        endIcon={<LoadIcon />}
        variant="contained"
        color="primary"
        size="small"
        onClick={getSellerTransactions}
      >
        Get Seller Transaction List
      </LoadingButton>
      <Stack
        sx={{ height: 300, width: "100%" }}
        className="datagrid-stack-wallet"
      >
        <DataGrid
          rows={Trows}
          columns={Tcols}
          pageSize={5}
          rowBuffer={5}
          className={classes.root}
          loading={sellerLoad}
        />
      </Stack>

      <Dialog
        open={openDialog}
        onClose={() => {
          setopenDialog(false);
          setmarkLoad(false);
          setcancelLoad(false);
        }}
        className={classes.root}
      >
        <DialogTitle className={classes.root}>{rejectDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Chip
              label={"Request ID : " + rejectDialog.id}
              color="warning"
              className={classes.root}
              size="small"
            />
          </DialogContentText>
          <DialogContentText className={classes.root}>
            {rejectDialog.txt}
          </DialogContentText>
          {markLoad ? (
            <TextField
              autoFocus
              margin="dense"
              label="Transaction Number"
              helperText="Input Transaction Number Recieved from UPI transaction."
              type="text"
              fullWidth
              variant="standard"
              className={classes.root}
              value={txnNumber}
              onChange={(e) => settxnNumber(e.target.value)}
            />
          ) : null}
          <TextField
            margin="dense"
            label={markLoad ? "Description" : "Rejection Message With Reason"}
            type="text"
            fullWidth
            variant="standard"
            className={classes.root}
            value={rejectMsg}
            onChange={(e) => setrejectMsg(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setopenDialog(false);
              setmarkLoad(false);
              setcancelLoad(false);
            }}
            variant="outlined"
            className={classes.root}
            color="error"
            size="small"
            icon={<CancelIcon />}
          >
            Close
          </Button>
          <Button
            onClick={MakeMarkRequest}
            variant="outlined"
            className={classes.root}
            color="primary"
            size="small"
            icon={<SendIcon />}
          >
            {markLoad ? "Mark As Complete" : "Mark As Cancelled"}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
export default Wallet;

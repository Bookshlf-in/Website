import { React, useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { UserContext } from "../../Context/userContext";
import { makeStyles } from "@mui/styles";
import axios from "../../axios";
import "./Wallet.css";

// Wallet Components
import { Stack, Grid, TextField, Paper, InputAdornment } from "@mui/material";
import { Skeleton, Alert, Chip, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// icons
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SendIcon from "@mui/icons-material/Send";
import CreditIcon from "@mui/icons-material/CallMadeRounded";
import DebitIcon from "@mui/icons-material/CallReceivedRounded";
import RupeeIcon from "@mui/icons-material/CurrencyRupee";

// Custom Components
import TransactionTable from "./TransactionGrid";
import WithdrawGrid from "./WithdrawGrid";

const stackStyle = {
  padding: "12px 15px",
};

const useStyles = makeStyles({
  root: {
    fontFamily: "PT sans !important",
    "& label": {
      fontFamily: "PT sans !important",
    },
    "& input": {
      fontFamily: "PT sans !important",
    },
    "& p": {
      fontFamily: "PT sans !important",
    },
  },
  H3: {
    fontFamily: "Staatliches !important",
  },
  TransactionStack: {
    maxHeight: "300px",
    overflowY: "auto",
    padding: "10px",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "5px",
  },
});

const Wallet = () => {
  const classes = useStyles();
  const [user] = useContext(UserContext);

  const [loaded, setLoaded] = useState(false);
  const [walletBalance, setwalletBalance] = useState(0);
  const [withdrawRequest, setwithdrawRequest] = useState([]);
  const [transactionList, settransactionList] = useState([]);
  const [requesting, setrequesting] = useState(false);
  const [updateTxn, setUpdateTxn] = useState(0);
  const [alert, setAlert] = useState({
    show: false,
    severity: "success",
    msg: "",
  });

  const [widthdrawAmount, setwithdrawAmount] = useState(10);
  const [accountDetails, setaccountDetails] = useState("");
  const [debitAmount, setdebitAmount] = useState(0);
  const [creditAmount, setcreditAmount] = useState(0);

  // handel Debit Amount
  const handelDebitAmount = (debitList) => {
    let amount = 0;
    for (let i = 0; i < debitList.length; i++) {
      if (debitList[i].type === "DEBIT") {
        amount += debitList[i].amount;
      }
      if (i === debitList.length - 1) {
        setdebitAmount(Math.round(amount * 100) / 100);
      }
    }
  };

  // handel Debit Amount
  const handelCreditAmount = (creditList) => {
    let amount = 0;
    for (let i = 0; i < creditList.length; i++) {
      if (creditList[i].type === "CREDIT") {
        amount += creditList[i].amount;
      }
      if (i === creditList.length - 1) {
        setcreditAmount(Math.round(amount * 100) / 100);
      }
    }
  };

  // handeling Withdraw Request
  const handelWithdrawRequest = () => {
    setrequesting(true);
    const makeRequest = async () => {
      axios
        .post("/withdrawFromWallet", {
          amount: Number(widthdrawAmount),
          bankAccountDetails: accountDetails,
        })
        .then((response) => {
          // console.log(response.data);
          setrequesting(false);
          setAlert({
            show: true,
            msg: response.data.msg,
            severity: "success",
          });
          // history.go(0);
          setUpdateTxn((prev) => prev + 1);
          setTimeout(() => {
            setAlert({
              show: false,
              msg: "",
              severity: "success",
            });
            setwithdrawAmount(10);
            setaccountDetails("");
          }, 5000);
        })
        .catch((error) => {
          setrequesting(false);
          // console.log(error.response.data.errors[0].error);
          setAlert({
            show: true,
            msg: error.response.data.errors[0].error,
            severity: "error",
          });
        });
    };
    makeRequest();
  };

  useEffect(() => {
    const fetchdata = async () => {
      axios
        .get("/getCurrentBalance")
        .then((response) => {
          setwalletBalance(Math.round(response.data.walletBalance * 100) / 100);
          axios
            .get("/getTransactionList")
            .then((response) => {
              handelDebitAmount(response.data);
              handelCreditAmount(response.data);
              settransactionList(response.data);
              axios
                .get("/getWithdrawRequests")
                .then((response) => {
                  setwithdrawRequest(response.data);
                  setUpdateTxn(response.data.length);
                  setLoaded(true);
                })
                .catch((error) => {
                  setLoaded(true);
                });
            })
            .catch((error) => {
              setLoaded(true);
            });
        })
        .catch((error) => {
          setLoaded(true);
        });
    };
    fetchdata();
    if (user && user?.roles?.includes("seller")) fetchdata();
    else setLoaded(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>Wallet | Bookshlf</title>
        <meta name="description" content="Seller Wallet Bookshlf" />
      </Helmet>
      {user && user?.roles?.includes("seller") ? (
        <Grid container spacing={2} style={{ padding: "10px" }}>
          <Grid item xs={12} lg={6} md={12} sm={12}>
            <Stack direction="column" spacing={2}>
              {!loaded ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={50}
                    sx={{ bgcolor: "grey.500" }}
                  ></Skeleton>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={50}
                    sx={{ bgcolor: "grey.500" }}
                  ></Skeleton>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={50}
                    sx={{ bgcolor: "grey.500" }}
                  ></Skeleton>
                </>
              ) : (
                <Paper elevation={2}>
                  <Stack direction="column" spacing={1} style={stackStyle}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography className={classes.H3} variant="h3">
                        Balance
                      </Typography>
                      <Typography className={classes.H3} variant="h3">
                        <RupeeIcon color="primary" />
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={3}>
                      <Chip
                        icon={<RupeeIcon />}
                        label={walletBalance}
                        className={classes.root}
                      />
                    </Stack>
                    <Stack direction="row" spacing={5} justifyContent="center">
                      <div className="wallet-stack-item">
                        <Chip
                          icon={<DebitIcon />}
                          label={debitAmount}
                          size="small"
                          color="error"
                          variant="filled"
                          className={classes.root}
                        />
                      </div>
                      <div className="wallet-stack-item">
                        <Chip
                          icon={<CreditIcon />}
                          label={creditAmount}
                          size="small"
                          color="success"
                          variant="filled"
                          className={classes.root}
                        />
                      </div>
                    </Stack>
                  </Stack>
                </Paper>
              )}
              {!loaded ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={100}
                    sx={{ bgcolor: "grey.500" }}
                  ></Skeleton>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={100}
                    sx={{ bgcolor: "grey.500" }}
                  ></Skeleton>
                </>
              ) : (
                <Paper elevation={2}>
                  <Stack direction="column" spacing={2} style={stackStyle}>
                    <TextField
                      className={classes.root}
                      label="Amount"
                      helperText="Enter Amount To be Withdrawn. Min Amount is 10."
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <RupeeIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                      value={widthdrawAmount}
                      onChange={(e) => {
                        setwithdrawAmount(e.target.value);
                      }}
                    />
                    <TextField
                      className={classes.root}
                      label="Account Details"
                      helperText="Please Provide Bank Account Details (Account Number and branch IFSC Code ) or UPI ID or Phone Number "
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountBalanceIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                      value={accountDetails}
                      onChange={(e) => {
                        setaccountDetails(e.target.value);
                      }}
                    />
                    <LoadingButton
                      onClick={handelWithdrawRequest}
                      endIcon={<SendIcon />}
                      loading={requesting}
                      loadingPosition="end"
                      variant="contained"
                      className={classes.root}
                    >
                      Request Withdraw
                    </LoadingButton>
                    {alert.show ? (
                      <Alert severity={alert.severity} className={classes.root}>
                        {alert.msg}
                      </Alert>
                    ) : null}
                  </Stack>
                </Paper>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} lg={6} md={12} sm={12}>
            <Stack direction="column" spacing={2}>
              {!loaded ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={150}
                    sx={{ bgcolor: "grey.500" }}
                  ></Skeleton>
                </>
              ) : (
                <Stack
                  direction="column"
                  spacing={1}
                  className={classes.TransactionStack}
                >
                  <Typography className={classes.H3} variant="h5">
                    Recent Widthdraw Requests
                  </Typography>
                  <WithdrawGrid data={withdrawRequest} update={updateTxn} />
                </Stack>
              )}
              {!loaded ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={150}
                    sx={{ bgcolor: "grey.500" }}
                  ></Skeleton>
                </>
              ) : (
                <Stack
                  direction="column"
                  spacing={1}
                  className={classes.TransactionStack}
                >
                  <Typography className={classes.H3} variant="h5">
                    Previous Transactions
                  </Typography>
                  <TransactionTable data={transactionList} />
                </Stack>
              )}
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Alert severity="error" className={classes.root}>
          Please Login or Register As Seller
        </Alert>
      )}
    </>
  );
};

export default Wallet;

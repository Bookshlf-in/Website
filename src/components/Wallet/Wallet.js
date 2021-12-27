import { React, useState, useEffect, useContext } from "react";
import "./Wallet.css";
import TransactionTable from "./TransactionGrid";
import WithdrawGrid from "./WithdrawGrid";

import axios from "../../axios";
import { Helmet } from "react-helmet";
import { UserContext } from "../../Context/userContext";

// Wallet Components
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import Skeleton from "@mui/material/Skeleton";

// icons
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import SendIcon from "@material-ui/icons/Send";
import CreditIcon from "@material-ui/icons/CallMadeRounded";
import DebitIcon from "@material-ui/icons/CallReceivedRounded";

const stackStyle = {
  padding: "12px 15px",
};

const iconStyle = {
  fontSize: "0.75rem",
};
const Wallet = () => {
  const [user, setUser] = useContext(UserContext);

  const [loaded, setLoaded] = useState(false);
  const [walletBalance, setwalletBalance] = useState(0);
  const [withdrawRequest, setwithdrawRequest] = useState([]);
  const [transactionList, settransactionList] = useState([]);

  const [widthdrawAmount, setwithdrawAmount] = useState("");
  const [debitAmount, setdebitAmount] = useState(0);
  const [creditAmount, setcreditAmount] = useState(0);

  // Checking if price string is currect
  const CheckIfPriceFormat = (priceString) => {
    for (let i = 0; i < priceString.length; i++) {
      if (
        ("0" <= priceString[i] && priceString[i] <= "9") ||
        priceString[i] === ","
      ) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  };

  // Price Formatting
  const FormatPrice = (priceString) => {
    var FormattedpriceString = "";
    if (CheckIfPriceFormat(priceString)) {
      priceString = priceString.replaceAll(",", "");
      for (let i = priceString.length - 1; i >= 0; i -= 3) {
        for (let j = i; j >= 0 && j > i - 3; j--) {
          FormattedpriceString = priceString[j] + FormattedpriceString;
          if (j === i - 2 && j > 0) {
            FormattedpriceString = "," + FormattedpriceString;
          }
        }
      }
    } else {
      FormattedpriceString = widthdrawAmount;
    }
    return FormattedpriceString;
  };

  // handel Debit Amount
  const handelDebitAmount = (debitList) => {
    let amount = 0;
    for (let i = 0; i < debitList.length; i++) {
      if (debitList[i].type === "DEBIT") {
        amount += debitList[i].amount;
      }
      if (i === debitList.length - 1) {
        setdebitAmount(amount);
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
        setcreditAmount(amount);
      }
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      axios
        .get("/getCurrentBalance")
        .then((response) => {
          setwalletBalance(response.data.walletBalance);
          axios
            .get("/getTransactionList")
            .then((response) => {
              // console.log(response.data);
              handelDebitAmount(response.data);
              handelCreditAmount(response.data);
              settransactionList(response.data);
              axios
                .get("/getWithdrawRequests")
                .then((response) => {
                  // console.log(response.data);
                  setwithdrawRequest(response.data);
                  setTimeout(() => {
                    setLoaded(true);
                  }, 1000);
                })
                .catch((error) => {});
            })
            .catch((error) => {});
        })
        .catch((error) => {});
    };
    fetchdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Wallet | Bookshlf</title>
        <meta
          name="description"
          content="To contact us, fill out and submit the form. We will try our best to answer your questions as soon as possible."
        />
      </Helmet>
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
                <Stack direction="column" spacing={3} style={stackStyle}>
                  <Stack direction="row" justifyContent="space-between">
                    <div className="wallet-stack-item">
                      <h3>Balance</h3>
                    </div>
                    <div className="wallet-stack-item">
                      <h3 className="rupee-custom-style">
                        <i className="fas fa-rupee-sign" />
                      </h3>
                    </div>
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <div className="wallet-stack-item">
                      <h2>
                        <i className="fas fa-rupee-sign" />
                      </h2>
                    </div>
                    <div className="wallet-stack-item">
                      <h4 className="amount-icon">{walletBalance}</h4>
                    </div>
                  </Stack>
                  <Stack direction="row" spacing={5} justifyContent="center">
                    <div className="wallet-stack-item">
                      <span className="amount-icon">
                        <DebitIcon style={iconStyle} />
                      </span>
                      <span className="debit-amount">
                        - <i className="fas fa-rupee-sign" /> {debitAmount}
                      </span>
                    </div>
                    <div className="wallet-stack-item">
                      <span className="amount-icon">
                        <CreditIcon style={iconStyle} />
                      </span>
                      <span className="credit-amount">
                        + <i className="fas fa-rupee-sign" /> {creditAmount}
                      </span>
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
                    label="Amount"
                    helperText="Enter Amount To be Withdrawn"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-rupee-sign" />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    value={widthdrawAmount}
                    onChange={(e) => {
                      setwithdrawAmount(FormatPrice(e.target.value));
                    }}
                  />
                  <TextField
                    label="Account Details"
                    helperText="Please Provide Bank Account Details (Account Number & branch ISBN Code ) or UPI ID or Phone Number "
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountBalanceIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    value={widthdrawAmount}
                    onChange={(e) => {
                      setwithdrawAmount(FormatPrice(e.target.value));
                    }}
                  />
                  <LoadingButton
                    onClick={() => {}}
                    endIcon={<SendIcon />}
                    loading={false}
                    loadingPosition="end"
                    variant="contained"
                    style={{
                      fontFamily: "PT sans",
                      fontSize: "12px",
                      letterSpacing: "1px",
                    }}
                  >
                    Withdraw
                  </LoadingButton>
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
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  padding: "10px",
                }}
              >
                <b className="amount-icon"> Recent Widthdraw Requests </b>
                <WithdrawGrid data={withdrawRequest} />
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
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  padding: "10px",
                }}
              >
                <b className="amount-icon"> Previous Transactions </b>
                <TransactionTable data={transactionList} />
              </Stack>
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Wallet;

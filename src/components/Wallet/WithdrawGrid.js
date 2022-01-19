import { React, useState, useEffect } from "react";
import axios from "../../axios";
import { useHistory } from "react-router-dom";

// components
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";

// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelIcon from "@mui/icons-material/CancelRounded";
import CompleteIcon from "@mui/icons-material/CheckCircleRounded";
import PendingIcon from "@mui/icons-material/AccessTimeRounded";
import DeleteIcon from "@mui/icons-material/Delete";

const iconStyle = {
  fontSize: "1rem",
};

const avatarStyle = {
  height: "20px",
  width: "20px",
  backgroundColor: "white",
};

const CanceliconStyle = {
  color: "rgb(231, 39, 39)",
  fontSize: "1em",
};

const CompleteiconStyle = {
  color: "forestgreen",
  fontSize: "1rem",
};

const PendingiconStyle = {
  fontSize: "1rem",
  color: "rgb(252, 227, 6)",
};

const transactionIDStyle = {
  padding: "6px",
  backgroundColor: "rgba(0, 0, 0, 0.06)",
  borderRadius: "10px",
  cursor: "pointer",
};

const CircularProgressStyle = {
  color: "white",
  height: "15px",
  width: "15px",
};

const WithdrawGrid = (props) => {
  const history = useHistory();

  const [Load, setLoad] = useState(false);
  const [withdrawList, setwithdrawList] = useState(props.data);
  const [requesting, setrequesting] = useState("");
  const [msg, setmsg] = useState({
    color: "error",
    data: "Cancel",
    icon: "Delete",
  });

  const handleCancelWithdrawRequest = (ID) => {
    setrequesting(ID);
    setmsg({
      color: "error",
      data: "Cancel",
      icon: "progress",
    });

    const makeRequest = async () => {
      axios
        .post("/cancelWithdrawRequest", {
          requestId: ID,
        })
        .then((response) => {
          console.log(response.data);
          setmsg({
            color: "success",
            data: response.data.msg,
            icon: "Complete",
          });
          setTimeout(() => {
            history.go(0);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response.data);
          setrequesting("");
        });
    };
    makeRequest();
  };

  useEffect(() => {
    setLoad(true);
    axios
      .get("/getWithdrawRequests")
      .then((response) => {
        // console.log(response.data);
        setwithdrawList(response.data);
        setLoad(false);
      })
      .catch((error) => {});
  }, [props.update]);

  return (
    <>
      {Load ? (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%", width: "100%" }}
        >
          <CircularProgress size={25} />
        </Stack>
      ) : (
        withdrawList.map((request, idx) => (
          <Accordion key={idx} className="Wallet-Accordian">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={iconStyle} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                  overflowY: "auto",
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar style={avatarStyle}>
                      {request.status === "INITIATED" ? (
                        <PendingIcon style={PendingiconStyle} />
                      ) : request.status === "CANCELLED" ? (
                        <CancelIcon style={CanceliconStyle} />
                      ) : (
                        <CompleteIcon style={CompleteiconStyle} />
                      )}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <>
                        <i className="fas fa-rupee-sign" /> {request.amount}
                      </>
                    }
                  />
                  <ListItemText
                    primary={request.bankAccountDetails}
                    secondary={
                      request.createdAt.substr(0, 10) +
                      " | " +
                      request.createdAt.substr(11, 8)
                    }
                  />
                  {request.status === "INITIATED" ? (
                    <ListItemText
                      primary={
                        <Chip
                          label={
                            requesting === request._id ? msg.data : "Cancel"
                          }
                          size="small"
                          onClick={() =>
                            handleCancelWithdrawRequest(request._id)
                          }
                          onDelete={() =>
                            handleCancelWithdrawRequest(request._id)
                          }
                          deleteIcon={
                            requesting === request._id ? (
                              msg.icon === "progress" ? (
                                <CircularProgress
                                  style={CircularProgressStyle}
                                />
                              ) : (
                                <CompleteIcon />
                              )
                            ) : (
                              <DeleteIcon />
                            )
                          }
                          color={
                            requesting === request._id ? msg.color : "error"
                          }
                        />
                      }
                    />
                  ) : null}
                </ListItem>
              </List>
            </AccordionSummary>
            <AccordionDetails>
              <Stack
                direction={{ xs: "column", sm: "row", lg: "row", md: "row" }}
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                justifyContent="space-evenly"
              >
                <Typography>{request.status}</Typography>
                <Typography>
                  Request ID : <b style={transactionIDStyle}>{request._id}</b>
                </Typography>
                {request.adminMessage ? (
                  <Typography>Msg : {request.adminMessage}</Typography>
                ) : null}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </>
  );
};
export default WithdrawGrid;

import { React, useState } from "react";
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
import CreditIcon from "@material-ui/icons/CallMadeRounded";
import DebitIcon from "@material-ui/icons/CallReceivedRounded";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PlusIcon from "@material-ui/icons/AddCircleOutlineRounded";
import MinusIcon from "@material-ui/icons/RemoveRounded";

const iconStyle = {
  fontSize: "1rem",
};

const avatarStyle = {
  height: "20px",
  width: "20px",
  backgroundColor: "white",
};

const DebiticonStyle = {
  color: "rgb(231, 39, 39)",
  fontSize: "1rem",
};

const CrediticonStyle = {
  color: "forestgreen",
  fontSize: "1rem",
};

const transactionIDStyle = {
  padding: "6px",
  backgroundColor: "rgba(0, 0, 0, 0.06)",
  borderRadius: "10px",
  cursor: "pointer",
};
const TransactionGrid = (props) => {
  return (
    <>
      {props.data.map((transaction, idx) => (
        <Accordion key={idx}>
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
                    {transaction.type === "CREDIT" ? (
                      <CreditIcon style={CrediticonStyle} />
                    ) : (
                      <DebitIcon style={DebiticonStyle} />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    transaction.type === "CREDIT" ? (
                      <PlusIcon style={CrediticonStyle} />
                    ) : (
                      <MinusIcon style={DebiticonStyle} />
                    )
                  }
                  secondary={transaction.amount}
                />
                <ListItemText
                  primary={transaction.title}
                  secondary={
                    transaction.createdAt.substr(0, 10) +
                    " | " +
                    transaction.createdAt.substr(11, 8)
                  }
                />
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
              <Typography>{transaction.type}</Typography>
              {transaction.type === "DEBIT" ? (
                <Typography>{transaction.description}</Typography>
              ) : null}
              {transaction.type === "DEBIT" ? (
                <Typography>Txn Number : {transaction.txnNumber}</Typography>
              ) : null}
              <Typography>
                Transaction ID :{" "}
                <b style={transactionIDStyle}>{transaction._id}</b>
              </Typography>
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
export default TransactionGrid;

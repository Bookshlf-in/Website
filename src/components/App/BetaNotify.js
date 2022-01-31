import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Components
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

const Styles = {
  Dialog: {
    background: "rgba(0,0,0,0.6)",
    "& .MuiDialog-paper": {
      margin: 0,
      padding: 0,
    },
    "& .MuiDialogActions-root": {
      justifyContent: "flex-start",
    },
    "& h2": {
      padding: "8px 16px",
    },
    "& .MuiDialogContent-root": {
      padding: "8px 16px",
    },
    "@media screen and (max-width:600px)": {
      "& .MuiDialog-paper": {
        width: 300,
      },
    },
  },
  DialogTitle: {
    fontFamily: "Staatliches",
    "@media screen and (max-width:600px)": {
      fontSize: "16px !important",
    },
  },
  DialogContent: {
    fontFamily: "PT sans !important",

    "@media screen and (max-width:600px)": {
      fontSize: "12px !important",
    },
  },
  Button: {
    marginRight: "8px",
    fontFamily: "PT sans !important",
    "@media screen and (max-width:600px)": {
      fontSize: "9px !important",
    },
  },
};
const BetaNotify = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("bookshlf_beta_notify")) {
      setOpen(false);
    } else {
      sessionStorage.setItem("bookshlf_beta_notify", true);
      setOpen(true);
    }
  }, []);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={Styles.Dialog}
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h4" sx={Styles.DialogTitle}>
          Bookshlf Beta Found!
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={Styles.DialogContent}
        >
          This is a developer Version Of{" "}
          <Link to={{ pathname: "https://bookshlf.in" }} target="_blank">
            Bookshlf.in
          </Link>{" "}
          used for development purposes & doesn't represent the Original
          Website. The Beta Version Has Many Ongoing Bugs and Non-Finalized
          Features.
        </DialogContentText>
        <DialogContentText
          id="alert-dialog-description"
          sx={Styles.DialogContent}
        >
          If You Accidently landed to this version Please Go to Original &
          Stable{" "}
          <Link to={{ pathname: "https://bookshlf.in" }} target="_blank">
            Bookshlf.in
          </Link>{" "}
          .
        </DialogContentText>
        <DialogContentText
          id="alert-dialog-description"
          sx={Styles.DialogContent}
        >
          If You are a developer and want to contribute, Please Go to{" "}
          <Link
            to={{ pathname: "https://github.com/Bookshlf-in" }}
            target="_blank"
          >
            Github/Bookshlf-in
          </Link>{" "}
          for Contribution and More Details.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="error"
          size="small"
          variant="contained"
          sx={Styles.Button}
        >
          Agree
        </Button>
        <Button
          href="https://bookshlf.in"
          autoFocus
          color="success"
          size="small"
          variant="contained"
          sx={Styles.Button}
        >
          No Take me to original Bookshlf
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BetaNotify;

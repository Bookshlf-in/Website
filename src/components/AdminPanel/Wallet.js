import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// components
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";

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
  const [val1, setval1] = useState(false);
  const [val2, setval2] = useState(false);
  const [val3, setval3] = useState(false);

  const handelChange = (index, value) => {
    if (index === 1) {
      setval1(value);
      if (value) {
        // if val1 was false but now true
        if (val2) {
          setval3(false);
        } else {
          setval3(true);
        }
      } else {
        setval2(true);
        setval3(true);
      }
    } else if (index === 2) {
      setval2(value);
      if (value) {
        // if val2 was false but now true
        if (val1) {
          setval3(false);
        } else {
          setval3(true);
        }
      } else {
        setval1(true);
        setval3(true);
      }
    } else if (index === 3) {
      if (value) {
        // if val1 was false but now true
        if (val2) {
          setval1(false);
        } else {
          setval1(true);
        }
      } else {
        setval1(true);
        setval2(true);
      }
      setval3(value);
    }
  };
  return (
    <Stack
      direction="column"
      spacing={5}
      sx={{
        width: "100%",
        padding: "10px",
        height: "100vh",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        sx={{
          width: "100%",
          padding: "10px",
        }}
        spacing={3}
      >
        Wallet
      </Stack>
    </Stack>
  );
};
export default Wallet;

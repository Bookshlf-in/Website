import React from "react";

// Mui Components
import { Stack, Typography, Avatar } from "@mui/material";

const Styles = {
  Container: {
    padding: "36px 10px",
    paddingTop: 0,
    backgroundColor: "whitsmoke",
  },
  Heading: {
    fontSize: "2.2em",
    fontFamily: "Staatliches",
  },
  Benefit: {
    padding: "6px",
    height: 100,
    width: "100%",
    maxWidth: 100,
    position: "relative",
    borderRadius: "15px",
    cursor: "pointer",
  },
  BenefitLabel: {
    fontFamily: "Staatliches",
    fontSize: "0.7em",
    letterSpacing: "0.08em",
    "@media screen and (max-width:600px)": {
      fontSize: "0.6em",
    },
  },
  BenefitLogo: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    "@media screen and (max-width:600px)": {
      paddingRight: 0,
      paddingBottom: 0,
    },
  },
  BenefitLogoImg: {
    height: 40,
    width: 40,
    marginTop: "-15px",
    marginLeft: "-15px",
    "@media screen and (max-width:600px)": {
      marginTop: "-15px",
      marginLeft: "25px",
    },
  },
};

const Backgrounds = [
  "rgb(229,126,37)",
  "rgb(206,172,154)",
  "rgb(117,132,242)",
  "rgb(232,184,0)",
  "rgb(139,155,169)",
  "rgb(255,65,85)",
];
const Colors = ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff"];
const Benefit = (props) => {
  return (
    <Stack
      sx={{ ...Styles.Benefit, backgroundColor: Backgrounds[props.bg] }}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        sx={{ ...Styles.BenefitLabel, color: Colors[props.bg] }}
        align="center"
      >
        {props.label}
      </Typography>
      <Stack
        sx={Styles.BenefitLogo}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Avatar
          src={props.Icon}
          alt={props.label}
          variant="square"
          sx={Styles.BenefitLogoImg}
        />
      </Stack>
    </Stack>
  );
};
const Benefits = () => {
  return (
    <Stack sx={Styles.Container} spacing={2}>
      <Typography sx={Styles.Heading} align="center">
        Benefits
      </Typography>
      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
      >
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-evenly"
          sx={{ width: "100%" }}
        >
          <Benefit
            label="Best Book Prices"
            Icon="/images/Benefits/book.png"
            bg={0}
          />
          <Benefit
            label="Doorstep Pickup & Delivery"
            Icon="/images/Benefits/doorstep.png"
            bg={1}
          />
          <Benefit
            label="Easy TO Use"
            Icon="/images/Benefits/easy.png"
            bg={2}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-evenly"
          sx={{ width: "100%" }}
        >
          <Benefit
            label="Minimum Shipping Charges"
            Icon="/images/Benefits/package.png"
            bg={3}
          />
          <Benefit
            label="Free Delivery For Books Over 500/-"
            Icon="/images/Benefits/free-delivery.png"
            bg={4}
          />
          <Benefit
            label="24x7 Support"
            Icon="/images/Benefits/support.png"
            bg={5}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
export default Benefits;

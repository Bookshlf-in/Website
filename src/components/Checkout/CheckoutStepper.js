import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

import { Stepper, Step, StepLabel, StepConnector } from "@mui/material";
import { stepConnectorClasses } from "@mui/material/StepConnector";

import PaymentIcon from "@mui/icons-material/Payment";
import ReviewIcon from "@mui/icons-material/Grading";
import ShippingIcon from "@mui/icons-material/LocalShipping";
import CheckIcon from "@mui/icons-material/CheckCircle";

const CheckoutStepper = ({ panel }) => {
  // Custom Stepper
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 17,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 35,
    height: 35,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    }),
  }));

  const ColorlibStepIcon = (props) => {
    const { active, completed, className } = props;

    const icons = {
      1: <ShippingIcon sx={{ height: 20, width: 20 }} />,
      2: <PaymentIcon sx={{ height: 20, width: 20 }} />,
      3: <ReviewIcon sx={{ height: 20, width: 20 }} />,
      4: <CheckIcon sx={{ height: 20, width: 20 }} />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  };

  ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
    icon: PropTypes.node,
  };

  const PanelTitle = [
    "Shipping Address",
    "Payment Details",
    "Review Order",
    "Place Order",
  ];

  return (
    <Stepper
      sx={{ width: "100%" }}
      alternativeLabel
      activeStep={panel}
      connector={<ColorlibConnector />}
    >
      {PanelTitle.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={ColorlibStepIcon}>
            <Typography variant="caption">{label}</Typography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CheckoutStepper;

import { useState } from "react";

import { Box, Typography } from "@mui/material";
import { Step, Stepper, StepLabel, StepContent } from "@mui/material";

const steps = [
  {
    id: "Order placed",
    label: "Order Placed",
    description:
      "Order has been placed and is currently pending the customer & seller confirmation",
  },
  {
    id: "Cancelled",
    label: "Order Cancelled",
    description: "Order has been cancelled",
  },
  {
    id: "Order Confirmed",
    label: "Order Confirmed",
    description:
      "Order is confirmed by customer and is pending from seller for packaging",
  },
  {
    id: "Packed",
    label: "Order Packed",
    description: "Order has been packed and is ready for shipment",
  },
  {
    id: "Shipped",
    label: "Order Shipped",
    description: "Shipement details manifested and order is being shipped",
  },
  {
    id: "enroute",
    label: "Order En Route",
    description: "Order has been shipped and is currently on the way",
  },
  {
    id: "Delivered",
    label: "Order Delivered",
    description: "Order has been successfully delivered",
  },
  {
    id: "RTO",
    label: "RTO",
    description:
      "Order has been Rejected and is currently being returned to seller",
  },
  {
    id: "Returned",
    label: "Returned",
    description: "Order has been Returned to seller",
  },
];

const getActiveSteps = (status = []) => {
  return status.map((currentStatus) => {
    return steps.find((step) => step.id === currentStatus);
  });
};

const getActiveStep = (activeSteps = []) => {
  return activeSteps.length - 1;
};

const TrackingStepper = ({ status = ["Order placed"] }) => {
  const activeSteps = getActiveSteps(status);
  const [activeStep] = useState(getActiveStep(activeSteps));

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {activeSteps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography className="step-content">
                {step.description}
              </Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
export default TrackingStepper;

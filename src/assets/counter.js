import { Typography } from "@mui/material";
import { useEffect } from "react";

const Counter = ({ counter, setCounter, typographyProps }) => {
  // OTP Countdown
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return <Typography {...typographyProps}>00:{counter}</Typography>;
};

export default Counter;

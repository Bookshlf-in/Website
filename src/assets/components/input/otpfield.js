import { useState } from "react";
import { Stack, Typography, Button } from "@mui/material";
import { Alert, CircularProgress } from "@mui/material";
import OtpInput from "react-otp-input";
import Counter from "../../counter";
import { handelSendOtp } from "../../../service/auth/signup";

const OtpField = ({ otp, setOtp, otpLength = 6, email }) => {
  const [counter, setCounter] = useState(60);
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setLoading(true);
    const response = await handelSendOtp({ email: email });
    setCounter(60);
    if (response.success) {
    } else handleOtpSendError();
    setLoading(false);
  };

  const handleOtpSendError = () => {};

  return (
    <Stack className="bookshlf-otp-container" direction="row">
      <Typography className="bookshlf-otp-label">Enter OTP</Typography>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={otpLength}
        renderInput={(props) => (
          <input {...props} className="bookshlf-otp-input" />
        )}
      />
      {counter > 0 ? (
        <Counter counter={counter} setCounter={setCounter} />
      ) : (
        <Button
          size="small"
          className="otp-send-btn"
          disabled={loading}
          endIcon={loading && <CircularProgress size={12} color="inherit" />}
          onClick={sendOtp}
        >
          Send OTP
        </Button>
      )}
      {counter > 0 && <Alert className="otp-send-alert"> OTP Sent</Alert>}
    </Stack>
  );
};

export default OtpField;

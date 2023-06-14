import { useState } from "react";
import { Stack, Typography, Button } from "@mui/material";
import { Alert, CircularProgress } from "@mui/material";
import OtpInput from "react-otp-input";
import Counter from "../../counter";
import { handelSendOtp } from "../../../service/auth/signup";

const OtpField = ({
  otp,
  setOtp,
  otpLength = 6,
  email,
  time = 60,
  type = "EMAIL_VERIFICATION",
}) => {
  const [counter, setCounter] = useState(time);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    msg: "OTP Sent",
  });

  const hideAlert = () => {
    setTimeout(() => {
      setAlert({ show: false, type: "success", msg: "OTP Sent" });
    }, 60000);
  };

  const sendOtp = async () => {
    setLoading(true);
    const response = await handelSendOtp(type, { email: email });
    if (response.success) {
      setAlert({ show: true, type: "success", msg: "OTP Sent" });
      setCounter(60);
      hideAlert();
    } else {
      handleOtpSendError(
        response.data.errors
          ? response.data.errors[0].error
          : response.data.error
      );
    }
    setLoading(false);
  };

  const handleOtpSendError = (error) => {
    setAlert({ show: true, type: "error", msg: error });
  };

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
      {alert.show && (
        <Alert className="otp-send-alert" severity={alert.type}>
          {alert.msg}
        </Alert>
      )}
    </Stack>
  );
};

export default OtpField;

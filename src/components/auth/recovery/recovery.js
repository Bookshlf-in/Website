import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./recovery.css";

// Components
import { Stack, Alert, Typography } from "@mui/material";
import Container from "../../../assets/components/container";
import Textfield from "../../../assets/components/input/textfield";
import Passwordfield from "../../../assets/components/input/passwordfield";
import LoadingButton from "../../../assets/components/buttons/loadingbutton";
import Link from "../../../assets/components/links/link";
import OtpField from "../../../assets/components/input/otpfield";

// services
import { handleResetPassword } from "../../../service/auth/recovery";

const ForgotPassword = () => {
  const navigate = useNavigate();

  // Functionality States
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    msg: "OTP Sent",
  });

  // data states
  const [Otp, setOtp] = useState("");
  const [params, setParams] = useState({
    email: "",
    password: "",
    newPassword: "",
  });

  // checking if both input passwords are matching
  const handleVerifyPassword = (password, verifyPassword) => {
    return password === verifyPassword;
  };

  const setDefault = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    if (e.target.name === "password")
      setPasswordMatch(
        handleVerifyPassword(e.target.value, params.newPassword)
      );
    else if (e.target.name === "newPassword")
      setPasswordMatch(handleVerifyPassword(params.password, e.target.value));

    if (e.target.value === "") {
      setDefault();
    }
  };

  const hideAlert = () => {
    setTimeout(() => {
      setAlert({ show: false, type: "success", msg: "" });
    }, 6000);
  };

  const handleUpdatePassword = async () => {
    setLoading(true);
    const requestBody = {
      email: params.email,
      otp: Otp,
      password: params.password,
    };
    const response = await handleResetPassword(requestBody);
    if (response.success) {
      setAlert({
        show: true,
        type: "success",
        msg: response.data.msg + " | Login with new password!",
      });
      setTimeout(() => {
        navigate(`/auth/login/${params.email}`);
      }, 4000);
    } else handleUpdatePasswordError(response.data.errors);
    setLoading(false);
    hideAlert();
  };

  const handleUpdatePasswordError = (errors) => {
    errors.map((error) => {
      if (error.param === "email") {
        setEmailError(error.error);
      } else if (error.param === "password") {
        setPasswordError(error.error);
      } else if (error.param === "otp") {
        setAlert({
          show: true,
          type: "error",
          msg: error.error,
        });
      }
      return error;
    });
  };

  return (
    <Container title="Bookshlf | SignUp">
      <Typography variant="h2" mb={8} className="auth-title">
        Account Recovery
      </Typography>
      <Stack className="auth-container">
        <Stack spacing={4} mb={8} alignItems="center">
          <Textfield
            name="email"
            label="Email"
            placeholder="eg: abc@gmail.com"
            fullWidth
            value={params.email}
            onChange={handleChange}
            error={emailError.length > 0}
            helperText={emailError}
          />
          <OtpField
            otp={Otp}
            setOtp={setOtp}
            time={0}
            email={params.email}
            type="PASSWORD_RESET"
          />
          <Passwordfield
            name="password"
            label="Password"
            placeholder="eg: ****"
            fullWidth
            value={params.password}
            onChange={handleChange}
            error={passwordError.length > 0}
            helperText={passwordError}
          />
          <Passwordfield
            name="newPassword"
            label="New Password"
            placeholder="eg: ****"
            fullWidth
            value={params.newPassword}
            onChange={handleChange}
          />
          {alert.show && <Alert severity={alert.type}>{alert.msg}</Alert>}
          <LoadingButton
            fullWidth
            size={12}
            onClick={handleUpdatePassword}
            loading={loading}
            disabled={!passwordMatch}
          >
            Update Password
          </LoadingButton>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          className="login-links"
        >
          <Link path="/auth/login" name="Already Registered, Login Instead ?" />
          <Link path="/auth/recovery" name="Recover Account ?" />
        </Stack>
      </Stack>
    </Container>
  );
};
export default ForgotPassword;

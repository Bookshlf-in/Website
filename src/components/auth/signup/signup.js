import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./signup.css";

// Components
import { Stack, Typography } from "@mui/material";
import Container from "../../../assets/components/container";
import Textfield from "../../../assets/components/input/textfield";
import Passwordfield from "../../../assets/components/input/passwordfield";
import LoadingButton from "../../../assets/components/buttons/loadingbutton";
import Link from "../../../assets/components/links/link";

// service
import { handelSignup, handelSendOtp } from "../../../service/auth/signup";

const UserSignup = () => {
  const navigate = useNavigate();
  const routeParams = useParams();

  // Function States
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [passwordMatch, setpasswordMatch] = useState(false);
  const [signupLoad, setSignupLoad] = useState(false);

  // Data States
  const [params, setParams] = useState({
    firstName: "",
    lastName: "",
    email: routeParams.email ? routeParams.email : "",
    password: "",
    confirmPassword: "",
  });

  const setDefault = () => {
    setEmailError(false);
    setNameError(false);
    setPasswordError(false);
    setNameErrorMsg("");
    setEmailErrorMsg("");
    setPasswordErrorMsg("");
  };

  // checking if both input passwords are matching
  const handleVerifyPassword = (password, verifyPassword) => {
    return password === verifyPassword;
  };

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    if (e.target.name === "password")
      setpasswordMatch(
        handleVerifyPassword(e.target.value, params.confirmPassword)
      );
    else if (e.target.name === "confirmPassword")
      setpasswordMatch(handleVerifyPassword(params.password, e.target.value));

    if (e.target.value === "") {
      setDefault();
    }
  };

  // handeling sign up
  const handelRegister = async () => {
    setSignupLoad(true);
    setDefault();
    const modifiedParams = {
      name: params.firstName.trim() + " " + params.lastName.trim(),
      email: params.email.trim(),
      password: params.password.trim(),
    };
    const response = await handelSignup(modifiedParams);
    if (response.success) {
      const sendOtp = await handelSendOtp({ email: params.email });
      if (sendOtp.success) {
        navigate(`/auth/verify/${params.email}`);
      }
    } else handelSignupErrors(response.data.errors);
    setSignupLoad(false);
  };

  // handeling signup Errors
  const handelSignupErrors = (errors) => {
    errors.map((error) => {
      if (error.param === "password") {
        setPasswordError(true);
        setPasswordErrorMsg(error.error);
      }
      if (error.param === "email") {
        setEmailError(true);
        setEmailErrorMsg(error.error);
      }
      if (error.param === "name") {
        setNameError(true);
        setNameErrorMsg(error.error);
      }
      return error;
    });
  };

  return (
    <Container title="Bookshlf | SignUp">
      <Typography variant="h2" mb={8} className="auth-title">
        Sign up
      </Typography>
      <Stack className="auth-container">
        <Stack spacing={4} mb={8} alignItems="center">
          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <Textfield
              name="firstName"
              label="First Name"
              placeholder="eg: John"
              fullWidth
              value={params.firstName}
              onChange={handleChange}
              error={nameError}
              helperText={nameErrorMsg}
            />
            <Textfield
              name="lastName"
              label="Last Name"
              placeholder="eg: Doe"
              fullWidth
              value={params.lastName}
              onChange={handleChange}
            />
          </Stack>
          <Textfield
            name="email"
            label="Email"
            placeholder="eg: abc@gmail.com"
            fullWidth
            value={params.email}
            onChange={handleChange}
            error={emailError}
            helperText={emailErrorMsg}
          />
          <Passwordfield
            name="password"
            label="Password"
            placeholder="eg: ****"
            fullWidth
            value={params.password}
            onChange={handleChange}
            error={passwordError}
            helperText={passwordErrorMsg}
          />
          <Passwordfield
            name="confirmPassword"
            label="Confirm Password"
            placeholder="eg: ****"
            fullWidth
            value={params.confirmPassword}
            onChange={handleChange}
          />
          <LoadingButton
            fullWidth
            size={12}
            onClick={handelRegister}
            loading={signupLoad}
            disabled={!passwordMatch}
          >
            Register
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

export default UserSignup;

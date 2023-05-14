import { React, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import "./auth.css";

// Components
import { Stack, Typography } from "@mui/material";
import Container from "../../assets/components/container";
import Textfield from "../../assets/components/input/textfield";
import Passwordfield from "../../assets/components/input/passwordfield";
import LoadingButton from "../../assets/components/buttons/loadingbutton";
import Link from "../../assets/components/links/link";

// services
import { handleLogin } from "../../service/auth/login";

const Login = () => {
  const navigate = useNavigate();
  const routeParams = useParams();

  // context states
  const [, setUser] = useContext(UserContext);

  // Functionality States
  const [loading, setLoading] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [emailerrorMsg, setemailerrorMsg] = useState("");
  const [passworderrorMsg, setpassworderrorMsg] = useState("");

  const setDefault = () => {
    setemailError(false);
    setemailerrorMsg("");
    setpasswordError(false);
    setpassworderrorMsg("");
  };

  // data states
  const [params, setParams] = useState({
    email: routeParams?.email,
    password: "",
  });

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    if (e.target.value === "") {
      setDefault();
    }
  };

  // handeling Login
  const tryLogin = async () => {
    setLoading(true);
    setDefault();
    const response = await handleLogin(params);
    if (response.success) {
      setUser({
        authHeader: `Bearer ${response.data.token}`,
        roles: response.data.roles,
        email: params.email,
        cartitems: 0,
        wishlist: 0,
        balance: 0,
      });
      navigate("/");
    } else handleLoginError(response.data.errors);
    setLoading(false);
  };

  const handleLoginError = (errors) => {
    errors.map((error) => {
      if (error.param === "email") {
        setemailError(true);
        setemailerrorMsg(error.error);
      }
      if (error.param === "password") {
        setpasswordError(true);
        setpassworderrorMsg(error.error);
      }
      return error;
    });
  };

  return (
    <Container title="Bookshlf | Login">
      <Typography variant="h2" mb={8} className="auth-title">
        Login
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
            error={emailError}
            helperText={emailerrorMsg}
          />
          <Passwordfield
            name="password"
            label="Password"
            placeholder="eg: ****"
            fullWidth
            value={params.password}
            onChange={handleChange}
            error={passwordError}
            helperText={passworderrorMsg}
          />
          <LoadingButton
            fullWidth
            size={12}
            onClick={tryLogin}
            loading={loading}
          >
            Login
          </LoadingButton>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          className="login-links"
        >
          <Link path="/auth/signup" name="Don't have an account ?" />
          <Link path="/auth/recovery" name="Forgot Password ?" />
        </Stack>
      </Stack>
    </Container>
  );
};
export default Login;

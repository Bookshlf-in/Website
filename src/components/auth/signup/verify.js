import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as EmailValidator from "email-validator";

// Components
import { Stack, Typography, Alert } from "@mui/material";

import Container from "../../../assets/components/container";
import Textfield from "../../../assets/components/input/textfield";
import LoadingButton from "../../../assets/components/buttons/loadingbutton";
import Link from "../../../assets/components/links/link";
import OtpField from "../../../assets/components/input/otpfield";

// services
import { handleVerify } from "../../../service/auth/signup";

const Verify = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [Otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      params.email === undefined ||
      params.email === "" ||
      !EmailValidator.validate(params.email)
    )
      navigate("/auth/signup");
  }, []);

  const handleVerifyEmail = async () => {
    setLoading(true);
    const response = await handleVerify({ email: params.email, otp: Otp });
    if (response.success) {
      navigate(`/auth/login/${params.email}`);
    } else handleVerifyEmailError(response.data.errors);
    setLoading(false);
  };

  const handleVerifyEmailError = (errors) => {};
  return (
    <Container title="Account Verification | Bookshlf">
      <Typography variant="h2" mb={8} className="auth-title">
        Account Verification
      </Typography>
      <Stack className="auth-container">
        <Stack spacing={4} mb={8} alignItems="center">
          <Textfield
            name="email"
            label="Email"
            placeholder="eg: abc@gmail.com"
            fullWidth
            disabled
            value={params.email}
          />
          <Alert severity="info">
            Didn't Recieve OTP ? Check You Mail Spam!
          </Alert>
          <OtpField otp={Otp} setOtp={setOtp} />
          <LoadingButton
            fullWidth
            size={12}
            loading={loading}
            onClick={handleVerifyEmail}
          >
            Verify
          </LoadingButton>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          className="login-links"
        >
          <Link path="/auth/login" name="Something Wrong, Signup Again ?" />
          <Link path="/auth/recovery" name="Recover Account ?" />
        </Stack>
      </Stack>
    </Container>
  );
};
export default Verify;

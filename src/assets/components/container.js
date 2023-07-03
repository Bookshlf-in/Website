import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Stack } from "@mui/material";
import "./base.css";

import PageLoader from "./pageloader";

const Container = ({
  title,
  children,
  isAutherized = true,
  loading = false,
  redirect = true,
}) => {
  const navigate = useNavigate();
  if (!isAutherized) {
    navigate("/auth/login");
  }
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Stack className="container">{loading ? <PageLoader /> : children}</Stack>
    </>
  );
};

export default Container;

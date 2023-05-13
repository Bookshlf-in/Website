import { Helmet } from "react-helmet-async";
import { Stack } from "@mui/material";
import "./base.css";

const Container = ({ title, children }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Stack className="container">{children}</Stack>
    </>
  );
};

export default Container;

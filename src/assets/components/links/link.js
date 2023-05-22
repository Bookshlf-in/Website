import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
const BaseLink = ({ path, isExternal = false, name }) => {
  return (
    <Link
      to={isExternal ? { pathname: path } : path}
      target={isExternal ? "_blank" : "_self"}
    >
      <Typography className="base-link">{name}</Typography>
    </Link>
  );
};

export default BaseLink;

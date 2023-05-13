import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const InputPasswordField = (props) => {
  const [show, setShow] = useState(false);

  return (
    <TextField
      type={show ? "text" : "password"}
      className="bookshlf-input"
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size="small" onClick={() => setShow((prev) => !prev)}>
              {show ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputPasswordField;

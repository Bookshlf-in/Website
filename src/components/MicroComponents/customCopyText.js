import { React, useState } from "react";

import { Stack, Tooltip, Typography } from "@mui/material";

// MUI Icons
import CopyIcon from "@mui/icons-material/ContentCopy";
import CopiedIcon from "@mui/icons-material/FileCopy";

const CopyableText = (props) => {
  const [copied, setcopied] = useState(false);

  const CopyText = () => {
    navigator.clipboard.writeText(props.text);
    setcopied(true);
    setTimeout(() => {
      setcopied(false);
    }, 3000);
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        cursor: "pointer",
        padding: "5px",
        borderRadius: "5px",
        border: "1px solid rgba(0,0,0,0.2)",
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Typography
        variant="caption"
        color={copied ? "primary" : "default"}
        sx={{ fontSize: props.fontSize ? props.fontSize : "9px" }}
      >
        {props.text}
      </Typography>
      <Tooltip
        arrow
        title="Click to Copy"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="caption" onClick={CopyText}>
          {!copied ? (
            <CopyIcon color="inhert" sx={{ height: 12, width: 12 }} />
          ) : (
            <CopiedIcon color="inhert" sx={{ height: 12, width: 12 }} />
          )}
        </Typography>
      </Tooltip>

      {copied ? (
        <Typography sx={{ fontSize: "8px" }} color="primary">
          Copied!
        </Typography>
      ) : null}
    </Stack>
  );
};

export default CopyableText;

import { React, useState } from "react";

import { Stack, Tooltip, Typography } from "@mui/material";

// MUI Icons
import CopyIcon from "@mui/icons-material/ContentCopy";
import CopiedIcon from "@mui/icons-material/Check";

const CopyableText = ({ text, fontSize }) => {
  const [copied, setcopied] = useState(false);

  const CopyText = () => {
    navigator.clipboard.writeText(text);
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
        border: copied ? "1px solid #2e7d32" : "1px solid rgba(0,0,0,0.2)",
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Typography
        variant="caption"
        color={copied ? "primary" : "default"}
        sx={{ fontSize: fontSize ? fontSize : "9px", flexGrow: 1 }}
      >
        {text}
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
            <CopyIcon sx={{ fontSize: "10px" }} />
          ) : (
            <CopiedIcon sx={{ fontSize: "10px" }} color="success" />
          )}
        </Typography>
      </Tooltip>
    </Stack>
  );
};

export default CopyableText;

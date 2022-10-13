// MUI Components
import { Button } from "@mui/material";

// MUI Icons
import EditIcon from "@mui/icons-material/Edit";
const ComposeMail = ({ value, type, emailData }) => {
  return (
    <Button
      className="admin-ComposeMailBtn"
      variant="contained"
      color="primary"
      startIcon={<EditIcon />}
    >
      {value}
    </Button>
  );
};

export default ComposeMail;

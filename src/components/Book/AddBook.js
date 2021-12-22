import { React, useState, useContext } from "react";
import "./AddBook.css";
import axios from "../../axios";
import { Link, useHistory } from "react-router-dom";
import { AddFormContext } from "../../Context/formContext";
import { storage } from "../../firebase";
import { nanoid } from "nanoid";

// form components
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Chip from "@material-ui/core/Chip"; // for book-tag
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Collapse from "@material-ui/core/Collapse";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CancelIcon from "@material-ui/icons/CancelTwoTone";
import Fab from "@mui/material/Fab";

// Icons
import CloseIcon from "@material-ui/icons/ArrowDropUpRounded";
import OpenIcon from "@material-ui/icons/ArrowDropDownRounded";
import BookIcon from "@material-ui/icons/MenuBookRounded";
import BookDescIcon from "@material-ui/icons/DescriptionRounded";
import BookQtyIcon from "@material-ui/icons/InboxRounded";
import PriceIcon from "@material-ui/icons/MonetizationOn";
import AddressIcon from "@material-ui/icons/ContactsRounded";
import TagIcon from "@material-ui/icons/LocalOfferRounded";
import CameraIcon from "@material-ui/icons/AddAPhotoRounded";
import SendIcon from "@material-ui/icons/SendRounded";
import AddIcon from "@material-ui/icons/Add";
import EditionIcon from "@material-ui/icons/Timelapse";
import AuthorIcon from "@material-ui/icons/Person";
import WeightIcon from "@material-ui/icons/FitnessCenter";
import LanguageIcon from "@material-ui/icons/Translate";
import ISBNIcon from "@material-ui/icons/Language";
import YouTubeIcon from "@material-ui/icons/YouTube";

const AddBook = (props) => {
  const history = useHistory();
  const [addForm, setAddForm] = useContext(AddFormContext);

  const [checked, setChecked] = useState(false);
  const [collapse, setcollapse] = useState(false);
  const [sending, setSending] = useState(false);

  const [Adr, setAdr] = useState(null);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  const handleTagDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <div className="add-book-bg">
      <Grid container spacing={2} style={{ padding: "10px" }}>
        <Grid item xs={12} lg={8} md={12} sm={12}>
          <form className="add-book-form-lf">
            <fieldset>
              <legend>Add New Book</legend>
              <Stack spacing={2}>
                <TextField
                  id="add-book-textfield"
                  label="Book Title"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BookIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
                <TextField
                  id="add-book-textfield"
                  label="Book Details"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BookDescIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  multiline
                  maxRows={3}
                  helperText="About the book such as Year of purchase, quality etc"
                />
                <Stack
                  direction={{ xs: "column", sm: "row", lg: "row", md: "row" }}
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                  justifyContent="space-between"
                >
                  <TextField
                    id="add-book-textfield"
                    label="Book Quantity"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BookQtyIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    id="add-book-textfield"
                    label="Book Selling Price"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PriceIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    select
                    label="Pickup Address"
                    value={Adr}
                    onChange={(e) => {
                      setAdr(e.target.value);
                      if (e.target.value === "NEWADR") {
                        history.push("/SellerPanel/3");
                      }
                    }}
                    helperText="Please select your address for Book Pickup"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AddressIcon />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {props.address.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.address + ", " + option.zipCode}
                      </MenuItem>
                    ))}
                    {
                      <MenuItem key={"NEWADR"} value={"NEWADR"}>
                        {"Add New Address"}
                      </MenuItem>
                    }
                  </TextField>
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row", lg: "row", md: "row" }}
                  spacing={2}
                >
                  <TextField
                    id="add-book-textfield"
                    label="Book Tags"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TagIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                      lg: "row",
                      md: "row",
                    }}
                    spacing={0.5}
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Chip
                      label="JEE Mains"
                      onDelete={handleTagDelete}
                      color="primary"
                      size="small"
                    />
                    <Chip
                      label="JEE Mains"
                      onDelete={handleTagDelete}
                      color="primary"
                      size="small"
                    />
                  </Stack>
                </Stack>
                <Stack
                  direction="column"
                  spacing={1}
                  alignItems="flex-start"
                  justifyContent="flex-start"
                >
                  <div style={{ display: "flex" }}>
                    <label htmlFor="icon-button-file">
                      <input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        style={{ display: "none" }}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <CameraIcon />
                      </IconButton>
                    </label>
                    <Alert severity="info">
                      Please Upload Atleast 3 Clear Images of Book
                    </Alert>
                  </div>
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                      lg: "row",
                      md: "row",
                    }}
                    spacing={1}
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <div className="uploaded-image-item">
                      <span className="image-delete">
                        <CancelIcon />
                      </span>
                      <Avatar
                        alt="Sample Book"
                        src="/images/book1.jpg"
                        sx={{ width: 150, height: 150 }}
                        variant="square"
                      />
                    </div>
                    <Fab color="primary" aria-label="add">
                      <AddIcon />
                    </Fab>
                  </Stack>
                </Stack>
              </Stack>
            </fieldset>
          </form>
        </Grid>
        <Grid item xs={12} lg={4} md={12} sm={12} style={{ padding: "10px" }}>
          <Tooltip
            title="Fill Extra Details about book. However these fields are not Necessary"
            arrow
          >
            <Button
              variant="contained"
              color="secondary"
              endIcon={collapse ? <CloseIcon /> : <OpenIcon />}
              onClick={() => setcollapse(!collapse)}
              fullWidth
              style={{
                margin: "30px 0px",
                fontFamily: "PT sans",
                fontSize: "12px",
                letterSpacing: "1px",
              }}
            >
              More Details
            </Button>
          </Tooltip>

          <Collapse in={collapse}>
            <form className="add-book-form-rt">
              <Stack spacing={2}>
                <Stack
                  direction={{ xs: "column", sm: "row", lg: "row", md: "row" }}
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                  justifyContent="space-between"
                >
                  <TextField
                    id="add-book-textfield"
                    label="Book MRP"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PriceIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    id="add-book-textfield"
                    label="Book Edition Year"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EditionIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row", lg: "row", md: "row" }}
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                  justifyContent="space-between"
                >
                  <TextField
                    id="add-book-textfield"
                    label="Book Author"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AuthorIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    id="add-book-textfield"
                    label="Book Weight in Grams"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WeightIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row", lg: "row", md: "row" }}
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                  justifyContent="space-between"
                >
                  <TextField
                    id="add-book-textfield"
                    label="Book Language"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LanguageIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    id="add-book-textfield"
                    label="Book ISBN Number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ISBNIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                </Stack>
                <TextField
                  id="add-book-textfield"
                  label="Embed Youtube Video Link of Book"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <YouTubeIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  multiline
                  maxRows={3}
                  helperText="Make a video of book and Upload it to Youtube and share the video's embed Link"
                />
              </Stack>
            </form>
          </Collapse>
        </Grid>
        <Grid
          item
          xs={12}
          lg={12}
          md={12}
          sm={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Checkbox
            checked={checked}
            onChange={() => {
              setChecked(!checked);
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
          <b style={{ fontFamily: "pt sans" }}>I agree to Terms & Conditions</b>
        </Grid>
        <Grid
          item
          xs={12}
          lg={12}
          md={12}
          sm={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingButton
            onClick={() => setSending(!sending)}
            endIcon={<SendIcon />}
            loading={sending}
            loadingPosition="end"
            variant="contained"
            style={{
              fontFamily: "PT sans",
              fontSize: "12px",
              letterSpacing: "1px",
            }}
          >
            Submit For Review
          </LoadingButton>
        </Grid>
      </Grid>
    </div>
  );
};
export default AddBook;

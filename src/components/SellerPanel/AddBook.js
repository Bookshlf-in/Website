import React from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

function AddBook() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div className="add-book-bg">
      <h1 className="neonText"> ADD NEW BOOK </h1>
      <form action="" className="add-book-form" autoComplete="off">
        <div className="add-book-field1">
          <span>
            <i class="fas fa-book"></i>
          </span>
          <input type="text" placeholder="Book Full Name" required />
        </div>
        <div className="add-book-field1">
          <span>
            <i class="fas fa-atlas"></i>
          </span>
          <input
            type="number"
            placeholder="Book ISBN Number"
            maxLength="14"
            required
          />
        </div>
        <div className="add-book-field2">
          <span>
            <i className="fas fa-rupee-sign"></i>
          </span>
          <input type="text" placeholder="Selling Price" required />
          <input type="text" placeholder="M.R.P" required />
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fas fa-envelope" />
          </span>
          <input type="mail" placeholder="Email" required />
        </div>
        <div className="add-book-field2">
          <span>
            <i class="fas fa-mobile-alt"></i>
          </span>
          <input type="text" placeholder="Phone Number" required />
          <input type="text" placeholder="Alternate Phone Number" />
        </div>
        <div className="add-book-field1">
          <span>
            <i class="fas fa-info"></i>
          </span>
          <input type="text" placeholder="Book Details" required />
        </div>
        <div className="add-book-field2">
          <span>
            <i class="fas fa-weight"></i>
          </span>
          <input type="text" placeholder="Weight (if possible)" />
          <input type="text" placeholder="Total Pages (if possible)" />
        </div>
        <div className="add-book-field1">
          <span>
            <i class="fab fa-etsy"></i>
          </span>
          <input type="text" placeholder="Book Edition" required />
        </div>
        <div className={classes.root}>
          <input
            accept="image/*"
            className={classes.input}
            id="upload-button-file"
            multiple
            type="file"
          />
          <label htmlFor="upload-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              style={{fontFamily: "PT Sans", fontWeight: "bold"}}
            >
              Upload (3 Images Atleast)
            </Button>
          </label>
        </div>
        <div>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{"aria-label": "primary checkbox"}}
          />
          <span style={{fontFamily: "PT Sans", fontWeight: "bold"}}>
            {" "}
            I agree to Terms and Conditions
          </span>
        </div>
        <div>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
            style={{fontFamily: "PT Sans", fontWeight: "bold"}}
          >
            Submit For Review
          </Button>
        </div>
      </form>
    </div>
  );
}
export default AddBook;

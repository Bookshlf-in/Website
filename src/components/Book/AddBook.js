import { React, useState, useContext } from "react";
import "./AddBook.css";
import { Link, useHistory } from "react-router-dom";
import { AddFormContext } from "../../Context/formContext";
import { storage } from "../../firebase";
import { nanoid } from "nanoid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "../../axios";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Chip from "@material-ui/core/Chip"; // for book-tag
import TextField from "@mui/material/TextField";

const AddBook = (props) => {

  const history = useHistory();
  const [addForm, setAddForm] = useContext(AddFormContext);

  return (
    <div className="add-book-bg">
      <h1> ADD NEW BOOK </h1>
    </div>
  );
};
export default AddBook;

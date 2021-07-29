import {React, useState} from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import axios from "../../axios";
import Alert from "@material-ui/lab/Alert";

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

function UpdateBook(props) {
  const classes = useStyles();

  // book Details states
  const [bookName, setbookName] = useState(props.book.title);
  const [bookISBN, setbookISBN] = useState(props.book.ISBN);
  const [SP, setSP] = useState(props.book.price);
  const [MRP, setMRP] = useState(props.book.MRP);
  const [bookDesc, setbookDesc] = useState(props.book.description);
  const [Weight, setWeight] = useState(props.book.weightInGrams);
  const [Edition, setEdition] = useState(props.book.editionYear);
  const [author, setAuthor] = useState(props.book.author);
  const [tags, setTags] = useState(props.book.tags);
  const [tag, settag] = useState("");
  const [lang, setlang] = useState(props.book.language);
  const [load, setload] = useState(false);
  const [alert, setalert] = useState({
    show: false,
    type: "",
    msg: "",
  });

  const Initialize = () => {
    setbookName("");
    setbookISBN("");
    setSP("");
    setMRP("");
    setbookDesc("");
    setWeight("");
    setEdition("");
    setAuthor("");
    setTags([]);
    settag("");
    setload(false);
    setalert({
      show: false,
      type: "",
      msg: "",
    });
  };

  const handleDelete = (e) => {
    setTags(tags.filter((tag) => e.target.innerHTML !== tag));
  };

  const PushDetails = () => {
    axios
      .post("/admin-updateBookDetails", {
        bookId: props.book._id,
        title: bookName,
        MRP: Number(MRP),
        price: Number(SP),
        editionYear: Number(Edition),
        author: author,
        ISBN: bookISBN,
        language: lang,
        pickupAddressId: props.pickupAddressId,
        description: bookDesc,
        photos: props.photos,
        weightInGrams: Number(Weight),
        embedVideo: props.embedVideo,
        tags: tags,
        qty: props.qty,
      })
      .then((response) => {
        setload(false);
        setalert({
          show: true,
          type: "success",
          msg: response.data.msg,
        });
        setTimeout(() => {
          Initialize();
        }, 5000);
      })
      .catch((error) => {
        setload(false);
        setalert({
          show: true,
          type: "error",
          msg: " Please Try Again!",
        });
      });
  };

  return (
    <div className="update-book-bg">
      <h1> UPDATE BOOK DETAILS</h1>
      <form
        action=""
        className="add-book-form"
        autoComplete="off"
        style={{backgroundColor: "rgb(0,0,0)"}}
      >
        <div className="add-book-field1">
          <span>
            <i className="fas fa-book"></i>
          </span>
          <input
            type="text"
            placeholder="Book Full Name"
            onChange={(e) => setbookName(e.target.value)}
            value={bookName}
          />
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fas fa-atlas"></i>
          </span>
          <input
            type="text"
            placeholder="Book ISBN Number"
            onChange={(e) => setbookISBN(e.target.value)}
            value={bookISBN}
          />
        </div>
        <div className="add-book-field2">
          <span>
            <i className="fas fa-rupee-sign"></i>
          </span>
          <input
            type="number"
            placeholder="Selling Price"
            onChange={(e) => setSP(e.target.value)}
            value={SP}
          />
          <input
            type="number"
            placeholder="M.R.P"
            onChange={(e) => setMRP(e.target.value)}
            value={MRP}
          />
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fas fa-info"></i>
          </span>
          <input
            type="text"
            placeholder="Book Details"
            onChange={(e) => setbookDesc(e.target.value)}
            value={bookDesc}
          />
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fas fa-weight"></i>
          </span>
          <input
            type="number"
            placeholder="Weight in grams(if possible)"
            onChange={(e) => setWeight(e.target.value)}
            value={Weight}
          />
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fab fa-etsy"></i>
          </span>
          <input
            type="number"
            placeholder="Book Edition (Year)"
            onChange={(e) => setEdition(e.target.value)}
            value={Edition}
          />
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fas fa-user-edit" />
          </span>
          <input
            type="text"
            placeholder="Book Author"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </div>

        <div className="add-book-field1">
          <span>
            <i className="fas fa-language" />
          </span>
          <input
            type="text"
            placeholder="Language"
            onChange={(e) => setlang(e.target.value)}
            value={lang}
          />
        </div>
        <div className="add-book-field1" style={{display: "block"}}>
          <div className="book-tags" id="add-book-tag">
            {tags.length > 0 ? (
              <>
                {tags.map((name) => (
                  <Link
                    className="tag"
                    onClick={(e) => {
                      handleDelete(e);
                    }}
                  >
                    {name}
                  </Link>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
          <div style={{display: "flex"}}>
            <input
              type="text"
              placeholder="Add Book Tags"
              onChange={(e) => settag(e.target.value)}
              value={tag}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  let memo = tags;
                  memo.push(tag);
                  setTags(memo);
                  settag("");
                }
              }}
            />
            <span
              style={{cursor: "pointer"}}
              onClick={() => {
                let memo = tags;
                memo.push(tag);
                setTags(memo);
                settag("");
              }}
            >
              <i className="fas fa-plus-circle" />
            </span>
          </div>
        </div>

        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
            style={{fontFamily: "PT Sans", fontWeight: "bold"}}
            onClick={(e) => {
              e.preventDefault();
              PushDetails();
            }}
          >
            <i
              className="fas fa-circle-notch"
              style={{
                display: load ? "inline-block" : "none",
                animation: "spin 2s linear infinite",
              }}
            />
            &nbsp;Update Book
          </Button>
        </div>
        <div
          className={classes.root}
          style={{display: alert.show ? "flex" : "none"}}
        >
          <Alert
            variant="outlined"
            severity={alert.type}
            style={{
              fontFamily: "PT Sans",
              fontWeight: "bold",
              color: alert.type === "success" ? "yellowgreen" : "red",
              width: "500px",
            }}
          >
            {alert.msg}
          </Alert>
        </div>
      </form>
    </div>
  );
}
export default UpdateBook;

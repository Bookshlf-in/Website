import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import axios from "../../axios";

// Components
import { Stack, ClickAwayListener, Chip, Avatar, Alert } from "@mui/material";
import { TextField, MenuItem, InputAdornment } from "@mui/material";
import { LinearProgress, CircularProgress } from "@mui/material";
import { Typography, Tooltip } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// Icons
import TagIcon from "@mui/icons-material/LocalOfferRounded";
import SendIcon from "@mui/icons-material/SendRounded";
import CopyIcon from "@mui/icons-material/ContentCopy";
import CopiedIcon from "@mui/icons-material/FileCopy";

const useStyles = makeStyles({
  root: {
    fontFamily: "PT sans !important",
    "& p": {
      fontFamily: "PT sans !important",
    },
    "& label": {
      fontFamily: "PT sans !important",
    },
    "& input": {
      fontFamily: "PT sans !important",
      fontSize: "12px !important",
    },
    "& textarea": {
      fontFamily: "PT sans !important",
      fontSize: "12px !important",
    },
  },
});

const BookDetails = () => {
  // calling hooks
  const classes = useStyles();
  const bookId = useParams().bookId;

  // functionality States
  const [load, setload] = useState(true);
  const [book, setbook] = useState({});
  const [tagFieldChanges, settagFieldChanges] = useState(false);
  const [openTagMenu, setOpenTagMenu] = useState(false);
  const [updating, setupdating] = useState(false);
  const [alert, setalert] = useState({
    show: false,
    type: "info",
    msg: "",
  });

  // Add book form states
  const [bookName, setbookName] = useState("");
  const [bookISBN, setbookISBN] = useState("");
  const [SP, setSP] = useState("");
  const [mrp, setMrp] = useState("");
  const [bookDesc, setbookDesc] = useState("");
  const [Weight, setWeight] = useState("");
  const [Edition, setEdition] = useState("");
  const [Qnty, setQnty] = useState(1);
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState([]);
  const [resulttags, setresultTags] = useState([]);
  const [tag, setTag] = useState("");
  const [link, setlink] = useState("");
  const [lang, setlang] = useState("");

  // Loading Book Details
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("/admin-getBookDetails", {
          params: { bookId: bookId },
        })
        .then((response) => {
          setbook(response.data);
          setbookName(response.data.title);
          setbookDesc(response.data.description);
          setAuthor(response.data.author);
          setEdition(response.data.editionYear);
          setbookISBN(response.data.ISBN);
          setSP(response.data.price);
          setMrp(response.data.MRP);
          setQnty(response.data.qty);
          setlang(response.data.language);
          setWeight(response.data.weightInGrams);
          setlink(response.data.embedVideo);
          setTags(response.data.tags);
          setload(false);
        })
        .catch((error) => {});
    };
    fetchData();
  }, []);

  // tag searching on input
  const handelTagSearch = (e) => {
    settagFieldChanges(true);
    setTag(e.target.value);
    setOpenTagMenu(true);
    const fetchdata = async () => {
      axios
        .get("/searchTag", {
          params: {
            q: e.target.value,
          },
        })
        .then((response) => {
          setresultTags(response.data);
          settagFieldChanges(false);
        })
        .catch((error) => {});
    };
    fetchdata();
  };

  // Tag adding to Book Tags
  const handelTagAdd = (tagname) => {
    if (tagname !== "" && tagname !== undefined && tagname !== null) {
      setTags(tags.concat(tagname));
    }
    setOpenTagMenu(false);
    setTag("");
  };

  // Deleting Tags of Book
  const handleTagDelete = (tagname) => {
    setTags(tags.filter((tag) => tagname !== tag));
  };

  const UpdateBook = () => {
    setupdating(true);
    axios
      .post("/admin-updateBookDetails", {
        bookId: bookId,
        title: bookName,
        MRP: mrp,
        price: SP,
        editionYear: Edition,
        author: author,
        ISBN: bookISBN,
        language: lang,
        description: bookDesc,
        weightInGrams: Weight,
        embedVideo: link,
        tags: tags,
        qty: Qnty,
      })
      .then((response) => {
        // console.log(response.data);
        setupdating(false);
        setalert({
          show: true,
          msg: "Book Updated Successfully",
          type: "success",
        });
        setTimeout(() => {
          setalert({
            show: false,
            msg: "",
            type: "info",
          });
        }, 3000);
      })
      .catch((error) => {
        setupdating(false);
        // console.log(error.response.data);
      });
  };

  // Custom Copy Component
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
          sx={{ fontSize: "12px", fontFamily: "pt sans" }}
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
          <Typography sx={{ fontSize: "9px" }} color="primary">
            Copied!
          </Typography>
        ) : null}
      </Stack>
    );
  };

  return (
    <>
      {load ? (
        <LinearProgress sx={{ width: "100%" }} />
      ) : (
        <Stack
          direction="column"
          spacing={2}
          sx={{
            width: "100%",
            padding: "10px",
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <Stack direction="column" spacing={2}>
              {book ? (
                book.photos.map((link, i) => (
                  <Avatar
                    key={i}
                    src={link}
                    alt="book"
                    variant="rounded"
                    sx={{ width: "300px", height: "400px" }}
                  />
                ))
              ) : (
                <></>
              )}
            </Stack>
            <Stack
              direction="column"
              spacing={2}
              sx={{
                width: "100%",
                padding: "10px",
              }}
            >
              <Chip label={book.sellerName} className={classes.root} />
              <CopyableText text={book.sellerId} />
              <TextField
                label="Book Title"
                variant="standard"
                value={bookName}
                className={classes.root}
                onChange={(e) => setbookName(e.target.value)}
              />
              <TextField
                label="Book Description"
                variant="standard"
                multiline
                maxRows={3}
                value={bookDesc}
                className={classes.root}
                onChange={(e) => setbookDesc(e.target.value)}
              />
              <TextField
                label="Book Author"
                variant="standard"
                value={author}
                className={classes.root}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <TextField
                label="Book Edition"
                variant="standard"
                value={Edition}
                className={classes.root}
                onChange={(e) => setEdition(e.target.value)}
              />
              <TextField
                label="Book ISBN"
                variant="standard"
                value={bookISBN}
                className={classes.root}
                onChange={(e) => setbookISBN(e.target.value)}
              />
              <TextField
                label="Book Selling Price"
                variant="standard"
                value={SP}
                className={classes.root}
                onChange={(e) => setSP(e.target.value)}
              />
              <TextField
                label="Book MRP"
                variant="standard"
                value={mrp}
                className={classes.root}
                onChange={(e) => setMrp(e.target.value)}
              />
              <TextField
                label="Book Quantity"
                variant="standard"
                value={Qnty}
                className={classes.root}
                onChange={(e) => setQnty(e.target.value)}
              />
              <TextField
                label="Book Language"
                variant="standard"
                value={lang}
                className={classes.root}
                onChange={(e) => setlang(e.target.value)}
              />
              <TextField
                label="Book Weight in Grams"
                variant="standard"
                value={Weight}
                className={classes.root}
                onChange={(e) => setWeight(e.target.value)}
              />
              <div>
                <TextField
                  className={classes.root}
                  label="Book Tags"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TagIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {tagFieldChanges ? (
                          <CircularProgress
                            style={{
                              color: "rgba(0,0,0,0.6)",
                              height: "15px",
                              width: "15px",
                              marginRight: "15px",
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  value={tag}
                  onChange={(e) => handelTagSearch(e)}
                  helperText="Press Enter key to Add the Tag"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handelTagAdd(e.target.value);
                    }
                  }}
                  autoComplete="false"
                />
                <ClickAwayListener onClickAway={() => setOpenTagMenu(false)}>
                  {openTagMenu ? (
                    <div className="searchTagresult">
                      {resulttags.map((TAG, idx) => (
                        <MenuItem
                          id="result-tag"
                          title={TAG.tag}
                          key={idx}
                          value={TAG.tag}
                          onClick={() => handelTagAdd(TAG.tag)}
                        >
                          {TAG.tag}
                        </MenuItem>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </ClickAwayListener>
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
                flexWrap="wrap"
              >
                {tags.map((TAG, idx) => (
                  <Chip
                    label={TAG}
                    key={idx}
                    onDelete={() => handleTagDelete(TAG)}
                    color="primary"
                    size="small"
                    className={classes.root}
                  />
                ))}
              </Stack>

              <TextField
                label="Book Video Link (Youtube)"
                variant="standard"
                value={link}
                className={classes.root}
                onChange={(e) => setlink(e.target.value)}
              />

              <LoadingButton
                endIcon={<SendIcon />}
                loading={updating}
                loadingPosition="end"
                variant="contained"
                className={classes.root}
                onClick={UpdateBook}
              >
                Update Book
              </LoadingButton>

              {alert.show ? (
                <Alert severity={alert.type} className={classes.root}>
                  {alert.msg}
                </Alert>
              ) : null}
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
};
export default BookDetails;

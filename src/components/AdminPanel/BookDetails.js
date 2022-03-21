import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import axios from "../../axios";
import SellerProfile from "./SellerProfile";

// Components
import { Stack, ClickAwayListener, Chip, Alert } from "@mui/material";
import { TextField, MenuItem, InputAdornment, Button } from "@mui/material";
import { LinearProgress, CircularProgress } from "@mui/material";
import { Typography, Avatar, Collapse, IconButton } from "@mui/material";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { FormLabel, FormControl } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// Icons
import TagIcon from "@mui/icons-material/LocalOfferRounded";
import SendIcon from "@mui/icons-material/SendRounded";
import GoogleIcon from "@mui/icons-material/Google";

// FilePond Components for image Uploading
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const useStyles = makeStyles({
  root: {
    "& textarea": {
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
  const [showSellerDetails, setShowSellerDetails] = useState(false);
  const [showBookDetails, setShowBookDetails] = useState(false);
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
  const [avl, setAvl] = useState(true);
  const [Image, setImage] = useState([]);
  const [seller, setseller] = useState({});

  // Loading Book Details
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("/admin-getBookDetails", {
          params: { bookId: bookId },
        })
        .then((response) => {
          console.log(response.data);
          setbook(response.data);
          setbookName(response.data.title);
          setbookDesc(response.data?.description);
          setAuthor(response.data?.author);
          setEdition(
            response.data?.editionYear ? response.data.editionYear : ""
          );
          setbookISBN(response.data?.ISBN);
          setSP(response.data?.price);
          setMrp(response.data.MRP ? response.data.MRP : "");
          setQnty(response.data?.qty);
          setlang(response.data?.language);
          setWeight(
            response.data?.weightInGrams ? response.data.weightInGrams : ""
          );
          setlink(response.data?.embedVideo);
          setTags(response.data?.tags);
          setAvl(response.data.isAvailable);
          setImage(
            response.data.photos && !response.data.photos.includes(null)
              ? response.data.photos
              : []
          );
          axios
            .get("/admin-getSellerProfile", {
              params: { sellerId: response.data.sellerId },
            })
            .then((profile) => {
              setseller(profile.data);
              setload(false);
            })
            .catch((error) => {
              setload(false);
            });
        })
        .catch((error) => {
          setload(false);
        });
    };
    fetchData();
  }, [bookId]);

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

  const UpdateBook = async () => {
    setupdating(true);
    if (Image.length > book.photos.length) {
      if (validateSize()) {
        const urls = await uploadImages(Image);
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
            isAvailable: avl,
            photos: urls,
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
      }
    } else {
      const urls = await ReorderImages(Image);
      // console.log(urls);
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
          isAvailable: avl,
          photos: urls,
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
    }
  };

  // Image Size Validator
  const validateSize = () => {
    for (let i = 0; i < Image.length; i++) {
      const fileSize = Image[i].size / 1024 / 1024; // in MiB
      if (fileSize > 5) {
        return false;
      }
    }
    return true;
  };

  // uploading single image File
  const uploadSingleImage = async (img) => {
    const formData = new FormData();
    formData.append("folder", "sellingBooks");
    formData.append("file", img);

    const result = await axios({
      method: "post",
      url: "/uploadFile",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        return response.data.link;
      })
      .catch((error) => {
        // console.log(error.response.data);
      });

    return result;
  };

  // uploading All Images of Books
  const uploadImages = async (arrImg) => {
    return await Promise.all(
      arrImg.map(async (img) => {
        const imgUrl =
          typeof img.source !== "string"
            ? await uploadSingleImage(img.source)
            : img.source;
        return imgUrl;
      })
    );
  };

  // uploading All Images of Books
  const ReorderImages = async (arrImg) => {
    return await Promise.all(
      arrImg.map(async (img) => {
        const imgUrl = img.source;
        return imgUrl;
      })
    );
  };

  const GoogleSearchBookTitle = (props) => {
    const handelClick = () => {
      window
        .open("//" + "google.com/search?q=" + props.title, "_blank")
        .focus();
    };
    return (
      <IconButton size="small" color="error" onClick={handelClick}>
        <GoogleIcon />
      </IconButton>
    );
  };

  return (
    <>
      {load ? (
        <LinearProgress sx={{ width: "100%" }} />
      ) : (
        <Stack
          direction="column"
          spacing={1}
          sx={{
            width: "100%",
            padding: "10px",
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Stack direction="column" spacing={1}>
            <Typography variant="h5">Book Images</Typography>
            <Alert severity="info" color="error">
              <Typography variant="caption">
                Image At 1st Position will be used as main Image in Search
                Results and other places.
              </Typography>
              <br />
              <Typography variant="caption">
                Reorder Images by Dragging Them. Delete Any Existing Image by
                Clicking on close button over Image and Then update Book.
              </Typography>
              <br />
              <Typography variant="caption">
                If Accidently Closed an Image then just reload page. Don't Click
                on Update Book otherwise book will be lost permanently.
              </Typography>
              <br />
              <Typography variant="caption">
                <strong>
                  To Upload New Images or Add More Images Simply Click on Add
                  More Images and Add Images, then click update book.
                </strong>
              </Typography>
            </Alert>
            {/* ======================= Book Image Reorder======================== */}
            <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
              <FilePond
                acceptedFileTypes={["image/*"]}
                dropOnPage={true}
                dropValidation={true}
                allowReorder={true}
                allowMultiple={true}
                maxFiles={15}
                files={Image}
                onupdatefiles={(fileItems) => {
                  setImage(fileItems);
                }}
                onreorderfiles={(files, origin, target) => {
                  setImage(files);
                }}
                labelIdle='<span class="filepond--label-action">Add More Images</span>'
                credits={false}
                styleButtonRemoveItemPosition="right"
                imagePreviewHeight={250}
              />
              <Typography variant="body1">
                Click to get Enlarged Preview
              </Typography>
              <Stack direction="row" spacing={1}>
                {Image.map((link, i) => {
                  return (
                    <Link
                      key={i}
                      to={{ pathname: link.source }}
                      target="_blank"
                    >
                      <Avatar
                        src={link?.source}
                        alt={link?.file?.name}
                        variant="rounded"
                      />
                    </Link>
                  );
                })}
              </Stack>
            </Stack>

            {/* ============================================================== */}
            <Stack direction="column" spacing={1}>
              <Button
                onClick={() => setShowSellerDetails((prev) => !prev)}
                variant={showSellerDetails ? "contained" : "outlined"}
                color="primary"
              >
                {showSellerDetails ? "Hide" : "View"} Seller Details
              </Button>
              <Collapse in={showSellerDetails}>
                <SellerProfile data={seller} />
              </Collapse>
              <Button
                onClick={() => setShowBookDetails((prev) => !prev)}
                variant={showBookDetails ? "contained" : "outlined"}
                color="secondary"
              >
                {showBookDetails ? "Hide" : "View"} Book Details
              </Button>
              <Collapse in={showBookDetails}>
                <Stack spacing={2} sx={{ paddingTop: "10px" }}>
                  <TextField
                    label="Book Title"
                    variant="outlined"
                    value={bookName}
                    className={classes.root}
                    onChange={(e) => setbookName(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <GoogleSearchBookTitle title={bookName} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Book Description"
                    variant="outlined"
                    multiline
                    value={bookDesc}
                    className={classes.root}
                    onChange={(e) => setbookDesc(e.target.value)}
                  />
                  <Stack direction="row" spacing={2}>
                    <TextField
                      label="Book Selling Price"
                      variant="outlined"
                      value={SP}
                      className={classes.root}
                      onChange={(e) => setSP(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Book MRP"
                      variant="outlined"
                      value={mrp}
                      className={classes.root}
                      onChange={(e) => setMrp(e.target.value)}
                      fullWidth
                    />
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      label="Book Author"
                      variant="outlined"
                      value={author}
                      className={classes.root}
                      onChange={(e) => setAuthor(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Book Edition"
                      variant="outlined"
                      value={Edition}
                      className={classes.root}
                      onChange={(e) => setEdition(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Book ISBN"
                      variant="outlined"
                      value={bookISBN}
                      className={classes.root}
                      onChange={(e) => setbookISBN(e.target.value)}
                      fullWidth
                    />
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      label="Book Quantity"
                      variant="outlined"
                      value={Qnty}
                      className={classes.root}
                      onChange={(e) => setQnty(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Book Language"
                      variant="outlined"
                      value={lang}
                      className={classes.root}
                      onChange={(e) => setlang(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Book Weight in Grams"
                      variant="outlined"
                      value={Weight}
                      className={classes.root}
                      onChange={(e) => setWeight(e.target.value)}
                      fullWidth
                    />
                  </Stack>
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
                      variant="outlined"
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
                    <ClickAwayListener
                      onClickAway={() => setOpenTagMenu(false)}
                    >
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
                  <Stack direction="row" spacing={2}>
                    <FormControl size="small">
                      <FormLabel id="book-avl">Book Available</FormLabel>
                      <RadioGroup
                        aria-labelledby="book-avl"
                        name="book-avl"
                        value={avl}
                        onChange={(e) => setAvl(e.target.value)}
                        row
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio size="small" color="success" />}
                          label="Available"
                          sx={{
                            ".MuiFormControlLabel-label": {
                              fontSize: "12px",
                            },
                          }}
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio size="small" color="warning" />}
                          label="Not Available"
                          sx={{
                            ".MuiFormControlLabel-label": {
                              fontSize: "12px",
                            },
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                    <TextField
                      label="Book Video Link (Youtube)"
                      variant="outlined"
                      value={link}
                      className={classes.root}
                      onChange={(e) => setlink(e.target.value)}
                      fullWidth
                      sx={{ maxWidth: 400 }}
                      color="error"
                    />
                  </Stack>
                  <Stack direction="row" spacing={2}>
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
              </Collapse>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
};
export default BookDetails;

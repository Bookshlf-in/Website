import { React, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { makeStyles } from "@mui/styles";
import SellerCommisionChart from "./CommisionChartGrid";
import "./AddBook.css";
import axios from "../../axios";

// Components
// ======== From Core (Stable)
import { Grid, Stack, Collapse, Popover, Backdrop } from "@mui/material";
import { Button, Checkbox, TextField, IconButton } from "@mui/material";
import { Alert, CircularProgress, ClickAwayListener } from "@mui/material";
import { Chip, Tooltip, InputAdornment, Divider, Avatar } from "@mui/material";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { DialogContentText, DialogTitle, Typography } from "@mui/material";
import { InputLabel, FormControl, Select, MenuItem } from "@mui/material";
// ======== From Lab (Unstable)
import { LoadingButton } from "@mui/lab";

// Icons
import CancelIcon from "@mui/icons-material/CancelTwoTone";
import CloseIcon from "@mui/icons-material/ArrowDropUpRounded";
import OpenIcon from "@mui/icons-material/ArrowDropDownRounded";
import BookIcon from "@mui/icons-material/MenuBookRounded";
import BookDescIcon from "@mui/icons-material/DescriptionRounded";
// import BookQtyIcon from "@mui/icons-material/InboxRounded";
import AddressIcon from "@mui/icons-material/ContactsRounded";
import TagIcon from "@mui/icons-material/LocalOfferRounded";
import CameraIcon from "@mui/icons-material/AddAPhotoRounded";
import SendIcon from "@mui/icons-material/SendRounded";
import AddIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditionIcon from "@mui/icons-material/Timelapse";
import AuthorIcon from "@mui/icons-material/Person";
import WeightIcon from "@mui/icons-material/FitnessCenter";
import LanguageIcon from "@mui/icons-material/Translate";
import ISBNIcon from "@mui/icons-material/Language";
import HelpIcon from "@mui/icons-material/Help";
import RupeeIcon from "@mui/icons-material/CurrencyRupeeRounded";
const useStyles = makeStyles(() => ({
  root: {
    fontWeight: "bolder",
    fontFamily: "PT sans !important",
    "& label": {
      fontFamily: "PT sans !important",
    },
    "& p": {
      fontFamily: "PT sans !important",
    },
    "& input": {
      fontFamily: "PT sans !important",
    },
    "& textarea": {
      fontFamily: "PT sans !important",
    },
  },
  select: {
    "& label": {
      fontFamily: "PT sans !important",
      paddingLeft: "5px",
    },
    "& p": {
      fontFamily: "PT sans !important",
    },
    "& div": {
      fontFamily: "PT sans !important",
      fontSize: "12px !important",
    },
  },
  adrMenu: {
    fontFamily: "PT sans !important",
    fontSize: "12px !important",
  },
}));

const AddBook = (props) => {
  const classes = useStyles();
  const history = useHistory();

  // functionality states

  const [checked, setChecked] = useState(false);
  const [collapse, setcollapse] = useState(false);
  const [sending, setSending] = useState(false);
  const [tagFieldChanges, settagFieldChanges] = useState(false);
  const [titleFieldChanges, settitleFieldChanges] = useState(false);
  const [openTagMenu, setOpenTagMenu] = useState(false);
  const [openTitleMenu, setOpenTitleMenu] = useState(false);
  const [openpriceChart, setopenpriceChart] = useState(false);
  const [openPop, setOpenPop] = useState(null);
  const [alert, setalert] = useState({
    show: false,
    type: "info",
    msg: "",
  });

  // Add book form states
  const [bookName, setbookName] = useState("");
  const [bookISBN, setbookISBN] = useState("");
  const [SP, setSP] = useState("");
  const [sellingPrice, setsellingPrice] = useState("");
  const [earn, setearn] = useState("");
  const [mrp, setMrp] = useState("");
  const [bookDesc, setbookDesc] = useState("");
  const [Weight, setWeight] = useState("");
  const [Edition, setEdition] = useState("");
  const [Qnty, setQnty] = useState(1);
  const [author, setAuthor] = useState("");
  const [Adr, setAdr] = useState("");
  const [tags, setTags] = useState([]);
  const [resulttags, setresultTags] = useState([]);
  const [resulttitles, setresultTitles] = useState([]);
  const [tag, setTag] = useState("");
  const [link, setlink] = useState("");
  const [lang, setlang] = useState("");
  const [Image, setImage] = useState([]);
  const [Address, setAddress] = useState(props.address);
  const [req, setReq] = useState("send");
  const [panic, setpanic] = useState(false);

  window.addEventListener("beforeunload", (e) => {
    if (sending) {
      e.preventDefault();
      return (e.returnValue = "Changes May Not Be Saved?");
    }
  });

  window.addEventListener("unload", (e) => {
    setReq(null);
  });

  // Checking if price string is currect
  const CheckIfPriceFormat = (priceString) => {
    for (let i = 0; i < priceString.length; i++) {
      if (
        ("0" <= priceString[i] && priceString[i] <= "9") ||
        priceString[i] === ","
      ) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  };

  // Price Formatting
  const FormatPrice = (priceString) => {
    var FormattedpriceString = "";
    if (CheckIfPriceFormat(priceString)) {
      priceString = priceString.replaceAll(",", "");
      setsellingPrice(Number(priceString));
      for (let i = priceString.length - 1; i >= 0; i -= 3) {
        for (let j = i; j >= 0 && j > i - 3; j--) {
          FormattedpriceString = priceString[j] + FormattedpriceString;
          if (j === i - 2 && j > 0) {
            FormattedpriceString = "," + FormattedpriceString;
          }
        }
      }
    } else {
      FormattedpriceString = SP;
    }
    return FormattedpriceString;
  };

  // calculating seller Earnings
  const handelCalculateEarnings = (priceString) => {
    if (CheckIfPriceFormat(priceString)) {
      priceString = priceString.replaceAll(",", "");
      const fetchdata = async () => {
        axios
          .get(`/getSellerEarning?price=${Number(priceString)}`)
          .then((response) => {
            setearn(response.data.sellerEarning);
          })
          .catch((error) => {
            setearn("");
            // console.log(error.response.data);
          });
      };
      fetchdata();
    }
  };

  // book title search on input
  const handelBookTitleSearch = (e) => {
    settitleFieldChanges(true);
    setbookName(e.target.value);
    setOpenTitleMenu(true);
    const fetchdata = async () => {
      axios
        .get(`/searchTitle?q=${e.target.value}`)
        .then((response) => {
          setresultTitles(response.data);
          settitleFieldChanges(false);
        })
        .catch((error) => {});
    };
    fetchdata();
  };

  // tag searching on input
  const handelTagSearch = (e) => {
    settagFieldChanges(true);
    setTag(e.target.value);
    setOpenTagMenu(true);
    const fetchdata = async () => {
      axios
        .get(`/searchTag?q=${e.target.value}`)
        .then((response) => {
          setresultTags(response.data);
          settagFieldChanges(false);
        })
        .catch((error) => {});
    };
    fetchdata();
  };

  // Tag adding to Book Tags
  const handelTitleAdd = (titlename) => {
    setOpenTitleMenu(false);
    setbookName(titlename);
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

  // adding book images in form
  const UpdateFileList = (fileList) => {
    setImage(fileList);
  };
  // Checking All Books Are Unique
  const isUnique = (fileName, fileList) => {
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].name === fileName) return false;
    }
    return true;
  };
  const handelbookAdd = (e, uploadMultiple) => {
    // console.log(e.target.files[0].name);
    if (Image.length > 0 && uploadMultiple) {
      if (isUnique(e.target.files[0].name, Image)) {
        UpdateFileList([...Image, ...Array.from(e.target.files)]);
      }
    } else {
      UpdateFileList(Array.from(e.target.files));
    }
  };

  // deleting book images from form
  const handleImageDelete = (filename) => {
    setImage(Image.filter((file) => file.name !== filename));
  };

  // submitting book for review
  const handelBookSubmitRequest = async (imglinks) => {
    axios
      .post("/addBook", {
        title: bookName,
        MRP: mrp,
        price: sellingPrice,
        editionYear: Edition,
        author: author,
        ISBN: bookISBN,
        language: lang,
        pickupAddressId: Adr,
        description: bookDesc,
        photos: imglinks,
        weightInGrams: Weight,
        embedVideo: link,
        tags: tags,
        qty: Qnty,
      })
      .then((response) => {
        // console.log(response.data);
        setSending(!sending);
        setalert({
          show: true,
          msg: "Book Added Successfully",
          type: "success",
        });
        setTimeout(() => {
          setalert({
            show: false,
            msg: "",
          });
          history.push("/SellerPanel/2");
        }, 1000);
      })
      .catch((error) => {
        // console.log(error.response.data);
      });
  };

  // uploading images to google cloud server

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
        const imgUrl = await uploadSingleImage(img);
        // console.log(imgUrl);
        return imgUrl;
      })
    );
  };

  // upload and Fetching URLs of Uploaded Books
  const uploadBook = async () => {
    setSending((prev) => !prev);
    if (Image.length >= 3 && Image.length <= 15) {
      // altleast 3 Images of Book
      if (checked) {
        // Agreed to Terms and Conditions
        if (validateSize()) {
          // Validating Image Sizes
          if (sellingPrice >= 100) {
            // Selling Price of Book Should be Atleast 100
            setTimeout(() => {
              setpanic(true);
            }, 10000);
            const urls = await uploadImages(Image);
            if (req) {
              handelBookSubmitRequest(urls);
            }
          } else {
            setSending((prev) => !prev);
            setalert({
              show: true,
              msg: "Selling Price Cannot be Less than 100",
              type: "error",
            });
            setTimeout(() => {
              setalert({
                show: false,
                msg: "",
                type: "info",
              });
            }, 6000);
          }
        } else {
          setSending((prev) => !prev);
          setalert({
            show: true,
            msg: "Images Should Not Exceed 5MB Size",
            type: "error",
          });
          setTimeout(() => {
            setalert({
              show: false,
              msg: "",
              type: "info",
            });
          }, 6000);
        }
      } else {
        setSending((prev) => !prev);
        setalert({
          show: true,
          msg: "Please Check the Box",
          type: "error",
        });
        setTimeout(() => {
          setalert({
            show: false,
            msg: "",
            type: "info",
          });
        }, 6000);
      }
    } else {
      setSending((prev) => !prev);
      setalert({
        show: true,
        msg: "Please Upload At Least 3 Images Of Book SET but not more than 15.",
        type: "error",
      });
      setTimeout(() => {
        setalert({
          show: false,
          msg: "",
          type: "info",
        });
      }, 6000);
    }
  };

  // const Address Popover Component
  const AddAddressPopOver = () => {
    // Functionality States
    const [loading, setloading] = useState(false);
    const [alert, setalert] = useState({
      show: false,
      type: "warning",
      msg: "",
    });

    // add address Data states
    const [Label, setLabel] = useState("");
    const [Address, setaddress] = useState("");
    const [PhoneNo, setPhoneNo] = useState("");
    const [AltPhoneNo, setAltPhoneNo] = useState("");
    const [City, setCity] = useState("");
    const [State, setState] = useState("");
    const [ZipCode, setZipCode] = useState("");

    // handeling address register request
    const handelRegister = () => {
      setloading(true);
      if (
        Label !== "Address Type" &&
        Address.length > 0 &&
        City !== "City" &&
        State !== "State" &&
        ZipCode.length === 6 &&
        PhoneNo.length === 10
      ) {
        axios
          .post("/addAddress", {
            label: Label,
            address: Address,
            phoneNo: PhoneNo,
            altPhoneNo: AltPhoneNo,
            city: City,
            state: State,
            zipCode: ZipCode,
          })
          .then(() => {
            axios
              .get("/getAddressList")
              .then((response) => {
                setAddress(
                  response.data.sort((a, b) => {
                    return a.updatedAt < b.updatedAt
                      ? 1
                      : a.updatedAt > b.updatedAt
                      ? -1
                      : 0;
                  })
                );
                setalert({
                  show: true,
                  type: "success",
                  msg: response.data.msg,
                });
                setloading(false);
                setTimeout(() => {
                  setalert({
                    show: false,
                    type: "",
                    msg: "",
                  });
                  setOpenPop(null);
                }, 1000);
              })
              .catch((error) => {});
          })
          .catch((error) => {
            if (error.response) {
              setalert({
                show: true,
                type: "error",
                msg: "Please Fill All Fields Correctly!",
              });

              setTimeout(() => {
                setalert({
                  show: false,
                  type: "",
                  msg: "",
                });
              }, 3000);
            }
            setloading(false);
          });
      } else {
        setloading(false);
        setalert({
          show: true,
          type: "error",
          msg: "Please Fill All Fields Correctly!",
        });
        setTimeout(() => {
          setalert({
            show: false,
            type: "",
            msg: "",
          });
        }, 3000);
      }
    };

    return (
      <Stack
        spacing={1}
        sx={{ padding: "10px", width: "100%" }}
        className="address-form-stack"
      >
        <FormControl
          fullWidth
          variant="filled"
          sx={{ minWidth: 200 }}
          className={classes.root}
          size="small"
        >
          <InputLabel id="address-type-label">Address Type</InputLabel>
          <Select
            labelId="address-type-label"
            value={Label}
            label="Address Type"
            onChange={(e) => setLabel(e.target.value)}
          >
            <MenuItem
              value="Home Address"
              sx={{ fontFamily: "PT sans", fontSize: "12px" }}
            >
              Home Address
            </MenuItem>
            <MenuItem
              value="Office Address"
              sx={{ fontFamily: "PT sans", fontSize: "12px" }}
            >
              Office Address
            </MenuItem>
            <MenuItem
              value="Temporary Address"
              sx={{ fontFamily: "PT sans", fontSize: "12px" }}
            >
              Temporary Address
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Full Address"
          variant="filled"
          value={Address}
          onChange={(e) => setaddress(e.target.value)}
          fullWidth
          className={classes.root}
          sx={{ minWidth: 250 }}
        />

        <FormControl
          fullWidth
          variant="filled"
          className={classes.root}
          sx={{ maxWidth: 300 }}
        >
          <InputLabel id="state-label">State</InputLabel>
          <Select
            className={classes.root}
            size="small"
            labelId="state-label"
            value={State}
            label="State"
            onChange={(e) => setState(e.target.value)}
          >
            <MenuItem value="Andaman and Nicobar Islands">
              Andaman and Nicobar Islands
            </MenuItem>
            <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
            <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
            <MenuItem value="Assam">Assam</MenuItem>
            <MenuItem value="Bihar">Bihar</MenuItem>
            <MenuItem value="Chandigarh">Chandigarh</MenuItem>
            <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
            <MenuItem value="Dadra and Nagar Haveli">
              Dadra and Nagar Haveli
            </MenuItem>
            <MenuItem value="Daman and Diu">Daman and Diu</MenuItem>
            <MenuItem value="Delhi">Delhi</MenuItem>
            <MenuItem value="Goa">Goa</MenuItem>
            <MenuItem value="Gujarat">Gujarat</MenuItem>
            <MenuItem value="Haryana">Haryana</MenuItem>
            <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
            <MenuItem value="Jammu and Kashmir">Jammu and Kashmir</MenuItem>
            <MenuItem value="Jharkhand">Jharkhand</MenuItem>
            <MenuItem value="Karnataka">Karnataka</MenuItem>
            <MenuItem value="Kerala">Kerala</MenuItem>
            <MenuItem value="Ladakh">Ladakh</MenuItem>
            <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
            <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
            <MenuItem value="Maharashtra">Maharashtra</MenuItem>
            <MenuItem value="Manipur">Manipur</MenuItem>
            <MenuItem value="Meghalaya">Meghalaya</MenuItem>
            <MenuItem value="Mizoram">Mizoram</MenuItem>
            <MenuItem value="Nagaland">Nagaland</MenuItem>
            <MenuItem value="Odisha">Odisha</MenuItem>
            <MenuItem value="Puducherry">Puducherry</MenuItem>
            <MenuItem value="Punjab">Punjab</MenuItem>
            <MenuItem value="Rajasthan">Rajasthan</MenuItem>
            <MenuItem value="Sikkim">Sikkim</MenuItem>
            <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
            <MenuItem value="Telangana">Telangana</MenuItem>
            <MenuItem value="Tripura">Tripura</MenuItem>
            <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
            <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
            <MenuItem value="West Bengal">West Bengal</MenuItem>
          </Select>
        </FormControl>
        <TextField
          className={classes.root}
          label="City"
          variant="filled"
          fullWidth
          value={City}
          onChange={(e) => setCity(e.target.value)}
          sx={{ maxWidth: 300 }}
        />
        <TextField
          className={classes.root}
          label="Pincode"
          variant="filled"
          fullWidth
          value={ZipCode}
          onChange={(e) => setZipCode(e.target.value)}
          type="number"
          sx={{ maxWidth: 284 }}
        />

        <TextField
          size="small"
          className={classes.root}
          label="Contact Number"
          variant="filled"
          fullWidth
          value={PhoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          type="number"
          sx={{ maxWidth: 300 }}
        />
        <TextField
          size="small"
          className={classes.root}
          label="Alternate Contact Number"
          variant="filled"
          fullWidth
          value={AltPhoneNo}
          onChange={(e) => setAltPhoneNo(e.target.value)}
          type="number"
          sx={{ maxWidth: 300 }}
        />
        <LoadingButton
          size="small"
          className={classes.root}
          variant="contained"
          fullWidth
          color="success"
          sx={{ maxWidth: 284, fontFamily: "PT sans" }}
          onClick={handelRegister}
          endIcon={<AddIcon />}
          loading={loading}
          loadingPosition="end"
        >
          Add Address
        </LoadingButton>
        {alert.show ? (
          <Alert
            severity={alert.type}
            className={classes.root}
            sx={{ fontFamily: "PT sans" }}
          >
            {alert.msg}
          </Alert>
        ) : null}
      </Stack>
    );
  };

  return (
    <div className="add-book-bg">
      <Helmet>
        <title>Add Book | Bookshlf</title>
        <meta name="description" content="Add Your Book" />
      </Helmet>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} lg={8} md={12} sm={12}>
          <form className="add-book-form-lf">
            <fieldset>
              <legend>Add New Book</legend>
              <Stack spacing={2}>
                <div style={{ position: "relative" }}>
                  <TextField
                    className={classes.root}
                    id="add-book-textfield"
                    label="Book Title"
                    helperText="Name of the Book"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BookIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          {titleFieldChanges ? (
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
                    value={bookName}
                    fullWidth
                    onChange={(e) => handelBookTitleSearch(e)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handelTitleAdd(e.target.value);
                      }
                    }}
                  />

                  <ClickAwayListener
                    onClickAway={() => setOpenTitleMenu(false)}
                  >
                    {openTitleMenu ? (
                      <div className="searchTagresult">
                        {resulttitles.map((Title, idx) => (
                          <MenuItem
                            id="result-tag"
                            title={Title.title}
                            key={idx}
                            value={Title.title}
                            onClick={() => handelTitleAdd(Title.title)}
                          >
                            {Title.title}
                          </MenuItem>
                        ))}
                      </div>
                    ) : (
                      <></>
                    )}
                  </ClickAwayListener>
                </div>

                <TextField
                  className={classes.root}
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
                  helperText="Your Experience About the Book"
                  value={bookDesc}
                  onChange={(e) => setbookDesc(e.target.value)}
                />
                <Stack
                  direction={{ xs: "column", sm: "row", lg: "row", md: "row" }}
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                  justifyContent="space-between"
                >
                  {/* <TextField
                    className={classes.root}
                    id="add-book-textfield"
                    label="Book SET Quantity"
                    helperText=" "
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BookQtyIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    value={Qnty}
                    // onChange={(e) => setQnty(e.target.value)}
                    name="book-qty-field"
                    autoComplete="off"
                    readOnly
                  /> */}
                  <TextField
                    className={classes.root}
                    id="add-book-textfield"
                    label="Book Selling Price"
                    helperText="Min Price Should be 100"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <RupeeIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    fullWidth
                    value={SP}
                    onChange={(e) => {
                      setSP(FormatPrice(e.target.value));
                      handelCalculateEarnings(e.target.value);
                    }}
                    name="selling-price-field"
                    autoComplete="off"
                  />
                  <TextField
                    className={classes.root}
                    id="add-book-textfield"
                    label="Your Earnings"
                    helperText="Total earnings you will recieve"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <RupeeIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <HelpIcon
                            style={{
                              cursor: "pointer",
                              color: "yellowgreen",
                            }}
                            onClick={() => {
                              setopenpriceChart(true);
                            }}
                          />
                        </InputAdornment>
                      ),
                      readOnly: true,
                    }}
                    fullWidth
                    variant="standard"
                    value={earn}
                  />
                  {openpriceChart ? (
                    <Dialog
                      open={openpriceChart}
                      onClose={() => setopenpriceChart(false)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle
                        id="alert-dialog-title"
                        style={{ fontFamily: "pt sans", fontSize: "16px" }}
                      >
                        {"Detailed Chart for Seller Earnings & Commission"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText
                          id="alert-dialog-description"
                          sx={{ height: 400 }}
                        >
                          <SellerCommisionChart grid={props.commisionChart} />
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => setopenpriceChart(false)}
                          variant="contained"
                          color="primary"
                          style={{ fontFamily: "pt sans", fontSize: "12px" }}
                        >
                          close
                        </Button>
                      </DialogActions>
                    </Dialog>
                  ) : null}
                </Stack>
                <TextField
                  className={classes.select}
                  select
                  label="Pickup Address"
                  value={Adr}
                  onChange={(e) => {
                    if (e.target.value === "NEWADR") {
                      setOpenPop(e.target.value);
                    } else {
                      setAdr(e.target.value);
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
                  {Address
                    ? Address.map((option) => (
                        <MenuItem
                          key={option._id}
                          value={option._id}
                          className={classes.adrMenu}
                        >
                          {option.address + ", " + option.zipCode}
                        </MenuItem>
                      ))
                    : null}
                  {
                    <MenuItem
                      key={"NEWADR"}
                      value={"NEWADR"}
                      className={classes.adrMenu}
                    >
                      {"Add New Address"}
                    </MenuItem>
                  }
                </TextField>
                {/* =================== Add Address PopOver Form ============== */}
                <Popover
                  open={Boolean(openPop)}
                  anchorEl={openPop}
                  onClose={() => setOpenPop(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                  }}
                  sx={{ width: "100%", background: "rgba(0,0,0,0.6)" }}
                >
                  <AddAddressPopOver />
                </Popover>
                <Stack
                  direction={{ xs: "column", sm: "row", lg: "row", md: "row" }}
                  spacing={2}
                >
                  <div style={{ position: "relative" }}>
                    <TextField
                      className={classes.root}
                      id="add-book-textfield"
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
                      helperText="Press enter key to add the Tag"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handelTagAdd(e.target.value);
                        }
                      }}
                      autoComplete="false"
                      sx={{ minWidth: 200 }}
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
                              className={classes.adrMenu}
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
                        sx={{ margin: "4px" }}
                      />
                    ))}
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
                        accept="image/png, image/jpeg, image/jpg, image/ico, image/svg"
                        id="icon-button-file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          handelbookAdd(e, false);
                        }}
                        multiple
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
                      Please Upload Atleast 3 Clear Images of Book SET
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
                    flexWrap="wrap"
                  >
                    {Image.map((file, idx) => (
                      <div className="uploaded-image-item" key={idx}>
                        <span
                          className="image-delete"
                          onClick={() => handleImageDelete(file.name)}
                        >
                          <CancelIcon />
                        </span>
                        <Avatar
                          alt={file.name}
                          src={URL.createObjectURL(file)}
                          sx={{ width: 150, height: 150 }}
                          variant="square"
                        />
                      </div>
                    ))}
                    {Image.length ? (
                      <label htmlFor="icon-button-file-2">
                        <input
                          accept="image/*"
                          id="icon-button-file-2"
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            handelbookAdd(e, true);
                          }}
                          multiple
                        />
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <AddIcon sx={{ height: "2rem", width: "2rem" }} />
                        </IconButton>
                      </label>
                    ) : (
                      <></>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </fieldset>
          </form>
        </Grid>
        <Grid item xs={12} lg={4} md={12} sm={12}>
          <Tooltip
            title="Fill Extra Details about book. However these fields are not Necessary"
            arrow
            style={{ fontFamily: "Pt sans" }}
          >
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              endIcon={collapse ? <CloseIcon /> : <OpenIcon />}
              onClick={() => setcollapse(!collapse)}
              sx={{
                marginTop: "22px",
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
              <fieldset>
                <Stack spacing={2}>
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                      lg: "row",
                      md: "row",
                    }}
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    justifyContent="space-evenly"
                  >
                    <TextField
                      className={classes.root}
                      id="add-book-textfield"
                      label="Book MRP"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <RupeeIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                      value={mrp}
                      onChange={(e) => setMrp(e.target.value)}
                    />
                    <TextField
                      className={classes.root}
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
                      value={Edition}
                      onChange={(e) => setEdition(e.target.value)}
                    />
                  </Stack>

                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                      lg: "row",
                      md: "row",
                    }}
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    justifyContent="space-evenly"
                  >
                    <TextField
                      className={classes.root}
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
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                    <TextField
                      className={classes.root}
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
                      value={Weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </Stack>

                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                      lg: "row",
                      md: "row",
                    }}
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    justifyContent="space-evenly"
                  >
                    <TextField
                      className={classes.root}
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
                      value={lang}
                      onChange={(e) => setlang(e.target.value)}
                    />
                    <TextField
                      className={classes.root}
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
                      value={bookISBN}
                      onChange={(e) => setbookISBN(e.target.value)}
                    />
                  </Stack>
                </Stack>
              </fieldset>
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
            flexDirection: "column",
          }}
        >
          {alert.show ? <Alert severity={alert.type}>{alert.msg}</Alert> : null}
          <div>
            <Checkbox
              checked={checked}
              onChange={() => {
                setChecked(!checked);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Link
              style={{ fontFamily: "pt sans" }}
              to={`/TermsofUse&PrivacyPolicy`}
              target="_blank"
            >
              I agree to Terms & Conditions
            </Link>
          </div>
        </Grid>
        <Grid item xs={12} lg={4} md={4} sm={4}>
          <LoadingButton
            onClick={uploadBook}
            endIcon={<SendIcon />}
            loading={sending}
            loadingPosition="end"
            variant="contained"
            className={classes.root}
            fullWidth
          >
            {sending ? "Submitting ..." : "Submit For Review"}
          </LoadingButton>
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={sending}
      >
        <Stack spacing={2} sx={{ padding: "10px" }}>
          <CircularProgress color="inherit" />
          <Typography className={classes.root}>
            Relax & Wait Patiently while we process your Request.
          </Typography>
          <Typography
            variant="caption"
            className={classes.root}
            color="secondary"
          >
            {panic
              ? "This Might Take few minutes."
              : "This won't take a minute."}
          </Typography>
          {panic ? (
            <Typography
              variant="body2"
              className={classes.root}
              color="error"
              sx={{ maxWidth: 300 }}
              align="justify"
            >
              Please don't panic, It usually takes time. Your Request is being
              processed correctly. Kindly don't Close or Change or reload
              browser window otherwise request will get cancelled.
            </Typography>
          ) : null}
        </Stack>
      </Backdrop>
    </div>
  );
};
export default AddBook;

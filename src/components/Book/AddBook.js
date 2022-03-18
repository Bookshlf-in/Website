import { React, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { makeStyles } from "@mui/styles";
import axios from "../../axios";
import "./AddBook.css";

// Components
// ======== From MUI Core (Stable)
import { Grid, Stack, Collapse, Popover, Backdrop } from "@mui/material";
import { Button, Checkbox, TextField } from "@mui/material";
import { Alert, CircularProgress, ClickAwayListener } from "@mui/material";
import { Chip, Tooltip, InputAdornment } from "@mui/material";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { DialogTitle, Typography } from "@mui/material";
import { InputLabel, FormControl, Select, MenuItem } from "@mui/material";
// ======== From MUI Lab (Unstable)
import { LoadingButton } from "@mui/lab";

// FilePond Components for image Uploading
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Icons
import CloseIcon from "@mui/icons-material/ArrowDropUpRounded";
import OpenIcon from "@mui/icons-material/ArrowDropDownRounded";
import BookIcon from "@mui/icons-material/MenuBookRounded";
import BookDescIcon from "@mui/icons-material/DescriptionRounded";
import AddressIcon from "@mui/icons-material/ContactsRounded";
import TagIcon from "@mui/icons-material/LocalOfferRounded";
import SendIcon from "@mui/icons-material/SendRounded";
import AddIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditionIcon from "@mui/icons-material/Timelapse";
import AuthorIcon from "@mui/icons-material/Person";
import WeightIcon from "@mui/icons-material/FitnessCenter";
import LanguageIcon from "@mui/icons-material/Translate";
import ISBNIcon from "@mui/icons-material/Language";
import HelpIcon from "@mui/icons-material/Help";
import RupeeIcon from "@mui/icons-material/CurrencyRupeeRounded";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

const useStyles = makeStyles(() => ({
  root: {
    "& p": {
      fontSize: "12px !important",
    },
    "& input": {
      fontSize: "12px !important",
    },
    "& textarea": {
      fontSize: "12px !important",
    },
  },
  select: {
    "& label": {
      fontSize: "14px",
      left: "7px",
      top: "3px",
    },
    "& p": {
      fontSize: "12px !important",
    },
    "& div": {
      fontSize: "12px !important",
    },
  },
  adrMenu: {
    fontSize: "12px !important",
    minHeight: "0 !important",
  },
}));

const Flexible = {
  xs: "column",
  sm: "row",
  lg: "row",
  md: "row",
};

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
  const [errorField, setErrorField] = useState(0);
  const [earnLoad, setEarnLoad] = useState(0);
  const [alert, setalert] = useState({
    show: false,
    type: "info",
    msg: "",
  });

  // Add book form states
  const [bookName, setbookName] = useState("");
  const [bookISBN, setbookISBN] = useState("");
  const [SP, setSP] = useState("");
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

  // calculating seller Earnings
  const handelCalculateEarnings = (priceString) => {
    if (!isNaN(priceString) && Number(priceString) >= 100) {
      const fetchdata = async () => {
        setEarnLoad(true);
        axios
          .get(`/getSellerEarning?price=${priceString}`)
          .then((response) => {
            setearn(response.data.sellerEarning);
            setEarnLoad(false);
          })
          .catch((error) => {
            setearn("");
            // console.log(error.response.data);
          });
      };
      fetchdata();
    } else {
      setearn("");
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

  // Checking All Books Are Unique
  const isUnique = (fileName, fileList) => {
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].name === fileName) return false;
    }
    return true;
  };

  // submitting book for review
  const handelBookSubmitRequest = async (imglinks) => {
    axios
      .post("/addBook", {
        title: bookName,
        MRP: mrp,
        price: SP,
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
          if (Adr !== "") {
            // checking if Address is selected
            if (bookName !== "") {
              if (!isNaN(SP) && Number(SP) >= 300) {
                // Selling Price of Book Should be Atleast 100
                const urls = await uploadImages(Image);
                if (req) {
                  handelBookSubmitRequest(urls);
                }
                setTimeout(() => {
                  setpanic(true);
                }, 10000);
              } else {
                ShowError("Enter Valid Selling Price", 2);
              }
            } else {
              ShowError("Please Enter Valid Book Name", 1);
            }
          } else {
            ShowError("Please Select pickup Address", 3);
          }
        } else {
          ShowError("Images Should Not Exceed 5MB Size", 5);
        }
      } else {
        ShowError("Please Check the Box", 4);
      }
    } else {
      ShowError(
        "Please upload at least 3 images of BOOK-SET but not more than 15.",
        5
      );
    }
  };

  // Const handel Add Book Form preChecks Errors
  const ShowError = (msg, i) => {
    setSending((prev) => !prev);
    setErrorField(i);
    setalert({
      show: true,
      msg: msg,
      type: "error",
    });
    setTimeout(() => {
      setErrorField(0);
      setalert({
        show: false,
        msg: "",
        type: "info",
      });
    }, 10000);
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
              sx={{ fontFamily: "Roboto", fontSize: "12px" }}
            >
              Home Address
            </MenuItem>
            <MenuItem
              value="Office Address"
              sx={{ fontFamily: "Roboto", fontSize: "12px" }}
            >
              Office Address
            </MenuItem>
            <MenuItem
              value="Temporary Address"
              sx={{ fontFamily: "Roboto", fontSize: "12px" }}
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
          sx={{ maxWidth: 284, fontFamily: "Roboto" }}
          onClick={handelRegister}
          endIcon={<AddIcon />}
          loading={loading}
          loadingPosition="end"
        >
          Add Address
        </LoadingButton>

        <Alert
          severity={alert.type}
          className={classes.root}
          sx={{ fontFamily: "Roboto", visibility: alert.show ? 1 : 0 }}
        >
          {alert.msg}
        </Alert>
      </Stack>
    );
  };

  return (
    <div className="add-book-bg">
      <Helmet>
        <title>Add Book | Bookshlf</title>
        <meta name="description" content="Add Your Book" />
      </Helmet>
      <Grid container spacing={1} justifyContent="center">
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
                          <BookIcon sx={{ height: 16, weight: 16 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          {titleFieldChanges ? (
                            <CircularProgress
                              size={16}
                              color="inherit"
                              sx={{ mr: 1 }}
                            />
                          ) : (
                            <></>
                          )}
                        </InputAdornment>
                      ),
                    }}
                    variant="filled"
                    value={bookName}
                    fullWidth
                    onChange={(e) => handelBookTitleSearch(e)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handelTitleAdd(e.target.value);
                      }
                    }}
                    size="small"
                    error={errorField === 1}
                    focused={errorField === 1}
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
                        <BookDescIcon sx={{ height: 16, weight: 16 }} />
                      </InputAdornment>
                    ),
                  }}
                  variant="filled"
                  multiline
                  rows={2}
                  helperText="Your Experience About the Book"
                  value={bookDesc}
                  onChange={(e) => setbookDesc(e.target.value)}
                  size="small"
                />

                <Stack
                  direction={Flexible}
                  spacing={1}
                  justifyContent="space-between"
                >
                  <TextField
                    className={classes.root}
                    id="add-book-textfield"
                    label="Book Selling Price"
                    helperText="Price At Which The Book Will Be Sold, Min Price Should be 300."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <RupeeIcon sx={{ height: 16, width: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                    variant="filled"
                    fullWidth
                    value={SP}
                    onChange={(e) => {
                      setSP(e.target.value);
                      handelCalculateEarnings(e.target.value);
                    }}
                    name="selling-price-field"
                    autoComplete="off"
                    size="small"
                    error={errorField === 2}
                  />
                  <TextField
                    className={classes.root}
                    id="add-book-textfield"
                    label="Your Earnings"
                    helperText="This Is The Price Which You Will Get When Book Is Sold"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {earnLoad ? (
                            <CircularProgress color="inherit" size={16} />
                          ) : (
                            <RupeeIcon
                              color="success"
                              sx={{ height: 16, width: 16 }}
                            />
                          )}
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <HelpIcon
                            sx={{
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setopenpriceChart(true);
                            }}
                            color="info"
                          />
                        </InputAdornment>
                      ),
                      readOnly: true,
                    }}
                    fullWidth
                    variant="filled"
                    value={earn}
                    color="success"
                    focused={Boolean(earn)}
                    size="small"
                  />
                  {openpriceChart ? (
                    <Dialog
                      open={openpriceChart}
                      onClose={() => setopenpriceChart(false)}
                      sx={{
                        "& .MuiDialog-paper": {
                          margin: "32px 10px !important",
                          width: "100%",
                        },
                      }}
                    >
                      <DialogTitle>Your Earnings & Commission</DialogTitle>
                      <DialogContent>
                        <Alert severity="info">
                          <Typography variant="caption">
                            As a Bookshlf Partner You Will Be Eligible For Upto
                            <b> 60% </b>of the Profit Earned By Selling Your
                            Books.
                          </Typography>
                        </Alert>
                        <br />
                        <Alert severity="info">
                          <Typography variant="caption">
                            Bookshlf Takes Responsibility Of Picking Up Of Your
                            Books & Delivering It Safely To the Buyer Based In
                            Any Corner Of India.
                          </Typography>
                        </Alert>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => setopenpriceChart(false)}
                          variant="outlined"
                          color="error"
                          size="small"
                        >
                          close
                        </Button>
                      </DialogActions>
                    </Dialog>
                  ) : null}
                </Stack>
                <Alert severity="info" color="warning" variant="outlined">
                  High Selling Prices will decrease Chances of book getting Sold
                </Alert>
                <TextField
                  className={classes.select}
                  select
                  error={errorField === 3}
                  size="small"
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
                        <AddressIcon sx={{ height: 16, width: 16 }} />
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
                            <TagIcon sx={{ height: 16, width: 16 }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            {tagFieldChanges ? (
                              <CircularProgress
                                sx={{ mr: 1 }}
                                size={16}
                                color="inherit"
                              />
                            ) : (
                              <></>
                            )}
                          </InputAdornment>
                        ),
                      }}
                      variant="filled"
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
                      size="small"
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
                    direction={Flexible}
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
                {/* ======================= Book Image Upload ======================== */}
                <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
                  <Alert
                    severity={errorField === 5 ? "error" : "info"}
                    variant="outlined"
                  >
                    Please Upload Atleast 3-15 Clear Images of BOOK-SET
                  </Alert>
                  <FilePond
                    acceptedFileTypes={["image/*"]}
                    name="bookImages"
                    dropOnPage={true}
                    dropValidation={true}
                    allowReorder={true}
                    allowMultiple={true}
                    maxFiles={15}
                    checkValidity={true}
                    files={Image}
                    beforeAddFile={(file) => {
                      if (isUnique(file.file.name, Image)) return true;
                      return false;
                    }}
                    onupdatefiles={(fileItems) => {
                      setImage(fileItems.map((fileItem) => fileItem.file));
                    }}
                    labelIdle='Drag & Drop your Book Images or <span class="filepond--label-action">Browse</span>'
                    credits={false}
                    styleButtonRemoveItemPosition="right"
                    imagePreviewHeight={200}
                  />
                </Stack>
                {/* ============================================================== */}
              </Stack>
            </fieldset>
          </form>
        </Grid>
        <Grid item xs={12} lg={4} md={12} sm={12}>
          <Tooltip
            title="Fill Extra Details about book. However these fields are not Necessary"
            arrow
          >
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              endIcon={collapse ? <CloseIcon /> : <OpenIcon />}
              onClick={() => setcollapse(!collapse)}
              sx={{ marginTop: "12px" }}
            >
              More Details
            </Button>
          </Tooltip>
          <Collapse in={collapse}>
            <form className="add-book-form-rt">
              <fieldset>
                <Stack spacing={1}>
                  <Stack
                    direction={Flexible}
                    spacing={1}
                    justifyContent="space-evenly"
                  >
                    <TextField
                      className={classes.root}
                      id="add-book-textfield"
                      label="Book MRP"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <RupeeIcon sx={{ height: 16, weight: 16 }} />
                          </InputAdornment>
                        ),
                      }}
                      variant="filled"
                      value={mrp}
                      onChange={(e) => setMrp(e.target.value)}
                      size="small"
                      helperText="Original Price of Book"
                    />
                    <TextField
                      className={classes.root}
                      id="add-book-textfield"
                      label="Book Edition Year"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EditionIcon sx={{ height: 16, weight: 16 }} />
                          </InputAdornment>
                        ),
                      }}
                      variant="filled"
                      value={Edition}
                      onChange={(e) => setEdition(e.target.value)}
                      size="small"
                      type="number"
                      helperText="Year Of Purchase/Published"
                    />
                  </Stack>
                  <Stack
                    direction={Flexible}
                    spacing={1}
                    justifyContent="space-evenly"
                  >
                    <TextField
                      className={classes.root}
                      id="add-book-textfield"
                      label="Book Author"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AuthorIcon sx={{ height: 16, weight: 16 }} />
                          </InputAdornment>
                        ),
                      }}
                      variant="filled"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      size="small"
                      helperText="Original Author Of Book"
                    />
                    <TextField
                      className={classes.root}
                      id="add-book-textfield"
                      label="Book Weight in Grams"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <WeightIcon sx={{ height: 16, weight: 16 }} />
                          </InputAdornment>
                        ),
                      }}
                      variant="filled"
                      value={Weight}
                      onChange={(e) => setWeight(e.target.value)}
                      size="small"
                      helperText="eg : 5000"
                    />
                  </Stack>
                  <Stack
                    direction={Flexible}
                    spacing={1}
                    justifyContent="space-evenly"
                  >
                    <TextField
                      className={classes.root}
                      id="add-book-textfield"
                      label="Book Language"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LanguageIcon sx={{ height: 16, weight: 16 }} />
                          </InputAdornment>
                        ),
                      }}
                      variant="filled"
                      value={lang}
                      onChange={(e) => setlang(e.target.value)}
                      size="small"
                      helperText="example : English, Hindi etc."
                    />
                    <TextField
                      className={classes.root}
                      id="add-book-textfield"
                      label="Book ISBN Number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ISBNIcon sx={{ height: 16, weight: 16 }} />
                          </InputAdornment>
                        ),
                      }}
                      variant="filled"
                      value={bookISBN}
                      onChange={(e) => setbookISBN(e.target.value)}
                      size="small"
                      helperText="A unique 10/13 Digit Code"
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
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {alert.show ? (
            <Alert severity={alert.type} size="small">
              <Typography variant="caption" className={classes.root}>
                {alert.msg}
              </Typography>
            </Alert>
          ) : null}
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Checkbox
              checked={checked}
              onChange={() => {
                setChecked(!checked);
              }}
              size="small"
            />
            <Link
              style={{ fontFamily: "pt sans" }}
              to={`/TermsofUsePrivacyPolicy`}
              target="_blank"
            >
              <Typography variant="caption">
                <strong>I Agree to Terms & Conditions</strong>
              </Typography>
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={2} md={3} sm={4}>
          <LoadingButton
            onClick={uploadBook}
            endIcon={<SendIcon />}
            loading={sending}
            loadingPosition="end"
            variant="contained"
            className={classes.root}
            fullWidth
            size="small"
          >
            {sending ? "Submitting ..." : "Submit For Review"}
          </LoadingButton>
        </Grid>
      </Grid>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0,0,0,0.9)",
        }}
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
              variant="caption"
              className={classes.root}
              color="error"
              align="justify"
              sx={{ maxWidth: 350 }}
            >
              Please don't panic, It usually takes time. Your Request is being
              processed correctly. Kindly don't Close, Change, Reload browser
              window otherwise request will get Cancelled.
            </Typography>
          ) : null}
        </Stack>
      </Backdrop>
    </div>
  );
};
export default AddBook;

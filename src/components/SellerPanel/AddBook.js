import {React, useState} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "../../axios";
import Alert from "@material-ui/lab/Alert";
import {storage} from "../../firebase";
import {nanoid} from "nanoid";
import CircularProgress from "@material-ui/core/CircularProgress";

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

const AddBook = (props) => {
  const classes = useStyles();
  const history = useHistory();
  // book Details states
  const [bookName, setbookName] = useState("");
  const [bookISBN, setbookISBN] = useState("9782724088526");
  const [SP, setSP] = useState("");
  const [Earn, setEarn] = useState("");
  const [bookDesc, setbookDesc] = useState("");
  const [Weight, setWeight] = useState("");
  const [Edition, setEdition] = useState("");
  const [Qnty, setQnty] = useState("");
  const [author, setAuthor] = useState("");
  const [pickupId, setPickupId] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, settag] = useState("");
  const [link, setlink] = useState("");
  const [lang, setlang] = useState("English");
  const [checked, setChecked] = useState(false);
  const [Photo, setPhoto] = useState(null);
  const [Image, setImage] = useState(null);
  const [load, setload] = useState(false);
  const [Adr, setAdr] = useState(props.address);
  const [alert, setalert] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  const handelUpload = (e) => {
    setPhoto(Array.from(e.target.files));
    setImage(Array.from(e.target.files));
    // console.log(Array.from(e.target.files));
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const Initialize = () => {
    setbookName("");
    setbookISBN("9782724088526");
    setSP("");
    setEarn("");
    setbookDesc("");
    setWeight("");
    setEdition("");
    setQnty("");
    setAuthor("");
    setPickupId("");
    setTags([]);
    settag("");
    setlink("");
    setChecked(false);
    setPhoto(null);
    setImage(null);
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

  const handeluploadImages = () => {
    if (Photo != null && Photo !== undefined && Photo.length >= 3) {
      setload(true);
      return new Promise((result) => {
        const imgURL = [];
        const imageName = [];
        for (let i = 0; i < Photo.length; i++) {
          imageName[i] = nanoid(10) + Photo[i].name;
          const uploadTask = storage.ref(`books/${imageName[i]}`).put(Photo[i]);
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {},
            () => {
              storage
                .ref("books")
                .child(imageName[i])
                .getDownloadURL()
                .then((imgUrl) => {
                  imgURL.push(imgUrl);
                  if (imgURL.length === Photo.length) {
                    result(imgURL);
                  }
                });
            }
          );
        }
      });
    } else {
      setalert({
        show: true,
        type: "error",
        msg: "Please Fill All Fields",
      });
      setTimeout(() => {
        setalert({
          show: false,
          type: "error",
          msg: "Please Fill All Fields",
        });
      }, 3000);
    }
  };

  const PushDetails = (imglinks) => {
    if (precheck(imglinks)) {
      return new Promise(() => {
        setTimeout(() => {
          axios
            .post("/addBook", {
              title: bookName,
              MRP: Number(Earn),
              price: Number(SP),
              editionYear: Number(Edition),
              author: author,
              ISBN: bookISBN,
              language: lang,
              pickupAddressId: pickupId,
              description: bookDesc,
              photos: imglinks,
              weightInGrams: Number(Weight),
              embedVideo: link,
              tags: tags,
              qty: Number(Qnty),
            })
            .then((response) => {
              console.log(response.data);
              setload(false);
              setalert({
                show: true,
                type: "success",
                msg: response.data.msg,
              });
              setTimeout(() => {
                Initialize();
              }, 3000);
            })
            .catch((error) => {
              console.log(error.response.data.errors[0].error);
              setload(false);
              setalert({
                show: true,
                type: "error",
                msg: error.response.data.errors[0].error + " Please Try Again!",
              });
            });
        }, 2000);
      });
    } else {
      setload(false);
      setalert({
        show: true,
        type: "error",
        msg: "Please Fill All Fields",
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

  function precheck(imglinks) {
    return (
      bookName !== "" &&
      SP !== "" &&
      Edition !== "" &&
      author !== "" &&
      bookISBN !== "" &&
      lang !== "" &&
      pickupId !== "" &&
      bookDesc !== "" &&
      imglinks !== undefined &&
      imglinks !== null &&
      imglinks.length >= 3 &&
      Qnty > "0"
    );
  }
  const handelBookAdd = async () => {
    const imglinks = await handeluploadImages();
    await PushDetails(imglinks);
  };

  const FindEarnings = (sp) => {
    let price = Number(sp);
    let earnings = 0;

    if (price > 50 && price <= 100) earnings = 50 + (price * 3) / 100;
    else if (price > 100 && price <= 500) earnings = 100 + (price * 3) / 100;
    else if (price > 500 && price <= 1000) earnings = 200 + (price * 3) / 100;
    else if (price > 1000 && price <= 1500) earnings = 300 + (price * 3) / 100;
    else if (price > 1500 && price <= 2000) earnings = 400 + (price * 3) / 100;
    else if (price > 2000 && price <= 2500) earnings = 500 + (price * 3) / 100;
    else if (price > 2500 && price <= 3000) earnings = 600 + (price * 3) / 100;
    else if (price > 3000 && price <= 3500) earnings = 700 + (price * 3) / 100;
    else if (price > 3500 && price <= 4000) earnings = 800 + (price * 3) / 100;
    else if (price > 4000 && price <= 4500) earnings = 900 + (price * 3) / 100;
    else if (price > 4500 && price <= 5000) earnings = 1000 + (price * 3) / 100;
    else if (price > 5000) earnings = 1500 + (price * 3) / 100;
    else earnings = price;
    setEarn(Math.round(price - earnings));
    // console.log("Your Earnings : ", earnings);
  };
  return (
    <div className="add-book-bg">
      <h1> ADD NEW BOOK </h1>
      <form action="" className="add-book-form" autoComplete="off">
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
            <i className="fas fa-info"></i>
          </span>
          <input
            type="text"
            placeholder="Book Details"
            onChange={(e) => setbookDesc(e.target.value)}
            value={bookDesc}
          />
        </div>
        {/* <div className="add-book-field1">
        <span>
          <i className="fas fa-atlas"></i>
        </span>
        <input
          type="text"
          placeholder="Book ISBN Number"
          onChange={(e) => setbookISBN(e.target.value)}
          value={bookISBN}
        />
        </div> */}
        <div className="add-book-field2">
          <span>
            <i className="fas fa-rupee-sign"></i>
          </span>
          <input
            type="number"
            placeholder="Selling Price"
            onChange={(e) => {
              setSP(e.target.value);
              FindEarnings(e.target.value);
            }}
            value={SP}
          />
          <input
            type="Text"
            placeholder="Your Earnings (₹)"
            value={Earn}
            readOnly
          />
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fas fa-address-book" />
          </span>
          <select
            name=""
            id=""
            style={{
              height: "50px",
              outline: "none",
              fontFamily: "PT Sans",
              paddingLeft: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.87)",
              border: "none",
            }}
            onChange={(e) => {
              setPickupId(e.target.value);
              if (e.target.value === "addNew") {
                history.push("/SellerPanel/3");
              }
            }}
          >
            <option> Select Address</option>
            {Adr !== null ? (
              <>
                {Adr.map((adr, idx) => (
                  <option value={adr._id} key={idx}>
                    {adr.address}
                  </option>
                ))}
              </>
            ) : (
              <></>
            )}
            <option value="addNew">Add New Address</option>
          </select>
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fas fa-weight"></i>
          </span>
          <input
            type="number"
            placeholder="Weight in grams (if possible)"
            onChange={(e) => setWeight(e.target.value)}
            value={Weight}
          />
        </div>
        {/* <div className="add-book-field1">
          <span>
            <i className="fab fa-etsy"></i>
          </span>
          <input
            type="number"
            placeholder="Book Edition (Year)"
            onChange={(e) => setEdition(e.target.value)}
            value={Edition}
          />
        </div> */}
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
            <i className="fas fa-archive" />
          </span>
          <input
            type="number"
            placeholder="Quantity"
            onChange={(e) => setQnty(e.target.value)}
            value={Qnty}
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

        <div className="add-book-field1">
          <span>
            <i className="fab fa-youtube" />
          </span>
          <input
            type="text"
            placeholder="Embed Youtube Video Link(Optional)"
            onChange={(e) => setlink(e.target.value)}
            value={link}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div className="upload-btn-wrapper">
            <button style={{width: "250px"}}>Upload Images</button>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/ico, image/svg"
              onChange={(e) => {
                handelUpload(e);
              }}
              style={{width: "250px", left: "20px"}}
              multiple
            />
            <span>At least 3 clear images of book. (Front, Back, Side)</span>
          </div>
          <div
            className="uploaded-images"
            style={{
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            {Image !== null ? (
              <>
                {Image.map((file) => (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="book"
                    height="60px"
                    width="60px"
                  />
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
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
              width: "250px",
            }}
          >
            {alert.msg}
          </Alert>
        </div>
        <div>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            style={{fontFamily: "PT Sans", fontWeight: "bold"}}
            onClick={(e) => {
              e.preventDefault();
              if (checked) {
                handelBookAdd();
              }
            }}
          >
            <CircularProgress
              style={{
                display: load ? "inline-block" : "none",
                height: "15px",
                width: "15px",
                color: "white",
              }}
            />
            &nbsp;Submit For Review
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddBook;

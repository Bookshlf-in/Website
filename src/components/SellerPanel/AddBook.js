import {React, useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
import axios from "../../axios";

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

  // book Details states
  const [bookName, setbookName] = useState("");
  const [bookISBN, setbookISBN] = useState("");
  const [SP, setSP] = useState("");
  const [MRP, setMRP] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [AltPhoneNo, setAltPhoneNo] = useState("");
  const [bookDesc, setbookDesc] = useState("");
  const [Weight, setWeight] = useState("");
  const [Pages, setPages] = useState("");
  const [Edition, setEdition] = useState("");
  const [Qnty, setQnty] = useState("");
  const [author, setAuthor] = useState("");
  const [pickupId, setPickupId] = useState("");
  const [tags, setTags] = useState([]);
  const [Link, setLink] = useState("");

  const [checked, setChecked] = useState(false);
  const [Photo, setPhoto] = useState(null);
  const [Image, setImage] = useState(null);
  const [load, setload] = useState(false);
  const [Adr, setAdr] = useState(null);

  useEffect(() => {
    axios
      .get("/getAddressList")
      .then((response) => {
        response.data.sort((a, b) => {
          return a.updatedAt < b.updatedAt
            ? 1
            : a.updatedAt > b.updatedAt
            ? -1
            : 0;
        });
        setAdr(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  const handelUpload = (e) => {
    setPhoto(Array.from(e.target.files));
    setImage(Array.from(e.target.files));
    console.log(Array.from(e.target.files));
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // book adding
  const handelBookAdd = () => {
    setload(true);
    axios
      .post("/addBook", {
        title: bookName,
        MRP: MRP,
        price: SP,
        editionYear: Edition,
        author: author,
        ISBN: bookISBN,
        pickupAddressId: pickupId,
        description: bookDesc,
        photos: Photo,
        weightInGrams: Weight,
        embedVideo: "",
        tags: ["", "", ""],
        qty: Qnty,
      })
      .then((response) => {})
      .catch((error) => {});
  };

  return (
    <div className="add-book-bg">
      <h1 className="neonText"> ADD NEW BOOK </h1>
      <form action="" className="add-book-form" autoComplete="off">
        <div className="add-book-field1">
          <span>
            <i className="fas fa-book"></i>
          </span>
          <input
            type="text"
            placeholder="Book Full Name"
            onChange={(e) => setbookName(e.target.value)}
          />
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fas fa-atlas"></i>
          </span>
          <input
            type="number"
            placeholder="Book ISBN Number"
            onChange={(e) => setbookISBN(e.target.value)}
          />
        </div>
        <div className="add-book-field2">
          <span>
            <i className="fas fa-rupee-sign"></i>
          </span>
          <input
            type="text"
            placeholder="Selling Price"
            onChange={(e) => setSP(e.target.value)}
          />
          <input
            type="text"
            placeholder="M.R.P"
            onChange={(e) => setMRP(e.target.value)}
          />
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fas fa-envelope" />
          </span>
          <input
            type="mail"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="add-book-field2">
          <span>
            <i className="fas fa-mobile-alt"></i>
          </span>
          <input
            type="text"
            placeholder="Phone Number"
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Alternate Phone Number"
            onChange={(e) => setAltPhoneNo(e.target.value)}
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
          />
        </div>
        <div className="add-book-field2">
          <span>
            <i className="fas fa-weight"></i>
          </span>
          <input
            type="text"
            placeholder="Weight in grams(if possible)"
            onChange={(e) => setWeight(e.target.value)}
          />
          <input
            type="text"
            placeholder="Total Pages (if possible)"
            onChange={(e) => setPages(e.target.value)}
          />
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fab fa-etsy"></i>
          </span>
          <input
            type="text"
            placeholder="Book Edition"
            onChange={(e) => setEdition(e.target.value)}
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
          />
        </div>
        <div className="add-book-field1">
          <span>
            <i className="fas fa-archive" />
          </span>
          <input
            type="text"
            placeholder="Quantity"
            onChange={(e) => setQnty(e.target.value)}
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
              width: "500px",
              outline: "none",
              fontFamily: "PT Sans",
              paddingLeft: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.87)",
              border: "none",
            }}
            onChange={(e) => {
              setPickupId(e.target.value);
            }}
          >
            <option> Select Address</option>
            {Adr !== null ? (
              <>
                {Adr.map((adr) => (
                  <option value={adr._id}>{adr.address}</option>
                ))}
              </>
            ) : (
              <></>
            )}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            flexDirection: "column",
          }}
        >
          <div
            className="uploaded-images"
            style={{
              justifyContent: "flex-start",
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
          <div className="upload-btn-wrapper">
            <button>Upload Image</button>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/ico, image/svg"
              onChange={(e) => {
                handelUpload(e);
              }}
              multiple
            />
            <p>
              At least 3 clear images of book. <br />
              (Front, Back, Side)
            </p>
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
        <div>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
            style={{fontFamily: "PT Sans", fontWeight: "bold"}}
            onClick={(e) => {
              e.preventDefault();
              if (checked) {
                handelBookAdd();
              }
            }}
          >
            <i
              className="fas fa-circle-notch"
              style={{
                display: load ? "inline-block" : "none",
                animation: "spin 2s linear infinite",
              }}
            />
            &nbsp;Submit For Review
          </Button>
        </div>
      </form>
    </div>
  );
}
export default AddBook;

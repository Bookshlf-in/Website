import {React, useState} from "react";
import axios from "../../axios";
import InputMask from "react-input-mask";
import {makeStyles} from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "20px",
  },
}));

const Address = (props) => {
  const classes = useStyles();

  // functionality states
  const [loading, setloading] = useState(false);
  const [alert, setalert] = useState({
    Display: false,
    Type: "",
    Color: "",
    msg: "",
  });
  const [deleteAdr, setdeleteAdr] = useState("");
  // add address state object
  const [Label, setLabel] = useState("");
  const [Address, setAddress] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [City, setCity] = useState("City");
  const [State, setState] = useState("State");
  const [ZipCode, setZipCode] = useState("");
  const [Adr, setAdr] = useState(props.address);

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
          city: City,
          state: State,
          zipCode: ZipCode,
        })
        .then((response) => {
          console.log(response.data);
          setalert({
            Display: true,
            Type: "success",
            Color: "yellowgreen",
            msg: response.data.msg,
          });
          setloading(false);
          setTimeout(() => {
            setalert({
              Display: false,
              Type: "",
              Color: "",
              msg: "",
            });
          }, 3000);
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
            })
            .catch((error) => {});
        })
        .catch((error) => {
          if (error.response) {
            setalert({
              Display: true,
              Type: "error",
              Color: "red",
              msg: "Please Fill All Fields Correctly!",
            });

            setTimeout(() => {
              setalert({
                Display: false,
                Type: "",
                Color: "",
                msg: "",
              });
            }, 3000);
          }
          setloading(false);
        });
    } else {
      setloading(false);
      setalert({
        Display: true,
        Type: "error",
        Color: "red",
        msg: "Please Fill All Fields Correctly!",
      });
      setTimeout(() => {
        setalert({
          Display: false,
          Type: "",
          Color: "",
          msg: "",
        });
      }, 3000);
    }
  };

  // const deleting the address
  const handelDeleteAddress = (e) => {
    setdeleteAdr(e.target.id);
    axios
      .delete("/deleteAddress", {
        data: {addressId: e.target.id},
      })
      .then((response) => {
        console.log(response.data);
        setalert({
          Display: true,
          Type: "success",
          Color: "yellowgreen",
          msg: response.data.msg,
        });
        setTimeout(() => {
          setalert({
            Display: false,
            Type: "",
            Color: "",
            msg: "",
          });
        }, 3000);
        setAdr(Adr.filter((address) => address._id !== e.target.id));
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setalert({
          Display: true,
          Type: "error",
          Color: "red",
          msg: error.response.data.error,
        });
        setTimeout(() => {
          setalert({
            Display: false,
            Type: "",
            Color: "",
            msg: "",
          });
        }, 5000);
      });
  };

  return (
    <div className="address-bg">
      <h1 style={{fontFamily: "PT sans", letterSpacing: "2px"}}>
        Your Addresses
      </h1>

      <form className="address-form">
        <fieldset>
          <legend>
            <i className="fas fa-address-book" /> Add New Address :
          </legend>
          <div className="address-label">
            <select name="" id="" onChange={(e) => setLabel(e.target.value)}>
              <option value="0">Address Type</option>
              <option value="Home Address"> Home Address</option>
              <option value="Office Address"> Office Address</option>
              <option value="Temporary Address"> Temporary Address</option>
            </select>
          </div>
          <div className="address-desc">
            <input
              type="text"
              placeholder="Full Address"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="address-zip">
            <select name="country" id="country">
              <option value="0">Select Country</option>
              <option value="">India</option>
              <option value="">Other</option>
            </select>
            <select
              name="states"
              id="state"
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Select State</option>
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Dadra and Nagar Haveli">
                Dadra and Nagar Haveli
              </option>
              <option value="Daman and Diu">Daman and Diu</option>
              <option value="Delhi">Delhi</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
            <input
              type="text"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
            <span style={{position: "relative"}}>
              <label htmlFor="pincode" className="pincode">
                Pincode
              </label>
              <InputMask
                mask="999999"
                alwaysShowMask="true"
                id="pincode"
                title="Pincode"
                onChange={(e) => setZipCode(e.target.value)}
              />
            </span>
          </div>
          <div className="address-phoneNo">
            <span style={{width: "100px"}}>
              <label htmlFor="country-code">Country Code</label>
              <InputMask
                mask="99"
                alwaysShowMask="true"
                id="country-code"
                defaultValue="91"
              />
            </span>
            <span style={{width: "calc(100% - 110px)"}}>
              <label htmlFor="phone-no">Mobile Phone</label>
              <InputMask
                id="phone-no"
                mask="9999999999"
                alwaysShowMask="true"
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </span>
          </div>
        </fieldset>
        <button
          onClick={(e) => {
            e.preventDefault();
            handelRegister();
          }}
        >
          + Add Address&nbsp;
          <CircularProgress
            style={{
              display: !loading ? "none" : "inline-block",
              height: "15px",
              width: "15px",
              color: "white",
            }}
          />
        </button>
      </form>
      <div
        className={classes.root}
        style={{display: alert.Display ? "flex" : "none"}}
      >
        <Alert
          variant="outlined"
          severity={alert.Type}
          style={{
            fontFamily: "PT Sans",
            fontWeight: "bold",
            color: alert.Color,
            width: "250px",
          }}
        >
          {alert.msg}
        </Alert>
      </div>
      <div className="address-lists" id="address-lists">
        <table id="address-lists-table">
          <tr>
            <th>Address No.</th>
            <th>Type</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>ZipCode</th>
            <th>PhoneNo.</th>
            <th>Remove</th>
          </tr>
          {Adr !== null ? (
            <>
              {Adr.map((adr, idx) => (
                <tr>
                  <td>{idx + 1}</td>
                  <td>{adr.label}</td>
                  <td>{adr.address}</td>
                  <td>{adr.city}</td>
                  <td>{adr.state}</td>
                  <td>{adr.zipCode}</td>
                  <td>{adr.phoneNo}</td>
                  <td>
                    <i
                      className="fas fa-window-close"
                      id={adr._id}
                      title="Remove Address"
                      onClick={(e) => {
                        handelDeleteAddress(e);
                      }}
                      style={{
                        display: deleteAdr !== adr._id ? "block" : "none",
                      }}
                    />
                    <CircularProgress
                      style={{
                        display: deleteAdr === adr._id ? "block" : "none",
                        height: "25px",
                        width: "25px",
                        color: "red",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <></>
          )}
        </table>
      </div>
    </div>
  );
};
export default Address;

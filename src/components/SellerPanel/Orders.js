import { React, useState, useEffect } from "react";
import axios from "../../axios";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import UpdateBook from "./UpdateBook";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

const Orders = (props) => {
  const classes = useStyles();
  const [panel, setpanel] = useState("1");
  const [alert, setalert] = useState({
    show: false,
    type: "success",
    message: "",
  });
  const [Adr, setAdr] = useState(props.address);
  const [bookDetails, setbookDetails] = useState(props.books);
  const [sold, setsold] = useState([]);
  const [approved, setapproved] = useState([]);
  const [notsold, setnotsold] = useState([]);
  const [update, setupdate] = useState(false);
  const [bookprops, setbookprops] = useState({});

  useEffect(() => {
    // sorting books on basis of sold, approved, not approved
    const bookSorting = async (books, adr) => {
      for (let i = 0; i < books.length; i++) {
        let tmp = books[i].pickupAddressId;
        for (let j = 0; j < adr.length; j++) {
          if (adr[j]._id === tmp) {
            books[i].addressVal = adr[j].address;
            tmp = -1;
            break;
          }
          if (tmp === -1) break;
        }
      }
      console.log(books);
      for (let i = 0; i < books.length; i++) {
        if (books[i].isApproved === true) {
          approved.push(books[i]);
          setapproved(approved);
        } else {
          notsold.push(books[i]);
          setnotsold(notsold);
        }
      }
    };
    bookSorting(props.books, props.address);
  }, []);

  // deleting books
  const handelBookDelete = (e) => {
    axios
      .delete("/deleteBook", {
        data: { bookId: e.target.id },
      })
      .then((response) => {
        setalert({
          show: true,
          type: "success",
          msg: response.data.msg,
        });
        setnotsold(notsold.filter((book) => e.target.id !== book._id));
        setTimeout(() => {
          setalert({
            show: false,
            type: "",
            msg: "",
          });
        }, 4000);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="orders-bg">
      <div className="orders-filter">
        <form action="">
          <div className="select-wrapper">
            <select
              className="select"
              onChange={(e) => {
                console.log(e.target.value);
                setpanel(e.target.value);
              }}
            >
              <option value="1">Books Sold</option>
              <option value="2">Book Approved</option>
              <option value="3">Books Pending For Approval</option>
            </select>
          </div>
        </form>
      </div>
      <div
        className={classes.root}
        style={{ display: alert.show ? "flex" : "none" }}
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
      <div className="orders-details">
        {panel === "1" ? (
          <table className="active-orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Book ID</th>
                <th>Dated</th>
                <th>Details</th>
                <th>Order Price</th>
                <th>Buyer</th>
                <th>Payment Recieved</th>
              </tr>
            </thead>
          </table>
        ) : panel === "2" ? (
          <table className="active-orders-table">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Book Name</th>
                <th>ISBN Number</th>
                <th>Details</th>
                <th>Selling Price</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {approved && approved.length ? (
                <>
                  {approved.map((book) => (
                    <tr>
                      <td>{book._id}</td>
                      <td>{book.title}</td>
                      <td>{book.ISBN}</td>
                      <td>{book.description}</td>
                      <td>&#8377;{" " + book.price + "/-"}</td>
                      <td>{book.qty}</td>
                      <td>
                        <i
                          className="fas fa-window-close"
                          id={book._id}
                          onClick={handelBookDelete}
                        />
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <></>
              )}
            </tbody>
          </table>
        ) : (
          <table className="active-orders-table">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Name</th>
                <th>Details</th>
                <th>Price</th>
                <th>Pickup Address</th>
                <th>Status</th>
                <th>Update</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {notsold && notsold.length > 0 ? (
                <>
                  {notsold.map((book) => (
                    <tr>
                      <th>{book._id}</th>
                      <th>{book.title}</th>
                      <th>{book.description}</th>
                      <th>&#8377;{" " + book.price + "/-"}</th>
                      <th>{book.addressVal}</th>
                      <th
                        style={{
                          color: "white",
                          fontFamily: "PT Sans",
                          fontWeight: "bold",
                          backgroundColor: "red",
                        }}
                      >
                        {book.status === "Approval rejected" ? (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleClickOpen}
                            >
                              <i className="far fa-comments" />
                            </Button>
                            <br />
                            <br />
                            <Dialog
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle
                                id="alert-dialog-title"
                                style={{
                                  fontFamily: "PT Sans",
                                }}
                              >
                                {"Admin Message"}
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  {book.adminMessage}
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={handleClose}
                                  color="primary"
                                  style={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  OK
                                </Button>
                              </DialogActions>
                            </Dialog>
                            <i className="fas fa-times-circle" /> <br />
                            Approval Rejected
                          </>
                        ) : (
                          <>
                            <i className="fas fa-info-circle" /> <br />
                            Approval Pending
                          </>
                        )}
                      </th>
                      <th
                        style={{
                          color: "white",
                          fontFamily: "PT Sans",
                          cursor: "pointer",
                          fontWeight: "bold",
                          backgroundColor: "yellowgreen",
                        }}
                        onClick={() => {
                          if (book.status !== "Approval rejected") {
                            setbookprops(book);
                            setupdate(true);
                          }
                        }}
                      >
                        {book.status !== "Approval rejected" ? (
                          <>
                            <i class="fas fa-pen-alt"></i> <br />
                            Update Details
                          </>
                        ) : (
                          "---"
                        )}
                      </th>
                      <th>
                        <i
                          className="fas fa-window-close"
                          id={book._id}
                          onClick={handelBookDelete}
                        />
                      </th>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td>No Books</td>
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {update ? (
        <i
          className="fas fa-window-close"
          onClick={() => {
            setupdate(false);
          }}
          style={{
            position: "absolute",
            float: "left",
            zIndex: "102",
            right: "20px",
            fontSize: "20px",
          }}
        />
      ) : (
        <></>
      )}
      {update ? <UpdateBook book={bookprops} /> : <></>}
    </div>
  );
};
export default Orders;

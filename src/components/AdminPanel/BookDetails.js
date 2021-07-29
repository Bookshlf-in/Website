import {React, useState, useEffect} from "react";
import "../BookDetails/BookDetails.css";
import Booksnaps from "../BookDetails/Booksnaps";
import Bookfullsnap from "../BookDetails/Bookfullsnap";
import BookDesc from "../BookDetails/BookDesc";
import {useParams, useHistory} from "react-router-dom";
import axios from "../../axios";
import UpdateBook from "./UpdateBook";
import Fade from "@material-ui/core/Fade";

const BookDetails = () => {
  const params = useParams();
  const history = useHistory();
  const [load, setload] = useState(true);
  const [book, setbook] = useState({});
  const [update, setupdate] = useState(false);
  const [checked, setChecked] = useState(false);
  const [rejectmsg, setrejectmsg] = useState("");
  const handleChange = () => {
    setChecked((prev) => !prev);
    setrejectmsg("");
  };
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("/admin-getBookDetails", {params: {bookId: params.bookId}})
        .then((response) => {
          setbook(response.data);
          console.log(response.data);
          setload(false);
        })
        .catch((error) => {});
    };
    fetchData();
  }, []);
  const ApproveBook = (e, id) => {
    e.target.innerHTML = "Approving...";
    axios
      .post("/admin-approveBook", {
        bookId: id,
      })
      .then((response) => {
        console.log(response.data.msg);
        e.target.innerHTML = "Approved";
        history.push("/Admin/1");
      })
      .catch((error) => {
        console.log(error.response.data);
        e.target.innerHTML = "Error Occured!";
        setTimeout(() => {
          e.target.innerHTML = "Not Approved";
        }, 3000);
      });
  };
  const RejectBook = (e, id) => {
    if (rejectmsg.length > 10) {
      e.target.innerHTML = "Rejecting...";
      axios
        .post("/admin-rejectBookApproval", {
          bookId: id,
          message: rejectmsg,
        })
        .then((response) => {
          console.log(response.data.msg);
          history.push("/Admin/1");
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else {
      handleChange();
    }
  };
  const deleteBook = (e, id) => {
    e.target.innerHTML = "Deleting...";
    axios
      .delete("/admin-deleteBook", {
        data: {bookId: id, message: "Book is not Appropriate"},
      })
      .then((response) => {
        console.log(response.data.msg);
        e.target.innerHTML = "Delete";
        history.push("/Admin/1");
      })
      .catch((error) => {
        console.log(error.response.data);
        e.target.innerHTML = "Error Occured!";
        setTimeout(() => {
          e.target.innerHTML = "Delete";
        }, 3000);
      });
  };

  return (
    <div>
      <div className="book-details-bg">
        {load ? (
          <i
            className="fas fa-circle-notch"
            style={{
              display: load ? "inline-block" : "none",
              animation: "spin 2s linear infinite",
              fontSize: "64px",
              marginTop: "40px",
            }}
          />
        ) : (
          <div className="book-main-container">
            <Booksnaps snaps={book.photos} video={book.embedVideo} />
            <Bookfullsnap url={book.photos[0]} />
            <BookDesc bookdetails={book} />
            <div>
              <button
                className="admin-bookdetails-btn"
                onClick={(e) => {
                  e.preventDefault();
                  if (book) {
                    setupdate(true);
                  }
                }}
              >
                Update Details
              </button>
              <button
                className="admin-bookdetails-btn"
                onClick={(e) => {
                  ApproveBook(e, params.bookId);
                }}
              >
                Approve Book
              </button>
              <button
                className="admin-bookdetails-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleChange();
                }}
                style={{
                  display: checked ? "none" : "",
                }}
              >
                Reject Book
              </button>
              <Fade
                in={checked}
                style={{
                  display: !checked ? "none" : "",
                  marginTop: "10px",
                  border: "1px solid black",
                  padding: "10px",
                }}
              >
                <div>
                  <input
                    type="text"
                    placeholder="Rejection Message"
                    className="Reject-msg"
                    value={rejectmsg}
                    onChange={(e) => setrejectmsg(e.target.value)}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      RejectBook(e, params.bookId);
                    }}
                    className="reject-btn"
                  >
                    Reject
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleChange();
                    }}
                    className="reject-btn"
                  >
                    X
                  </button>
                </div>
              </Fade>
              <button
                className="admin-bookdetails-btn"
                onClick={(e) => {
                  deleteBook(e, params.bookId);
                }}
              >
                Delete Book
              </button>
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
                  top: "10px",
                }}
              />
            ) : (
              <></>
            )}
            {update ? <UpdateBook book={book} /> : <></>}
          </div>
        )}
      </div>
    </div>
  );
};
export default BookDetails;

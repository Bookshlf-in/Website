import React, {useState} from "react";
import axios from "../../axios";
import {Link} from "react-router-dom";
import BookDetails from "./BookDetails";
import Fade from "@material-ui/core/Fade";

function BookVerification() {
  const [books, setbooks] = useState(null);
  const [filteredbooks, setfilteredbooks] = useState(null);
  const [totalPages, settotalPages] = useState(0);
  const [page, setpage] = useState(1);
  const [load, setload] = useState(false);
  const [checked, setChecked] = useState(false);
  const [open, setopen] = useState(null);
  const [rejectmsg, setrejectmsg] = useState("");
  const handleChange = () => {
    setChecked((prev) => !prev);
    setopen(null);
    setrejectmsg("");
  };

  const getBooks = async () => {
    setload(true);
    axios
      .get("/admin-getBookList", {
        params: {page: 1, noOfBooksInOnePage: 10},
      })
      .then((response) => {
        setbooks(response.data.data);
        console.log(response.data.data);
        settotalPages(response.data.totalPages);
        setfilteredbooks(
          response.data.data.filter(
            (book) =>
              book.isApproved === false && book.status !== "Approval rejected"
          )
        );
        setload(false);
      })
      .catch((error) => {
        setload(false);
      });
  };
  const ApproveBook = (e, id) => {
    e.target.innerHTML = "Approving...";
    axios
      .post("/admin-approveBook", {
        bookId: id,
      })
      .then((response) => {
        console.log(response.data.msg);
        setfilteredbooks(
          filteredbooks.filter(
            (book) => book._id !== id && book.status !== "Approval rejected"
          )
        );
        e.target.innerHTML = "Approved";
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
          setfilteredbooks(
            filteredbooks.filter(
              (book) => book._id !== id && book.status !== "Approval rejected"
            )
          );
          handleChange();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
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
        books.filter((book) => book._id !== id);
        setfilteredbooks(
          filteredbooks.filter(
            (book) => book._id !== id && book.status !== "Approval rejected"
          )
        );
        e.target.innerHTML = "Delete";
      })
      .catch((error) => {
        console.log(error.response.data);
        e.target.innerHTML = "Error Occured!";
        setTimeout(() => {
          e.target.innerHTML = "Delete";
        }, 3000);
      });
  };
  const LoadMore = () => {
    if (page + 1 <= totalPages) {
      axios
        .get("/admin-getBookList", {
          params: {page: page + 1, noOfBooksInOnePage: 10},
        })
        .then((response) => {
          setbooks(books.concat(response.data.data));
          console.log(response.data.data);
          setpage(page + 1);
          settotalPages(response.data.totalPages);
          setfilteredbooks(
            books
              .concat(response.data.data)
              .filter(
                (book) =>
                  book.isApproved === false &&
                  book.status !== "Approval rejected"
              )
          );
        })
        .catch((error) => {});
    }
  };
  return (
    <div className="bv-cont">
      <button
        type="submit"
        className="findprofile-email-button"
        onClick={(e) => {
          e.preventDefault();
          getBooks();
        }}
      >
        Fetch Books / Update
      </button>
      <br />
      <select
        className="bv-btns"
        onChange={(e) => {
          if (books) {
            if (e.target.value === "Unverified") {
              setfilteredbooks(
                books.filter(
                  (book) =>
                    book.isApproved === false &&
                    book.status !== "Approval rejected"
                )
              );
            } else {
              setfilteredbooks(
                books.filter(
                  (book) =>
                    book.isApproved === true &&
                    book.status !== "Approval rejected"
                )
              );
            }
          }
        }}
      >
        <option value="Unverified">Not Approved</option>
        <option value="Verified">Approved</option>
      </select>

      <div className="bv-items-cont">
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
          <>
            {filteredbooks ? (
              <>
                {filteredbooks.map((book, i) => (
                  <div className="bv-items-inner-cont" key={i}>
                    <div
                      className="Delete-book"
                      onClick={(e) => {
                        deleteBook(e, book._id);
                      }}
                    >
                      Delete
                    </div>
                    <div className="bv-item1">
                      <div className="search-book">
                        <div className="search-book-pic">
                          <img
                            src={book.photos[0]}
                            alt={book.title}
                            title={book.title}
                            height="100%"
                            width="100%"
                            className="bs-image"
                          />
                        </div>
                        <div className="search-book-details">
                          <p className="details-para1">{book.title}</p>
                          <p className="details-para3">
                            {book.author} Edition : {book.editionYear}
                          </p>
                          <p className="details-para4">
                            <i className="fas fa-rupee-sign" />
                            &nbsp;{book.price}&nbsp;/-
                          </p>
                          <div
                            title="View Book Details"
                            className="book-more-details"
                          >
                            <Link to={`/AdminBook/${book._id}`}>
                              More Details&nbsp;
                              <i className="fas fa-angle-double-right" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bv-item2">
                      <div
                        className={`bv-verify ${
                          book.isApproved
                            ? "verified-user"
                            : "non-verified-user"
                        }`}
                        title="Click to Approve the book"
                        onClick={(e) => {
                          ApproveBook(e, book._id);
                        }}
                      >
                        {book.isApproved ? "Approved" : "Not Approved"}
                      </div>
                      <>
                        {book.isApproved === false ? (
                          <>
                            <div
                              className="bv-verify reject-book"
                              onClick={(e) => {
                                e.preventDefault();
                                handleChange();
                                setopen(book._id);
                              }}
                              style={{
                                display:
                                  checked && book._id === open ? "none" : "",
                              }}
                            >
                              Reject
                            </div>
                            <Fade
                              in={checked && book._id === open}
                              style={{
                                display: !(checked && book._id === open)
                                  ? "none"
                                  : "",
                                marginLeft: "10px",
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
                                    RejectBook(e, book._id);
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
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
      {page + 1 <= totalPages ? (
        <button onClick={() => LoadMore()}>More</button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default BookVerification;

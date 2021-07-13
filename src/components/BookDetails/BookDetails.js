import {React, useState, useEffect} from "react";
import "./BookDetails.css";
import {Link, useParams} from "react-router-dom";
import Booksnaps from "./Booksnaps";
import Bookfullsnap from "./Bookfullsnap";
import BookDesc from "./BookDesc";
import axios from "../../axios";
const BookDetails = (props) => {
  const params = useParams();
  const bookId = params.bookId;
  const [book, setbook] = useState({});

  // loader states
  const [loader, setloader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = `/getBookDetails?bookId=${bookId}`;
      axios.get(url).then((response) => {
        setbook(response.data);
        console.log(response.data);
        setloader(false);
      });
    }
    fetchData();
  }, []);

  return (
    <div>
      {/* Loader */}
      <div className="page-loader" style={{display: loader ? "flex" : "none"}}>
        <div
          className="page-loading"
          style={{display: loader ? "block" : "none"}}
        ></div>
      </div>

      {/* Component */}
      {!loader ? (
        <div className="book-details-bg">
          <div
            style={{display: loader ? "none" : "flex"}}
            className="book-main-container"
          >
            <Booksnaps snaps={book.photos} video={book.embedVideo} />
            <Bookfullsnap url={book.photos[0]}/>
            <BookDesc bookdetails={book} />
          </div>
          <div
            className="book-purchase-container"
            style={{display: loader ? "none" : "flex"}}
          >
            <div className="wish-list">
              <span>
                <i className="far fa-heart"></i>
              </span>
              <input type="submit" value="Add to Wish List" />
            </div>
            <div className="add-to-cart">
              <span>
                <i className="fas fa-cart-arrow-down" />
              </span>
              <input type="submit" value="Add to Cart" />
            </div>
            <div className="buy-now-button">
              <span>
                <i className="fas fa-shopping-basket" />
              </span>
              <input type="submit" value="Buy Now" />
            </div>
            <div className="recommened-tags">
              <h3>Recommended Tags</h3>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default BookDetails;

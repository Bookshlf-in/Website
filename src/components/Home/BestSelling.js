import { React, useState, useEffect } from "react";
import "./BestSelling.css";
import { Link } from "react-router-dom";
import axios from "../../axios";

function BestSelling() {
  const [bestbooks, setbestbooks] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      axios.get("/search?q=tag:ALL&page=1").then((response) => {
        while (response.data.data.length > 4) {
          response.data.data.pop();
        }
        setbestbooks(response.data.data);
        // console.log(response.data.data);
      });
    };
    fetch();
  }, []);
  return (
    <div className="BestSelling">
      <div className="best-container">
        <div className="bs-header">
          <h1 className="header-heading">Best Selling Books</h1>
          <p className="header-viewall">
            <Link to="/SearchResult/tag:ALL">
              View All&nbsp;
              <i className="fas fa-angle-right" />
            </Link>
          </p>
        </div>
        <div className="bs-books">
          {bestbooks ? (
            <>
              {bestbooks.map((book, i) => (
                <Link to={`/BookDetails/${book._id}`}>
                <div className="book book1" key={i}>
                  <div className="book-pic">
                    <img
                      src={book.photo}
                      alt=""
                      className="bs-image"
                      height="200px"
                    />
                  </div>
                  <div className="book-details">
                    <p className="details-para1">{book.title}</p>
                    <p className="details-para2">{book.description}</p>
                    <p className="details-para3">{book.author}</p>
                    <p className="details-para4">
                      <i className="fas fa-rupee-sign" />
                      {" " + book.price + "/-"}
                    </p>
                  </div>
                </div>
                </Link>
              ))}
            </>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default BestSelling;

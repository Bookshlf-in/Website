import React from "react";
import "./SearchResult.css";
import {Link} from "react-router-dom";

function SearchResult() {
  var searchnumber = 159;
  var productWrapper = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div className="search-results-container">
      <div className="search-results-header">
        Found {searchnumber} search results.
      </div>
      <div className="search-results-main">
        {/* a particular search result*/}
        <Link to="/BookDetails">
          <div className="product-search-result">
            <h1 className="book-price-tag">
              <i className="fas fa-rupee-sign" />
              &nbsp;540/-
            </h1>
            <div style={productWrapper}>
              <img
                src="./images/book1.jpg"
                alt=""
                height="200px"
                width="150px"
              />
              <h3>Book Name</h3>
              <p>Collins English Learning book</p>
            </div>
          </div>
        </Link>
        {/* a particular search result*/}
        <Link to="">
          <div className="product-search-result">
            <h1 className="book-price-tag">
              <i className="fas fa-rupee-sign" />
              &nbsp;540/-
            </h1>
            <div style={productWrapper}>
              <img
                src="./images/book1.jpg"
                alt=""
                height="200px"
                width="150px"
              />
              <h3>Book Name</h3>
              <p>Book Details</p>
            </div>
          </div>
        </Link>
        {/* a particular search result*/}
        <Link to="">
          <div className="product-search-result">
            <h1 className="book-price-tag">
              <i className="fas fa-rupee-sign" />
              &nbsp;540/-
            </h1>
            <div style={productWrapper}>
              <img
                src="./images/book1.jpg"
                alt=""
                height="200px"
                width="150px"
              />
              <h3>Book Name</h3>
              <p>Book Details</p>
            </div>
          </div>
        </Link>
        {/* a particular search result*/}
        <Link to="">
          <div className="product-search-result">
            <h1 className="book-price-tag">
              <i className="fas fa-rupee-sign" />
              &nbsp;540/-
            </h1>
            <div style={productWrapper}>
              <img
                src="./images/book1.jpg"
                alt=""
                height="200px"
                width="150px"
              />
              <h3>Book Name</h3>
              <p>Book Details</p>
            </div>
          </div>
        </Link>
        {/* a particular search result*/}
        <Link to="">
          <div className="product-search-result">
            <h1 className="book-price-tag">
              <i className="fas fa-rupee-sign" />
              &nbsp;540/-
            </h1>
            <div style={productWrapper}>
              <img
                src="./images/book1.jpg"
                alt=""
                height="200px"
                width="150px"
              />
              <h3>Book Name</h3>
              <p>Book Details</p>
            </div>
          </div>
        </Link>
        {/* a particular search result*/}
        <Link to="">
          <div className="product-search-result">
            <h1 className="book-price-tag">
              <i className="fas fa-rupee-sign" />
              &nbsp;540/-
            </h1>
            <div style={productWrapper}>
              <img
                src="./images/book1.jpg"
                alt=""
                height="200px"
                width="150px"
              />
              <h3>Book Name</h3>
              <p>Book Details</p>
            </div>
          </div>
        </Link>
        {/* a particular search result*/}
        <Link to="">
          <div className="product-search-result">
            <h1 className="book-price-tag">
              <i className="fas fa-rupee-sign" />
              &nbsp;540/-
            </h1>
            <div style={productWrapper}>
              <img
                src="./images/book1.jpg"
                alt=""
                height="200px"
                width="150px"
              />
              <h3>Book Name</h3>
              <p>Book Details</p>
            </div>
          </div>
        </Link>
        {/* a particular search result*/}
        <Link to="">
          <div className="product-search-result">
            <h1 className="book-price-tag">
              <i className="fas fa-rupee-sign" />
              &nbsp;540/-
            </h1>
            <div style={productWrapper}>
              <img
                src="./images/book1.jpg"
                alt=""
                height="200px"
                width="150px"
              />
              <h3>Book Name</h3>
              <p>Book Details</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default SearchResult;

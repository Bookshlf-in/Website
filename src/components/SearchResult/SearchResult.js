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
        <Link to="/BookDetails" className="search-result-link">
          
          {/* best Selling book Component starts*/}
          <div className="book book1">
            <div className="book-pic">
              <img src="/images/best_selling/search_result.jpg" alt="" srcset="" className="bs-image" />
            </div>
            <div className="book-details">
              <p className="details-para1">PAPERBACK</p>
              <p className="details-para2">
              Easy Learning English Vocabulary (Collins Easy Learning English)
              </p>
              <p className="details-para3">Collins Dictionaries</p>
              <p className="details-para4">$29</p>
              
            </div>
            <div className="hidden-items">
                  <p className="cart">Add To Cart</p>
                  <i class="fas fa-arrows-alt-h hidden-items-arrow"></i>
                  <i class="far fa-heart hidden-items-like"></i>
              </div>
          </div>
          {/* best Selling Component Ends */}
          {/* ===================== */}
        </Link>
      </div>
    </div>
  );
}
export default SearchResult;

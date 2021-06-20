import React from "react";
import "./SearchResult.css";
import {Link} from "react-router-dom";

function SearchResult() {
  return (
    <div className="search-results-container">
      <div className="search-results-header"></div>
      <div className="search-results-main">
        {/* a particular search result*/}
        <div className="product-search-result">
          <img src="" alt="" />
          <h3>Book Name</h3>
        </div>
        {/* a particular search result*/}
        <div className="product-search-result"></div>
        {/* a particular search result*/}
        <div className="product-search-result"></div>
      </div>
    </div>
  );
}
export default SearchResult;

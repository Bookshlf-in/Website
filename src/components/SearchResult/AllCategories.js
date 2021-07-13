import {React, useState, useEffect} from "react";
import "./AllCategories.css";
import {Link} from "react-router-dom";
import axios from "../../axios";

const AllCategories = () => {
  // states
  const [search, setsearch] = useState("");
  const [wish, setwish] = useState(false);

  // temporary state
  const bookId = "60ec0d3a152ad90022aa3c16";
  return (
    <div className="AllCategories">
      <div className="AllCategories-cont">
        <div className="AllCategories-search">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setsearch(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                console.log("Start Search API");
              }
            }}
            placeholder="Search.."
            className="AllCategories-input"
          />
          <button
            type="button"
            className="Search-button"
            onClick={(e) => {
              e.preventDefault();
              console.log("Start Search API");
            }}
          >
            Search
          </button>
        </div>
        <div className="filter-result">
          <div className="filter-order filter">
            <select className="select">
              <option value=""> School</option>
              <option value="">CBSE</option>
              <option value="">ICSC</option>
              <option value="">State Board</option>
              <option value="">IB</option>
              <option value="">NCERT</option>
            </select>
          </div>
          <div className="filter-order filter">
            <select className="select">
              <option value=""> Competitive Exams</option>
              <option value="">JEE Mains</option>
              <option value="">JEE Advanced</option>
              <option value="">NEET UG</option>
            </select>
          </div>
          <div className="filter-order filter">
            <select className="select">
              <option value="">Latest</option>
              <option value="">High Rating</option>
              <option value="">Low Rating</option>
            </select>
          </div>
          <div className="filter-sort filter">
            <select className="select">
              <option value="">Default</option>
              <option value="">Sort by popularity</option>
              <option value="">Sort by newness</option>
              <option value="">Price High to Low</option>
              <option value="">Price Low to High</option>
            </select>
          </div>
          <div className="filter-language filter">
            <select className="select">
              <option value="">English</option>
              <option value="">Hindi</option>
            </select>
          </div>
        </div>
        {/* ================================================================== */}
        <div className="bs-books">
          <div className="book book1">
            <div className="book-pic">
              <img
                src="/images/best_selling/bs2.jpg"
                alt=""
                className="bs-image"
              />
            </div>
            <div className="book-details">
              <p className="details-para1">Book Name</p>
              <p className="details-para2">Book Description...</p>
              <p className="details-para3">Author Name</p>
              <p className="details-para4">
                <i className="fas fa-rupee-sign" />
                &nbsp;Price
              </p>
            </div>
            <div className="book-tags">
              <span className="tag" title="tag1">
                Tag1
              </span>
              <span className="tag" title="tag2">
                Tag2
              </span>
              <span className="tag" title="tag3">
                Tag3
              </span>
            </div>
            <div className="hidden-items">
              <p className="cart" title="Add item to cart">
                Add To Cart
              </p>
              <i className="fas fa-arrows-alt-h" />
              <i
                className={wish ? "fas fa-heart " : "far fa-heart"}
                title="Add to Wishlist"
                onClick={(e) => {
                  setwish(!wish);
                  console.log(e.target.className);
                }}
              />
            </div>
            <div title="View Book Details" className="book-more-details">
              <Link to={`/BookDetails/${bookId}`}>
                More Details&nbsp;
                <i className="fas fa-angle-double-right" />
              </Link>
            </div>
          </div>
        </div>
        {/* ======================================================== */}
        {/* more loading */}
        <div className="loadMore">
          <button className="loadMore-btn">
            More&nbsp;
            <i className="fas fa-caret-down" />
            &nbsp;
            <i
              className="fas fa-circle-notch"
              style={{
                display: true ? "none" : "inline-block",
                animation: "spin 2s linear infinite",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllCategories;

import React, {Component} from "react";
import "./AllCategories.css";
import {Link} from "react-router-dom";

export class AllCategories extends Component {
  render() {
    return (
      <div className="AllCategories">
        <div className="AllCategories-cont">
          <div className="AllCategories-search">
            <input
              type="text"
              placeholder="Search.."
              className="AllCategories-input"
            />
            <button type="button" className="Search-button">
              Search
            </button>
          </div>
          <ul>
            <li>
              <div className="navbar-items-chip">
                <div className="dropdown">
                  <button className="dropbtn">
                    Entrance Exam&nbsp;
                    <i className="fas fa-caret-down" />
                  </button>
                  <div className="dropdown-content">
                    <Link to="">JEE Mains</Link>
                    <Link to="">JEE Advanced</Link>
                    <Link to="">NEET</Link>
                    <Link to="">CAT</Link>
                    <Link to="">CLAT</Link>
                    <Link to="">NDA</Link>
                    <Link to="">GATE</Link>
                    <Link to="">NATA</Link>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="navbar-items-chip">
                <div className="dropdown">
                  <button className="dropbtn">
                    Competitive Exam&nbsp;
                    <i className="fas fa-caret-down" />
                  </button>
                  <div className="dropdown-content">
                    <Link to="">UPSC</Link>
                    <Link to="">MPPSC</Link>
                    <Link to="">SSC</Link>
                    <Link to="">CDE</Link>
                    <Link to="">RRB JE</Link>
                    <Link to="">FCI</Link>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="navbar-items-chip">
                <div className="dropdown">
                  <button className="dropbtn">
                    School&nbsp;
                    <i className="fas fa-caret-down" />
                  </button>
                  <div className="dropdown-content">
                    <Link to="">CBSE</Link>
                    <Link to="">ICSE</Link>
                    <Link to="">IB</Link>
                    <Link to="">State Board</Link>
                    <Link to="">NCERT</Link>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="navbar-items-chip">
                <div className="dropdown">
                  <button className="dropbtn">
                    Novels&nbsp;
                    <i className="fas fa-caret-down" />
                  </button>
                  <div className="dropdown-content">
                    <Link to="">Science-Fiction</Link>
                    <Link to="">Fantasy</Link>
                    <Link to="">Mysteries</Link>
                    <Link to="">Western</Link>
                    <Link to="">Horror</Link>
                    <Link to="">Thrillers</Link>
                    <Link to="">Romance</Link>
                    <Link to="">Historical</Link>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="navbar-items-chip">
                <div className="dropdown">
                  <button className="dropbtn">
                    Other&nbsp;
                    <i className="fas fa-caret-down" />
                  </button>
                  <div className="dropdown-content">
                    <Link to="">Classics</Link>
                    <Link to="">Detective and Mystery</Link>
                    <Link to="">Historical Fiction</Link>
                    <Link to="">Short Stories</Link>
                    <Link to="">Biographies </Link>
                    <Link to="">Cookbooks </Link>
                    <Link to="">Memoir </Link>
                    <Link to="">Poetry</Link>
                    <Link to="">Self-Help</Link>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="filter-result">
            <div className="filter-order filter">
              {/* <p>
                Order
              </p> */}
              <select className="select">
                <option value="">Latest</option>
                <option value="">High Rating</option>
                <option value="">Low Rating</option>
              </select>
            </div>
            <div className="filter-sort filter">
              {/* <p>
                Sorting
              </p> */}
              <select className="select">
                <option value="">Default Sorting</option>
                <option value="">Sort by popularity</option>
                <option value="">Sort by newness</option>
                <option value="">High to Low</option>
                <option value="">Low to High</option>
              </select>
            </div>
            <div className="filter-language filter">
              {/* <p>
                Language
              </p> */}
              <select className="select">
                <option value="">English</option>
                <option value="">Hindi</option>
                <option value="">French</option>
                <option value="">German</option>
                <option value="">Spanish</option>
                <option value="">Turkish</option>
              </select>
            </div>
          </div>
          <div className="bs-books">
            {/* best Selling book Component starts*/}
            <div className="book book1">
              <div className="book-pic">
                <img
                  src="/images/best_selling/bs2.jpg"
                  alt=""
                  className="bs-image"
                />
              </div>
              <div className="book-details">
                <p className="details-para1">PAPERBACK</p>
                <p className="details-para2">
                  Think Like a Monk: Train Your Mind for Peace and...
                </p>
                <p className="details-para3">Jay Shetty</p>
                <p className="details-para4">$29</p>
              </div>
              <div className="hidden-items">
                <p className="cart">Add To Cart</p>
                <i className="fas fa-arrows-alt-h"></i>
                <i className="far fa-heart"></i>
              </div>
            </div>
            {/* best Selling Component Ends */}
            {/* ===================== */}
            <div className="book book1">
              <div className="book-pic">
                <img
                  src="/images/best_selling/bs3.jpg"
                  alt=""
                  className="bs-image"
                />
              </div>
              <div className="book-details">
                <p className="details-para1">KINDLE EDITION</p>
                <p className="details-para2">
                  The Last Sister (Columbia River Book 1)
                </p>
                <p className="details-para3">Kelly Harms</p>
                <p className="details-para4">$29</p>
              </div>
              <div className="hidden-items">
                <p className="cart">Add To Cart</p>
                <i className="fas fa-arrows-alt-h"></i>
                <i className="far fa-heart"></i>
              </div>
            </div>
            {/* =================== */}
            <div className="book book1">
              <div className="book-pic">
                <img
                  src="/images/best_selling/bs1.jpg"
                  alt=""
                  className="bs-image"
                />
              </div>
              <div className="book-details">
                <p className="details-para1">PAPERBACK</p>
                <p className="details-para2">All You Can Ever Know: A Memoir</p>
                <p className="details-para3">Jay Shetty</p>
                <p className="details-para4">$29</p>
              </div>
              <div className="hidden-items">
                <p className="cart">Add To Cart</p>
                <i className="fas fa-arrows-alt-h"></i>
                <i className="far fa-heart"></i>
              </div>
            </div>
            {/* =================== */}
            <div className="book book1">
              <div className="book-pic">
                <img
                  src="/images/best_selling/bs4.jpg"
                  alt=""
                  className="bs-image"
                />
              </div>
              <div className="book-details">
                <p className="details-para1">KINDLE EDITION</p>
                <p className="details-para2">The Overdue Life of Amy Byler</p>
                <p className="details-para3">Kelly Harms</p>
                <p className="details-para4">$29</p>
              </div>
              <div className="hidden-items">
                <p className="cart">Add To Cart</p>
                <i className="fas fa-arrows-alt-h"></i>
                <i className="far fa-heart"></i>
              </div>
            </div>
            {/* =================== */}
          </div>
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
  }
}

export default AllCategories;

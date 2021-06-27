import React from "react";
import {Link} from "react-router-dom";

// all book details that will be fetched and stored from api
var bookdetails = {
  bookname: "Book Full Name",
  isbn: "9783161484100",
  edition: 11.3,
  rating: 5,
  mrp: 900,
  sp: 450,
  discount: 50,
  sellerRating: 4.5,
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, explicabo aliquam. A maiores, dolorem ad provident pariatur quas odio impedit.",
};

// Rating generator function
function colorratings(ratings1, ratings2, id1, id2) {
  let parent1 = document.getElementById(id1);
  let parent2 = document.getElementById(id2);
  let r = parseInt(ratings1);
  if (r <= 1) {
    parent1.style.color = "red";
  } else if (r <= 2) {
    parent1.style.color = "rgb(255, 123, 0)";
  } else if (r <= 3) {
    parent1.style.color = "rgb(255, 217, 0)";
  } else if (r <= 4) {
    parent1.style.color = "rgb(166, 255, 0)";
  } else {
    parent1.style.color = "rgb(30, 255, 0)";
  }
  r = parseInt(ratings2);
  if (r <= 1) {
    parent2.style.color = "red";
  } else if (r <= 2) {
    parent2.style.color = "rgb(255, 123, 0)";
  } else if (r <= 3) {
    parent2.style.color = "rgb(255, 217, 0)";
  } else if (r <= 4) {
    parent2.style.color = "rgb(166, 255, 0)";
  } else {
    parent2.style.color = "rgb(30, 255, 0)";
  }
}

function BookDesc() {
  return (
    <div className="book-description">
      <div className="book-fullname">
        <h1>{bookdetails.bookname}</h1>
      </div>
      <div className="book-subheading">
        <span className="book-isbn">
          <i class="fas fa-atlas" />
          &nbsp;ISBN&nbsp;:&nbsp;<b>{bookdetails.isbn}</b>
        </span>
        <span className="book-edition">
          Edition&nbsp;<b>{bookdetails.edition}</b>
        </span>
      </div>
      <div className="about-book">
        <span className="book-rating" id="book-rating">
          {[...Array(parseInt(bookdetails.rating))].map(() => {
            return <i className="fas fa-star"></i>;
          })}
          {[...Array(1)].map(() => {
            if (Number.isInteger(bookdetails.rating)) {
              return <i></i>;
            }
            return <i className="fas fa-star-half-alt"></i>;
          })}
        </span>
        <span className="book-cutomer-reviews">
          <Link to="">Customer Reviews</Link>
        </span>
      </div>
      <div className="book-selling">
        <div className="book-mrp">
          MRP :{" "}
          <b>
            <i className="fas fa-rupee-sign" /> {bookdetails.mrp}/-
          </b>
        </div>
        <div className="book-selling-price">
          Selling price :{" "}
          <b>
            <i className="fas fa-rupee-sign" /> {bookdetails.sp}/-
          </b>
        </div>
        <div className="book-savings">
          Total Discount : <b>{bookdetails.discount}%</b>
        </div>
      </div>
      <div className="book-other-details">
        <h2> Book Description</h2>
        <p>{bookdetails.description}</p>
      </div>
      <div className="book-tags">
        <Link to="" className="tag">
          JEE Mains
        </Link>
        <Link to="" className="tag">
          Maths
        </Link>
        <Link to="" className="tag">
          Best Seller
        </Link>
      </div>
      <div className="book-seller">
        <div className="book-seller-name">
          <Link to="/SellerProfile">AKD Verma</Link>
        </div>
        <div className="book-seller-rating" id="book-seller-rating">
          {[...Array(parseInt(bookdetails.sellerRating))].map(() => {
            return <i className="fas fa-star"></i>;
          })}
          {[...Array(1)].map(() => {
            if (Number.isInteger(bookdetails.sellerRating)) {
              return <i></i>;
            }
            return <i className="fas fa-star-half-alt"></i>;
          })}
          {
            (window.onload = () => {
              colorratings(
                bookdetails.rating,
                bookdetails.sellerRating,
                "book-rating",
                "book-seller-rating"
              );
            })
          }
        </div>
      </div>
    </div>
  );
}
export default BookDesc;

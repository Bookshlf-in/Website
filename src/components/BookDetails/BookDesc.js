import {React, useState, useEffect} from "react";
import {Link} from "react-router-dom";

function BookDesc(props) {
  return (
    <div className="book-description">
      <div className="book-fullname">
        <h1>{props.bookdetails.title}</h1>
      </div>
      <div className="book-subheading">
        <span className="book-isbn">
          <i className="fas fa-atlas" />
          &nbsp;ISBN&nbsp;:&nbsp;<b>{props.bookdetails.ISBN}</b>
        </span>
        <span className="book-edition">
          Edition&nbsp;:&nbsp;<b>{props.bookdetails.editionYear}</b>
        </span>
      </div>
      <div className="about-book">
        <span className="book-rating" id="book-rating">
          {/* {[...Array(parseInt(5))].map(() => {
            return <i className="fas fa-star"></i>;
          })}
          {[...Array(1)].map(() => {
            if (Number.isInteger(1)) {
              return <i></i>;
            }
            return <i className="fas fa-star-half-alt"></i>;
          })} */}
        </span>
        {/* <span className="book-cutomer-reviews">
          <Link to="#">Customer Reviews</Link>
        </span> */}
      </div>
      <div className="book-selling">
        <div className="book-mrp">
          MRP :{" "}
          <b>
            <i className="fas fa-rupee-sign" /> {props.bookdetails.MRP}/-
          </b>
        </div>
        <div className="book-selling-price">
          Selling price :{" "}
          <b>
            <i className="fas fa-rupee-sign" /> {props.bookdetails.price}/-
          </b>
        </div>
        <div className="book-savings">
          Total Discount :{" "}
          <b>
            {Math.round(
              ((props.bookdetails.MRP - props.bookdetails.price) /
                props.bookdetails.MRP) *
                100
            )}
            &nbsp;%
          </b>
        </div>
      </div>
      <div className="book-other-details">
        <h2> Book Description</h2>
        <p>{props.bookdetails.description}</p>
      </div>
      <div className="book-tags">
        {props.bookdetails.tags && props.bookdetails.tags.length > 0 ? (
          <>
            {props.bookdetails.tags.map((tagname) => (
              <span className="tag" key={tagname}>
                {tagname}
              </span>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="book-seller">
        <div className="book-seller-name">
          <b style={{fontFamily: "PT Sans"}}>Seller</b>
          <br />
          <Link to="/SellerProfile">
            {props.bookdetails.seller
              ? props.bookdetails.seller.name
              : props.bookdetails.sellerName}
          </Link>
        </div>
        <div className="book-seller-rating" id="book-seller-rating">
          {/* {[...Array(parseInt(0))].map(() => {
            return <i className="fas fa-star"></i>;
          })}
          {[...Array(1)].map(() => {
            if (Number.isInteger(1)) {
              return <i></i>;
            }
            return <i className="fas fa-star-half-alt"></i>;
          })} */}
        </div>
      </div>
    </div>
  );
}
export default BookDesc;

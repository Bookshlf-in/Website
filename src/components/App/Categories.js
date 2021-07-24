import React from "react";
import "./Categories.css";
import {Link} from "react-router-dom";

function Categories() {
  return (
    <div className="categories">
      <div className="cont">
        <div className="heading-wrapper">
          <h1 className="heading">Featured Categories</h1>
          <p className="heading-para">
            <Link to="/SearchResult/books">
              All Categories&nbsp;
              <i className="fas fa-angle-right" />
            </Link>
          </p>
        </div>
        <div className="item-wrapper">
          <div className="item i1 ">
            <img
              src="/images/categories/jee_logo.png"
              className="item-image"
              alt=""
            />
            <h6 className="item-h6">JEE MAINS</h6>
            <p className="item-p">
              <Link to="/SearchResult/JEE Mains">Shop Now</Link>
            </p>
          </div>
          <div className="item i2">
            <img
              src="/images/categories/jee adv.png"
              className="item-image"
              alt=""
            />
            <h6 className="item-h6">JEE ADVANCED</h6>
            <p className="item-p">
              <Link to="/SearchResult/JEE Advanced">Shop Now</Link>
            </p>
          </div>
          <div className="item i3">
            <img
              src="/images/categories/cbse.png"
              className="item-image"
              alt=""
            />
            <h6 className="item-h6">CBSE</h6>
            <p className="item-p">
              <Link to="/SearchResult/CBSE">Shop Now</Link>
            </p>
          </div>
          <div className="item i4">
            <img
              src="/images/categories/health.png"
              className="item-image"
              alt=""
            />
            <h6 className="item-h6">NEET UG</h6>
            <p className="item-p">
              <Link to="/SearchResult/NEET">Shop Now</Link>
            </p>
          </div>
          <div className="item i5">
            <img
              src="/images/categories/biography.png"
              className="item-image"
              alt=""
            />
            <h6 className="item-h6">NOVELS</h6>
            <p className="item-p">
              <Link to="/SearchResult/Novels">Shop Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;

import React from "react";
import "./Categories.css";
import { Link } from "react-router-dom";

function Categories() {
  return (
    <div className="categories">
      <div className="cont">
        <div className="heading-wrapper">
          <h1 className="heading">Featured Categories</h1>
          <p className="heading-para">
            <Link to="/SearchResult/tag:ALL">
              All Categories&nbsp;
              <i className="fas fa-angle-right" />
            </Link>
          </p>
        </div>
        <div className="item-wrapper">
          <Link to="/SearchResult/tag:JEE Mains">
            <div className="item i1 ">
              <img
                src="/images/categories/jee_logo.png"
                className="item-image"
                alt=""
              />
              <h6 className="item-h6">JEE MAINS</h6>
              <p className="item-p">
                <Link to="/SearchResult/tag:JEE Mains">Shop Now</Link>
              </p>
            </div>
          </Link>
          <Link to="/SearchResult/tag:JEE Advanced">
            <div className="item i2">
              <img
                src="/images/categories/jee adv.png"
                className="item-image"
                alt=""
              />
              <h6 className="item-h6">JEE ADVANCED</h6>
              <p className="item-p">
                <Link to="/SearchResult/tag:JEE Advanced">Shop Now</Link>
              </p>
            </div>
          </Link>
          <Link to="/SearchResult/tag:CSBE">
            <div className="item i3">
              <img
                src="/images/categories/cbse.png"
                className="item-image"
                alt=""
              />
              <h6 className="item-h6">CBSE</h6>
              <p className="item-p">
                <Link to="/SearchResult/tag:CBSE">Shop Now</Link>
              </p>
            </div>
          </Link>
          <Link to="/SearchResult/tag:NEET">
            <div className="item i4">
              <img
                src="/images/categories/health.png"
                className="item-image"
                alt=""
              />
              <h6 className="item-h6">NEET UG</h6>
              <p className="item-p">
                <Link to="/SearchResult/tag:NEET">Shop Now</Link>
              </p>
            </div>
          </Link>
          <Link to="/SearchResult/tag:NOVELS">
            <div className="item i5">
              <img
                src="/images/categories/biography.png"
                className="item-image"
                alt=""
              />
              <h6 className="item-h6">NOVELS</h6>
              <p className="item-p">
                <Link to="/SearchResult/tag:Novel">Shop Now</Link>
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Categories;

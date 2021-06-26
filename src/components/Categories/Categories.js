import React from "react";
import "./Categories.css";
import { Link } from 'react-router-dom';

function Categories() {
  return (
    <div className="categories">
      <div className="cont">
        <div className="heading-wrapper">
          <h1 className="heading">Featured Categories</h1>
          <p className="heading-para">
          <Link to='/'>All Categories ></Link>
            </p>
        </div>
        <div className="item-wrapper">
          <div className="item i1">
              <img
                src="/images/categories/art.png"
                className="item-image"
                alt=""
              />
              <h6 className="item-h6">Arts & Photography</h6>
              <p className="item-p">
              <Link to='/'>Shop Now</Link>
              </p>
          </div>
          <div className="item i2">
            <img
              src="/images/categories/food.png"
              className="item-image"
              alt=""
            />
            <h6 className="item-h6">Food & Drink</h6>
              <p className="item-p">
              <Link to='/'>Shop Now</Link>
              </p>
          </div>
          <div className="item i3">
            <img
              src="/images/categories/romance.png"
              className="item-image"
              alt=""
            />
            <h6 className="item-h6">Romance</h6>
            <p className="item-p">
              <Link to='/'>Shop Now</Link>
              </p>
          </div>
          <div className="item i4">
            <img
              src="/images/categories/health.png"
              className="item-image"
              alt=""
            />
            <h6 className="item-h6">Health</h6>
            <p className="item-p">
              <Link to='/'>Shop Now</Link>
              </p>
          </div>
          <div className="item i5">
            <img
              src="/images/categories/biography.png"
              className="item-image"
              alt=""
            />
            <h6 className="item-h6">Biography</h6>
            <p className="item-p">
              <Link to='/'>Shop Now</Link>
              </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;

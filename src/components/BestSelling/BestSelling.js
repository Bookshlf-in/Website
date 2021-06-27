import React from "react";
import "./BestSelling.css";
import { Link } from 'react-router-dom';

function BestSelling() {
  return (
    <div className="BestSelling">
      <div className="best-container">
        <div className="bs-header">
          <h1 className="header-heading">Best Selling Books</h1>
          <p className="header-viewall">
            <Link to="/">View All > </Link>
          </p>
        </div>
        <div className="bs-books">
          <div className="book book1">
            <div className="book-pic">
              <img src="/images/best_selling/bs2.jpg" alt="" srcset="" className="bs-image" />
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
                  <i class="fas fa-arrows-alt-h"></i>
                  <i class="far fa-heart"></i>
              </div>
          </div>
          <div className="book book1">
            <div className="book-pic">
            <img src="/images/best_selling/bs3.jpg" alt="" srcset="" className="bs-image" />
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
                  <i class="fas fa-arrows-alt-h"></i>
                  <i class="far fa-heart"></i>
              </div>
          </div>
          <div className="book book1">
            <div className="book-pic">
            <img src="/images/best_selling/bs1.jpg" alt="" srcset="" className="bs-image" />
            </div>
            <div className="book-details">
              <p className="details-para1">PAPERBACK</p>
              <p className="details-para2">All You Can Ever Know: A Memoir</p>
              <p className="details-para3">Jay Shetty</p>
              <p className="details-para4">$29</p>
            </div>
              <div className="hidden-items">
                  <p className="cart">Add To Cart</p>
                  <i class="fas fa-arrows-alt-h"></i>
                  <i class="far fa-heart"></i>
              </div>
          </div>
          <div className="book book1">
            <div className="book-pic">
            <img src="/images/best_selling/bs4.jpg" alt="" srcset="" className="bs-image" />
            </div>
            <div className="book-details">
              <p className="details-para1">KINDLE EDITION</p>
              <p className="details-para2">The Overdue Life of Amy Byler</p>
              <p className="details-para3">Kelly Harms</p>
              <p className="details-para4">$29</p>
            </div>
              <div className="hidden-items">
                  <p className="cart">Add To Cart</p>
                  <i class="fas fa-arrows-alt-h"></i>
                  <i class="far fa-heart"></i>
              </div>
          </div>
          <div className="book book1">
            <div className="book-pic">
            <img src="/images/best_selling/bs5.jpg" alt="" srcset="" className="bs-image" />
            </div>
            <div className="book-details">
              <p className="details-para1">KINDLE EDITION</p>
              <p className="details-para2">
                The Last Sister ( Columbia River Book 1 )
              </p>
              <p className="details-para3">Kelly Harms</p>
              <p className="details-para4">$29</p>
            </div>
              <div className="hidden-items">
                  <p className="cart">Add To Cart</p>
                  <i class="fas fa-arrows-alt-h"></i>
                  <i class="far fa-heart"></i>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestSelling;

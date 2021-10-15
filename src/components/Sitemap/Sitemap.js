import React from "react";

import "./Sitemap.css";

const routes = [
  { name: "Sell Old Books", path: "/SellerPanel/5" },
  { name: "Search for books", path: "/SearchResult/tag:ALL" },

  { name: "About", path: "/About" },
  { name: "Contact", path: "/Contact" },
  { name: "Blog", path: "/Blog" },

  { name: "Login", path: "/Login" },
  { name: "Signup", path: "/Signup" },
  { name: "Forgot Password", path: "/ForgotPassword" },
  { name: "Wishlist", path: "/Wishlist" },
  { name: "Receipt", path: "/Receipt" },
  { name: "Cart", path: "/Cart" },

  { name: "Sitemap", path: "/Sitemap" },
];

function Sitemap() {
  return (
    <div className="container">
      <div className="content">
        <h1>Bookshlf Sitemap</h1>
        <hr />

        <div className="links">
          {routes.map((route, i) => (
            <span key={i}>
              <a href={route.path}>{route.name}</a>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sitemap;

import React from "react";
import "./SellerPanel.css";
import AccountDetails from "./AccountDetails";
import {Link} from "react-router-dom";
import SideNav from "./PanelNavbar";
import Orders from "./Orders";
import Address from "./Address";
import Reviews from "./SellerReviews";
import AddBook from "./AddBook";
function SellerPanel() {
  return (
    <div className="SellerPanel-container">
      <div className="SellerPanel-navbar">
        <SideNav />
      </div>
      <AccountDetails visible="none" />
      <Orders visible="none" />
      <Address visible="none" />
      <Reviews visible="none" />
      <AddBook visible="flex" />
    </div>
  );
}
export default SellerPanel;

import React from "react";
import "./SellerPanel.css";
import AccountDetails from "./AccountDetails";
import {Link} from "react-router-dom";
import SideNav from "./PanelNavbar";
import Orders from "./Orders";
import Address from "./Address";
function SellerPanel() {
  return (
    <div className="SellerPanel-container">
      <div className="SellerPanel-navbar">
        <SideNav />
      </div>
      <AccountDetails visible="none" />
      <Orders visible="none" />
      <Address />
    </div>
  );
}
export default SellerPanel;

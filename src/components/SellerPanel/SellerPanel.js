import React from "react";
import "./SellerPanel.css";
import AccountDetails from "./AccountDetails";
import {Link} from "react-router-dom";
import SideNav from "./PanelNavbar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
function SellerPanel() {
  return (
    <div className="SellerPanel-container">
      <div className="SellerPanel-navbar">
        <SideNav />
      </div>
      <Switch>
        <Route path="Account">
          <AccountDetails />
        </Route>
      </Switch>
    </div>
  );
}
export default SellerPanel;

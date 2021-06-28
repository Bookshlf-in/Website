import {React, useState} from "react";
import "./SellerPanel.css";
import AccountDetails from "./AccountDetails";
import Orders from "./Orders";
import Address from "./Address";
import Reviews from "./SellerReviews";
import AddBook from "./AddBook";
function SellerPanel() {
  const [panel, setPanel] = useState(1);
  return (
    <div className="SellerPanel-container">
      <div className="SellerPanel-navbar">
        <div className="panel-nav-bg">
          <div className="panel-item" onClick={() => setPanel(1)}>
            <span>
              <i class="fas fa-user" />
            </span>
            <p>PROFILE</p>
          </div>
          <div className="panel-item" onClick={() => setPanel(2)}>
            <span>
              <i class="fas fa-clipboard-list" />
            </span>
            <p>ORDERS</p>
          </div>
          <div className="panel-item" onClick={() => setPanel(3)}>
            <span>
              <i class="fas fa-map-marker" />
            </span>
            <p>ADDRESS</p>
          </div>
          <div className="panel-item" onClick={() => setPanel(4)}>
            <span>
              <i class="far fa-comments" />
            </span>
            <p>REVIEWS</p>
          </div>
          <div className="panel-item" onClick={() => setPanel(5)}>
            <span>
              <i class="fas fa-book" />
              &nbsp;
              <i class="fas fa-plus" />
            </span>
            <p> ADD NEW BOOK</p>
          </div>
        </div>
      </div>
      {panel === 1 ? (
        <AccountDetails />
      ) : panel === 2 ? (
        <Orders />
      ) : panel === 3 ? (
        <Address />
      ) : panel === 4 ? (
        <Reviews />
      ) : (
        <AddBook />
      )}
    </div>
  );
}
export default SellerPanel;

import {React, useState, useContext, useEffect} from "react";
import "./SellerPanel.css";
import AccountDetails from "./AccountDetails";
import Orders from "./Orders";
import Address from "./Address";
import Reviews from "./SellerReviews";
import AddBook from "./AddBook";
import Register from "./SellerRegister";
import {UserContext} from "../../Context/userContext";
import {Link, useHistory} from "react-router-dom";

function SellerPanel() {
  // context states
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();

  // component states
  const [panel, setPanel] = useState(1);
  const [role, setRole] = useState(false);

  // loader states
  const [loader, setloader] = useState(true);
  const [play, setPlay] = useState(true);

  useEffect(() => {
    if (user !== null && user !== undefined) {
      setRole(user.roles.includes("seller"));
    }
  }, [user, role]);

  // loading Effect for better UI Performance
  useEffect(() => {
    setTimeout(() => {
      setloader(false);
      setPlay(false);
    }, 1500);
  }, [play]);

  return (
    <div>
      {/* Loader */}
      <div className="page-loader" style={{display: loader ? "flex" : "none"}}>
        <div
          className="page-loading"
          style={{display: loader ? "block" : "none"}}
        ></div>
      </div>

      {/* Components */}
      <div style={{display: loader ? "none" : "block"}}>
        {role === false ? (
          <Register />
        ) : (
          <div className="SellerPanel-container">
            <div className="SellerPanel-navbar">
              <div className="panel-nav-bg">
                <div className="panel-item" onClick={() => setPanel(1)}>
                  <span>
                    <i class="fas fa-user" />
                  </span>
                  <p>PROFILE</p>
                </div>
                <div
                  className="panel-item"
                  onClick={() => {
                    console.log(user);
                    setPanel(2);
                  }}
                >
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
            ) : panel === 2 && user !== null ? (
              <Orders />
            ) : panel === 3 && user !== null ? (
              <Address />
            ) : panel === 4 && user !== null ? (
              <Reviews />
            ) : user !== null ? (
              <AddBook />
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default SellerPanel;

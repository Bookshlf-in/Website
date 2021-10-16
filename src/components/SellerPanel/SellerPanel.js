import { React, useState, useContext, useEffect } from "react";
import "./SellerPanel.css";
import AccountDetails from "./AccountDetails";
import Orders from "./Orders";
import Address from "./Address";
import Reviews from "./SellerReviews";
import AddBook from "./AddBook";
import Register from "./SellerRegister";
import { UserContext } from "../../Context/userContext";
import { useHistory, useParams } from "react-router-dom";
import axios from "../../axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const SellerPanel = () => {
  // context states
  const [user] = useContext(UserContext);
  const history = useHistory();
  const params = useParams();

  // component states
  const [, setPanel] = useState(params.panel);
  const [role, setRole] = useState(false);

  // loader states
  const [loader, setloader] = useState(true);
  const [sellerDetails, setsellerDetails] = useState(null);
  const [Adr, setAdr] = useState(null);
  const [bookDetails, setbookDetails] = useState(null);
  const [sellerId, setsellerId] = useState(null);
  const [sellerReview, setsellerReview] = useState(null);

  // getting sellerDetails
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("/getSellerProfile")
        .then((response) => {
          setsellerDetails(response.data);
          setsellerId(response.data._id);
          if (user.roles.includes("seller")) setRole(true);
          axios
            .get("/getAddressList")
            .then((response) => {
              response.data.sort((a, b) => {
                return a.updatedAt < b.updatedAt
                  ? 1
                  : a.updatedAt > b.updatedAt
                  ? -1
                  : 0;
              });
              setAdr(response.data);
              axios
                .get("/getBookList")
                .then((response) => {
                  setbookDetails(response.data);
                  axios
                    .get("/getSellerReviews", {
                      params: sellerId,
                    })
                    .then((response) => {
                      setsellerReview(response.data);
                      setloader(false);
                    })
                    .catch((error) => {
                      setloader(false);
                    });
                })
                .catch((error) => {
                  setloader(false);
                });
            })
            .catch((error) => {
              setloader(false);
            });
        })
        .catch((error) => {
          setloader(false);
        });
    };
    if (user) {
      fetchData();
    } else {
      setloader(false);
    }
  }, []);

  return (
    <div>
      {/* Loader */}
      <div
        className="page-loader"
        style={{ display: loader ? "flex" : "none" }}
      >
        <CircularProgress style={{ height: "80px", width: "80px" }} />
      </div>

      {/* Components */}
      <div style={{ display: loader ? "none" : "block" }}>
        {role === false || user === null ? (
          <Register />
        ) : (
          <div className="SellerPanel-container">
            <div className="SellerPanel-navbar">
              <div className="panel-nav-bg">
                <div
                  className="panel-item"
                  onClick={() => {
                    setPanel("1");
                    history.push("/SellerPanel/1");
                  }}
                >
                  <span>
                    <i className="fas fa-user" />
                  </span>
                  <p>PROFILE</p>
                </div>
                <div
                  className="panel-item"
                  onClick={() => {
                    setPanel("2");
                    history.push("/SellerPanel/2");
                  }}
                >
                  <span>
                    <i className="fas fa-clipboard-list" />
                  </span>
                  <p>YOUR BOOKS</p>
                </div>
                <div
                  className="panel-item"
                  onClick={() => {
                    setPanel("3");
                    history.push("/SellerPanel/3");
                  }}
                >
                  <span>
                    <i className="fas fa-map-marker" />
                  </span>
                  <p>ADDRESS</p>
                </div>
                <div
                  className="panel-item"
                  onClick={() => {
                    setPanel("4");
                    history.push("/SellerPanel/4");
                  }}
                >
                  <span>
                    <i className="far fa-comments" />
                  </span>
                  <p>REVIEWS</p>
                </div>
                <div
                  className="panel-item"
                  onClick={() => {
                    setPanel("5");
                    history.push("/SellerPanel/5");
                  }}
                >
                  <span>
                    <i className="fas fa-book" />
                    &nbsp;
                    <i className="fas fa-plus" />
                  </span>
                  <p> ADD NEW BOOK</p>
                </div>
              </div>
            </div>
            {params.panel === "1" && sellerDetails ? (
              <AccountDetails seller={sellerDetails} />
            ) : params.panel === "2" && bookDetails && Adr ? (
              <Orders books={bookDetails} address={Adr} />
            ) : params.panel === "3" && Adr ? (
              <Address address={Adr} />
            ) : params.panel === "4" && sellerReview ? (
              <Reviews reviews={sellerReview} />
            ) : params.panel === "5" && Adr ? (
              <AddBook address={Adr} />
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default SellerPanel;

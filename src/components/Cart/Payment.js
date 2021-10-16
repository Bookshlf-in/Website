import { React, useState, useEffect, useContext } from "react";
import "./Payment.css";
import { useHistory, useParams } from "react-router-dom";
import axios from "../../axios";
import { UserContext } from "../../Context/userContext";
import CircularProgress from "@material-ui/core/CircularProgress";
function Payment() {
  const history = useHistory();
  const params = useParams();
  const [type] = useState(params.type);
  // const [book, setbook] = useState({});
  const [user, setUser] = useContext(UserContext);

  const [items, setitems] = useState({});
  const [loader, setloader] = useState(true);
  const [stop, setstop] = useState(0);
  const [addressId, setaddressId] = useState("");
  const [Adr, setAdr] = useState(null);

  const [purchase, setPurchase] = useState({
    load: false,
    cls: "fas fa-spinner",
    msg: "Confirm Order",
  });

  useEffect(() => {
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
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (type === "cart") {
        axios
          .get("/checkoutCart")
          .then((response) => {
            console.log(response.data);
            console.log(response.data.items);
            setitems(response.data);
            for (let i = 0; i < response.data.items.length; i++) {
              console.log(response.data.items[i]);
              if (
                response.data.items[i].qty < response.data.items[i].purchaseQty
              ) {
                setstop(1);
              }
            }
            setloader(false);
          })
          .catch((error) => {
            setloader(false);
          });
      } else {
        console.log(`/checkoutbook?bookId=${type}&purchaseQty=1`);
        axios
          .get(`/checkoutbook?bookId=${type}&purchaseQty=1`)
          .then((response) => {
            console.log(response.data);
            if (response.data.qty < response.data.purchaseQty) {
              setstop(1);
            }
            setitems(response.data);

            setloader(false);
          })
          .catch((error) => {
            setloader(false);
          });
      }
    };
    fetchData();
  }, []);

  const handelPurchaseCart = () => {
    if (stop) {
      setPurchase({
        load: true,
        cls: "fas fa-exclamation-triangle",
        msg: "Some Items have gone out of Stock Please book again!",
      });
    } else {
      setPurchase({
        load: true,
        cls: "fas fa-spinner",
        msg: "Processing Your Order...",
      });
      axios
        .post("/purchaseCart", {
          customerAddressId: addressId,
        })
        .then((response) => {
          console.log(response.data);
          setPurchase({
            load: true,
            cls: "fas fa-check-circle",
            msg: "Order Placed Successfully!",
          });
          localStorage.setItem(
            "bookshlf_user",
            JSON.stringify({
              authHeader: user.authHeader,
              roles: user.roles,
              email: user.email,
              cartitems: 0,
              wishlist: user.wishlist,
            })
          );
          setUser({
            authHeader: user.authHeader,
            roles: user.roles,
            email: user.email,
            cartitems: 0,
            wishlist: user.wishlist,
          });
          setTimeout(() => {
            history.push("/UserProfile/2");
          }, 3000);
        })
        .catch((error) => {
          console.log(error.response.data.errors[0].error);
          setPurchase({
            load: true,
            cls: "fas fa-exclamation-triangle",
            msg:
              "Purchase Unsuccessfull! (" +
              error.response.data.errors[0].error +
              ")",
          });
        });
    }
  };

  const handelPurchaseBook = () => {
    if (stop) {
      setPurchase({
        load: true,
        cls: "fas fa-exclamation-triangle",
        msg: "Some Items have gone out of Stock Please book again!",
      });
    } else {
      setPurchase({
        load: true,
        cls: "fas fa-spinner",
        msg: "Processing Your Order...",
      });
      axios
        .post("/purchaseBook", {
          bookId: type,
          customerAddressId: addressId,
          purchaseQty: 1,
        })
        .then((response) => {
          console.log(response.data);
          setPurchase({
            load: true,
            cls: "fas fa-check-circle",
            msg: "Order Placed Successfully!",
          });
          setTimeout(() => {
            history.push("/UserProfile/2");
          }, 3000);
        })
        .catch((error) => {
          console.log(error.response.data);
          setPurchase({
            load: true,
            cls: "fas fa-exclamation-triangle",
            msg: "Purchase Unsuccessfull!",
          });
        });
    }
  };

  return (
    <div className="payment-cont">
      {loader ? (
        <div
          className="page-loader"
          style={{
            display: loader ? "flex" : "none",
            height: "100%",
          }}
        >
          <CircularProgress style={{ height: "80px", width: "80px" }} />
        </div>
      ) : (
        <>
          <div className="payment-cart">
            <div className="payment-cart-container">
              <h2>
                Shopping Cart
                <span className="price">
                  <i className="fas fa-cart-plus" /> <b>{items.totalItems}</b>
                </span>
              </h2>
              {items.totalItems ? (
                <>
                  {type === "cart" ? (
                    <>
                      {items.items.map((item) => (
                        <p key={item._id}>
                          <span className="checkout-book-title">
                            {item.title}
                          </span>
                          <span className="price">
                            <b>
                              <i className="fas fa-rupee-sign" />
                              &nbsp;{item.price}
                              &nbsp;X&nbsp;
                              {item.purchaseQty}
                            </b>
                          </span>
                        </p>
                      ))}
                    </>
                  ) : (
                    <>
                      <p>
                        {items.item.title}
                        <span className="price">
                          <b>
                            <i className="fas fa-rupee-sign" />
                            &nbsp;{items.item.price}
                            &nbsp;X&nbsp;
                            {1}
                          </b>
                        </span>
                      </p>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
              <hr />
              <p>
                Items Total
                <span className="price">
                  <b>
                    <i className="fas fa-rupee-sign" />
                    &nbsp;{items.itemsSubtotal}
                  </b>
                </span>
              </p>
              <p>
                Shipping Charges
                <span className="price">
                  <b>
                    <i className="fas fa-rupee-sign" />
                    &nbsp;{items.shippingCharges}
                  </b>
                </span>
              </p>
              <p>
                Payment Mode
                <span className="price">
                  <b>Pay On Delivery</b>
                </span>
              </p>
              <hr />
              <p>
                Order Total
                <span className="price">
                  <b>
                    <i className="fas fa-rupee-sign" />
                    &nbsp;{items.orderTotal}
                  </b>
                </span>
              </p>
            </div>
          </div>

          <div className="payment-address-wrapper">
            <form action="" className="payment-form">
              <div className="payment-row">
                <div className="billing-address">
                  <h1>Billing Address</h1>
                  <div className="add-book-field1">
                    <select
                      style={{
                        height: "50px",
                        width: "500px",
                        outline: "none",
                        fontFamily: "PT Sans",
                        paddingLeft: "10px",
                        backgroundColor: "white",
                        border: "1px solid rgba(0, 0, 0, 0.7)",
                      }}
                      onChange={(e) => {
                        // Check if selected add new address
                        // then navigate to page to add new address
                        if (e.target.value === "addNew") {
                          history.push("/UserProfile/4");
                          return;
                        }
                        setaddressId(e.target.value);
                      }}
                    >
                      <option> Select Address</option>
                      {Adr !== null ? (
                        <>
                          {Adr.map((adr, idx) => (
                            <option value={adr._id} key={idx}>
                              {adr.address}
                            </option>
                          ))}
                        </>
                      ) : (
                        <></>
                      )}
                      <option value="addNew"> Add Address</option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                className="payment-form-btn"
                onClick={(e) => {
                  e.preventDefault();
                  if (type === "cart") {
                    handelPurchaseCart();
                  } else {
                    handelPurchaseBook();
                  }
                }}
              >
                <i
                  className={purchase.cls}
                  style={
                    purchase.cls === "fas fa-spinner"
                      ? {
                          display: purchase.load ? "inline-block" : "none",
                          animation: "spin 2s linear infinite",
                        }
                      : {}
                  }
                />
                &nbsp;{purchase.msg}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Payment;

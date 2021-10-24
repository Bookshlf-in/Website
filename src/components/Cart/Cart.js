import { React, useState, useEffect, useContext } from "react";
import "./Cart.css";
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import { UserContext } from "../../Context/userContext";
import CircularProgress from "@material-ui/core/CircularProgress";
function Cart() {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const [cart, setcart] = useState([]);
  const [loader, setloader] = useState(true);
  const [amount, setamount] = useState(0);
  const [removingId, setremovingId] = useState("");
  const [checkout, setcheckout] = useState(false);
  var amt = 0;

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("/getCartList")
        .then((response) => {
          setcart(response.data);
          for (let i = 0; i < response.data.length; i++) {
            amt +=
              response.data[i].price *
              Math.min(response.data[i].purchaseQty, response.data[i].qty);
          }
          setamount(amt);
          // console.log(response.data.length);
          // console.log(response.data);
          setloader(false);
        })
        .catch((error) => {
          setcart([]);
          setloader(false);
        });
    };
    fetchData();
  }, []);

  const addItem = (id, maxx, price) => {
    var qty = Number.parseInt(document.getElementById(id).innerHTML);
    if (qty < maxx) {
      qty += 1;
      cart[id].purchaseQty = qty;
      amt = amount + price;
      setamount(amt);
      document.getElementById(id).innerHTML = qty;

      for (let i = 0; i < cart.length; i++) {
        const update = async () => {
          axios
            .post("/changeCartItemPurchaseQty", {
              cartItemId: cart[i]._id,
              purchaseQty: cart[i].purchaseQty,
            })
            .catch(() => {});
        };
        update();
      }
    }
  };
  const DeleteItem = (id, price) => {
    var qty = Number.parseInt(document.getElementById(id).innerHTML);
    if (qty > 1) {
      qty -= 1;
      cart[id].purchaseQty = qty;
      amt = amount - price;
      setamount(amt);
      document.getElementById(id).innerHTML = qty;

      for (let i = 0; i < cart.length; i++) {
        const update = async () => {
          axios
            .post("/changeCartItemPurchaseQty", {
              cartItemId: cart[i]._id,
              purchaseQty: cart[i].purchaseQty,
            })
            .catch(() => {});
        };
        update();
      }
    } else {
    }
  };

  const handelRemoveItem = (ID) => {
    setremovingId(ID);
    amt = 0;
    axios
      .delete("/deleteCartItem", {
        data: { bookId: ID },
      })
      .then((response) => {
        let memo = cart.filter((item) => ID !== item.bookId);
        setcart(memo);

        for (let i = 0; i < memo.length; i++) {
          amt += memo[i].price;
        }
        setamount(amt);
        localStorage.setItem(
          "bookshlf_user",
          JSON.stringify({
            authHeader: user.authHeader,
            roles: user.roles,
            email: user.email,
            cartitems: user.cartitems - 1,
            wishlist: user.wishlist,
          })
        );
        setUser({
          authHeader: user.authHeader,
          roles: user.roles,
          email: user.email,
          cartitems: user.cartitems - 1,
          wishlist: user.wishlist,
        });
      })
      .catch((err) => {});
  };

  const handelUpdateCart = () => {
    if (cart.length > 0) {
      setcheckout(true);
      for (let i = 0; i < cart.length; i++) {
        const update = async () => {
          axios
            .post("/changeCartItemPurchaseQty", {
              cartItemId: cart[i]._id,
              purchaseQty: cart[i].purchaseQty,
            })
            .then(() => {
              // console.log(i);
              if (i === cart.length - 1) {
                history.push("/Checkout/cart");
              }
            })
            .catch(() => {});
        };
        update();
      }
    }
  };

  return (
    <div className="cart-main">
      {user === null ? (
        <div
          style={{
            minHeight: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div>
            <i
              className="far fa-frown"
              style={{
                fontSize: "10em",
                color: "rgba(255,0,0,0.4)",
              }}
            />
            <br />
            <h1
              style={{
                fontSize: "3",
                color: "rgba(255,0,0,0.4)",
              }}
            >
              Please Login to See Your CartList!
            </h1>
          </div>
        </div>
      ) : (
        <>
          {/* Loader */}
          <div
            className="page-loader"
            style={{ display: loader ? "flex" : "none" }}
          >
            <CircularProgress style={{ height: "50px", width: "50px" }} />
          </div>

          <div
            className="cart-container-left"
            style={{ display: loader ? "none" : "block" }}
          >
            <h1 className="cart-title">
              <i className="fas fa-cart-arrow-down"></i>&nbsp;Cart
              <span className="cart-item-count">
                {user.cartitems}&nbsp;Items
              </span>
            </h1>

            {cart && cart.length ? (
              <>
                {cart.map((item, idx) => (
                  // Cart item starts
                  <div className="cart-item" key={idx}>
                    <div className="cart-item-img">
                      <img
                        src={item.photo}
                        alt={item.title}
                        height="150px"
                        width="150px"
                      />
                    </div>
                    <div className="cart-item-details">
                      <h2>{item.title}</h2>
                      <h3>Edition : {item.editionYear}</h3>
                      <h3>Author : {item.author}</h3>
                      <h4
                        onClick={() => {
                          handelRemoveItem(item.bookId);
                        }}
                        className="remove-item"
                      >
                        {removingId === item.bookId ? (
                          <CircularProgress
                            style={{
                              height: "20px",
                              width: "20px",
                              color: "white",
                            }}
                          />
                        ) : (
                          <>
                            <i className="fas fa-trash-alt" />{" "}
                            <span>Remove Item</span>
                          </>
                        )}
                      </h4>
                      <h4
                        className="cart-More"
                        onClick={() => {
                          history.push(`/BookDetails/${item.bookId}`);
                        }}
                      >
                        More Details&nbsp;
                        <i className="fas fa-angle-right" />
                      </h4>
                    </div>
                    <div className="cart-item-price">
                      <h3 className="price-tag">
                        <i className="fas fa-rupee-sign" />
                        &nbsp;{item.price}&nbsp;/-
                      </h3>
                      <h3 className="avl-qty">
                        Available Quantity : <span>{item.qty}</span>
                      </h3>
                      <h3 style={{ color: "green" }}>Purchasing Quantity</h3>
                      <table className="book-quantity">
                        <thead>
                          <tr>
                            <td>
                              <i
                                className="fas fa-minus-square"
                                onClick={() => {
                                  DeleteItem(idx, item.price);
                                }}
                              />
                            </td>
                            <td
                              id={idx}
                              style={{
                                color: "green",
                                fontFamily: "PT Sans",
                              }}
                            >
                              {Math.min(item.purchaseQty, item.qty)}
                            </td>
                            <td>
                              <i
                                className="fas fa-plus-square"
                                onClick={() => {
                                  addItem(idx, item.qty, item.price);
                                }}
                              />
                            </td>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    <p className="alert-cart-item">
                      <i className="fas fa-info-circle"></i> Do not delay the
                      purchase, adding items to your cart does not mean booking
                      them.
                    </p>
                  </div>
                  // Cart Item Ends
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
          <div
            className="cart-container-right"
            style={{ display: loader ? "none" : "block" }}
          >
            <h2>Total Amount Payable</h2>
            <div className="cart-total">
              <p>
                Amount <br />
                <i>(Excluding GST and shipping charges)</i>
              </p>
              <h3>
                <i className="fas fa-rupee-sign" />
                &nbsp;{amount}/-
              </h3>
            </div>
            <div
              className="cart-checkout"
              onClick={(e) => {
                // console.log(cart);
                handelUpdateCart(e);
              }}
            >
              {checkout ? (
                <>
                  <CircularProgress
                    style={{
                      height: "25px",
                      width: "25px",
                      color: "white",
                    }}
                  />
                  &nbsp;Checking Out...
                </>
              ) : (
                <>
                  <i className="fas fa-money-check-alt" />
                  &nbsp;Checkout
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default Cart;

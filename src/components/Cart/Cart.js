import {React, useState, useEffect, useContext} from "react";
import "./Cart.css";
import {Link, useHistory} from "react-router-dom";
import axios from "../../axios";
import {UserContext} from "../../Context/userContext";

function Cart() {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const [cart, setcart] = useState([]);
  const [loader, setloader] = useState(true);
  const [amount, setamount] = useState(0);
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
          console.log(response.data.length);
          console.log(response.data);
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
    } else {
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
    } else {
    }
  };

  const handelRemoveItem = (e) => {
    e.target.innerHTML = `<i class="fas fa-spinner"></i>
    &nbsp;Removing...`;
    amt = 0;
    axios
      .delete("/deleteCartItem", {
        data: {bookId: e.target.id},
      })
      .then((response) => {
        setcart(cart.filter((item) => e.target.id !== item.bookId));
        for (let i = 0; i < response.data.length; i++) {
          amt += response.data[i].price;
        }
        e.target.innerHTML = `<i class="fas fa-trash-alt"></i>
        &nbsp;Remove Item`;
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
      .catch((err) => {
        // console.log(err.response.data);
        e.target.innerHTML = `<i class="fas fa-trash-alt"></i>
        &nbsp;Remove Item`
      });
  };

  const handelUpdateCart = (e) => {
    e.target.innerHTML = "";
    e.target.innerHTML = "Checking Out...";
    if (cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        const update = async () => {
          axios
            .post("/changeCartItemPurchaseQty", {
              cartItemId: cart[i]._id,
              purchaseQty: cart[i].purchaseQty,
            })
            .then(() => {
              console.log(i);
              if (i === cart.length - 1) {
                history.push("/Checkout/cart");
              }
            })
            .catch(() => {});
        };
        update();
      }
    } else {
      e.target.innerHTML = ``;
      e.target.innerHTML = `<i class="fas fa-exclamation-triangle"/>&nbsp;Checkout Failed!`;
      e.target.style.backgroundColor = "red";
      setTimeout(() => {
        e.target.innerHTML = `<i class="fas fa-money-check-alt"/>&nbsp;Checkout`;
        e.target.style.backgroundColor = "rgb(90, 90, 255)";
      }, 3000);
    }
  };

  return (
    <div className="cart-main">
      {user === null ? (
        <div
          style={{
            height: "100%",
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
                fontSize: "20em",
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
            style={{display: loader ? "flex" : "none"}}
          >
            <div
              className="page-loading"
              style={{display: loader ? "block" : "none"}}
            ></div>
          </div>

          <div
            className="cart-container-left"
            style={{display: loader ? "none" : "block"}}
          >
            <h1>
              <i class="fas fa-cart-arrow-down"></i>&nbsp;Cart&nbsp;(
              {user.cartitems}&nbsp;item)
            </h1>

            {cart && cart.length ? (
              <>
                {cart.map((item, idx) => (
                  // Cart item starts
                  <div className="cart-item">
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
                        id={item.bookId}
                        onClick={(e) => {
                          handelRemoveItem(e);
                        }}
                      >
                        <i className="fas fa-trash-alt" />
                        &nbsp;Remove Item
                      </h4>
                    </div>
                    <div className="cart-item-price">
                      <h3>
                        <i className="fas fa-rupee-sign" />
                        &nbsp;{item.price}&nbsp;/-
                      </h3>
                      <h3>Available Quantity : {item.qty}</h3>
                      <h3>Purchasing Quantity</h3>
                      <table className="book-quantity">
                        <tr>
                          <td>
                            <i
                              className="fas fa-minus-square"
                              onClick={() => {
                                DeleteItem(idx, item.price);
                              }}
                            />
                          </td>
                          <td id={idx}>
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
            style={{display: loader ? "none" : "block"}}
          >
            <h2>Total Amount Payable</h2>
            <div className="cart-total">
              <p>
                Amount <br />
                <i>(Excluding GST and shipping charges)</i>
              </p>
              <h3>
                <i className="fas fa-rupee-sign"/>&nbsp;{amount}/-
              </h3>
            </div>
            <div
              className="cart-checkout"
              onClick={(e) => {
                console.log(cart);
                handelUpdateCart(e);
              }}
            >
              <i className="fas fa-money-check-alt" />
              &nbsp;Checkout
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default Cart;

import {React, useState, useEffect} from "react";
import "./Payment.css";
import {Link} from "react-router-dom";
import axios from "../../axios";

function Payment() {
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
            amt += response.data[i].price;
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
  return (
    <div>
      <div className="payment-cont">
        <div className="payment-cart">
          <div className="payment-cart-container">
            <h4>
              Shopping Cart{" "}
              <span className="price">
                <i class="fas fa-cart-plus"></i> <b>4</b>
              </span>
            </h4>
            <p className="item-para">
              <Link href="#" className="cart-item-link">
                Item 1
              </Link>{" "}
              <span className="price">$15</span>
            </p>
            <p className="item-para">
              <Link href="#" className="cart-item-link">
                Item 2
              </Link>{" "}
              <span className="price">$5</span>
            </p>
            <p className="item-para">
              <Link href="#" className="cart-item-link">
                Item 3
              </Link>{" "}
              <span className="price">$8</span>
            </p>
            <p className="item-para">
              <Link href="#" className="cart-item-link">
                Item 4
              </Link>{" "}
              <span className="price">$2</span>
            </p>
            <hr />
            <p>
              Total{" "}
              <span className="price">
                <b>$30</b>
              </span>
            </p>
          </div>
        </div>
        <div className="payment-address-wrapper">
          <form action="" className="payment-form">
            <div className="payment-row">
              <div className="billing-address">
                <h3>Billing Address</h3>
                <label for="fname">
                  <i class="fas fa-user"></i> Full Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="firstname"
                  placeholder="John M. Doe"
                />
                <label for="email">
                  <i class="fas fa-envelope"></i> Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                />
                <label for="adr">
                  <i class="far fa-address-card"></i> Address
                </label>
                <input
                  type="text"
                  id="adr"
                  name="address"
                  placeholder="542 W. 15th Street"
                />
                <label for="city">
                  <i class="fas fa-university"></i> City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="New York"
                />

                <div className="row">
                  <div className="col-50">
                    <label for="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      placeholder="NY"
                    />
                  </div>
                  <div className="col-50">
                    <label for="zip">Zip</label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      placeholder="10001"
                    />
                  </div>
                </div>
              </div>
              <div className="payment-payment">
                <h3>Payment</h3>
                <label for="fname">Accepted Cards</label>
                <div className="payment-cards">
                  <i class="fab fa-cc-visa card-visa"></i>
                  <i class="fab fa-cc-amex card-amex"></i>
                  <i class="fab fa-cc-mastercard card-mastercard"></i>
                  <i class="fab fa-cc-discover card-discover"></i>
                </div>
                <label for="cname">Name on Card</label>
                <input
                  type="text"
                  id="cname"
                  name="cardname"
                  placeholder="John More Doe"
                />
                <label for="ccnum">Credit card number</label>
                <input
                  type="text"
                  id="ccnum"
                  name="cardnumber"
                  placeholder="1111-2222-3333-4444"
                />
                <label for="expmonth">Exp Month</label>
                <input
                  type="text"
                  id="expmonth"
                  name="expmonth"
                  placeholder="September"
                />
                <div className="row">
                  <div className="col-50">
                    <label for="expyear">Exp Year</label>
                    <input
                      type="text"
                      id="expyear"
                      name="expyear"
                      placeholder="2018"
                    />
                  </div>
                  <div className="col-50">
                    <label for="cvv">CVV</label>
                    <input type="text" id="cvv" name="cvv" placeholder="352" />
                  </div>
                </div>
              </div>
            </div>
            <label>
              <input type="checkbox" checked="checked" name="sameadr" />{" "}
              Shipping address same as billing
            </label>
            <input
              type="submit"
              value="Confirm Order"
              className="payment-form-btn"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;

import {React, useState} from "react";
import {Link} from "react-router-dom";
import axios from "../../axios";
const GetOrderDetails = (props) => {
  const [orderlist, setorderlist] = useState([]);
  const [page, setpage] = useState(1);
  const [totalpages, settotalpages] = useState(0);
  const [load, setload] = useState(false);
  const GetOrderList = () => {
    setload(true);
    axios
      .get("/admin-getOrderList")
      .then((response) => {
        // console.log(response.data);
        setorderlist(response.data.data);
        settotalpages(response.data.totalPages);
        setload(false);
      })
      .catch((error) => {});
  };
  return (
    <div className="god-cont">
      <button
        type="submit"
        className="findprofile-email-button"
        onClick={(e) => {
          e.preventDefault();
          GetOrderList();
        }}
      >
        Fetch Orders List / Update
      </button>
      <div className="god-table">
        <table>
          <thead>
            <tr>
              <th>Order No.</th>
              <th>Seller Details</th>
              <th>Customer Details</th>
              <th>Order Details</th>
              <th>Track Order</th>
            </tr>
          </thead>
          {load ? (
            <tbody>
              <tr>
                <td>
                  <i
                    className="fas fa-circle-notch"
                    style={{
                      display: load ? "inline-block" : "none",
                      animation: "spin 2s linear infinite",
                      fontSize: "32px",
                    }}
                  />
                </td>
                <td>
                  <i
                    className="fas fa-circle-notch"
                    style={{
                      display: load ? "inline-block" : "none",
                      animation: "spin 2s linear infinite",
                      fontSize: "32px",
                    }}
                  />
                </td>
                <td>
                  <i
                    className="fas fa-circle-notch"
                    style={{
                      display: load ? "inline-block" : "none",
                      animation: "spin 2s linear infinite",
                      fontSize: "32px",
                    }}
                  />
                </td>
                <td>
                  <i
                    className="fas fa-circle-notch"
                    style={{
                      display: load ? "inline-block" : "none",
                      animation: "spin 2s linear infinite",
                      fontSize: "32px",
                    }}
                  />
                </td>
                <td>
                  <i
                    className="fas fa-circle-notch"
                    style={{
                      display: load ? "inline-block" : "none",
                      animation: "spin 2s linear infinite",
                      fontSize: "32px",
                    }}
                  />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {orderlist.length > 0 ? (
                <>
                  {orderlist.map((order, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <ul>
                          <li>{"Seller Name : " + order.sellerName}</li>
                          <li>{"Seller ID : " + order.sellerId}</li>
                          <li>
                            {"Seller Address : " +
                              order.sellerAddress.address +
                              " " +
                              order.sellerAddress.city +
                              " " +
                              order.sellerAddress.state +
                              " " +
                              order.sellerAddress.zipCode}
                          </li>
                          <li>{"Address ID : " + order.sellerAddress._id}</li>
                          <li>
                            {"Seller Contact Number : " +
                              order.sellerAddress.phoneNo}
                          </li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li>{"Customer Name : " + order.customerName}</li>
                          <li>{"Customer ID : " + order.customerId}</li>
                          <li>
                            {"Address : " +
                              order.customerAddress.address +
                              " " +
                              order.customerAddress.city +
                              " " +
                              order.customerAddress.state +
                              " " +
                              order.customerAddress.zipCode}
                          </li>
                          <li>{"Address ID : " + order.customerAddress._id}</li>
                          <li>
                            {"Contact Number : " +
                              order.customerAddress.phoneNo}
                          </li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li>{"Order ID : " + order._id}</li>
                          <li>{"Book ID : " + order.bookId}</li>
                          <li>{"Order Total : " + order.orderTotal + "/-"}</li>
                          <li>{"Payment Mode : " + order.paymentMode}</li>
                          <li>{"Payment Status : " + order.paymentStatus}</li>
                        </ul>
                      </td>
                      <td>
                        <Link
                          className="tracking-order-link"
                          to={`/AdminTrack/${order._id}`}
                          target="_blank"
                        >
                          Update&nbsp;this&nbsp;Order
                        </Link>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <></>
              )}
            </tbody>
          )}

          <tfoot>
            <tr>
              <td>---</td>
              <td>---</td>
              <td>---</td>
              <td>---</td>
              <td>---</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default GetOrderDetails;

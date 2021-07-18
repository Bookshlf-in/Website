import React from 'react'
import {Link} from "react-router-dom";
import "./AdminPanel.css";

function Orders() {
    return (
        <div>
            <div className="panel-orders-container">
                <ul className="panel-orders-ul">
                    <Link to="/">
                        <li className="panel-orders-seller-orders">
                            Seller Books
                        </li>
                    </Link>
                    <Link to="/">
                        <li className="panel-orders-get-order-details">
                            Get Order Details

                        </li>
                    </Link>
                    <Link to="/">
                        <li className="panel-orders-book-verification">
                            Book Verification

                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Orders

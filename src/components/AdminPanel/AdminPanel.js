import React from 'react'
import {Link} from "react-router-dom";
import "./AdminPanel.css";
import GetOrderDetails from './GetOrderDetails';

function AdminPanel() {
    return (
        <div>
            <div className="adminpanel-container">

                    <ul className="adminpanel-bar">

                    <Link to="/">
                        <li className="adminpanel-orders">Orders</li>
                    </Link>

                    <Link to="/">
                        <li className="adminpanel-messages">Messages</li>
                    </Link>

                    <Link to="/">
                        <li className="adminpanel-find-profile">Find Profile</li>
                    </Link>
                    
                    <Link to="/">
                        <li className="adminpanel-sellers">Sellers</li>
                    </Link>
                    
                    </ul>
                </div>
        </div>
    )
}

export default AdminPanel


// - Admin-Panel Navbar : https://www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=0%3A1

// - Orders Component Navbar : https://www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=104%3A23

// - Orders Component Order Details : 
// https:www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=105%3A29
// - Orders Component Seller Books : https://www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=105%3A127https://www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=105%3A29

// - Orders Component Book Verification : https://www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=105%3A72

// Find Profile Component : https://www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=105%3A176

// Messages Component : https://www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=105%3A193

// Sellers Component : https://www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=105%3A216

// Add new Book Component : https://www.figma.com/file/GVgrZJhl1QPOV4Esa4HacC/Admin-Panel?node-id=105%3A247

// Admin Panel
// 	AdminPanel.js
// 	AdminPanel.css (all CSS here only)
// 	Orders.js
// 	Sellers.js
// 	FindProfile.js
// 	Messages.js

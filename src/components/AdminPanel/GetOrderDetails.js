import React from 'react'

function GetOrderDetails() {
    return (
        <div>
            <div className="god-cont">
                <div className="god-search">
                    <form action="">
                        <input type="number" className="god-search-id"  placeholder="Enter Order Id" />
                        <button type="submit" className="god-search-button">Search</button>
                    </form>

                </div>
                <div className="god-table">
                    <table>
                        <tr>
                            <th>Seller</th>
                            <th>Customer</th>
                            <th>Order Details</th>
                            <th>Track Order</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        
                    </table>
                </div>
            </div>
        </div>
    )
}

export default GetOrderDetails

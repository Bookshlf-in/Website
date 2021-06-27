import React from "react";
function Address(props) {
  var address = "IIIT lucknow, 226002 India";
  var AdNo = 1;
  return (
    <div className="address-bg" style={{display: props.visible}}>
      <div className="address-container">
        <table className="address-table">
          <tr>
            <td>{AdNo}</td>
            <td>{address}</td>
            <td className="close-btn" id="close-btn">
              <i class="fas fa-window-close" title="Remove this Address" />
            </td>
          </tr>
          <tr>
            <td>{AdNo + 1}</td>
            <td>{address}</td>
            <td className="close-btn" id="close-btn">
              <i class="fas fa-window-close" title="Remove this Address" />
            </td>
          </tr>
        </table>
        <table className="add-address-table">
          <tr>
            <th className="add-btn" id="add-btn">
              <input type="text" id="Newaddress" />
              <i class="fas fa-plus-circle" title="Add New Address" />
            </th>
          </tr>
        </table>
      </div>
    </div>
  );
}
export default Address;

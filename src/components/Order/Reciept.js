import { React } from "react";

// Mui Components
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const Reciept = (props) => {
  //   console.log(props);
  const order = props.order;
  // Creating Reciept
  const CreatReciept = () => {
    const my_window = window.open();
    my_window.document.write(
      `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bookshlf Invoice - ${order._id}</title>
    <style>
    .h1{
      text-align:center;
      font-size:32px;
      color:rgb(100,100,100);
      font-family: courier;
      margin-left:10px;
    }
    .loader {
    border: 5px solid #f3f3f3; /* Light grey */
    border-top: 5px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 2s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .print {
      display:none;
    }
    .no-print{
      display:flex;
      justify-content:center;
      align-items:center;
      width:100%;
    }
    .input{
      padding:10px 16px;
      outline:none;
      border:none;
      background-color:#d32f2f;
      color:white;
      width:150px;
      border-radius:5px;
      cursor:pointer;
    }
    @media print{
      .print {
        display:block;
      }
      .no-print{
        display:none;
      }
    }

    @media screen and (max-width:600px){
      .stack{
        flex-direction:column;
      }
      .h1{
        font-size:16px;
      }
    }
    </style>
    
    <script>
    function getPDF () {
        window.print();
    }
    </script>
    </head>
    <body>
    <div class="no-print">
    <div class="loader" id="loader"></div>
    <div class="h1">Printing Your Invoice Automatically...</div>
    </div>
    <br/>
    <div class="no-print">
    <p style="color:red; font-family:'courier'; text-align:center;">If Invoice Didn't Printed, Click to Print Again.</p>
    </div>
    <div class="no-print" >
    <input class="input" type="button" id="btnPrint" onclick="getPDF()" value="Print Again" />
    </div>
    <div id="pdf">
    <div class="print" style="background-color:#e2e1e0;font-family: Open Sans, sans-serif;font-size:100%;font-weight:400;line-height:1.4;color:#000;">
    <table style="max-width:670px;margin:50px auto 10px;background-color:#fff;padding:50px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-moz-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24); border-top: solid 10px green;">
    <thead>
    <tr>
    <th style="text-align:left;"><img style="max-width: 150px;" src="${`/images/logoView.png`}" alt="bookshlf Invoice"></th>
    <th style="text-align:right;font-weight:400;">Order Placed On : 
    ${order.updatedAt.substr(0, 10)}
    </th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td style="height:35px;"></td>
    </tr>
    <tr>
    <td colspan="2" style="border: solid 1px #ddd; padding:10px 20px;">
    <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:150px">Order status</span><b style="color:green;font-weight:normal;margin:0">${
      order.status[order.status.length - 1]
    }</b></p>
    <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Order ID</span> ${
      order._id
    }</p>
    <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Book amount</span> Rs. ${
      order.price
    }.00 /-</p>
    <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Shipping Charges</span> Rs. ${
      order.shippingCharges
    }.00 /-</p>
    <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Order Total</span> Rs. ${
      order.orderTotal
    }.00 /-</p>
    </td>
    </tr>
    <tr>
    <td style="height:15px;"></td>
    </tr>
    <tr>
    <td style="width:50%;padding:20px;vertical-align:top">
    <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px">Name</span> ${
      order.customerName
    }</p>
    <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Customer ID</span> ${
      order.customerId
    }</p>
    <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Phone</span> ${
      order.customerAddress.phoneNo
    }</p>
    <td style="width:50%;padding:20px;vertical-align:top">
    <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Address</span> ${
      order.customerAddress.address +
      ", " +
      order.customerAddress.city +
      ", " +
      order.customerAddress.state
    }</p>
    <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Zip Code</span> ${
      order.customerAddress.zipCode
    }</p>
    <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px; };">Payment Status</span> 
    <span style="color:${order.paymentStatus === "Paid" ? "green" : "red"}">${
        order.paymentStatus
      }</span></p>
    </td>
    </tr>
    <tr>
    <td colspan="2" style="font-size:20px;">Book Details</td>
    </tr>
    <tr>
    <td colspan="2" style="padding:10px;">
    <p style="font-size:14px;margin:0;padding:10px;border:solid 1px #ddd;font-weight:bold;">
    <span style="display:block;font-size:13px;font-weight:normal;">${
      order.title
    }</span>Rs. ${order.price}.00 /- <br>
    <b style="font-size:11px;font-weight:500;">Book ID : </b> <b style="font-size:10px;font-weight:500;"> ${
      order.bookId
    }</b>
    </p>
    </td>
    </tr>
    </tbody>
    <tfooter>
    <tr>
    <td colspan="2" style="font-size:14px;padding:10px">
    <strong style="display:block;margin:0 0 10px 0; color:blue;">All Amount Will Be Refunded Back In Exchange of the Books iff ${
      order.customerName
    } gets into IIT/ AIIMS</strong>
    <strong style="display:block;margin:0 0 5px 0;">Regards</strong> Team Bookshlf<br> Kanpur UP, India<br>
    <b>Phone:</b> +91 97926 66122<br>
    <b>Email:</b> bookshlf.in@gmail.com
    </td>
    </tr>
    </tfooter>
    </table>
    </div>
    </div>
    </body>
    </html>
`
    );
    setTimeout(() => {
      my_window.print();
    }, 500);
  };
  // order.status[order.status.length - 1]
  return (
    <Button
      endIcon={<DownloadIcon />}
      color="secondary"
      variant="outlined"
      sx={{ fontFamily: "PT sans" }}
      onClick={CreatReciept}
    >
      Download Invoice
    </Button>
  );
};
export default Reciept;

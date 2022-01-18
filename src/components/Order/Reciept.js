import { React } from "react";

// Mui Components
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

// jspdf
import { jsPDF } from "jspdf";

const Reciept = (props) => {
  //   console.log(props);

  // Creating Reciept
  const CreatReciept = () => {
    const doc = new jsPDF();
    doc.setFontSize(40);
    doc.text("Bookshlf Invoice", 15, 25);
    doc.setFont("Courier", "Courier", 400);
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.text("Order Id", 15, 35);
    doc.text(`${props.order._id}`, 15, 40);
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text("Book Details", 15, 55);
    doc.setFontSize(14);
    doc.text("Book Id", 15, 65);
    doc.text(`${props.order.bookId}`, 15, 70);
    doc.text("Book Name", 15, 80);
    doc.text(`${props.order.title}`, 15, 85);
    doc.text("Book Price", 15, 95);
    doc.text(`${props.order.price}/-`, 15, 100);
    doc.setFontSize(20);
    doc.text("Customer Details", 15, 115);
    doc.setFontSize(14);
    doc.text(`${props.order.customerName}`, 15, 125);
    doc.text("Shipping Address", 15, 135);
    doc.setFontSize(12);
    doc.text(`${props.order.customerAddress.address}`, 15, 142);
    doc.text(`${props.order.customerAddress.city}`, 15, 147);
    doc.text(`${props.order.customerAddress.state}`, 15, 152);
    doc.text(`${props.order.customerAddress.zipCode}`, 15, 157);
    doc.setFontSize(14);
    doc.text("Contact", 15, 165);
    doc.setFontSize(12);
    doc.text(`${props.order.customerAddress.phoneNo}`, 15, 170);
    doc.setFontSize(20);
    doc.text("Order Details", 15, 185);
    doc.setFontSize(14);
    doc.text("Item Price", 15, 195);
    doc.text(`${props.order.price}/-`, 15, 200);
    doc.text("Purchased Item Quantity", 15, 210);
    doc.text(`${props.order.purchaseQty}`, 15, 215);
    doc.text("Shipping Charges", 15, 225);
    doc.text(`${props.order.shippingCharges}/-`, 15, 230);
    doc.text("Ordet Total", 15, 240);
    doc.text(`${props.order.orderTotal}/-`, 15, 245);
    doc.setTextColor(255, 0, 0);
    doc.text("Your Order has Been Confirmed & will be Delivered Soon", 15, 280);
    doc.text("Thank You For Shopping with Bookshlf", 15, 285);
    doc.save(`Bookshlf_Invoice_${props.order._id}.pdf`);
  };
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

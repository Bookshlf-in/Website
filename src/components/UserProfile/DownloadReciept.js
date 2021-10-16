import React from "react";
import {
  Font,
  Image,
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#e6ffff",
  },
  pagebox: {
    paddingRight: 50,
    border: "5px solid black",
    padding: 10,
    margin: 20,
  },
  Header: {
    borderBottom: "1px solid white",
    height: 30,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "black",
    alignItems: "center",
    marginBottom: "2%",
  },
  logo: {
    height: 30,
    width: 160,
    marginBottom: 7,
    marginTop: 7,
  },
  InvoiceText: {
    color: "white",
    marginLeft: 80,
    fontWeight: "bold",
  },

  customerDetails: {
    marginTop: "3%",
    marginLeft: "3%",
    marginBottom: "3%",
  },

  CustomerDetailstext: {
    fontFamily: "PTSans-Regular",
    fontWeight: "bold",
    fontSize: "20px",
    paddingBottom: "1%",
    marginTop: "1%",
    borderBottom: "1px solid red",
  },

  detailsstyling: {
    display: "flex",
    flexDirection: "row",
    fontSize: "15px",
    marginLeft: "2%",
    fontFamily: "PTSans-Regular",
  },

  AfterColonText: {
    textAlign: "justify",
    width: "66vw",
  },

  BeforeColonText: {
    textAlign: "left",
    width: "30vw",
    color: "blue",
  },

  BookPhoto: {
    height: "240px",
    width: "220px",
    left: "25%",
    border: "1px solid yellow",
  },

  footer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignContent: "center",
    marginTop: "5%",
    border: "1px solid black",
    textAlign: "center",
    height: "50px",
    fontFamily: "PTSans-Regular",
  },
});

const MyDoc = (details) => (
  <Document>
    {Font.register({
      family: "PTSans-Regular",
      src: "http://fonts.gstatic.com/s/ptsans/v8/FUDHvzEKSJww3kCxuiAo2A.ttf",
      fontStyle: "normal",
      fontWeight: "normal",
    })}
    <Page style={styles.page} wrap>
      <View style={styles.pagebox}>
        <View style={styles.Header}>
          <Image src="/images/logo.png" style={styles.logo}></Image>
          <Text style={styles.InvoiceText}>Invoice</Text>
        </View>
        <View style={styles.detailsstyling}>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={{ color: "blue" }}>Order Id : </Text>
              <Text>{details.orderDetails._id}</Text>
            </View>
            <Image
              src="https://img.bookshlf.in/logo/smallLogo.png"
              style={styles.BookPhoto}
            />
          </View>
        </View>
        <View style={styles.customerDetails}>
          <Text style={styles.CustomerDetailstext}>Customer Details</Text>
          <View style={styles.detailsstyling}>
            <Text style={styles.BeforeColonText}>Customer Name : </Text>
            <Text style={styles.AfterColonText}>
              {details.orderDetails.customerName}
            </Text>
          </View>
          <View style={styles.detailsstyling}>
            <Text style={styles.BeforeColonText}>Delivery Address : </Text>
            <Text style={styles.AfterColonText}>
              {details.orderDetails.customerAddress["address"]},
              {details.orderDetails.customerAddress["city"]},{" "}
              {details.orderDetails.customerAddress["state"]},
              {details.orderDetails.customerAddress["zipCode"]}
            </Text>
          </View>
          <View style={styles.detailsstyling}>
            <Text style={styles.BeforeColonText}>Contact No : </Text>
            <Text style={styles.AfterColonText}>
              {details.orderDetails.customerAddress["phoneNo"]}
            </Text>
          </View>
        </View>
        <View style={styles.customerDetails}>
          <Text style={styles.CustomerDetailstext}>Book Details</Text>
          <View style={styles.detailsstyling}>
            <Text style={styles.BeforeColonText}>Book Title : </Text>
            <Text style={styles.AfterColonText}>
              {details.orderDetails.title}
            </Text>
          </View>
          <View style={styles.detailsstyling}>
            <Text style={styles.BeforeColonText}>Author : </Text>
            <Text style={styles.AfterColonText}>
              {details.orderDetails.author}
            </Text>
          </View>
          <View style={styles.detailsstyling}>
            <Text style={styles.BeforeColonText}>Seller Name : </Text>
            <Text style={styles.AfterColonText}>
              {details.orderDetails.sellerName}
            </Text>
          </View>
        </View>
        <View style={styles.customerDetails}>
          <Text style={styles.CustomerDetailstext}>Order Details</Text>
          <View style={styles.detailsstyling}>
            <Text style={styles.BeforeColonText}>Item Price : </Text>
            <Text style={styles.AfterColonText}>
              {details.orderDetails.price}
            </Text>
          </View>
          <View style={styles.detailsstyling}>
            <Text style={styles.BeforeColonText}>Quantity : </Text>
            <Text style={styles.AfterColonText}>
              {details.orderDetails.purchaseQty}
            </Text>
          </View>
          <View style={styles.detailsstyling}>
            <Text style={styles.BeforeColonText}>Shipping Charges : </Text>
            <Text style={styles.AfterColonText}>
              {details.orderDetails.shippingCharges}
            </Text>
          </View>
          <View style={styles.detailsstyling}>
            <Text style={styles.BeforeColonText}>Total Amount : </Text>
            <Text style={styles.AfterColonText}>
              {details.orderDetails.orderTotal}
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={{ color: "#000066" }}>
            Your Order is Confirmed. It will be delivered Soon.
          </Text>
          <Text>Thank You For Shopping with Us!</Text>
        </View>
      </View>
    </Page>
  </Document>
);

function DownloadReciept(props) {
    return (
        <div className="App">
            {
                console.log(props.orderDetails.photo)
            }
            <PDFDownloadLink document={<MyDoc orderDetails={props.orderDetails} />} fileName="BookShlf_Invoice.pdf">
                {({ blob, url, loading, error }) => (loading ?<Button className="download-receipt-button" variant="contained" color="primary">
                <CircularProgress style={{ color: "white", height: "25px", width: "25px" }} />
              &nbsp;&nbsp;Generating...
            </Button>  : <Button className="download-receipt-button" color="primary" variant="contained" id="invoice-btn">Downloading Invoice...</Button>)}
            </PDFDownloadLink>
        </div>
    );
}

export default DownloadReciept;

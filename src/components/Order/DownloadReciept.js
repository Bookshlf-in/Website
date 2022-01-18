// import React from "react";
// import {
//   Font,
//   Image,
//   PDFDownloadLink,
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   PDFViewer,
// } from "@react-pdf/renderer";
// import { Button, CircularProgress } from "@mui/material";

// const styles = StyleSheet.create({
//   page: {
//     backgroundColor: "white",
//   },
//   pagebox: {
//     border: "1px solid rgb(140,140,140)",
//     margin: 10,
//   },
//   Header: {
//     display: "flex",
//     flexDirection: "row",
//     backgroundColor: "rgb(63, 62, 62)",
//     alignItems: "center",
//     padding: 10,
//     border: "1px solid rgb(140,140,140)",
//   },
//   logo: {
//     height: 30,
//     width: 160,
//     marginBottom: 7,
//     marginTop: 7,
//   },
//   InvoiceText: {
//     color: "white",
//     marginLeft: 80,
//     fontWeight: "bold",
//   },

//   customerDetails: {
//     marginTop: "3%",
//     marginLeft: "3%",
//     marginBottom: "3%",
//   },

//   CustomerDetailstext: {
//     fontFamily: "Courier",
//     borderBottom: "1px solid rgb(140,140,140)",
//   },

//   detailsstyling: {
//     display: "flex",
//     flexDirection: "row",
//     fontSize: "11px",
//     marginLeft: "2%",
//     fontFamily: "Courier",
//   },

//   AfterColonText: {
//     textAlign: "justify",
//     width: "66vw",
//   },

//   BeforeColonText: {
//     textAlign: "left",
//     width: "30vw",
//     color: "blue",
//   },

//   BookPhoto: {
//     height: "240px",
//     width: "220px",
//     left: "25%",
//     border: "1px solid yellow",
//   },

//   footer: {
//     display: "flex",
//     flexDirection: "column",
//     width: "100%",
//     alignContent: "center",
//     marginTop: "5%",
//     textAlign: "center",
//     padding: 10,
//     backgroundColor: "rgb(63, 62, 62)",
//     color: "white",
//   },
// });

// const MyDoc = (details) => (
//   <Document>
//     {Font.register({
//       family: "PTSans-Regular",
//       src: "http://fonts.gstatic.com/s/ptsans/v8/FUDHvzEKSJww3kCxuiAo2A.ttf",
//       fontStyle: "normal",
//       fontWeight: "normal",
//     })}
//     <Page style={styles.page} wrap>
//       <View style={styles.pagebox}>
//         <View style={styles.Header}>
//           <Image src="/images/logo.png" style={styles.logo}></Image>
//           <Text style={styles.InvoiceText}>
//             Invoice #{details.orderDetails._id}
//           </Text>
//         </View>
//         <View style={styles.detailsstyling}>
//           {/* <View style={{ flexDirection: "row", justifyContent: "center" }}>
//             <Image src={details.orderDetails.photo} style={styles.BookPhoto} />
//           </View> */}
//         </View>
//         <View style={styles.customerDetails}>
//           <Text style={styles.CustomerDetailstext}>Customer Details</Text>
//           <View style={styles.detailsstyling}>
//             <Text style={styles.BeforeColonText}>Customer Name : </Text>
//             <Text style={styles.AfterColonText}>
//               {details.orderDetails.customerName}
//             </Text>
//           </View>
//           <View style={styles.detailsstyling}>
//             <Text style={styles.BeforeColonText}>Shipping Address : </Text>
//             <Text style={styles.AfterColonText}>
//               {details.orderDetails.customerAddress["address"]},
//               {details.orderDetails.customerAddress["city"]},
//               {details.orderDetails.customerAddress["state"]},
//               {details.orderDetails.customerAddress["zipCode"]}
//             </Text>
//           </View>
//           <View style={styles.detailsstyling}>
//             <Text style={styles.BeforeColonText}>Contact No : </Text>
//             <Text style={styles.AfterColonText}>
//               {details.orderDetails.customerAddress["phoneNo"]}
//             </Text>
//           </View>
//         </View>
//         <View style={styles.customerDetails}>
//           <Text style={styles.CustomerDetailstext}>Book Details</Text>
//           <View style={styles.detailsstyling}>
//             <Text style={styles.BeforeColonText}>Book Title : </Text>
//             <Text style={styles.AfterColonText}>
//               {details.orderDetails.title}
//             </Text>
//           </View>
//           <View style={styles.detailsstyling}>
//             <Text style={styles.BeforeColonText}>Author : </Text>
//             <Text style={styles.AfterColonText}>
//               {details.orderDetails.author}
//             </Text>
//           </View>
//           <View style={styles.detailsstyling}>
//             <Text style={styles.BeforeColonText}>Seller Name : </Text>
//             <Text style={styles.AfterColonText}>
//               {details.orderDetails.sellerName}
//             </Text>
//           </View>
//         </View>
//         <View style={styles.customerDetails}>
//           <Text style={styles.CustomerDetailstext}>Order Details</Text>
//           <View style={styles.detailsstyling}>
//             <Text style={styles.BeforeColonText}>Item Price : </Text>
//             <Text style={styles.AfterColonText}>
//               {details.orderDetails.price}
//             </Text>
//           </View>
//           <View style={styles.detailsstyling}>
//             <Text style={styles.BeforeColonText}>Quantity : </Text>
//             <Text style={styles.AfterColonText}>
//               {details.orderDetails.purchaseQty}
//             </Text>
//           </View>
//           <View style={styles.detailsstyling}>
//             <Text style={styles.BeforeColonText}>Shipping Charges : </Text>
//             <Text style={styles.AfterColonText}>
//               {details.orderDetails.shippingCharges} /-
//             </Text>
//           </View>
//           <View style={styles.detailsstyling}>
//             <Text style={styles.BeforeColonText}>Total Amount : </Text>
//             <Text style={styles.AfterColonText}>
//               {details.orderDetails.orderTotal} /-
//             </Text>
//           </View>
//         </View>
//         <View style={styles.footer}>
//           <Text>Your Order is Confirmed & will be Delivered Soon.</Text>
//           <Text>Thank You For Shopping with Us!</Text>
//         </View>
//       </View>
//     </Page>
//   </Document>
// );

// function DownloadReciept(props) {
//   return (
//     <PDFDownloadLink
//       document={<MyDoc orderDetails={props.orderDetails} />}
//       fileName="BookShlf_Invoice.pdf"
//     >
//       {({ blob, url, loading, error }) =>
//         loading ? (
//           <Button
//             className="download-receipt-button"
//             variant="contained"
//             color="primary"
//           >
//             <CircularProgress
//               style={{ color: "white", height: "25px", width: "25px" }}
//             />
//             &nbsp;&nbsp;Generating...
//           </Button>
//         ) : (
//           <Button
//             className="download-receipt-button"
//             color="primary"
//             variant="contained"
//             id="invoice-btn"
//           >
//             <i className="fas fa-download" />
//             &nbsp;&nbsp;&nbsp; Download Invoice
//           </Button>
//         )
//       }
//     </PDFDownloadLink>
//   );
// }

// export default DownloadReciept;

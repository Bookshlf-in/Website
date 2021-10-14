import React from 'react';
import { Font, Image, PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#e6ffff',
    },
    pagebox: {
        border: '5px solid black',
        padding: 10,
        margin: 20,

    },
    Header: {
        borderBottom: '1px solid white',
        height: 30,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'black',
        alignItems: 'center',
        marginBottom: '2%'

    },
    logo: {
        height: 30,
        width: 70,
        marginBottom: 7,
        marginRight: 20,
        marginTop: 7,
    },
    InvoiceText: {
        color: 'white',
        marginLeft: 140,
    },


    customerDetails: {
        marginTop: '3%',
        marginLeft: '3%',
        marginBottom: '3%',
    },


    CustomerDetailstext: {
        fontFamily: 'PTSans-Regular',
        fontWeight: 'bold',
        fontSize: '20px',
        paddingBottom: '1%',
        marginTop: '1%',
        borderBottom: '1px solid red',
    },

    detailsstyling: {
        flexDirection: 'row',
        fontSize: '15px',
        marginLeft : '2%',
        fontFamily: 'PTSans-Regular',

    },

    BookPhoto: {
        height: "240px",
        width: "220px",
        border: "1px solid yellow",
        left : '40%',
    },

    footer : {
        display : 'flex',
        flexDirection : 'column',
        width : '100%',
        alignContent : 'center',
        marginTop : '5%',
        border : '1px solid black',
        textAlign : 'center',
        height : '50px',
        fontFamily: 'PTSans-Regular',

    }


});

const MyDoc = (details, orderphoto) => (
    <Document>
        {
            Font.register({ family: 'PTSans-Regular', src: 'http://fonts.gstatic.com/s/ptsans/v8/FUDHvzEKSJww3kCxuiAo2A.ttf', fontStyle: 'normal', fontWeight: 'normal' })
        }
        <Page size="A4" style={styles.page}>
            <View style={styles.pagebox}>
                <View style={styles.Header}>
                    <Image src="/images/logo.png" style={styles.logo}></Image>
                    <Text style={styles.InvoiceText}>Invoice</Text>
                </View>
                <View style={styles.detailsstyling}>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text style={{ color: 'blue' }}>Order Id : </Text>
                            <Text>{details.orderDetails._id}</Text>
                        </View>
                        <Image src= {orderphoto}  style={styles.BookPhoto} />
                    </View>
                </View>
                <View style={styles.customerDetails}>
                    <Text style={styles.CustomerDetailstext}>Customer Details</Text>
                    <View style={styles.detailsstyling}>
                        <Text style={{ color: 'blue' }}>Customer Name : </Text>
                        <Text>{details.orderDetails.customerName}</Text>
                    </View>
                    <View style={styles.detailsstyling}>
                        <Text style={{ color: 'blue' }}>Delivery Address : </Text>
                        <Text>{details.orderDetails.customerAddress['address']},
                            {details.orderDetails.customerAddress['city']}, {details.orderDetails.customerAddress['state']},
                            {details.orderDetails.customerAddress['zipCode']}</Text>
                    </View>
                    <View style={styles.detailsstyling}>
                        <Text style={{ color: 'blue' }}>Contact No : </Text>
                        <Text>{details.orderDetails.customerAddress['phoneNo']}</Text>
                    </View>
                </View>
                <View style={styles.customerDetails}>
                    <Text style={styles.CustomerDetailstext}>Book Details</Text>


                    <View style={styles.detailsstyling}>
                        <Text style={{ color: 'blue' }}>Book Title : </Text>
                        <Text>{details.orderDetails.title}</Text>
                    </View>
                    <View style={styles.detailsstyling}>
                        <Text style={{ color: 'blue' }}>Author : </Text>
                        <Text>{details.orderDetails.author}</Text>
                    </View>
                    <View style={styles.detailsstyling}>
                        <Text style={{ color: 'blue' }}>Seller Name : </Text>
                        <Text>{details.orderDetails.sellerName}</Text>
                    </View>


                </View>
                <View style={styles.customerDetails}>
                    <Text style={styles.CustomerDetailstext}>Order Details</Text>
                    <View style={styles.detailsstyling}>
                        <Text style={{ color: 'blue' }}>Item Price : </Text>
                        <Text>{details.orderDetails.price}</Text>
                    </View>
                    <View style={styles.detailsstyling}>
                        <Text style={{ color: 'blue' }}>Quantity : </Text>
                        <Text>{details.orderDetails.purchaseQty}</Text>
                    </View>
                    <View style={styles.detailsstyling}>
                        <Text style={{ color: 'blue' }}>Shipping Charges : </Text>
                        <Text>{details.orderDetails.shippingCharges}</Text>
                    </View>
                    <View style={styles.detailsstyling}>
                        <Text style={{ color: 'blue' }}>Total Amount : </Text>
                        <Text>{details.orderDetails.orderTotal}</Text>
                    </View>
                </View>
                <View style = {styles.footer}>
                    <Text style = {{color : '#000066'}}>Your Order is Confirmed. It will be delivered Soon.</Text>
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
            <PDFDownloadLink document={<MyDoc orderDetails={props.orderDetails} OrderPhoto = {props.orderDetails.photo} />} fileName="BookShlf_Invoice.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading Pdf...' : 'Click here to Download Pdf!')}
            </PDFDownloadLink>
        </div>
    );
}

export default DownloadReciept;
import React from "react";
import { Helmet } from "react-helmet-async";

// Home Components
import Navbar from "../Navbar/Navbar";
import Carousel from "./Carousel";
import Categories from "./Categories";
import Reviews from "../Reviews/CustomerReviews";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Bookshlf | The Bookstore which cares</title>
        {/* <!-- Search Engine --> */}
        <script className="structured-data-list" type="application/ld+json">
          {`
          { 
          "@context": "https://schema.org",
          "@type": "Corporation",
          "name": "Bookshlf",
          "url": "https://bookshlf.in",
          "logo": "https://bookshlf.in/images/logo.png",
          "potentialAction": {
              "@type": "SearchAction",
              "target": "https://bookshlf.in/SearchResult/{search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+919792666122",
                "email": "bookshlf.in@gmail.com",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": ["en","Hindi"]
            },
            "sameAs": [
                "https://www.facebook.com/Bookshlf-109479771200918",
                "https://twitter.com/BookshlfA",
                "https://instagram.com/_bookshlf",
                "https://www.youtube.com/channel/UCvZJWq7cQ4-cGJFsCWIppGQ",
                "https://www.linkedin.com/in/bookshlf-by-aman-861073223/",
                "https://linktr.ee/Bookshlf"
            ],
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Aman Verma, Hostel, IIIT Lucknow",
                "addressLocality": "Chak Ganjaria, C. G. City",
                "addressRegion": "Lucknow, U.P",
                "postalCode": "226002",
                "addressCountry": "IN"
                }
           }`}
        </script>
      </Helmet>
      <Navbar />
      <Carousel />
      <Categories />
      <Reviews />
      <Footer />
    </>
  );
};
export default Home;

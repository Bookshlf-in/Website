import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";

const SellerProfile = (props) => {
  const params = useParams();
  const sellerId = params.sellerId;

  useEffect(() => {
    const fetchData = async () => {
      const url = `/getSellerProfile?sellerId=${params.sellerId}`;
      axios.get(url).then((response) => {
        console.log(response.name);
      });
    };
    fetchData();
  }, []);

  return <div>{sellerId}</div>;
};

export default SellerProfile;

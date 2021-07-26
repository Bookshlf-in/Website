import {React, useState} from "react";
import axios from "../../axios";
const Sellers = () => {
  const [seller, setseller] = useState([]);
  const [type, settype] = useState("All");
  const [verifiedSeller, setVerifiedSeller] = useState([]);
  const [NotverifiedSeller, setNotVerifiedSeller] = useState([]);
  const [page, setpage] = useState(1);
  const [totalPages, settotalPages] = useState(0);
  const [load, setload] = useState(false);

  const filter = () => {};
  const getSellers = async () => {
    setload(true);
    axios
      .get("/admin-getSellerList")
      .then((response) => {
        console.log(response.data);
        setseller(response.data.data);
        settotalPages(response.data.totalPages);
        setload(false);
        setVerifiedSeller(response.data.data.filter((elm) => elm.isVerified));
        setNotVerifiedSeller(
          response.data.data.filter((elm) => !elm.isVerified)
        );
      })
      .catch((error) => {
        setload(false);
      });
  };
  return (
    <div className="sellers-cont">
      <button
        type="submit"
        className="findprofile-email-button"
        onClick={(e) => {
          e.preventDefault();
          getSellers();
        }}
      >
        Fetch Sellers / Update
      </button>
      <br />
      <select
        className="bv-btns"
        onChange={(e) => {
          settype(e.target.value);
          console.log(e.target.value);
        }}
      >
        <option value="All">ALL</option>
        <option value="Unverified">Not Verified</option>
        <option value="Verified">Verified</option>
      </select>
      {load ? (
        <i
          className="fas fa-circle-notch"
          style={{
            display: load ? "inline-block" : "none",
            animation: "spin 2s linear infinite",
            fontSize: "64px",
          }}
        />
      ) : (
        <div className="sellers-items-outer-cont">
          {type === "All" ? (
            <>
              {seller.length > 0 ? (
                <>
                  {seller.map((elm, i) => (
                    <div className="sellers-items-cont" key={i}>
                      <div className="sellers-details">{elm.name}</div>
                      <div className="sellers-desc">
                        {elm.isVerified ? "Verified" : "Not Verified"}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
            </>
          ) : type === "Verified" ? (
            <>
              {verifiedSeller.length > 0 ? (
                <>
                  {verifiedSeller.map((elm, i) => (
                    <div className="sellers-items-cont" key={i}>
                      <div className="sellers-details">{elm.name}</div>
                      <div className="sellers-desc">
                        {elm.isVerified ? "Verified" : "Not Verified"}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              {NotverifiedSeller.length > 0 ? (
                <>
                  {NotverifiedSeller.map((elm, i) => (
                    <div className="sellers-items-cont" key={i}>
                      <div className="sellers-details">{elm.name}</div>
                      <div className="sellers-desc">
                        {elm.isVerified ? "Verified" : "Not Verified"}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Sellers;

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
  const VerifySeller = (e, elm) => {
    elm.isVerified = true;
    axios
      .post("/admin-markSellerAsVerified", {
        sellerId: elm._id,
      })
      .then((response) => {
        setNotVerifiedSeller(
          NotverifiedSeller.filter((sel) => elm._id !== sel._id)
        );
        setVerifiedSeller(verifiedSeller.concat(elm));
      })
      .catch((error) => {});
  };
  const DeVerifySeller = (e, elm) => {
    elm.isVerified = false;
    axios
      .post("/admin-markSellerAsUnverified", {
        sellerId: elm._id,
      })
      .then((response) => {
        setVerifiedSeller(verifiedSeller.filter((sel) => elm._id !== sel._id));
        setNotVerifiedSeller(NotverifiedSeller.concat(elm));
      })
      .catch((error) => {});
  };
  const LoadMore = () => {
    if (page + 1 <= totalPages) {
      setpage(page + 1);
    }
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
          // console.log(e.target.value);
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
                      <div className="sellers-details">
                        <img
                          src={elm.photo}
                          alt={elm.name}
                          height="100px"
                          width="100px"
                        />
                        <ul style={{listStyle: "none"}}>
                          <li>{"Name : " + elm.name}</li>
                          <li>{"About : " + elm.intro}</li>
                          <li>{"ID : " + elm._id}</li>
                        </ul>
                      </div>
                      <div
                        className={`sellers-desc ${
                          elm.isVerified ? "verified-user" : "non-verified-user"
                        }`}
                        id={elm._id}
                        onClick={(e) => {
                          if (elm.isVerified) {
                            DeVerifySeller(e, elm);
                          } else {
                            VerifySeller(e, elm);
                          }
                        }}
                      >
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
                      <div className="sellers-details">
                        <img
                          src={elm.photo}
                          alt={elm.name}
                          height="100px"
                          width="100px"
                        />
                        <ul style={{listStyle: "none"}}>
                          <li>{"Name : " + elm.name}</li>
                          <li>{"About : " + elm.intro}</li>
                          <li>{"ID : " + elm._id}</li>
                        </ul>
                      </div>
                      <div
                        className="sellers-desc verified-user"
                        id={elm._id}
                        onClick={(e) => {
                          DeVerifySeller(e, elm);
                        }}
                      >
                        Verified
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
                      <div className="sellers-details">
                        <img
                          src={elm.photo}
                          alt={elm.name}
                          height="100px"
                          width="100px"
                        />
                        <ul style={{listStyle: "none"}}>
                          <li>{"Name : " + elm.name}</li>
                          <li>{"About : " + elm.intro}</li>
                          <li>{"ID : " + elm._id}</li>
                        </ul>
                      </div>
                      <div
                        className="sellers-desc non-verified-user"
                        id={elm._id}
                        onClick={(e) => {
                          VerifySeller(e, elm);
                        }}
                      >
                        Not Verified
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

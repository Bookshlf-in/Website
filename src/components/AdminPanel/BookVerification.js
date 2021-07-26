import React, {useState} from "react";

function BookVerification() {
  const [books, setbooks] = useState(null);
  const [filteredbooks, setfilteredbooks] = useState(null);

  return (
    <div className="bv-cont">
      <button
        type="submit"
        className="findprofile-email-button"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Fetch Books / Update
      </button>
      <br />
      <select className="bv-btns">
        <option value="Unverified">Not Verified</option>
        <option value="Verified">Verified</option>
      </select>

      <div className="bv-items-cont">
        {filteredbooks ? (
          <>
            {filteredbooks.map((elem) => {
              return (
                <div className="bv-items-inner-cont">
                  <div className="bv-item1">Book Details</div>
                  <div className="bv-item2">
                    <div className="bv-verify">{elem.desc}</div>
                    <div className="bv-verify">Reject</div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default BookVerification;

import React, {useState} from "react";

function BookVerification() {
  const [list, setlist] = useState([
    {
      value: 1,
      category: "Unverified",
      desc: "Verify",
    },
    {
      value: 2,
      category: "Unverified",
      desc: "Verify",
    },
    {
      value: 3,
      category: "Unverified",
      desc: "Verify",
    },
    {
      value: 4,
      category: "Verified",
      desc: "",
    },
    {
      value: 5,
      category: "Verified",
      desc: "",
    },
    {
      value: 6,
      category: "Verified",
      desc: "",
    },
  ]);

  const [items, setitems] = useState(
    list.filter((elm) => {
      return elm.category === "Unverified";
    })
  );

  const filterItem = (categItem) => {
    const updatedItems = list.filter((curElem) => {
      return curElem.category === categItem;
    });

    setitems(updatedItems);
  };

  return (
    <div className="bv-cont">
      <select
        className="bv-btns"
        onChange={(e) => {
          filterItem(e.target.value);
        }}
      >
        <option value="Unverified">Not Verified</option>
        <option value="Verified">Verified</option>
      </select>

      <div className="bv-items-cont">
        {items.map((elem) => {
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
      </div>
    </div>
  );
}

export default BookVerification;

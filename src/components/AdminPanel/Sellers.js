import {React, useState} from "react";

const Sellers = () => {
  const list = [
    {
      value: 1,
      category: "Verified",
      desc: "Remove as Verified",
    },
    {
      value: 2,
      category: "Unverified",
      desc: "Set as Verified",
    },
  ];

  const [items, setitems] = useState(list);

  const filterItem = (categItem) => {
    const updatedItems = list.filter((curElem) => {
      return curElem.category === categItem;
    });

    setitems(updatedItems);
  };

  return (
    <div>
      <div className="sellers-cont">
        <button
          type="submit"
          className="findprofile-email-button"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Fetch Sellers / Update
        </button>
        <br />
        <select
          className="bv-btns"
          onChange={(e) => {
            if (e.target.value !== "All") {
              filterItem(e.target.value);
            } else {
              setitems(list);
            }
          }}
        >
          <option value="All">ALL</option>
          <option value="Unverified">Not Verified</option>
          <option value="Verified">Verified</option>
        </select>

        <div className="sellers-items-outer-cont">
          {items.map((elem) => {
            return (
              <div className="sellers-items-cont">
                <div className="sellers-details">Seller Details</div>
                <div className="sellers-desc">{elem.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sellers;

import React, { useState } from "react";

function Sellers() {
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
        <div className="sellers-btns">
        <button
            className="sellers-btns-button"
            onClick={() => setitems(list)}
          >
            All
          </button>
          <button
            className="sellers-btns-button"
            onClick={() => filterItem("Verified")}
          >
            Verified
          </button>
          <button
            className="sellers-btns-button"
            onClick={() => filterItem("Unverified")}
          >
            Unverified
          </button>
          
        </div>
        <div className="sellers-items-outer-cont">
        {items.map((elem) => {
            const { category, desc } = elem;
            return (
                <div className="sellers-items-cont">

                <div className="sellers-details">Seller Details</div>
                <div className="sellers-desc">{desc}</div>

            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default Sellers;

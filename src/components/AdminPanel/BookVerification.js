import React, { useState } from 'react'

function BookVerification() {
    const list = [
        
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
          }
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
            <div className="bv-cont">
                <div className="bv-btns">
                    <button className="bv-btns-button" onClick={() => filterItem("Unverified")}>Not Verified</button>
                    <button className="bv-btns-button" onClick={() => filterItem("Verified")}>Verified</button>
                </div>

                <div className="bv-items-cont">
                    {
                        items.map((elem)=>{
                            const{category,desc}=elem;
                            return(
                                <div className="bv-items-inner-cont">
                                    {/* <p>{category}</p> */}
                                    <div className="bv-item1">
                                        Book Details
                                    </div>
                                    <div className="bv-item2">
                                        <div className="bv-verify">{desc}</div>
                                        <div className="bv-verify">Reject</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default BookVerification

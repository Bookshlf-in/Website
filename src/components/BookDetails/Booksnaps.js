import React from "react";
function Booksnaps() {
  function handleClick(source) {
    document.getElementById("book-snaps-full").src = source;
  }
  var bookadr = {
    adr1: "./images/samplebookback.jpg",
    adr2: "./images/book1.jpg",
    adr3: "./images/book-of-black-cover-closed.png",
    adr4: "./images/samplebookmock.jpg",
  };
  return (
    <div className="book-snaps">
      <div className="snapshot">
        <img
          src={bookadr.adr1}
          alt=""
          height="70px"
          width="70px"
          id="snap1"
          onClick={() => handleClick(bookadr.adr1)}
        />
      </div>
      <div className="snapshot">
        <img
          src={bookadr.adr2}
          alt=""
          height="70px"
          width="70px"
          id="snap2"
          onClick={() => handleClick(bookadr.adr2)}
        />
      </div>
      <div className="snapshot">
        <img
          src={bookadr.adr3}
          alt=""
          height="70px"
          width="70px"
          id="snap3"
          onClick={() => handleClick(bookadr.adr3)}
        />
      </div>
      <div className="snapshot">
        <img
          src={bookadr.adr4}
          alt=""
          height="70px"
          width="70px"
          id="snap4"
          onClick={() => handleClick(bookadr.adr4)}
        />
      </div>
      <div className="video-snapshot"></div>
    </div>
  );
}
export default Booksnaps;

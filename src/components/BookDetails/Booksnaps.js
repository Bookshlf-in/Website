import React from "react";
function Booksnaps() {
  function handleClick(id, source) {
    document.getElementById("book-snaps-full").src = source;
  }
  return (
    <div className="book-snaps">
      <div className="snapshot">
        <img
          src="./images/book1.jpg"
          alt=""
          height="70px"
          width="70px"
          id="snap1"
          onClick={() => handleClick("snap1", "./images/book1.jpg")}
        />
      </div>
      <div className="snapshot">
        <img
          src="./images/book1.jpg"
          alt=""
          height="70px"
          width="70px"
          id="snap2"
          onClick={() => handleClick("snap2", "./images/book1.jpg")}
        />
      </div>
      <div className="snapshot">
        <img
          src="./images/book1.jpg"
          alt=""
          height="70px"
          width="70px"
          id="snap3"
          onClick={() => handleClick("snap3", "./images/book1.jpg")}
        />
      </div>
      <div className="snapshot">
        <img
          src="./images/book-of-black-cover-closed.png"
          alt=""
          height="70px"
          width="70px"
          id="snap4"
          onClick={() =>
            handleClick("snap4", "./images/book-of-black-cover-closed.png")
          }
        />
      </div>
      <div className="video-snapshot"></div>
    </div>
  );
}
export default Booksnaps;

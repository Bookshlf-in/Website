import React from "react";
function Booksnaps(props) {
  function handleClick(id, source) {
    console.log(id);
    if (id !== "video") {
      document.getElementById("video-snap-full").style.display = "none";
      document.getElementById("book-snaps").style.display = "inline-block";
      document.getElementById("book-snaps-full").src = source;
    } else {
      document.getElementById("book-snaps").style.display = "none";
      document.getElementById("video-snap-full").style.display = "inline-block";
      document.getElementById("video-snap-source").src = source;
    }
  }
  return (
    <div className="book-snaps">
      {props.snaps ? (
        <>
          {props.snaps.map((snap, idx) => (
            <div className="snapshot" key={idx}>
              <img
                src={snap}
                alt="snapshots"
                height="70px"
                width="70px"
                id={"snap" + idx}
                onClick={(e) => {
                  handleClick(e.target.id, snap);
                }}
              />
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
      {props.video ? (
        <div
          className="video-snapshot"
          id="video"
          onClick={(e) => {
            handleClick(e.target.id, props.video);
          }}
        >
          <img
            src="/images/youtube.png"
            alt="video"
            height="70px"
            width="70px"
            id="video"
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default Booksnaps;

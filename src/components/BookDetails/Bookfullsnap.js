import React from "react";
function Bookfullsnap(props) {
  return (
    <div>
      <div className="book-snaps-full" id="book-snaps">
        <img
          src={props.url}
          alt=""
          height="100%"
          width="100%"
          id="book-snaps-full"
        />
      </div>

      <div id="video-snap-full">
        <iframe
          id="video-snap-source"
          width="100%"
          height="100%"
          src=""
          title="Book Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
export default Bookfullsnap;

import React from "react";
function Bookfullsnap(props) {
  function handleLoad() {
    var img = document.getElementById("book-snaps-full");
    var glass = document.getElementById("glass");
    glass.style.backgroundImage = "url('" + img.src + "')";
  }
  function handleMove(e) {
    e.preventDefault();
    var img = document.getElementById("book-snaps-full");
    var glass = document.getElementById("glass");
    var w, h, pos, x, y;
    // glass.style.backgroundImage = "url('" + props.url + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = img.width * 2 + "px " + img.height * 2 + "px";
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
    pos = getCurrPos(e, img);
    x = pos.x;
    y = pos.y;
    if (x > img.width - w / 2) {
      x = img.width - w / 2;
    }
    if (x < w / 2) {
      x = w / 2;
    }
    if (y > img.height - h / 2) {
      y = img.height - h / 2;
    }
    if (y < h / 2) {
      y = h / 2;
    }
    glass.style.left = x - w + "px";
    glass.style.top = y - h + "px";
    glass.style.backgroundPosition =
      "-" + (x * 2 - w) + "px -" + (y * 2 - h) + "px";
  }
  function getCurrPos(e, img) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;
    a = img.getBoundingClientRect();
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }

  return (
    <div>
      <div className="book-snaps-full" id="book-snaps">
        <div
          className="img-magnifier-glass"
          onMouseMove={handleMove}
          onTouchMove={handleMove}
          id="glass"
        ></div>
        <img
          onLoad={handleLoad}
          onTouchMove={handleMove}
          onMouseMove={handleMove}
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

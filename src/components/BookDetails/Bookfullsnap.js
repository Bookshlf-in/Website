import React from "react";

const Bookfullsnap = (props) => {

  const handleLoad = (e) => {
    const glass = document.getElementById("glass");
    glass.style.backgroundImage = "url('" + e.target.src + "')";
  }

  const handleMove = (e) => {

    e.preventDefault();

    const img = document.getElementById("book-snaps-full");
    const glass = document.getElementById("glass");
    let w, h, pos, x, y;

    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = img.width * 2 + "px " + img.height * 2 + "px";

    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
    pos = getCurrPos(e, img);
    x = pos.x;
    y = pos.y;

    x = (x > img.width - w / 2) ? (img.width - w / 2) : x;
    x = (x < w / 2) ? w / 2 : x;
    y = (y > img.height - h / 2) ? (y > img.height - h / 2) : y;
    y = (y < h / 2) ? h / 2 : y;

    glass.style.left = x - w + "px";
    glass.style.top = y - h + "px";
    glass.style.backgroundPosition = "-" + (x * 2 - w) + "px -" + (y * 2 - h) + "px";

  }

  const getCurrPos = (e, img) => {
    let a, x = 0, y = 0;
    e = e || window.event;
    a = img.getBoundingClientRect();
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }

  return (
    <>
      <div className="book-snaps-full" id="book-snaps">
        <div
          className="img-magnifier-glass"
          onMouseMove={handleMove}
          onTouchMove={handleMove}
          id="glass"
        ></div>
        <img
          onLoad={(e) => handleLoad(e)}
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
    </>
  );
}
export default Bookfullsnap;

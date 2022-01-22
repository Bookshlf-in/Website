import { React, useState } from "react";
import ReactImageMagnify from "@blacklab/react-image-magnify";

// Components
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Booksnaps = (props) => {
  // data States
  const [snap, setSnap] = useState(0);
  const [showvideo, setShowvideo] = useState(false);

  // changing Snaps
  const handelClick = (snapNo) => {
    setSnap(snapNo);
    setShowvideo(false);
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
      spacing={{ xs: 2, sm: 10, md: 10, lg: 10 }}
      className="book-details-snap"
      justifyContent="space-evenly"
    >
      <Stack
        direction={{ xs: "row", sm: "column", md: "column", lg: "column" }}
        spacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}
        sx={{
          maxHeight: 500,
          overflowY: "auto",
          overflowX: "auto",
          padding: "10px",
        }}
      >
        {props.snaps
          ? props.snaps.length
            ? props.snaps.map((snap, index) => (
                <Avatar
                  src={snap}
                  alt="book-snapshot"
                  key={index}
                  onClick={() => handelClick(index)}
                  className="book-snapshots"
                  variant="rounded"
                />
              ))
            : null
          : null}
        {props.video.length ? (
          <Stack
            sx={{ height: 100, width: 100, cursor: "pointer" }}
            justifyContent="center"
            alignItems="center"
            onClick={() => setShowvideo((prev) => !prev)}
          >
            <YouTubeIcon color="error" sx={{ height: 80, width: 80 }} />
          </Stack>
        ) : (
          <></>
        )}
      </Stack>
      <Stack alignItems="center" justifyContent="center">
        {!showvideo ? (
          <ReactImageMagnify
            title="Hover Over to Zoom"
            imageProps={{
              alt: "Book Large Snap",
              height: 200,
              src: props.snaps[snap],
              width: 200,
            }}
            magnifiedImageProps={{
              height: 800,
              width: 800,
              src: props.snaps[snap],
            }}
            magnifyContainerProps={{
              scale: 1.08,
            }}
            onActivationChanged={function noRefCheck() {}}
            onDetectedEnvironmentChanged={function noRefCheck() {}}
            onPositionChanged={function noRefCheck() {}}
            portalProps={{
              horizontalOffset: 10,
              id: "portal-test-id",
            }}
            className="book-large-snapshot"
          />
        ) : null}
        {showvideo ? (
          <iframe
            width="100%"
            height="100%"
            src={props.video}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        ) : null}
      </Stack>
    </Stack>
  );
};
export default Booksnaps;

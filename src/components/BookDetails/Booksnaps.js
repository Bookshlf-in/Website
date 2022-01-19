import { React, useState } from "react";
import ReactImageMagnify from "@blacklab/react-image-magnify";

// Components
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
const Booksnaps = (props) => {
  // data States
  const [snap, setSnap] = useState(0);

  // changing Snaps
  const handelClick = (snapNo) => {
    setSnap(snapNo);
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
        sx={{ overflowX: "auto" }}
        justifyContent="center"
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
      </Stack>
      <Stack alignItems="center" justifyContent="center">
        <ReactImageMagnify
          title="Hover Over to Zoom"
          imageProps={{
            alt: "Book Large Snap",
            height: 200,
            src: props.snaps[snap],
            width: 200,
          }}
          magnifiedImageProps={{
            height: 700,
            src: props.snaps[snap],
            width: 700,
          }}
          magnifyContainerProps={{
            height: 350,
            width: 350,
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
      </Stack>
    </Stack>
  );
};
export default Booksnaps;

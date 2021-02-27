import React, { useState } from "react";
import Zones from "../zones";
import ReactMapGL from "react-map-gl";

const Map = ({ data }) => {
  let [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 2,
    width: window.innerWidth,
    height: window.innerHeight,
  });

  return (
    <ReactMapGL
      mapStyle={"mapbox://styles/mapbox/dark-v9"}
      scrollZoom={{
        speed: 0.001,
        smooth: false,
      }}
      mapboxApiAccessToken={
        "pk.eyJ1Ijoibm90LXZhbGlkIiwiYSI6ImNrbGt1M2ZiMTEwaDMycG5tbDhseTY5YmoifQ.j0DITrdH06LMzgQ4A-H5vg"
      }
      {...viewport}
      onViewportChange={(nextView) => setViewport(nextView)}
    >
      <Zones viewport={viewport} data={data} />
    </ReactMapGL>
  );
};

export default Map;

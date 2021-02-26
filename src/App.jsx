import React, { useState, useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactMapGL, { Marker } from "react-map-gl";

const Zone = () => {
  return (
    <Marker longitude={85} latitude={23}>
      <div
        style={{
          backgroundColor: "rgba(255,0,0,0.5)",
          height: "100px",
          width: "100px",
          borderRadius: "50%",
        }}
      ></div>
    </Marker>
  );
};

const Map = () => {
  let [marker, setMarker] = useState({
    latitude: 22.8046,
    longitude: 86.2029,
  });

  let [viewport, setViewport] = useState({
    latitude: 22.8046,
    longitude: 86.2029,
    zoom: 8,
    width: window.innerWidth,
    height: window.innerHeight,
    pitch: 50,
  });

  let onMarkerDrag = (e) => {
    setMarker({
      latitude: e.lngLat[1],
      longitude: e.lngLat[0],
    });
  };

  return (
    <ReactMapGL
      mapboxApiAccessToken={
        "pk.eyJ1Ijoibm90LXZhbGlkIiwiYSI6ImNrbGt1M2ZiMTEwaDMycG5tbDhseTY5YmoifQ.j0DITrdH06LMzgQ4A-H5vg"
      }
      {...viewport}
      onViewportChange={(nextView) => setViewport(nextView)}
    >
      <Zone draggable />
      <Marker
        draggable={true}
        onDragEnd={onMarkerDrag}
        latitude={marker.latitude}
        longitude={marker.longitude}
        offsetTop={(viewport.zoom * 5) / 4}
      >
        <img
          draggable={false}
          height={viewport.zoom * 5}
          width={viewport.zoom * 5}
          src="placeholder.png"
          alt=""
        />
      </Marker>
    </ReactMapGL>
  );
};

function App() {
  return (
    <div>
      <Map />
    </div>
  );
}

export default App;

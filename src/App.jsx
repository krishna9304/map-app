import React, { useState, useCallback, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactMapGL, { Marker } from "react-map-gl";
import axios from "axios";
import countries from "./countries.json";

const Zone = ({ data, viewport }) => {
  let [radius, setRadius] = useState(10);
  let setRadiusForOne = (ele) => {
    for (let i = 0; i < countries.length; i++) {
      if (ele.country_code === data[i].CountryCode) {
        setRadius(
          (data[i].TotalConfirmed > 20000000 ? 20000000 : ele.TotalConfirmed) /
            5000000 +
            viewport.zoom * 1.2
        );
      }
    }
  };
  return (
    <>
      {countries.map((ele) => {
        setRadiusForOne(ele);
        if (
          ele.latlng[1] > 175 ||
          ele.latlng[0] > 85 ||
          ele.latlng[1] < -175 ||
          ele.latlng[0] < -85
        )
          return null;
        return (
          <Marker longitude={ele.latlng[1]} latitude={ele.latlng[0]}>
            <div
              style={{
                backgroundColor: "rgba(255,0,0,0.5)",
                height: `${radius}px`,
                width: `${radius}px`,
                borderRadius: "50%",
              }}
            ></div>
          </Marker>
        );
      })}
    </>
  );
};

const Map = ({ data }) => {
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
      <Zone data={data} viewport={viewport} />
      <Marker
        draggable={true}
        onDragEnd={onMarkerDrag}
        latitude={marker.latitude}
        longitude={marker.longitude}
        offsetTop={viewport.zoom * 5}
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
  let [data, setData] = useState(null);
  useEffect(() => {
    axios.get("https://api.covid19api.com/summary").then((res) => {
      setData(res.data.Countries);
    });
  }, []);
  return (
    <div>
      <Map data={data} />
    </div>
  );
}

export default App;

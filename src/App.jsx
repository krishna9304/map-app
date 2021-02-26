import React, { useState, useEffect } from "react";
import "./App.css";
import ReactMapGL, { Marker } from "react-map-gl";
import axios from "axios";
import countries from "./countries.json";

const Zone = ({ zoom, lat, lon, val }) => {
  let [over, setOver] = useState(false);
  return (
    <Marker
      longitude={lat}
      latitude={lon}
      offsetLeft={-(zoom ** 3.14) / 2}
      offsetTop={-(zoom ** 3.14) / 2}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255,0,0,0.5)",
          height: zoom ** 3.14,
          width: zoom ** 3.14,
          borderRadius: "50%",
          fontSize: zoom * 3,
        }}
      >
        {val}
      </div>
    </Marker>
  );
};

const Zones = ({ viewport, data }) => {
  if (data) {
    return data.map((ele) => {
      let countryCode = ele.CountryCode;
      let currCountry = null;
      countries.forEach((country) => {
        if (country.country_code == countryCode) {
          currCountry = country;
        }
      });
      let zoom = ele.TotalConfirmed / 5000000 + viewport.zoom * 1.2;
      return (
        <Zone
          zoom={zoom > 200 ? 200 : zoom}
          lat={currCountry.latlng[1]}
          lon={currCountry.latlng[0]}
          val={ele.TotalConfirmed}
        />
      );
    });
  }
  return (
    <>
      {countries.map((ele) => {
        // console.log(ele);
        if (
          ele.latlng[1] > 175 ||
          ele.latlng[0] > 85 ||
          ele.latlng[1] < -175 ||
          ele.latlng[0] < -85
        )
          return null;
        return (
          <Zone zoom={viewport.zoom} lat={ele.latlng[1]} lon={ele.latlng[0]} />
        );
      })}
    </>
  );
};

const Map = ({ data }) => {
  let [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 8,
    width: window.innerWidth,
    height: window.innerHeight,
  });

  return (
    <ReactMapGL
      reuseMaps={false}
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

function App() {
  let [data, setData] = useState(null);

  useEffect(() => {
    axios.get("https://api.covid19api.com/summary").then((res) => {
      setData(res.data.Countries);
    });
  }, []);
  if (!data) return <h1>Loading</h1>;
  return (
    <div>
      <Map data={data} />
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { Marker } from "react-map-gl";

const Zone = ({ zoom, lat, lon, val }) => {
  let [over, setOver] = useState(false);
  return (
    <Marker longitude={lat} latitude={lon}>
      <div
        onMouseEnter={() => {
          setOver(true);
        }}
        onMouseLeave={() => {
          setOver(false);
        }}
        style={{
          marginTop: -(zoom ** 3.14 + (over ? zoom * 5 : 0)) / 2,
          marginLeft: -(zoom ** 3.14 + (over ? zoom * 5 : 0)) / 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: `rgba(0,255,0,${
            val.TotalConfirmed / 40000000 < 0.5
              ? 0.5
              : val.TotalConfirmed / 40000000
          })`,
          height: zoom ** 3.14 + (over ? zoom * 5 : 0),
          width: zoom ** 3.14 + (over ? zoom * 5 : 0),
          borderRadius: "50%",
          fontSize: zoom * 2,
          color: "#fff",
          boxShadow: "1px 1px 50px rgba(0,255,0,0.7)",
          textAlign: "center",
          textShadow: "2px 2px 10px #000",
          transitionDuration: over ? "200ms" : "0ms",
        }}
      >
        {over && zoom > 5 ? `Name : ${val.Country}` : null}
        <br />
        {over ? `Total Confirmed : ${val.TotalConfirmed}` : val.TotalConfirmed}
        <br />
        {over && zoom > 5 ? `Total Recovered : ${val.TotalRecovered}` : null}
        <br />
        {over && zoom > 5 ? `Total Deaths : ${val.TotalDeaths}` : null}
      </div>
    </Marker>
  );
};

export default Zone;

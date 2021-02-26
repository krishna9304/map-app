import React, { useState, useCallback } from "react";
import "./App.css";
import ReactMapGL, { Marker } from "react-map-gl";
import axios from "axios";
import countries from "./countries.json";

// const Zone = ({ zoom, lat, lon }) => {
//   return (
//     <Marker
//       longitude={lat}
//       latitude={lon}
//       offsetLeft={-(zoom ** 3.14) / 2}
//       offsetTop={-(zoom ** 3.14) / 2}
//     >
//       <div
//         style={{
//           backgroundColor: "rgba(255,0,0,0.5)",
//           height: zoom ** 3.14,
//           width: zoom ** 3.14,
//           borderRadius: "50%",
//         }}
//       ></div>
//     </Marker>
//   );
// };

const Zones = () => {
  return (
    <>
      {countries.map((ele) => {
        console.log(ele);
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
                height: "10px",
                width: "10px",
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
  let [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 8,
    width: window.innerWidth,
    height: window.innerHeight,
  });

  return (
    <ReactMapGL
      mapboxApiAccessToken={
        "pk.eyJ1Ijoibm90LXZhbGlkIiwiYSI6ImNrbGt1M2ZiMTEwaDMycG5tbDhseTY5YmoifQ.j0DITrdH06LMzgQ4A-H5vg"
      }
      {...viewport}
      onViewportChange={(nextView) => setViewport(nextView)}
    >
      <Zones />
    </ReactMapGL>
  );
};

function App() {
  let [data, setData] = useState([]);

  axios
    .get("https://api.covid19api.com/summary")
    .then((res) => {
      setData(res.data.Countries);
    })
    .then(() => {});

  return (
    <div>
      <Map data={data} />
    </div>
  );
}

export default App;

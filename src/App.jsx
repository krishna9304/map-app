import React, { useState, useEffect } from "react";
import "./App.css";
import ReactMapGL from "react-map-gl";
import axios from "axios";
import Zones from "./components/zones";
import Loader from "./components/loader";

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
      scrollZoom={{
        speed: 0.001,
        smooth: false,
      }}
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
  if (!data) return <Loader />;
  return (
    <div>
      <Map data={data} />
    </div>
  );
}

export default App;

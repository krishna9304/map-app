import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Loader from "./components/loader";
import Map from "./components/map";

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

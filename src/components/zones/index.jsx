import React from "react";
import Zone from "../zone";
import countries from "../../countries.json";

const Zones = ({ viewport, data }) => {
  return data.map((ele) => {
    let countryCode = ele.CountryCode;
    let currCountry = null;
    countries.forEach((country) => {
      if (country.country_code === countryCode) {
        currCountry = country;
      }
    });
    let zoom =
      (ele.TotalConfirmed > 20000000 ? 20000000 : ele.TotalConfirmed) /
        5000000 +
      viewport.zoom * 1.2;
    return (
      <Zone
        key={currCountry.country_code}
        zoom={zoom}
        lat={currCountry.latlng[1]}
        lon={currCountry.latlng[0]}
        val={ele}
      />
    );
  });
};

export default Zones;

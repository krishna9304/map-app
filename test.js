let countries = require("./src/countries.json");
let axios = require("axios");

let data = null;

axios
  .get("https://api.covid19api.com/summary")
  .then((res) => {
    data = res.data;
  })
  .then(() => {
    data.Countries.map((ele) => {
      let countryCode = ele.CountryCode;
      let found = false;
      countries.forEach((country) => {
        if (country.country_code == countryCode) found = true;
      });
      console.log(found);
    });
  });

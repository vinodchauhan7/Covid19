import axios from "axios";
var total_report = {};
export const getReport = async () => {
  return await axios.get("/AllReports").then(response => {
    console.log(response.data.reports[0]);
    // var data = processData(response.data, "confirm");
    //getConfirmedDeath();
    return response.data.reports[0];
  });
};

export const getConfirmedDeath = async () => {
  return await axios.get("/FatalityRateByAge").then(response => {
    console.log(response);
    var data = processData(response.data, "death");
    getConfirmedRecovered();
    return data;
  });
};

export const getConfirmedRecovered = async () => {
  return await axios
    .get("/time_series_19-covid-Recovered.csv")
    .then(response => {
      console.log(response);
      var data = processData(response.data, "recovered");
      return data;
    });
};

var currentCountry = undefined;
function processData(allText, caseType) {
  var allTextLines = allText.split(/\r\n|\n/);
  // console.log(allTextLines);
  var headers = allTextLines[0].split(",");
  var previousCases = undefined;
  var newCases = 0;
  var tarr = undefined;
  for (var i = 1; i < allTextLines.length; i++) {
    var data = allTextLines[i].split(",");
    if (data.length === headers.length) {
      // for (var j = 0; j < headers.length; j++) {
      //   previousCases = parseInt(data[headers.length - 1]);
      // }
      var country = data[1];
      var key = caseType; //confirm or recover or death
      if (currentCountry === undefined || currentCountry === country) {
        currentCountry = data[1];
        tarr =
          parseInt(data[headers.length - 1]) +
          (tarr !== undefined ? parseInt(tarr) : 0);

        previousCases =
          parseInt(data[headers.length - 2]) +
          (previousCases !== undefined ? parseInt(previousCases) : 0);
      } else if (currentCountry !== country) {
        var type = {};
        type[key] = tarr;
        type[key + "newCase"] = tarr - previousCases;
        console.log("new COuntry :: " + currentCountry);
        console.log(total_report[currentCountry]);
        total_report[currentCountry] = Object.assign(
          {},
          total_report[currentCountry],
          type
        );
        console.log(total_report[currentCountry]);
        tarr = parseInt(data[headers.length - 1]);
        previousCases = parseInt(data[headers.length - 2]);
        currentCountry = country;
      }
    }
    // console.log(
    //   country + " : " + tarr[key] + " --- " + data[headers.length - 1]
    // );
  }

  console.log("caseType---------" + caseType);
  console.log(total_report);
  return total_report;
  // alert(lines);
}

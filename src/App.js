import React from "react";
import "./App.css";
import GeoChartComponent from "./components/Geo/GeoChart.component";
import { getReport } from "./utils/apiCall";
import TotalStats from "./components/total-stats/total-stats.component";
import useInterval from "./utils/useInterval";
import axios from "axios";
function App() {
  const [data, setData] = React.useState(null);
  const [currentCountry, setCurrentCountry] = React.useState();
  const [currentCountryDetails, setCurrentCountryDetails] = React.useState(
    null
  );

  React.useEffect(() => {
    // GetReport();
    async function allReports() {
      const report = await getReport();
      console.log(report);
      console.log(report.table[0][200].NewDeaths);

      setData(report);
    }
    allReports();
  }, []);

  useInterval(() => {
    async function allReports() {
      const report = await getReport();
      console.log(report);
      console.log(report.table[0][200].NewDeaths);

      setData(report);
    }
    allReports();
  }, 500000);

  React.useEffect(() => {
    console.log("coutny");
    setCurrentCountry("India");
    // axios.get("http://ip-api.com/json").then(response => {
    //   setCurrentCountry(response.data.country);
    // });
    if (data && currentCountry) {
      console.log(currentCountry);
      data.table[0].forEach(countryDetails => {
        if (
          currentCountry.toLowerCase().trim() ===
          countryDetails.Country.toLowerCase().trim()
        ) {
          console.log(countryDetails);
          setCurrentCountryDetails(countryDetails);
        }
      });
    }
  }, [data, currentCountry, currentCountryDetails]);

  if (data == null || currentCountryDetails == null) {
    return <div className="App">Loading....</div>;
  }

  return (
    <div className="App">
      <h1>COVID-19 Latest Updates</h1>
      <div className="detailsBox">
        <TotalStats place="World" value={data.cases} title="Total Cases" />
        <TotalStats place="World" value={data.deaths} title="Total Deaths" />
        <TotalStats
          place="World"
          value={data.recovered}
          title="Total Recovered"
        />
        <TotalStats
          place="World"
          value={data.active_cases[0].currently_infected_patients}
          title="Active Cases"
        />
        <TotalStats
          place="World"
          value={data.closed_cases[0].cases_which_had_an_outcome}
          title="Closed Cases"
        />

        <TotalStats
          place="World"
          value={data.table[0][201].NewCases}
          title="New Cases"
        />
        <TotalStats
          place="World"
          value={data.table[0][201].NewDeaths}
          title="New Deaths"
        />
        <TotalStats
          place="World"
          value={data.table[0][201].Serious_Critical}
          title="Critical Cases"
        />
      </div>
      <GeoChartComponent
        report={data.table}
        countryDetails={currentCountryDetails}
      ></GeoChartComponent>
    </div>
  );
}

export default App;

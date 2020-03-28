import React from "react";
import GeoChart from "./GeoChart";
import data from "./GeoChart.world.geo.json";
import "./GeoChart.css";

const GeoChartComponent = props => {
  const [countryFeature, setCountryFeature] = React.useState();
  const [selectedCountryFeature, setselectedCountryFeature] = React.useState();

  React.useEffect(() => {
    data.features.forEach(feature => {
      if (
        props.countryDetails.Country.toLowerCase().trim() ===
        feature.properties.name.toLowerCase().trim()
      ) {
        console.log(feature.properties.name);
        setCountryFeature(feature);
      }
    });
  }, [props, countryFeature]);

  const handleCountrySelection = feature => {
    console.log(feature.properties.name.toLowerCase().trim());

    props.report[0].forEach(countryDetails => {
      //console.log(countryDetails.Country.toLowerCase().trim());
      if (
        feature.properties.name.toLowerCase().trim() ===
        countryDetails.Country.toLowerCase().trim()
      ) {
        console.log(countryDetails);
        setselectedCountryFeature(countryDetails);
      }
      if (
        feature.properties.name.toLowerCase().trim() === "united states" &&
        countryDetails.Country.toLowerCase().trim() === "usa"
      ) {
        console.log(countryDetails);
        setselectedCountryFeature(countryDetails);
      }
    });
    //setselectedCountryFeature(feature);
  };

  return (
    <div className="geoChartContainer">
      <h3>World Map According to Population</h3>
      <GeoChart
        report={props.report}
        data={data}
        selectedCountryFeature={countryFeature}
        handleSelectCountry={name => handleCountrySelection(name)}
      />
      <div className="countryWise">
        <div className="country">
          <h2>My Country</h2>
          <span>{props.countryDetails.Country}</span>
          <span>
            TotalCases:{" "}
            {props.countryDetails.TotalCases !== ""
              ? props.countryDetails.TotalCases
              : 0}
          </span>
          <span>
            NewCases:{" "}
            {props.countryDetails.NewCases !== ""
              ? props.countryDetails.NewCases
              : 0}
          </span>
          <span>
            TotalDeaths:{" "}
            {props.countryDetails.TotalDeaths !== ""
              ? props.countryDetails.TotalDeaths
              : 0}
          </span>
          <span>
            TotalRecovered:{" "}
            {props.countryDetails.TotalRecovered !== ""
              ? props.countryDetails.TotalRecovered
              : 0}
          </span>
          <span>
            ActiveCases:{" "}
            {props.countryDetails.ActiveCases !== ""
              ? props.countryDetails.ActiveCases
              : 0}
          </span>
          <span>
            TotCases_1M_Pop:{" "}
            {props.countryDetails.TotCases_1M_Pop !== ""
              ? props.countryDetails.TotCases_1M_Pop
              : 0}
          </span>
        </div>
        <div className="country">
          <h2>Selected Country</h2>
          {selectedCountryFeature ? (
            <>
              <span>{selectedCountryFeature.Country}</span>
              <span>
                TotalCases:{" "}
                {selectedCountryFeature.TotalCases !== ""
                  ? selectedCountryFeature.TotalCases
                  : 0}
              </span>
              <span>
                NewCases:{" "}
                {selectedCountryFeature.NewCases !== ""
                  ? selectedCountryFeature.NewCases
                  : 0}
              </span>
              <span>
                TotalDeaths:{" "}
                {selectedCountryFeature.TotalDeaths !== ""
                  ? selectedCountryFeature.TotalDeaths
                  : 0}
              </span>
              <span>
                TotalRecovered:{" "}
                {selectedCountryFeature.TotalRecovered !== ""
                  ? selectedCountryFeature.TotalRecovered
                  : 0}
              </span>
              <span>
                ActiveCases:{" "}
                {selectedCountryFeature.ActiveCases !== ""
                  ? selectedCountryFeature.ActiveCases
                  : 0}
              </span>
              <span>
                TotCases_1M_Pop:{" "}
                {selectedCountryFeature.TotCases_1M_Pop !== ""
                  ? selectedCountryFeature.TotCases_1M_Pop
                  : 0}
              </span>
            </>
          ) : (
            "Select Any Country"
          )}
        </div>
      </div>
    </div>
  );
};

export default GeoChartComponent;

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
    console.log(feature);
    props.report[0].forEach(countryDetails => {
      if (
        feature.properties.name.toLowerCase().trim() ===
        countryDetails.Country.toLowerCase().trim()
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
          <span>TotalCases: {props.countryDetails.TotalCases}</span>
          <span>NewCases: {props.countryDetails.NewCases}</span>
          <span>TotalDeaths: {props.countryDetails.TotalDeaths}</span>
          <span>TotalRecovered: {props.countryDetails.TotalRecovered}</span>
          <span>ActiveCases: {props.countryDetails.ActiveCases}</span>
          <span>TotCases_1M_Pop: {props.countryDetails.TotCases_1M_Pop}</span>
        </div>
        <div className="country">
          <h2>Selected Country</h2>
          {selectedCountryFeature ? (
            <>
              <span>{selectedCountryFeature.Country}</span>
              <span>TotalCases: {selectedCountryFeature.TotalCases}</span>
              <span>NewCases: {selectedCountryFeature.NewCases}</span>
              <span>TotalDeaths: {selectedCountryFeature.TotalDeaths}</span>
              <span>
                TotalRecovered: {selectedCountryFeature.TotalRecovered}
              </span>
              <span>ActiveCases: {selectedCountryFeature.ActiveCases}</span>
              <span>
                TotCases_1M_Pop: {selectedCountryFeature.TotCases_1M_Pop}
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

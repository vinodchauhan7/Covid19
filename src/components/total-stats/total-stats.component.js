import React from "react";
import "./total-stats.styles.css";

const TotalStats = props => {
  return (
    <div className="totalstat">
      <div className="title">{props.title}</div>
      <div className="place">{props.place}</div>
      <div className="value">{props.value > 0 ? props.value : 0}</div>
    </div>
  );
};

export default TotalStats;

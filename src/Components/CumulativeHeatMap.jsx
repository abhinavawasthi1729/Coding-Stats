import styled from "styled-components";
import Heatmap from "./Heatmap";
import { useState } from "react";

const HeatMap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  //height: 100%;
  width: 100%;
  flex: 4;
  overflow: scroll;
  padding: 10px;

  svg {
    height: 100%;
    width: 100%;
  }
`;
/*
This code defines a styled component HeatMap and a functional component CumulativeHeatMap. 
The CumulativeHeatMap component takes a data prop, combines the data, and then renders a Heatmap 
component passing the combined data as heatmapData.
*/
const CumulativeHeatMap = ({ data }) => {
  function convertDateToUnixTimestamp(dateString) {
    const unixTimestamp = Math.floor(new Date(dateString).getTime() / 1000); // Convert date to Unix timestamp in seconds
    return unixTimestamp;
  }

  function combine(array) {
    const combinedData = {};

    array.forEach((obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        let date = new Date(key * 1000);
        date.setHours(0, 0, 0, 0);
        date = convertDateToUnixTimestamp(date);
        combinedData[date] = (combinedData[date] || 0) + value;
      });
    });

    return combinedData;
  }

  return (
    <HeatMap>
      <Heatmap heatmapData={combine(data)} year={new Date().getFullYear()} />
    </HeatMap>
  );
};

export default CumulativeHeatMap;

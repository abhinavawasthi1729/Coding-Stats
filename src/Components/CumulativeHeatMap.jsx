// Import styled-components for CSS-in-JS styling
import styled from "styled-components";

// Import the Heatmap component (calendar heatmap UI)
import Heatmap from "./Heatmap";

// Import useState hook (not used currently, but left for possible state handling)
import { useState } from "react";

// Define a styled wrapper for the heatmap layout
const HeatMap = styled.div`
  display: flex;
  align-items: center;       // Vertically align children to the center
  justify-content: flex-start; // Align content to the start of the horizontal axis
  width: 100%;               // Full width of the container
  flex: 4;                   // Flex ratio if used within a flex layout
  overflow: scroll;          // Enable scroll if content overflows horizontally
  padding: 10px;             // Add padding around the component

  // Style the SVG inside CalendarHeatmap to take full size
  svg {
    height: 100%;
    width: 100%;
  }
`;

/*
This component `CumulativeHeatMap` takes a `data` prop, 
which is an array of daily submission datasets from multiple sources.

It:
- Combines them into a single map of {timestamp: count}
- Normalizes each date to midnight
- Passes this combined data to the `Heatmap` component to render
*/
const CumulativeHeatMap = ({ data }) => {

  // Utility: Converts a readable date string into a UNIX timestamp (seconds)
  function convertDateToUnixTimestamp(dateString) {
    const unixTimestamp = Math.floor(new Date(dateString).getTime() / 1000); // Convert to seconds
    return unixTimestamp;
  }

  // Combines multiple heatmap datasets into one, aggregated by day
  function combine(array) {
    const combinedData = {};

    array.forEach((obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        // Normalize the timestamp to start of day (midnight)
        let date = new Date(key * 1000);
        date.setHours(0, 0, 0, 0);

        // Convert normalized date back to timestamp
        date = convertDateToUnixTimestamp(date);

        // Accumulate the value (submission count) for that day
        combinedData[date] = (combinedData[date] || 0) + value;
      });
    });

    return combinedData;
  }

  return (
    // Render the styled heatmap wrapper
    <HeatMap>
      {/* Pass the combined data and current year to the Heatmap component */}
      <Heatmap heatmapData={combine(data)} year={new Date().getFullYear()} />
    </HeatMap>
  );
};

export default CumulativeHeatMap;

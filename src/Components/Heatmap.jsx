// Import the CalendarHeatmap component and its default styles
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { useState } from "react";

/*
This functional component `Heatmap` visualizes user activity data (e.g., submissions)
across a year using a calendar heatmap.

It:
- Converts UNIX timestamps to date strings
- Passes these to the heatmap component
- Uses hover handlers to show a custom tooltip with submission info
*/

function Heatmap({ heatmapData, year }) {
    // Convert heatmapData object into an array of {date, count} objects
    const values = Object.keys(heatmapData).map((key) => {
        const timestamp = parseInt(key);
        const date = new Date(timestamp * 1000); // Convert UNIX timestamp to JS Date (ms)
        
        // Format date to YYYY-MM-DD string
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        
        return { date: formattedDate, count: heatmapData[key] };
    });

    // State to manage tooltip data on hover
    const [tooltipData, setTooltipData] = useState(null);

    // Handle mouse hover on a heatmap cell
    const handleCellHover = (event, value) => {
        if (!value) {
            setTooltipData(null);
            return;
        }

        // Log mouse event for debugging (can be removed in prod)
        console.log(event);

        // Save tooltip data including cursor position for positioning the tooltip
        setTooltipData({ value, x: event.nativeEvent.layerX, y: event.nativeEvent.layerY });
    };

    // Reset tooltip when mouse leaves the cell
    const handleCellLeave = () => {
        setTooltipData(null);
    };

    return (
        <div style={{ height: "200px", position: "relative", minWidth: "1000px" }}>
            <CalendarHeatmap
                // Define the start and end date range of the heatmap
                startDate={new Date(`${year}-01-01`)}
                endDate={new Date(`${year}-12-31`)}

                // Provide data to be visualized
                values={values}

                // Apply different classes based on count value (used for coloring)
                classForValue={(value) => {
                    if (!value) {
                        return "color-empty"; // No activity
                    }

                    // Apply color scale based on count ranges
                    switch (value.count) {
                        case 1:
                        case 2:
                        case 3:
                            return `color-scale-1`;
                        case 4:
                        case 5:
                            return `color-scale-2`;
                        case 7:
                        case 8:
                            return `color-scale-3`;
                    }

                    // Default high activity color
                    return `color-scale-4`;
                }}

                // Custom tooltip attributes (used by react-tooltip)
                tooltipDataAttrs={(value) => {
                    return {
                        'data-tip': value.date,
                    };
                }}

                // Display month labels above the heatmap
                showMonthLabels={true}

                // Custom handlers for showing and hiding tooltips
                onMouseOver={handleCellHover}
                onMouseLeave={handleCellLeave}
            />

            {/* Render custom tooltip if tooltipData exists */}
            {tooltipData && (
                <div style={{
                    position: 'absolute',
                    color: "white",
                    backgroundColor: "black",
                    fontSize: "18px",
                    padding: "4px",
                    top: tooltipData.y,
                    left: tooltipData.x + 15
                }}>
                    {tooltipData.value.count} submissions on {tooltipData.value.date}
                </div>
            )}
        </div>
    );
}

export default Heatmap;

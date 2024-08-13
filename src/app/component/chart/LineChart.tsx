// import React, { useEffect } from 'react';
// import { ResponsiveLine } from '@nivo/line';
// import { DOCUMENTS } from "../../../data";
// import { faker } from '@faker-js/faker';

// const status= Array.from(new Set(DOCUMENTS.map(doc => doc.status)));


// const generateFakeData = () => {
//   return status.map(status => ({
//     id: status,
//     data: Array.from({ length: 12 }, (_, index) => ({
//       x: `Month ${index + 1}`,
//       y: faker.datatype.number({ min: 0, max: 100 }),
//     })),
//   }));
// };

// const data = generateFakeData();

// const LineChart: React.FC = () => {
  

//   return (
//     <div style={{ height: "500px", width: "100%" }}>
//       <ResponsiveLine
//         data={data}
//         colors={{ scheme: "nivo" }}
//         margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//         xScale={{ type: "point" }}
//         yScale={{
//           type: "linear",
//           min: "auto",
//           max: "auto",
//           stacked: true,
//           reverse: false,
//         }}
//         yFormat=" >-.2f"
//         curve="catmullRom"
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "Month",
//           legendOffset: 36,
//           legendPosition: "middle",
//         }}
//         axisLeft={{
//           tickValues: 5,
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "Count",
//           legendOffset: -40,
//           legendPosition: "middle",
//         }}
//         enableGridX={false}
//         enableGridY={true}
//         pointSize={8}
//         pointColor={{ theme: "background" }}
//         pointBorderWidth={2}
//         pointBorderColor={{ from: "serieColor" }}
//         pointLabelYOffset={-12}
//         useMesh={true}
//         legends={[
//           {
//             anchor: "bottom-right",
//             direction: "column",
//             justify: false,
//             translateX: 100,
//             translateY: 0,
//             itemsSpacing: 0,
//             itemDirection: "left-to-right",
//             itemWidth: 80,
//             itemHeight: 20,
//             itemOpacity: 0.75,
//             symbolSize: 12,
//             symbolShape: "circle",
//             symbolBorderColor: "rgba(0, 0, 0, .5)",
//             effects: [
//               {
//                 on: "hover",
//                 style: {
//                   itemBackground: "rgba(0, 0, 0, .03)",
//                   itemOpacity: 1,
//                 },
//               },
//             ],
//           },
//         ]}
//       />
//     </div>
//   );
// };

// export default LineChart;

import React from 'react';
import { ResponsiveLine, Serie } from '@nivo/line';
import { DOCUMENTS } from "../../../data";
import styles from '../../../styles/dashboard.module.css'

// Aggregate and sort the data based on status counts
const aggregateAndSortData = () => {
  const statusCounts = DOCUMENTS.reduce((acc, doc) => {
    acc[doc.status] = (acc[doc.status] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const sortedStatuses = Object.keys(statusCounts).sort((a, b) => statusCounts[b] - statusCounts[a]);

  return sortedStatuses.map((status) => ({
    x: status,
    y: statusCounts[status],
  }));
};

const data: Serie[] = [{
  id: 'Status Counts',
  data: aggregateAndSortData(),
}];

const LineChart: React.FC = () => {
  return (
    <div className={styles.lineChartContainer}>
        <div style={{height:"140px", transformOrigin:"center"}}>
      <ResponsiveLine
        data={data}
        colors={["#2379EA"]}
        margin={{ top: 40, right: 40, bottom: 25, left: 30 }}
    
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          
          tickValues: [], 
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickValues: [],
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false} 
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        tooltip={({ point }) => (
          <div
            style={{
              background: 'white',
              padding: '5px',
              border: '1px solid #ccc',
            }}
          >
            <strong>{point.data.xFormatted}</strong>: {point.data.yFormatted}
          </div>
        )}
        layers={[
          'grid',
          'markers',
          'areas',
          'lines',
          'slices',
          'points',
          'mesh',
          'legends',
          ({ series, xScale, yScale }) => (
            <g>
              {series.map(({ id, data, color }) =>
                data.map((d) => (
                  <rect
                    key={d.position.x}
                    x={d.position.x - 2}
                    y={d.position.y}
                    width={4}
                    height={d.position.y}
                    fill={color}
                    opacity={0.1}
                  />
                ))
              )}
            </g>
          ),
        ]}
        // legends={[
        //   {
        //     anchor: "bottom-right",
        //     direction: "column",
        //     justify: false,
        //     translateX: 100,
        //     translateY: 0,
        //     itemsSpacing: 0,
        //     itemDirection: "left-to-right",
        //     itemWidth: 80,
        //     itemHeight: 20,
        //     itemOpacity: 0.75,
        //     // symbolSize: 12,
        //     symbolShape: "circle",
        //     symbolBorderColor: "rgba(0, 0, 0, .5)",
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemBackground: "rgba(0, 0, 0, .03)",
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
      />
      </div>
    </div>
  );
};

export default LineChart;

import React, { useEffect, useState } from 'react';
import { ResponsiveLine, Serie } from '@nivo/line';
import axios from '../../../api/axios';
import styles from '../../../styles/dashboard.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../api/store';

const LineChart: React.FC = () => {
  const [data, setData] = useState<Serie[]>([]);  // Store chart data
  const [loading, setLoading] = useState(true);   // Track loading state
  const [error, setError] = useState<string | null>(null); // Store error state if any
  const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken);
  
  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('api/v1/memo/count-by-status',
          {
            headers: {
              Authorization: `Bearer ${accessToken}` // Pass access token in headers
            }
          }
        );  // API endpoint
        const statusCountMap = response.data;

        // Format the data for Nivo's line chart
        const chartData = Object.keys(statusCountMap).map((status) => ({
          x: status,    // Status will be the x-axis value
          y: statusCountMap[status], // Count will be the y-axis value
        }));

        setData([{ id: 'Status Counts', data: chartData }]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.lineChartContainer}>
      <div style={{ height: "140px", transformOrigin: "center", width:"270px", marginLeft:"10px" }}>
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
          curve="catmullRom"  // Smoothens the line
          enableArea={true}   // Enable the area fill below the line
          areaBaselineValue={0} // Base of the area fill
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
                fontSize:"10px"
              }}
            >
              <strong>{point.data.xFormatted}</strong>: {point.data.yFormatted}
            </div>
          )}
          layers={[
            'grid',
            'markers',
            'areas',
            'lines',   // Focus on default 'lines' rendering
            'slices',
            'points',
            'mesh',
            'legends',
          ]}
        />
      </div>
    </div>
  );
};

export default LineChart;


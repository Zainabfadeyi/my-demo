import React, { useEffect, useState } from 'react';
import { ResponsivePie } from "@nivo/pie";
import axios from '../../../api/axios';
import styles from '../../../styles/dashboard.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../api/store';

// Define the type for the pie chart data
interface PieChartData {
  id: string;
  label: string;
  value: number;
}

const PieChart: React.FC<{ month: number }> = ({ month }) => {
  const [pieChartData, setPieChartData] = useState<PieChartData[]>([]); // State for chart data
  const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken); // Get accessToken from Redux

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/memo/count-by-category-month', {
          params: { month }, // Pass the selected month as a query parameter
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token
          }
        });

        const data = response.data;
        // Transform API data into the format required by Nivo Pie Chart
        const transformedData: PieChartData[] = Object.keys(data).map((category) => ({
          id: category,
          label: category,
          value: data[category],
        }));

        setPieChartData(transformedData); // Set the transformed data to state
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    fetchData();
  }, [month, accessToken]); // Re-fetch data when month or accessToken changes

  return (
    <div className={styles.pieContainer}>
      <div style={{ height: "380px", transformOrigin: "center", width: "100%" }}>
        <ResponsivePie
          data={pieChartData.length > 0 ? pieChartData : [{ id: 'No Data', label: 'No Data', value: 1 }]} // Fallback to display "No Data"
          margin={{ top: 40, right: 90, bottom: 60, left: -40 }}
          innerRadius={0}
          padAngle={0.5}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={["#1CB1FF", "#247AEA", "#FB7465", "#FFC754", "#8ABB70", "#4C6BBE", "#D6EDEE"]} // Custom colors
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.4]],
          }}
          arcLinkLabelsSkipAngle={360}
          arcLinkLabelsThickness={0}
          arcLinkLabelsColor={{ from: "color", modifiers: [["darker", 0.4]] }}
          enableArcLabels={false}
          arcLabelsRadiusOffset={0.4}
          arcLabelsSkipAngle={7}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 4]],
          }}
          legends={[
            {
              anchor: "right",
              direction: "column",
              justify: false,
              translateX: 50,
              translateY: 0,
              itemsSpacing: 5,
              itemWidth: 110,
              itemHeight: 20,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 20,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default PieChart;
   

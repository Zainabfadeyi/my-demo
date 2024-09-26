import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import axios from '../../../api/axios';
import styles from  "../../../styles/dashboard.module.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../../api/store';

// Define BarDatum type that conforms to Nivo's expected structure
interface BarDatum {
  status: string;
  [key: string]: number | string;  // Allow dynamic keys for counts
}

interface BarProps {
  month: number;
}

const Bar: React.FC<BarProps> = ({ month }) => {
  const [barChartData, setBarChartData] = useState<BarDatum[]>([]);  // Make sure the type matches BarDatum[]
  const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken);

  // Fetch data when the month changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/memo/count-by-status-month', {
          params: { month },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });

        const data = response.data;

        if (Object.keys(data).length === 0) {
          // If the response is empty, display an empty chart
          setBarChartData([]);
        } else {
          // Transform the data to the format expected by the chart
          const transformedData: BarDatum[] = Object.keys(data).map((status) => ({
            status,         // Status of the document
            count: data[status],  // Count of memos in this status
          }));
          setBarChartData(transformedData);  // Update the chart data
        }
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    fetchData();
  }, [month]);

  return (
    <div className={styles.barContainer}>
      <div style={{ height: '380px', transformOrigin: 'center' }}>
        <ResponsiveBar
          data={barChartData.length > 0 ? barChartData : [{ status: 'No Data', count: 0 }]}  // Fallback to display empty chart
          keys={['count']}     
          indexBy="status"     
          margin={{ top: 50, right: 100, bottom: 70, left: 90 }}
          borderWidth={0}
          padding={0.86}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={() => '#2379EA'}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          borderRadius={13}
          axisTop={null}
          axisRight={null}
          axisBottom={{}}     
          axisLeft={{}}        
          enableLabel={false}  
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          role="application"
          barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in status: ${e.indexValue}`}
          gridYValues={5}     
        />
      </div>
    </div>
  );
};

export default Bar;

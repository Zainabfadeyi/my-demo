
import React from 'react';
import { BarDatum, ResponsiveBar } from '@nivo/bar';
import { DOCUMENTS } from "../../../data";
import styles from  "../../../styles/dashboard.module.css"
type DocumentStatus = "Pending" | "Approved" | "Rejected";


interface BarChartData {
  status: DocumentStatus;
  count: number;
}

const groupedData: { [key in DocumentStatus]?: number } = DOCUMENTS.reduce((acc, doc) => {
  acc[doc.status as DocumentStatus] = (acc[doc.status as DocumentStatus] || 0) + 1;
  return acc;
}, {} as { [key in DocumentStatus]?: number });

const barChartData: readonly BarDatum[] = Object.keys(groupedData).map((status) => ({
  status: status as DocumentStatus,
  count: groupedData[status as DocumentStatus] || 0,
}));

const Bar: React.FC = () => {
  return (
    <div className={styles.barContainer} >
      <div style={{ height:"380px", transformOrigin: "center" }}>
        <ResponsiveBar
          data={barChartData}
          keys={["count"]}
          indexBy="status"
          margin={{ top: 50, right: 100, bottom: 70, left: 90 }}
          borderWidth={2}
          padding={0.8}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={() => "#2379EA"}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          borderRadius={15}
          axisTop={null}
          axisRight={null}
          axisBottom={{}}
          axisLeft={{}}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          
          role="application"
          barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in status: ${e.indexValue}`}
        />
      </div>
    </div>
  );
};

export default Bar;

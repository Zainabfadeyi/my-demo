import { ResponsivePie } from "@nivo/pie";
import { DOCUMENTS } from "../../../data";
import styles from '../../../styles/dashboard.module.css'

interface PieChartData {
    id: string;
    label: string;
    value: number;
  }
  
  const groupedData = DOCUMENTS.reduce((acc, doc) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });
  
  const pieChartData: readonly PieChartData[] = Object.keys(groupedData).map((category) => ({
    id: category,
    label: category,
    value: groupedData[category],
  }));

const PieChart:React.FC = () => {


  return (
    <div className={styles.pieContainer}>
    <div style={{height:"380px",  transformOrigin: "center", width:"100%"}}>
    <ResponsivePie
      data={pieChartData}
      
      margin={{ top: 40, right: 90, bottom: 60, left: -40 }}
      innerRadius={0}
      padAngle={0.5}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.4]],
      }}
      arcLinkLabelsSkipAngle={360}
      arcLinkLabelsThickness={0}
      arcLinkLabelsColor={{ from: "color" , modifiers: [["darker", 0.4]] }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 4]],
      }}
      
      defs={[
        // {
        //   id: "dots",
        //   type: "patternDots",
        //   background: "inherit",
        //   color: "rgba(255, 255, 255, 0.3)",
        //   size: 4,
        //   padding: 1,
        //   stagger: true,
        // },
        // {
        //   id: "lines",
        //   type: "patternLines",
        //   background: "inherit",
        //   color: "rgba(255, 255, 255, 0.3)",
        //   rotation: -45,
        //   lineWidth: 6,
        //   spacing: 10,
        // },
      ]}
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
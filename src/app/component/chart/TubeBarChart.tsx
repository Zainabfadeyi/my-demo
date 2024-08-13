// import React from 'react';
// import { ResponsiveBar, BarDatum } from '@nivo/bar';
// import { DOCUMENTS } from "../../../data";
// import styles from '../../../styles/dashboard.module.css';

// type DocumentCategory = 
//   "employment agreement" |
//   "new employer document" |
//   "departmental benefits" |
//   "offer letter" |
//   "faculty benefit" |
//   "student benefit";

// interface BarChartData {
//   category: DocumentCategory;
//   count: number;
// }

// const groupedData: { [key in DocumentCategory]?: number } = DOCUMENTS.reduce((acc, doc) => {
//   acc[doc.category as DocumentCategory] = (acc[doc.category as DocumentCategory] || 0) + 1;
//   return acc;
// }, {} as { [key in DocumentCategory]?: number });

// const barChartData: readonly BarDatum[] = Object.keys(groupedData).map((category) => ({
//   category: category as DocumentCategory,
//   count: groupedData[category as DocumentCategory] || 0,
// }));

// const BarChart: React.FC = () => {
//   return (
//     <div className={styles.tubeChartContainer}>
//       <div style={{ height: "140px" , transformOrigin:"center" }}>
//         <ResponsiveBar
//           data={barChartData}
//           keys={['count']}
//           indexBy="category"
//           margin={{ top: 0, right: 50, bottom: 5, left: 0 }}
//           padding={0.7}
//           colors={() => "#2379EA"}
//           borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
//           valueScale={{ type: "linear" }}
//           indexScale={{ type: "band", round: true }}
//           borderRadius={10}
//           axisTop={null} 
//           axisRight={null}
//           axisBottom={null} 
//           axisLeft={null}
//           enableGridX={false}
//           enableGridY={false}
//           enableLabel={false} 
//           labelSkipWidth={10}
//           labelSkipHeight={12}
//           labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
//           legends={[]} // Remove legends
//           role="application"
//           barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in status: ${e.indexValue}`}
//         />
//       </div>
//     </div>
//   );
// };

// export default BarChart;

import React, { useEffect, useState } from 'react';
import { DOCUMENTS } from "../../../data"; // Import your documents data
import styles from '../../../styles/tubeBarchart.module.css';
import { DocumentCategory } from '../../../data';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

interface Document {
  category: DocumentCategory;
}

const calculateCategoryTotals = (documents: Document[]) => {
  const categoryTotals: { [key in DocumentCategory]: number } = {
    "employment agreement": 0,
    "new employer document": 0,
    "departmental benefits": 0,
    "offer letter": 0,
    "faculty benefit": 0,
    "student benefit": 0,
  };

  documents.forEach(document => {
    const category = document.category;
    if (categoryTotals.hasOwnProperty(category)) {
      categoryTotals[category] += 1; // Increment count for each document in the category
    }
  });

  return categoryTotals;
};

const ProgressChart: React.FC = () => {
  const [categoryTotals, setCategoryTotals] = useState<{ [key in DocumentCategory]: number }>({
    "employment agreement": 0,
    "new employer document": 0,
    "departmental benefits": 0,
    "offer letter": 0,
    "faculty benefit": 0,
    "student benefit": 0,
  });

  useEffect(() => {
    const totals = calculateCategoryTotals(DOCUMENTS); // Calculate category totals
    setCategoryTotals(totals); // Set the calculated totals to state
  }, []);

  const totalDocuments = Object.values(categoryTotals).reduce((acc, count) => acc + count, 0); // Calculate total documents

  return (
    <div className={styles.progressContainer}>
      {Object.keys(categoryTotals).map((category, index) => {
        const count = categoryTotals[category as DocumentCategory];
        const percentage = ((count / totalDocuments) *250).toFixed(2);
        const categoryClass = category.replace(/ /g, '-').toLowerCase();

        return (
          <OverlayTrigger
            key={category}
            placement="top"
            overlay={<Tooltip id={`tooltip-${index}`}>{category}</Tooltip>}
          >
            <div className={`${styles.progressVertical}`}>
              <div
                className={`progress-bar ${styles.progressBar} ${styles[categoryClass]}`}
                role="progressbar"
                style={{ height: `${percentage}%` }} // Set height based on percentage
                aria-valuenow={count}
                aria-valuemin={0}
                aria-valuemax={totalDocuments}
              >
               
              </div>
            </div>
          </OverlayTrigger>
        );
      })}
    </div>
  );
};

export default ProgressChart;
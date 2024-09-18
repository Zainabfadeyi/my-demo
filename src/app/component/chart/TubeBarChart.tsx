import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import styles from '../../../styles/tubeBarchart.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../api/store';

// Define the expected structure of the API response
interface CategoryCounts {
  [key: string]: number;
}

const ProgressChart: React.FC = () => {
  const [categoryTotals, setCategoryTotals] = useState<CategoryCounts>({});
  const [totalDocuments, setTotalDocuments] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CategoryCounts>('api/v1/memo/count-by-category', {
          headers: {
            Authorization: `Bearer ${accessToken}` // Pass access token in headers
          }
        });

        const categoryCounts = response.data;
        
        // Set the total by reducing the values to sum them up
        const total = Object.values(categoryCounts).reduce((acc: number, count: number) => acc + count, 0);

        setCategoryTotals(categoryCounts);  // Set the category totals
        setTotalDocuments(total);           // Set the total document count
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.progressContainer}>
      {Object.keys(categoryTotals).map((category, index) => {
        const count = categoryTotals[category];
        const percentage = ((count / totalDocuments) * 150).toFixed(2); // Calculate the percentage
        const categoryClass = category.replace(/ /g, '-').toLowerCase(); // Class based on category name

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

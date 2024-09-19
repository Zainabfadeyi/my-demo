import { FaCloudDownloadAlt } from "react-icons/fa";
import * as XLSX from "xlsx/xlsx.mjs";

import styles from "../../../styles/table.module.css";
interface DownloadBtnProps {
  data?: Record<string, any>[]; // An array of objects for data
  fileName?: string;            // Optional fileName prop
}

const DownloadBtn: React.FC<DownloadBtnProps> = ({ data = [], fileName }) => {
  const handleDownload = () => {
    const datas = data.length ? data : [];
    const worksheet = XLSX.utils.json_to_sheet(datas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
  };

  return (
    <button className={styles.DownloadBtn}onClick={handleDownload}>
      <FaCloudDownloadAlt />
      Download
    </button>
  );
};

export default DownloadBtn;


// import React, { useRef, useState } from 'react';
// import { ProgressBar } from 'react-bootstrap';
// import styles from '../../styles/upload.module.css';
// import { FaRegFileAlt, FaCheck, FaTimes } from "react-icons/fa";

// interface UploadProps {
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   uploadProgress: number;
//   uploadedFileName: string;
//   uploadSize: string;
//   uploadStatus: string;
//   onSubmit: () => void;
//   onFileNameClick: () => void;
// }

// const UploadFiles: React.FC<UploadProps> = ({
//   onChange,
//   uploadProgress,
//   uploadedFileName,
//   uploadSize,
//   uploadStatus,
//   onSubmit,
//   onFileNameClick,
// }) => {
//   const [isFileSelected, setIsFileSelected] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileInputClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setIsFileSelected(true);
//     }
//     onChange(event);
//   };

//   return (
//     <>
//       <div className={styles.overall}>
//         <div className={styles.text}>
//           <p style={{ marginRight: "100px", color:"#48B999", fontWeight:"500", fontSize:"20px"}}>Upload Files</p>
//           <p style={{ marginRight: "100px" }}>Upload documents you want to share with your team</p>
//         </div>
//         <div className={styles.totalContainer}>
//           <div className={styles.miniContainer}>
//             <form className={styles.uploadBox}>
//               <input
//                 type="file"
//                 name='file'
//                 className={styles.fileInput}
//                 hidden
//                 onChange={handleFileChange}
//                 ref={fileInputRef}
//               />
//               <div className={styles.icon} onClick={handleFileInputClick}>
//                 <img src="./cloud.png" className={styles.cloud} />
//                 <p style={{ width: "100%" , color:"#4DBC9C"}}> Click to upload files </p>
//               </div>
//               {isFileSelected && (
//                 <button type="button" className={styles.button} onClick={onSubmit}>Upload</button>
//               )}
//             </form>
//           </div>
//           <div className={styles.section}>
//             <section className={styles.loadingArea}>
//               {uploadProgress > 0 && uploadProgress < 100 && (
//                 <li className={styles.row}>
//                   <div className={styles.content}>
//                     <FaRegFileAlt className={styles.fa} />
//                     <div className={styles.details}>
//                       <span className={styles.name}>{uploadedFileName}</span>
//                       <ProgressBar
//                         now={uploadProgress}
//                         label={`${uploadProgress}%`}
//                         striped
//                         animated
//                         className={styles.progressBar}
//                       />
//                     </div>
//                   </div>
//                 </li>
//               )}
//             </section>
//             {uploadStatus && (
//               <section className={styles.uploadedArea}>
//                 <li className={styles.row}>
//                   <div className={styles.content}>
//                     <FaRegFileAlt className={styles.fa} />
//                     <div className={styles.details}>
//                       <span className={styles.nameFile}
//                         onClick={onFileNameClick}
//                         style={{ color: uploadStatus.includes('failed') ? 'red' : 'inherit' }}>
//                         {uploadedFileName}
//                       </span>
//                       <span className={styles.nameFile}>
//                         {uploadSize}
//                       </span>
//                     </div>
//                   </div>
//                   {uploadStatus.includes('success') ? (
//                     <FaCheck className={styles.fa} />
//                   ) : (
//                     <FaTimes className={styles.fa} style={{ color: 'red' }} />
//                   )}
//                 </li>
//               </section>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UploadFiles;
import React, { useRef, useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import styles from '../../styles/upload.module.css';
import { FaRegFileAlt, FaCheck, FaTimes } from "react-icons/fa";

interface UploadProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadProgress: number[];
  uploadedFileNames: string[];
  uploadSizes: string[];
  uploadStatuses: string[];
  onSubmit: () => void;
  onFileNameClick: (index: number) => void;
}

const UploadFiles: React.FC<UploadProps> = ({
  onChange,
  uploadProgress,
  uploadedFileNames,
  uploadSizes,
  uploadStatuses,
  onSubmit,
  onFileNameClick,
}) => {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  // Check if all files are uploaded (progress 100%)
  useEffect(() => {
    const allUploadsCompleted = uploadProgress.length > 0 && uploadProgress.every(progress => progress === 100);
    setIsFileUploaded(allUploadsCompleted);
  }, [uploadProgress]);

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setIsFileSelected(true);
      onChange(event);  // Pass the file change event to the parent component
    }
  };

  return (
    <div className={styles.overall}>
      <div className={styles.text}>
        <p style={{ marginRight: "100px", color:"#48B999", fontWeight:"500", fontSize:"20px"}}>Upload Files</p>
        <p style={{ marginRight: "100px" }}>Upload documents you want to share with your team</p>
      </div>
      <div className={styles.totalContainer}>
        <div className={styles.miniContainer}>
          {!isFileUploaded && ( // Show file input until files are uploaded
            <form className={styles.uploadBox}>
              <input
                type="file"
                name="file"
                className={styles.fileInput}
                hidden
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <div className={styles.icon} onClick={handleFileInputClick}>
                <img src="./cloud.png" className={styles.cloud} />
                <p style={{ width: "100%" , color:"#4DBC9C"}}> Click to upload files </p>
              </div>
              {/* Show upload button only if a file is selected but not yet uploaded */}
              {isFileSelected && !isFileUploaded && (
                <button type="button" className={styles.button} onClick={onSubmit}>Upload</button>
              )}
            </form>
          )}
        </div>
        <div className={styles.section}>
          <section className={styles.loadingArea}>
            {uploadProgress.map((progress, index) => (
              progress > 0 && progress < 100 && (
                <li className={styles.row} key={index}>
                  <div className={styles.content}>
                    <FaRegFileAlt className={styles.fa} />
                    <div className={styles.details}>
                      <span className={styles.name}>{uploadedFileNames[index]}</span>
                      <ProgressBar
                        now={progress}
                        label={`${progress}%`}
                        striped
                        animated
                        className={styles.progressBar}
                      />
                    </div>
                  </div>
                </li>
              )
            ))}
          </section>
          {uploadStatuses.map((status, index) => (
            <section className={styles.uploadedArea} key={index}>
              <li className={styles.row}>
                <div className={styles.content}>
                  <FaRegFileAlt className={styles.fa} />
                  <div className={styles.details}>
                    <span
                      className={styles.nameFile}
                      onClick={() => onFileNameClick(index)}
                      style={{ color: status.includes('failed') ? 'red' : 'inherit' }}
                    >
                      {uploadedFileNames[index]}
                    </span>
                    <span className={styles.nameFile}>
                      {uploadSizes[index]}
                    </span>
                  </div>
                </div>
                {status.includes('success') ? (
                  <FaCheck className={styles.fa} />
                ) : (
                  <FaTimes className={styles.fa} style={{ color: 'red' }} />
                )}
              </li>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadFiles;